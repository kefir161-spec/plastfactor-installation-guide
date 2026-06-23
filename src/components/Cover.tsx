import { meta } from '../data/instruction';
import { images } from '../data/assets';

export function Cover() {
  return (
    <header className="cover section">
      <div className="cover__bg">
        <img src={images.cover} alt="Модульное ПВХ-покрытие серии Sensor в торговом помещении" />
        <div className="cover__overlay" />
      </div>
      <div className="cover__content container">
        <img className="cover__logo" src={images.logo} alt="ПластФактор" />
        <p className="cover__brand">ПластФактор</p>
        <h1 className="cover__title">{meta.title}</h1>
        <p className="cover__subtitle">{meta.subtitle}</p>
        <span className="badge badge--dark cover__badge">{meta.badge}</span>
      </div>
    </header>
  );
}
