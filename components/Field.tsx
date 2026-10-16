type Props = {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: (a11y: { id: string; name: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => React.ReactNode;
};

export function Field({ name, label, error, optional, children }: Props) {
  const id = `champ-${name}`;
  const errId = `${id}-erreur`;
  return (
    <div className="champ">
      <label htmlFor={id}>
        {label} {optional && <span className="facultatif">(facultatif)</span>}
      </label>
      {children({ id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errId : undefined })}
      {error && (
        <span id={errId} className="erreur">
          {error}
        </span>
      )}
    </div>
  );
}

export function Honeypot() {
  return (
    <div className="piege" aria-hidden="true">
      <label htmlFor="website">Ne pas remplir</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
