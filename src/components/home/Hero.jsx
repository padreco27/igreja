export default function Hero({ siteData }) {
  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="container hero-content">
        <h1>{siteData.heroTitle}</h1>
        <p>{siteData.heroText}</p>
      </div>
    </section>
  );
}
