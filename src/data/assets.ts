/** Пути к локальным изображениям (скопированы из /image) */
const local = (name: string) => `/images/local/${name}`;

export const images = {
  logo: '/images/plastfactor/logo.png',
  cover: local('Photorealistic_modern_warehouse_interior,_the_202606181413.jpeg'),
  product: local('Photorealistic_modern_warehouse_interior,_the_202606181413.jpeg'),
  warehouse: local('Ultra_realistic_industrial_warehouse_interior,_202606181319.jpeg'),
  tools: local('Top-down_view_of_a_perfectly_202606181322.jpeg'),
  concreteLeveling: local('Ultra_realistic_photo_of_a_202606181312.jpeg'),
  prepAssessment: '/images/local/prep-base-assessment.png',
  cleaning: local('Photorealistic_modern_warehouse_interior,_the_202606181351.jpeg'),
  grinding: local('Photorealistic_modern_warehouse_interior,_the_202606181353.jpeg'),
  priming: local('Photorealistic_modern_warehouse_interior,_the_202606181354.jpeg'),
  selfLeveling: local('Photorealistic_modern_warehouse_interior,_the_202606181356.jpeg'),
  floorFinished: local('Photorealistic_modern_warehouse_interior,_same_202606181401.jpeg'),
  installation1: '/images/local/install-acclimatization.png',
  installGap: '/images/local/install-gap.png',
  installAxisLines: '/images/local/install-axis-lines.png',
  installGLayout: '/images/local/install-g-layout.png',
  installAdhesive: '/images/local/install-adhesive.png',
  installLaying: '/images/local/install-laying.png',
  installRolling: '/images/local/install-rolling.png',
  installCutting: '/images/local/install-cutting.png',
  installCuring: '/images/local/install-curing.png',
  installation2: local('Photorealistic_modern_warehouse_interior,_the_202606181413 (1).jpeg'),
  rolling: local('Photorealistic_industrial_warehouse_interior._Two_202606181354.jpeg'),
  cutting: local('Photorealistic_industrial_warehouse_interior._Two_202606181355.jpeg'),
  tileTop: local('Top-down_view_of_a_perfectly_202606181322 (1).jpeg'),
  ceramicBase: local('Photorealistic_modern_warehouse_interior,_the_202606181356 (2).jpeg'),
  concreteBase: local('Ultra_realistic_photo_of_a_202606181313.jpeg'),
  safety: local('Photorealistic_modern_warehouse_interior,_the_202606181356 (3).jpeg'),
  adhesive: '/images/products/eurocol-144-euromix-pu.png',
  sensorTile: '/images/products/sensor-tech-tile.png',
} as const;

export type ImageRole =
  | 'product'
  | 'tools'
  | 'floor-preparation'
  | 'adhesive'
  | 'installation'
  | 'rolling'
  | 'cutting'
  | 'cleaning'
  | 'safety'
  | 'cover';

export const contacts = {
  site: 'https://plastfactor.com/',
  phone: '8 (800) 775-84-09',
  address: 'с. Крым, ул. 5-я Линия, 1',
  hours: 'Режим работы: 8:00–17:00, сб, вс — выходные',
} as const;
