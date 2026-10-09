import { test } from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { POST } from '../src/app/api/enquiry/route.js';

test('origin check accepts the browser host behind Next.js and rejects foreign origins', async () => {
  const request = (origin, host) => new Request('http://localhost:5175/api/enquiry/', {
    method: 'POST', headers: { origin, host, 'Content-Type': 'application/json' }, body: '{}',
  });
  // Invalid data deliberately stops before SMTP; 400 proves origin validation passed.
  assert.equal((await POST(request('http://127.0.0.1:5175', '127.0.0.1:5175'))).status, 400);
  assert.equal((await POST(request('https://travel.example', 'travel.example'))).status, 400);
  assert.equal((await POST(request('https://attacker.example', 'travel.example'))).status, 403);
  assert.equal((await POST(request('http://127.0.0.1:9999', '127.0.0.1:5175'))).status, 403);
  assert.equal((await POST(request('null', 'travel.example'))).status, 403);
});

test('enquiry validates input and only reports provider-confirmed acceptance', async () => {
  const originalTransport = nodemailer.createTransport;
  const oldKey = process.env.GMAIL_APP_PASSWORD;
  const oldFrom = process.env.GMAIL_SMTP_USER;
  const data = { name: 'Test Traveller', email: 'traveller@example.com', destination: 'Kenya', guests: '2', date: '', package: 'Safari', message: 'Test enquiry', website: '' };
  const request = (body, origin = 'http://localhost') => new Request('http://localhost/api/enquiry/', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    delete process.env.GMAIL_APP_PASSWORD;
    delete process.env.GMAIL_SMTP_USER;
    assert.equal((await POST(request(data))).status, 503);
    assert.equal((await POST(request({ ...data, email: 'bad' }))).status, 400);
    assert.equal((await POST(request({ ...data, guests: '101' }))).status, 400);
    assert.equal((await POST(request({ ...data, message: 'x'.repeat(17000) }))).status, 413);
    assert.equal((await POST(request(data, 'https://unrelated.example'))).status, 403);
    process.env.GMAIL_APP_PASSWORD = 'test only';
    process.env.GMAIL_SMTP_USER = 'sender@example.com';
    nodemailer.createTransport = options => {
      assert.equal(options.host, 'smtp.gmail.com');
      assert.equal(options.port, 465);
      assert.equal(options.secure, true);
      assert.equal(options.auth.pass, 'testonly');
      return { sendMail: async message => {
      assert.equal(message.to, 'travels@emeraldisle.lk');
      assert.equal(message.from.address, 'sender@example.com');
      assert.equal(message.replyTo, data.email);
      assert.match(message.text, /Journey: Safari/);
      return { accepted: ['travels@emeraldisle.lk'] };
      } };
    };
    assert.deepEqual(await (await POST(request(data))).json(), { ok: true });
    nodemailer.createTransport = () => ({ sendMail: async () => ({ accepted: [] }) });
    assert.equal((await POST(request(data))).status, 502);
    nodemailer.createTransport = () => ({ sendMail: async () => { throw new Error('timeout'); } });
    assert.equal((await POST(request(data))).status, 502);
  } finally {
    nodemailer.createTransport = originalTransport;
    if (oldKey === undefined) delete process.env.GMAIL_APP_PASSWORD; else process.env.GMAIL_APP_PASSWORD = oldKey;
    if (oldFrom === undefined) delete process.env.GMAIL_SMTP_USER; else process.env.GMAIL_SMTP_USER = oldFrom;
  }
});
