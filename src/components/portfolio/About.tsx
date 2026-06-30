export function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-content">
        <div className="about-bio">
          <p>
            I&apos;m a Data Science student at NYU Shanghai with a concentration in Finance,
            driven by the intersection of data analysis and financial markets. I combine
            technical depth in Python, SQL, and machine learning with practical experience
            in financial modeling and AI workflows.
          </p>
          <p>
            I&apos;ve worked as an HR Intern optimizing recruitment processes, built data
            pipelines for financial analysis, and led initiatives as Entrepreneur Club
            President. My goal: to leverage data science to uncover market inefficiencies
            and build intelligent financial tools.
          </p>
        </div>
        <div className="about-facts">
          <div className="fact scroll-reveal">
            <div className="fact-label">Education</div>
            <div className="fact-value">NYU Shanghai, Class of 2026</div>
          </div>
          <div className="fact scroll-reveal">
            <div className="fact-label">Concentration</div>
            <div className="fact-value">Data Science + Finance</div>
          </div>
          <div className="fact scroll-reveal">
            <div className="fact-label">Languages</div>
            <div className="fact-value">English, Mongolian, Mandarin</div>
          </div>
        </div>
      </div>
    </section>
  );
}
