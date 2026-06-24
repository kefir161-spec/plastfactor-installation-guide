import { trowelTkb } from '../data/instruction';

export function TrowelTkbRef() {
  return (
    <figure className="trowel-tkb">
      <div className="trowel-tkb__table-wrap">
        <table className="trowel-tkb__table">
          <thead>
            <tr>
              {trowelTkb.headers.map((header) => (
                <th key={header} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trowelTkb.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.a1}</td>
                <td>{row.a2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="trowel-tkb__caption">{trowelTkb.caption}</figcaption>
    </figure>
  );
}
