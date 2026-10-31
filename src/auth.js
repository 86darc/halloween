// Einfache Benutzerverwaltung für den Prototyp.
// Konten und Sitzung liegen im localStorage des Browsers (kein Server nötig).
// Passwörter werden nicht im Klartext gespeichert, sondern gesalzen mit SHA-256 gehasht.

const USERS_KEY = "studyhub.users";
const SESSION_KEY = "studyhub.session";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

function newSalt() {
  return toHex(crypto.getRandomValues(new Uint8Array(16)));
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(new Uint8Array(digest));
}

const normalizeEmail = (email) => email.trim().toLowerCase();
const publicUser = (u) => ({ name: u.name, email: u.email });

export function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}

export function getSession() {
  const email = read(SESSION_KEY, null);
  if (!email) return null;
  const user = read(USERS_KEY, []).find((u) => u.email === email);
  return user ? publicUser(user) : null;
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignorieren */
  }
}

export async function register({ name, email, password }) {
  const users = read(USERS_KEY, []);
  const mail = normalizeEmail(email);

  if (users.some((u) => u.email === mail)) {
    return { ok: false, field: "email", error: "Diese E-Mail ist bereits registriert. Melde dich stattdessen an." };
  }

  const salt = newSalt();
  const user = { name: name.trim(), email: mail, salt, hash: await hashPassword(password, salt) };

  if (!write(USERS_KEY, [...users, user]) || !write(SESSION_KEY, mail)) {
    return { ok: false, error: "Das Konto konnte nicht gespeichert werden. Prüfe, ob dein Browser Speicherplatz erlaubt." };
  }
  return { ok: true, user: publicUser(user) };
}

export async function login({ email, password }) {
  const mail = normalizeEmail(email);
  const user = read(USERS_KEY, []).find((u) => u.email === mail);
  if (!user) return null;
  if ((await hashPassword(password, user.salt)) !== user.hash) return null;
  write(SESSION_KEY, mail);
  return publicUser(user);
}
