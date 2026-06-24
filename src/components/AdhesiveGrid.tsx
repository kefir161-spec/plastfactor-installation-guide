import { ADHESIVE_SPEC_LABELS } from '../data/instruction';

export interface AdhesiveItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  specs: Record<(typeof ADHESIVE_SPEC_LABELS)[number], string>;
  techNote?: string;
  manualUrl?: string;
}

interface AdhesiveGridProps {
  items: AdhesiveItem[];
}

export function AdhesiveGrid({ items }: AdhesiveGridProps) {
  return (
    <div className="adhesive-catalog">
      <div className="products-grid">
        {items.map((item) => (
          <article key={item.id} className="product-card adhesive-product">
            <div className="product-card__image">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <h3 className="product-card__title">{item.name}</h3>
            <p className="product-card__subtitle">{item.subtitle}</p>
            {ADHESIVE_SPEC_LABELS.map((label) => (
              <div key={label} className="spec-row">
                <span className="spec-label">{label}</span>
                <span className="spec-value">{item.specs[label]}</span>
              </div>
            ))}
            {(item.techNote || item.manualUrl) && (
              <p className="product-card__note">
                <strong className="product-card__note-label">Примечание:</strong>{' '}
                {item.techNote}
                {item.manualUrl && (
                  <>
                    {item.techNote ? ' ' : ''}
                    <a
                      href={item.manualUrl}
                      className="product-card__manual-link"
                      download="Eurocol-144-Euromix-PU-instruction.pdf"
                    >
                      Скачать полную инструкцию (PDF)
                    </a>
                  </>
                )}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
