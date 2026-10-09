import { ArrowUpRight, Download } from "@/components/icons";
import { FILES, URLS } from "@/config/resources";
import { CopyEmail } from "@/components/ui/CopyEmail";

const EMAIL = URLS.socials.email.replace("mailto:", "");

const cvUpdatedLabel = new Date(FILES.cvUpdated).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
});

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <h2 className="contact-title">Contact</h2>
      <p className="contact-copy">
        I&rsquo;m looking for internships in data and finance. Email is the fastest way to reach
        me.
      </p>

      <div className="contact-email-row">
        <a className="contact-email" href={URLS.socials.email}>
          {EMAIL}
        </a>
        <CopyEmail email={EMAIL} />
      </div>

      <ul className="contact-links">
        <li>
          <a className="text-link" href={URLS.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ArrowUpRight size={16} />
          </a>
        </li>
        <li>
          <a className="text-link" href={URLS.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowUpRight size={16} />
          </a>
        </li>
        <li>
          <a className="text-link" href={FILES.cvPdf} download>
            CV, updated {cvUpdatedLabel}
            <Download size={16} />
          </a>
        </li>
      </ul>

      <footer className="colophon">
        <p>© 2026 Chinsanaa Chuluunbold</p>
        <p>Shanghai and Ulaanbaatar</p>
      </footer>
    </section>
  );
}
