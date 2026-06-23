import { assetUrl } from '../utils/assetUrl';

const toolIcon = (name: string) => assetUrl(`images/tools/${name}`);

export const toolIconPaths: Record<string, string> = {
  ruler: toolIcon('tape-measure.png'),
  square: toolIcon('square.png'),
  pencil: toolIcon('pencil.png'),
  knife: toolIcon('knife.png'),
  jigsaw: toolIcon('jigsaw.png'),
  template: toolIcon('template.png'),
  mixer: toolIcon('mixer.png'),
  trowel: toolIcon('trowel.png'),
  mallet: toolIcon('mallet.png'),
  roller: toolIcon('roller.png'),
  rag: toolIcon('rag.png'),
  solvent: toolIcon('solvent.png'),
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
      width={56}
      height={56}
    />
  );
}
