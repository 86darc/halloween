import { useState } from "react";
import Logo from "../components/Logo.jsx";
import { isValidEmail, register } from "../auth.js";

// Registrierung: legt ein Konto an und meldet die Person direkt an
export default function RegisterScreen({ onRegistered, onSwitchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Bitte gib deinen Namen ein.";
    if (!isValidEmail(form.email)) next.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    if (form.password.length < 8) next.password = "Das Passwort braucht mindestens 8 Zeichen.";
    if (form.confirm !== form.password) next.confirm = "Die Passwörter stimmen nicht überein.";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    const result = await register(form);
    setBusy(false);

    if (result.ok) {
      onRegistered(result.user);
    } else {
      setErrors({ [result.field || "form"]: result.error });
    }
  }

  const field = (id, label, type, autoComplete, placeholder) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={form[id === "pw" ? "password" : id === "pw2" ? "confirm" : id]}
        aria-invalid={Boolean(errors[id === "pw" ? "password" : id === "pw2" ? "confirm" : id])}
        aria-describedby={errors[id === "pw" ? "password" : id === "pw2" ? "confirm" : id] ? `${id}-err` : undefined}
        onChange={set(id === "pw" ? "password" : id === "pw2" ? "confirm" : id)}
      />
      {errors[id === "pw" ? "password" : id === "pw2" ? "confirm" : id] && (
        <p className="field-error" id={`${id}-err`}>
          {errors[id === "pw" ? "password" : id === "pw2" ? "confirm" : id]}
        </p>
      )}
    </div>
  );

  return (
    <main className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <Logo />
        <h1>Konto erstellen</h1>
        <p className="lead">Registriere dich, um StudyHub zu nutzen.</p>

        {errors.form && (
          <div className="error" role="alert">
            <span>{errors.form}</span>
          </div>
        )}

        {field("name", "Name", "text", "name", "Anna Muster")}
        {field("email", "E-Mail", "email", "username", "vorname.nachname@wiss.ch")}
        {field("pw", "Passwort", "password", "new-password", "Mindestens 8 Zeichen")}
        {field("pw2", "Passwort wiederholen", "password", "new-password", "")}

        <button className="btn" type="submit" disabled={busy}>Registrieren</button>

        <p className="switch">
          Schon ein Konto?{" "}
          <button type="button" className="link" onClick={onSwitchToLogin}>
            Anmelden
          </button>
        </p>
      </form>
    </main>
  );
}
