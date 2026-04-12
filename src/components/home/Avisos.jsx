export default function Avisos({ siteData }) {
  return (
    <section id="avisos" className="card full reveal">
      <h2>Avisos da Semana</h2>
      <ul className="schedule-list">
        {siteData.notices.map((notice) => (
          <li key={notice}>
            <strong>Aviso:</strong> {notice}
          </li>
        ))}
      </ul>
    </section>
  );
}
