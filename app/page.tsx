import Link from "next/link";
import { StatusPanel } from "@/components/StatusPanel";
import { hero, process, services, site, vision } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="heros">
        <div className="conteneur heros__grille">
          <div>
            <h1>{hero.title}</h1>
            <p className="heros__intro">{hero.lead}</p>
            <div className="heros__actions">
              <Link className="bouton" href="/contact">{hero.primaryCta}</Link>
              <Link className="bouton bouton--contour" href="#services">{hero.secondaryCta}</Link>
            </div>
          </div>
          <StatusPanel />
        </div>
      </section>

      <section id="services" className="section" aria-labelledby="titre-services">
        <div className="conteneur">
          <div className="section__intro">
            <h2 id="titre-services">Services</h2>
            <p>Offerts à forfait annuel ou à l'heure, pour les entreprises de quelques postes à quelques dizaines.</p>
          </div>
          <div className="services">
            {services.map((s) => (
              <article key={s.title} className="service">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approche" className="section bande" aria-labelledby="titre-approche">
        <div className="conteneur approche">
          <div className="approche__texte">
            <h2 id="titre-approche">{vision.title}</h2>
            {vision.text.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="principes">
            {vision.principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-etapes">
        <div className="conteneur">
          <div className="section__intro">
            <h2 id="titre-etapes">Pour commencer</h2>
          </div>
          <ol className="etapes">
            {process.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="titre-joindre">
        <div className="conteneur">
          <h2 id="titre-joindre" className="sr-only">Nous joindre</h2>
          <div className="contact-rapide">
            <div>
              <h3>Vous êtes client et quelque chose bloque</h3>
              <p>Écrivez au soutien. Un billet est ouvert et vous recevez un suivi.</p>
              
               
            </div>
            <div>
              <h3>Vous voulez discuter d'un besoin</h3>
              <p>Soumission, question ou premier contact.</p>
              <Link className="courriel" href="/contact">Remplir le formulaire</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
