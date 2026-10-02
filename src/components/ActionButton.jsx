import { Children, isValidElement } from "react";

export function ButtonContent({ children }) {
  const label = Children.map(children, child => {
    if (isValidElement(child) && child.props["aria-hidden"]) return null;
    return typeof child === "string" ? child.replace(/[↗↺]+\s*$/, "").trim() : child;
  });
  return <><span className="action-circle" aria-hidden="true"><span className="action-arrow"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg></span></span><span className="action-label">{label}</span></>;
}

export default function ActionButton({ children, className = "", ...props }) {
  return <button className={`${className} story-button`} {...props}><ButtonContent>{children}</ButtonContent></button>;
}
