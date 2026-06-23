import { Fragment } from 'react';
import type { ToolItem } from '../data/instruction';
import { ToolIcon } from './ToolIcons';

interface ToolGridProps {
  tools: ToolItem[];
  imageSrc?: string;
  photoNote?: string;
}

function groupTools(tools: ToolItem[]) {
  const groups: { title: string; items: ToolItem[] }[] = [];
  let current: { title: string; items: ToolItem[] } | null = null;

  for (const tool of tools) {
    if (tool.group) {
      current = { title: tool.group, items: [tool] };
      groups.push(current);
    } else if (current) {
      current.items.push(tool);
    } else {
      groups.push({ title: '', items: [tool] });
    }
  }

  return groups;
}

export function ToolGrid({ tools, imageSrc, photoNote }: ToolGridProps) {
  const groups = groupTools(tools);

  return (
    <div className="tool-section">
      {imageSrc && (
        <figure className="tool-section__hero image-block">
          <img src={imageSrc} alt="Инструмент для монтажа модульной ПВХ-плитки" />
          {photoNote && <figcaption>{photoNote}</figcaption>}
        </figure>
      )}

      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th className="tool-table__col-icon" scope="col">
                Иллюстрация
              </th>
              <th className="tool-table__col-name" scope="col">
                Инструмент / материал
              </th>
              <th className="tool-table__col-purpose" scope="col">
                Назначение
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.title || group.items[0]?.name}>
                {group.title && (
                  <tr className="tool-table__group-row">
                    <td colSpan={3}>{group.title}</td>
                  </tr>
                )}
                {group.items.map((tool) => (
                  <tr key={tool.name} className="tool-table__row">
                    <td className="tool-table__icon-cell">
                      <div className="tool-table__icon">
                        <ToolIcon name={tool.name} />
                      </div>
                    </td>
                    <td className="tool-table__name-cell">{tool.name}</td>
                    <td className="tool-table__purpose-cell">{tool.purpose}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
