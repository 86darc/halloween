export default function KurseScreen() {
  return (
    <>
      <h1>Kurse</h1>
      <p className="lead">Deine Kurse in diesem Semester.</p>
      <div className="list">
        <div className="row"><strong>Wirtschaftsinformatik</strong><span>Mo, Mi</span></div>
        <div className="row"><strong>Projektmanagement</strong><span>Di</span></div>
        <div className="row"><strong>Datenbanken</strong><span>Do</span></div>
      </div>
    </>
  );
}
