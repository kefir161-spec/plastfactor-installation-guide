const BASE = '/images/tools';

export const toolIconPaths: Record<string, string> = {
  ruler: `${BASE}/tape-measure.png`,
  square: `${BASE}/square.png`,
  pencil: `${BASE}/pencil.png`,
  knife: `${BASE}/knife.png`,
  jigsaw: `${BASE}/jigsaw.png`,
  template: `${BASE}/template.png`,
  mixer: `${BASE}/mixer.png`,
  trowel: `${BASE}/trowel.png`,
  mallet: `${BASE}/mallet.png`,
  roller: `${BASE}/roller.png`,
  rag: `${BASE}/rag.png`,
  solvent: `${BASE}/solvent.png`,
};

export function getToolIconPath(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('рулетк')) return toolIconPaths.ruler;
  if (n.includes('угольник')) return toolIconPaths.square;
  if (n.includes('карандаш') || n.includes('маркер')) return toolIconPaths.pencil;
  if (n.includes('нож')) return toolIconPaths.knife;
  if (n.includes('лобзик')) return toolIconPaths.jigsaw;
  if (n.includes('шаблон')) return toolIconPaths.template;
  if (n.includes('миксер') || n.includes('насадка')) return toolIconPaths.mixer;
  if (n.includes('шпатель')) return toolIconPaths.trowel;
  if (n.includes('киянк')) return toolIconPaths.mallet;
  if (n.includes('валик')) return toolIconPaths.roller;
  if (n.includes('ветошь')) return toolIconPaths.rag;
  if (n.includes('растворитель')) return toolIconPaths.solvent;
  return toolIconPaths.ruler;
}

interface ToolIconProps {
  name: string;
}

export function ToolIcon({ name }: ToolIconProps) {
  return (
    <img
      src={getToolIconPath(name)}
      alt=""
      className="tool-icon-img"
      loading="lazy"
      width={56}
      height={56}
    />
  );
}
