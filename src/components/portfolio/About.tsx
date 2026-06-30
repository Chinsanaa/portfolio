export function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-content">
        <div className="about-bio">
          <p>
            I&apos;m a Data Science student at NYU Shanghai (Finance Concentration, Class of
            2029) building toward a career that combines data analytics and finance.
            I&apos;m currently a Financial Analyst at Next Group, working with Excel, SQL,
            and Power BI to analyze sales and COGS data, alongside prior roles there in
            sales analysis, operations, and HR.
          </p>
          <p>
            Outside coursework, I build full-stack projects: Earnio, a UGC monetization
            platform for Mongolian creators with 208+ commits and a live web and iOS app,
            alongside a TCP socket-based chat system and a personal portfolio site.
            I&apos;m fluent in English and Mongolian, with elementary Chinese, and I
            prioritize precision over polish, both in my work and in how I represent it.
          </p>
        </div>
        <div className="about-facts">
          <div className="fact scroll-reveal">
            <div className="fact-label">Education</div>
            <div className="fact-value">NYU Shanghai, Class of 2029</div>
          </div>
          <div className="fact scroll-reveal">
            <div className="fact-label">Concentration</div>
            <div className="fact-value">Data Science + Finance (GPA 3.58)</div>
          </div>
          <div className="fact scroll-reveal">
            <div className="fact-label">Location</div>
            <div className="fact-value">Shanghai, China</div>
          </div>
        </div>
      </div>
    </section>
  );
}
