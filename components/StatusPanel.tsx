import { statusRows } from "@/content/site";

export function StatusPanel() {
  return (
    <figure className="panneau" style={{ margin: 0 }}>
      <div className="panneau__tete">
        <span className="panneau__titre">État de vos systèmes</span>
        <span className="panneau__maj">Mis à jour ce matin</span>
      </div>
      <ul>
        {statusRows.map((row, i) => (
          <li key={row.label}>
            <span
              className={`temoin temoin--${row.state === "ok" ? "ok" : "travail"}`}
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden="true"
            />
            <span className="panneau__libelle">{row.label}</span>
            <span className="panneau__valeur">
              <span className="sr-only">{row.state === "ok" ? "En ordre : " : "En cours : "}</span>
              {row.value}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="panneau__pied">Exemple du suivi qu'un client EnimaTech peut attendre.</figcaption>
    </figure>
  );
}
