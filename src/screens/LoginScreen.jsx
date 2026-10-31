import { useState } from "react";
import Logo from "../components/Logo.jsx";
import { login } from "../auth.js";

export const ERROR_TEXT =
  "E-Mail oder Passwort falsch. Bitte prüfe deine Angaben und versuche es erneut.";

// SCRUM-19: Login-Screen  |  SCRUM-20: Fehlerzustand bei falschen Angaben
export default function LoginScreen({ onLoggedIn, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    const user = await login({ email, password });
    setBusy(false);
    if (user) {
      setError("");
      onLoggedIn(user);
    } else {
      // Eingabefelder bleiben sichtbar, damit man es erneut versuchen kann
      setError(ERROR_TEXT);
    }
  }

  const invalid = Boolean(error);

  return (
    <main className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <Logo />
        <h1>Anmelden</h1>
        <p className="lead">Melde dich mit deiner Schul-E-Mail an.</p>

        {invalid && (
          <div className="error" role="alert">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10 5.5v5.5M10 13.8v.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="field">
          <label htmlFor="email">E-Mail</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            aria-invalid={invalid}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vorname.nachname@wiss.ch"
          />
        </div>
        <div className="field">
          <label htmlFor="pw">Passwort</label>
          <input
            id="pw"
            type="password"
            autoComplete="current-password"
            value={password}
            aria-invalid={invalid}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit" disabled={busy}>Anmelden</button>

        <p className="switch">
          Noch kein Konto?{" "}
          <button type="button" className="link" onClick={onSwitchToRegister}>
            Registrieren
          </button>
        </p>
      </form>
    </main>
  );
}
