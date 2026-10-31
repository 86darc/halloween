import { useEffect, useRef, useState } from "react";

// SCRUM-21: Klick auf das Profilbild öffnet ein Menü mit «Abmelden»
export default function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const esc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div className="profile" ref={ref}>
      <button
        className="avatar"
        aria-label="Profilmenü"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {initials}
      </button>
      {open && (
        <div className="menu" role="menu">
          <div className="who">
            <strong>{user.name}</strong>
            <br />
            {user.email}
          </div>
          <button role="menuitem" onClick={onLogout}>Abmelden</button>
        </div>
      )}
    </div>
  );
}
