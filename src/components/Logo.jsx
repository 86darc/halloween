// SCRUM-19: WISS-Logo bzw. App-Name «StudyHub» ist sichtbar
export default function Logo() {
  return (
    <div className="logo">
      <div className="logo-mark" aria-hidden="true">WISS</div>
      <div>
        <div className="logo-name">StudyHub</div>
        <div className="logo-sub">WISS Studierenden-App</div>
      </div>
    </div>
  );
}
