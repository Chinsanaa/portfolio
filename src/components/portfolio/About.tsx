export function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-content">
        <div className="about-bio">
          <p>
            I&apos;m a Data Science student at NYU Shanghai with a concentration in Finance,
            driven by the intersection of data analysis and financial markets. I combine
            technical depth in Python, SQL, and Excel-based financial modeling with hands-on
            business experience at Next Group, where I&apos;ve worked across HR, sales,
            operations, and financial analysis.
          </p>
          <p>
            Outside the classroom, I founded and led the Entrepreneur Club at Orchlon
            International School, organizing fundraisers and mentoring peers on sales and
            marketing strategy. My goal: to leverage data science to uncover market
            inefficiencies and build intelligent financial tools.
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
