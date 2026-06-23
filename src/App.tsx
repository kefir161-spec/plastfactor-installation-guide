import './components.css';
import { Cover } from './components/Cover';
import { Section } from './components/Section';
import { IntroSection } from './components/IntroSection';
import { SpecTable } from './components/SpecTable';
import { FloorRequirementsTable } from './components/FloorRequirementsTable';
import { PrepStepsGrid } from './components/PrepStepsGrid';
import { installStepsToCards, StepCardsGrid, type StepVisual } from './components/StepCardsGrid';
import { ToolGrid } from './components/ToolGrid';
import { ImageBlock } from './components/ImageBlock';
import { TileVisual } from './components/TileVisual';
import { PpeGrid } from './components/PpeGrid';
import { MaintenanceSection } from './components/MaintenanceSection';
import { ContactsSection } from './components/ContactsSection';
import {
  TempScale,
} from './components/Diagrams';
import {
  adhesive,
  bases,
  finalChecklist,
  floorRequirements,
  installSteps,
  maintenance,
  operationalLimits,
  prepSteps,
  productNote,
  safety,
  sections,
  specs,
  specsHeaders,
  tileVisual,
  tools,
  toolsIntro,
} from './data/instruction';
import { images } from './data/assets';

const prepImages: Record<number, string> = {
  1: images.prepAssessment,
  2: images.concreteLeveling,
  3: images.cleaning,
  4: images.priming,
  5: images.selfLeveling,
};

const installVisuals: Record<number, StepVisual> = {
  1: images.installation1,
  2: images.installGap,
  3: images.installAxisLines,
  4: images.installGLayout,
  5: images.installAdhesive,
  6: images.installLaying,
  7: images.installRolling,
  8: images.installCutting,
  9: images.installCuring,
};

const installImagePositions: Record<number, string> = {
  1: 'center 78%',
  3: 'center bottom',
  4: 'center top',
  8: 'center 35%',
  9: 'center top',
};

export default function App() {
  return (
    <div className="app">
      <Cover />

      <Section
        id="intro"
        number={sections.intro.number}
        title={sections.intro.title}
        className="section--intro"
      >
        <IntroSection />
      </Section>

      <Section
        id="bases"
        number={sections.bases.number}
        title={sections.bases.title}
        lead={bases.intro}
        muted
      >
        <div className="grid grid--2 base-compare">
          <article className="card base-compare__item">
            <span className="badge badge--primary">Рекомендуемое</span>
            <h3>{bases.recommended.title}</h3>
            <p>{bases.recommended.text}</p>
            <ImageBlock src={images.concreteBase} alt="Бетонное основание" />
          </article>
          <article className="card base-compare__item">
            <span className="badge">Допустимое</span>
            <h3>{bases.acceptable.title}</h3>
            <p>{bases.acceptable.text}</p>
            <ImageBlock src={images.ceramicBase} alt="Керамическое основание с предварительной подготовкой" />
          </article>
        </div>
      </Section>

      <Section
        id="floor-req"
        number={sections.floorReq.number}
        title={sections.floorReq.title}
      >
        <FloorRequirementsTable rows={floorRequirements} />
      </Section>

      <Section
        id="prep"
        number={sections.prep.number}
        title={sections.prep.title}
      >
        <PrepStepsGrid steps={prepSteps} images={prepImages} />
      </Section>

      <Section
        id="tools"
        number={sections.tools.number}
        title={sections.tools.title}
        lead={toolsIntro.lead}
        muted
      >
        <ToolGrid tools={tools} />
      </Section>

      <Section id="specs" number={sections.specs.number} title={sections.specs.title}>
        <p>{productNote}</p>
        <div className="grid grid--2 specs-layout">
          <SpecTable
            headers={specsHeaders}
            rows={specs}
            highlightParams={['ПВХ', 'RAL', '500', '4 шт', '5 мм', 'Шор', '200%', '1,42']}
          />
          <div className="diagram-wrap card specs-visual">
            <TileVisual src={images.sensorTile} alt={tileVisual.alt} />
          </div>
        </div>
      </Section>

      <Section id="adhesive" number={sections.adhesive.number} title={sections.adhesive.title}>
        <p>{adhesive.label}</p>
        <div className="grid grid--2 adhesive-grid">
          <article className="card adhesive-card">
            <ImageBlock src={images.adhesive} alt="Клей Eurocol 144 Euromix PU" className="adhesive-card__image" />
          </article>
          <article className="card adhesive-tech">
            <h3>{adhesive.techTitle}</h3>
            <dl className="adhesive-tech__specs">
              {adhesive.techSpecs.map((item) => (
                <div key={item.label} className="adhesive-tech__row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="adhesive-tech__notes">
              {adhesive.techNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section id="install" number={sections.install.number} title={sections.install.title}>
        <StepCardsGrid
          items={installStepsToCards(installSteps)}
          visuals={installVisuals}
          imagePositions={installImagePositions}
        />
      </Section>

      <Section id="safety" number={sections.safety.number} title={sections.safety.title} muted>
        <h3>{safety.conditionsTitle}</h3>
        <ul>
          {safety.conditions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h3>{safety.ppeTitle}</h3>
        <PpeGrid items={safety.ppe} />
      </Section>

      <Section id="limits" number={sections.limits.number} title={sections.limits.title}>
        <TempScale />
        <div className="grid grid--2">
          {operationalLimits.items.map((item) => (
            <article key={item.label} className="card">
              <h3>{item.label}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
        <div className="hazard-icons" aria-label="Ограничения по агрессивным средам">
          <span>растворитель</span>
          <span>ацетон</span>
          <span>концентрированные кислоты</span>
          <span>УФ / прямое солнце</span>
        </div>
      </Section>

      <Section
        id="maintenance"
        number={sections.maintenance.number}
        title={sections.maintenance.title}
        lead={maintenance.intro}
        muted
      >
        <MaintenanceSection schedule={maintenance.schedule} cleaners={maintenance.cleaners} />
      </Section>

      <Section id="contacts" title={sections.contacts.title}>
        <ContactsSection checklist={finalChecklist} />
      </Section>
    </div>
  );
}
