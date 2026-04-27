export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="section-copy">{description}</p>}
      </div>
      {action}
    </div>
  );
}
