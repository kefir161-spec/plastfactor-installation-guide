import { FanDiagram, GShapeDiagram, RollingDiagram } from './Diagrams';
import { ImageBlock } from './ImageBlock';
import { TrowelTkbRef } from './TrowelTkbRef';

export type StepVisual = string | 'diagram-g' | 'diagram-fan' | 'diagram-roll';

export interface StepCardItem {
  step: number;
  title: string;
  paragraphs: string[];
  notes?: string[];
  showTrowelTkb?: boolean;
}

interface StepCardsGridProps {
  items: StepCardItem[];
  visuals?: Record<number, StepVisual>;
  imagePositions?: Record<number, string>;
}

function StepCardVisual({
  type,
  step,
  objectPosition,
}: {
  type: StepVisual;
  step: number;
  objectPosition?: string;
}) {
  if (type === 'diagram-g') {
    return (
      <div className="step-card-item__diagram" aria-label="Г-образная сухая раскладка и маяк">
        <GShapeDiagram />
      </div>
    );
  }
  if (type === 'diagram-fan') {
    return (
      <div className="step-card-item__diagram" aria-label="Направление укладки веером">
        <FanDiagram />
      </div>
    );
  }
  if (type === 'diagram-roll') {
    return (
      <div className="step-card-item__diagram" aria-label="Прикатка тяжёлым валиком 50–75 кг">
        <RollingDiagram />
      </div>
    );
  }

  return (
    <ImageBlock
      src={type}
      alt={`Этап ${step}`}
      className="step-card-item__image"
      objectPosition={objectPosition}
    />
  );
}

export function StepCardsGrid({ items, visuals = {}, imagePositions = {} }: StepCardsGridProps) {
  return (
    <div className="grid grid--2 step-cards-grid">
      {items.map((item) => (
        <article key={item.step} className="card step-card-item">
          <span className="badge badge--primary">Этап {item.step}</span>
          <h3>{item.title}</h3>
          {item.paragraphs.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {item.showTrowelTkb && <TrowelTkbRef />}
          {item.notes?.map((line) => (
            <p key={line} className="step-card-item__note">
              {line}
            </p>
          ))}
          {visuals[item.step] && (
            <StepCardVisual
              type={visuals[item.step]}
              step={item.step}
              objectPosition={imagePositions[item.step]}
            />
          )}
        </article>
      ))}
    </div>
  );
}

export function prepStepsToCards(
  steps: { step: number; title: string; description: string[]; note?: string[] }[],
): StepCardItem[] {
  return steps.map((step) => ({
    step: step.step,
    title: step.title,
    paragraphs: step.description,
    notes: step.note,
  }));
}

export function installStepsToCards(
  steps: { step: number; title: string; text: string; showTrowelTkb?: boolean }[],
): StepCardItem[] {
  return steps.map((step) => ({
    step: step.step,
    title: step.title,
    paragraphs: [step.text],
    showTrowelTkb: step.showTrowelTkb,
  }));
}
