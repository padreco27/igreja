export default function Celebracoes({ siteData }) {
  return (
    <section id="celebracoes" className="card reveal">
      <h2>Celebrações</h2>
      <ul className="schedule-list">
        <li>
          {siteData.celebrationsNote || "Clique para conferir os horários de missas na página oficial."}
        </li>
        <li>
          <strong>Forania:</strong> {siteData.forania}
        </li>
        <li>
          <strong>Ano da criação:</strong> {siteData.foundedYear}
        </li>
      </ul>
      <h3>Link direto</h3>
      <ul className="schedule-list">
        <li>
          <a
            href={siteData.links.diocesePage}
            target="_blank"
            rel="noreferrer"
          >
            Acessar informações e celebrações
          </a>
        </li>
      </ul>
    </section>
  );
}
