import Logo from "./Logo.jsx";
import ProfileMenu from "./ProfileMenu.jsx";

// Gemeinsamer Rahmen: Das Profilmenü (Logout) ist auf allen Screens nach dem Login erreichbar
export default function AppShell({ user, screen, setScreen, onLogout, children }) {
  return (
    <>
      <header className="topbar">
        <Logo />
        <nav className="nav" aria-label="Hauptnavigation">
          <button aria-current={screen === "home" ? "page" : undefined} onClick={() => setScreen("home")}>
            Startseite
          </button>
          <button aria-current={screen === "kurse" ? "page" : undefined} onClick={() => setScreen("kurse")}>
            Kurse
          </button>
        </nav>
        <ProfileMenu user={user} onLogout={onLogout} />
      </header>
      <main className="page">{children}</main>
    </>
  );
}
