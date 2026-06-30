export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact-container">
        <h2 className="section-title" style={{ justifyContent: "center" }}>
          Let&apos;s Connect
        </h2>
        <p className="contact-text">
          Always interested in discussing data science, finance, or building the next big
          thing. Reach out via email or connect on LinkedIn.
        </p>

        <div className="contact-links">
          <a href="mailto:chinsanaa@nyu.edu" className="contact-link">
            📧 Email
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link">
            💼 LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-link">
            🐙 GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
