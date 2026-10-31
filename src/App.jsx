import { useState } from "react";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import KurseScreen from "./screens/KurseScreen.jsx";
import AppShell from "./components/AppShell.jsx";
import { clearSession, getSession } from "./auth.js";

// SCRUM-22: Klickpfad Login -> Startseite -> (Abmelden) -> Login
// - Login und Registrierung sind nur sichtbar, solange niemand angemeldet ist.
// - Die Fehlermeldung erscheint im Login-Screen, wenn die Angaben falsch sind.
export default function App() {
  const [user, setUser] = useState(() => getSession()); // null = abgemeldet
  const [screen, setScreen] = useState("home");
  const [showRegister, setShowRegister] = useState(false);

  const handleLoggedIn = (u) => {
    setUser(u);
    setScreen("home");
    setShowRegister(false);
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setShowRegister(false);
  };

  if (user) {
    return (
      <AppShell user={user} screen={screen} setScreen={setScreen} onLogout={logout}>
        {screen === "home" ? <HomeScreen user={user} /> : <KurseScreen />}
      </AppShell>
    );
  }

  return showRegister ? (
    <RegisterScreen onRegistered={handleLoggedIn} onSwitchToLogin={() => setShowRegister(false)} />
  ) : (
    <LoginScreen onLoggedIn={handleLoggedIn} onSwitchToRegister={() => setShowRegister(true)} />
  );
}
