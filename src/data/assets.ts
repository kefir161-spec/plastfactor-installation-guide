import { assetUrl } from '../utils/assetUrl';

const local = (name: string) => assetUrl(`images/local/${name}`);

export const images = {
  logo: assetUrl('images/plastfactor/logo.png'),
  cover: local('Photorealistic_modern_warehouse_interior,_the_202606181413.jpeg'),
  concreteLeveling: local('Ultra_realistic_photo_of_a_202606181312.jpeg'),
  prepAssessment: assetUrl('images/local/prep-base-assessment.png'),
  cleaning: local('Photorealistic_modern_warehouse_interior,_the_202606181351.jpeg'),
  priming: local('Photorealistic_modern_warehouse_interior,_the_202606181354.jpeg'),
  installation1: assetUrl('images/local/install-acclimatization.png'),
  installGap: assetUrl('images/local/install-gap.png'),
  installAxisLines: assetUrl('images/local/install-axis-lines.png'),
  installGLayout: assetUrl('images/local/install-g-layout.png'),
  installAdhesive: assetUrl('images/local/install-adhesive.png'),
  installLaying: assetUrl('images/local/install-laying.png'),
  installRolling: assetUrl('images/local/install-rolling.png'),
  installCutting: assetUrl('images/local/install-cutting.png'),
  installCuring: assetUrl('images/local/install-curing.png'),
  ceramicBase: local('Photorealistic_modern_warehouse_interior,_the_202606181356 (2).jpeg'),
  concreteBase: local('Ultra_realistic_photo_of_a_202606181313.jpeg'),
  adhesiveEurocol: assetUrl('images/products/eurocol-144-euromix-pu.png'),
  adhesiveKiilto: assetUrl('images/products/kiilto-2k-pu.png'),
  adhesiveHomaprof: assetUrl('images/products/homaprof-797-2k-pu.png'),
  sensorTile: assetUrl('images/products/sensor-tech-tile.png'),
} as const;

export const contacts = {
  site: 'https://plastfactor.com/',
  phone: '8 (800) 775-84-09',
  address: 'с. Крым, ул. 5-я Линия, 1',
  hours: 'Режим работы: 8:00–17:00, сб, вс — выходные',
  electronicGuide: 'https://kefir161-spec.github.io/plastfactor-installation-guide/',
} as const;
