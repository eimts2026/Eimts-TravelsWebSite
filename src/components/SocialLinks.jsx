// Shared account URLs, verified against the original travel website.
const accounts = [
  { name: 'Instagram', href: 'https://www.instagram.com/emeraldisletravels_/', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
  { name: 'Facebook', href: 'https://www.facebook.com/emeraldisletravels', icon: <path fill="currentColor" stroke="none" d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1.4A22 22 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/emerald-isle-travels', icon: <><path fill="currentColor" stroke="none" d="M3 9h4v13H3zM10 9h4v1.8c.8-1.3 2-2 3.7-2 3 0 4.3 2 4.3 5.5V22h-4v-7c0-1.8-.5-2.8-1.9-2.8-1.5 0-2.1 1-2.1 2.8v7h-4z" /><circle cx="5" cy="4.5" r="2.2" fill="currentColor" stroke="none" /></> },
];
export default function SocialLinks({ className = '', label = 'Social media' }) {
  return <nav className={className} aria-label={label}>{accounts.map(account => <a key={account.name} href={account.href} target="_blank" rel="noopener noreferrer" aria-label={`${account.name} (opens in a new tab)`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{account.icon}</svg>
  </a>)}</nav>;
}
