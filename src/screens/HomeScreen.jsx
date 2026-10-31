export default function HomeScreen({ user }) {
  const firstName = user.name.split(/\s+/)[0];
  return (
    <>
      <h1>Hallo {firstName}</h1>
      <p className="lead">Das steht heute für dich an.</p>
      <div className="list">
        <div className="row"><strong>Wirtschaftsinformatik</strong><span>08:15, Raum 3.12</span></div>
        <div className="row"><strong>Projektmanagement (Scrum)</strong><span>10:30, Raum 2.04</span></div>
        <div className="row"><strong>Abgabe: Prototyp Login</strong><span>Freitag</span></div>
      </div>
    </>
  );
}
