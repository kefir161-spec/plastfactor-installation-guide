import type { CleanerProduct, MaintenanceTask } from '../data/instruction';

interface MaintenanceSectionProps {
  schedule: readonly MaintenanceTask[];
  cleaners: readonly CleanerProduct[];
}

export function MaintenanceSection({ schedule, cleaners }: MaintenanceSectionProps) {
  return (
    <div className="maintenance-section">
      <section className="maintenance-block" aria-labelledby="maintenance-schedule-title">
        <h3 id="maintenance-schedule-title" className="maintenance-block__title">
          График обслуживания
        </h3>
        <p className="maintenance-block__lead">
          Четыре уровня ухода — от ежедневной уборки до защитной обработки.
        </p>
        <div className="grid grid--2 maintenance-schedule">
          {schedule.map((task, index) => (
            <article key={task.id} className="card maintenance-task">
              <div className="maintenance-task__header">
                <span className="maintenance-task__index">{index + 1}</span>
                <span className="badge badge--primary">{task.period}</span>
              </div>
              <h4 className="maintenance-task__title">{task.title}</h4>
              <p className="maintenance-task__note">{task.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="maintenance-block" aria-labelledby="maintenance-cleaners-title">
        <h3 id="maintenance-cleaners-title" className="maintenance-block__title">
          Рекомендуемые чистящие и уходовые средства
        </h3>
        <div className="maintenance-cleaners-wrap">
          <table className="maintenance-cleaners">
            <thead>
              <tr>
                <th scope="col">Средство</th>
                <th scope="col">Назначение</th>
                <th scope="col">Применение</th>
              </tr>
            </thead>
            <tbody>
              {cleaners.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.name}</th>
                  <td>{product.purpose}</td>
                  <td>{product.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
