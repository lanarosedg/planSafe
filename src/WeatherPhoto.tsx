import ExtremeHeat from './assets/extreme-heat.png';
import Sunny from './assets/sunny.png';
import Cloud from './assets/cloud.png';
import Rain from './assets/rain.png';
import Windy from './assets/windy.png';
import Flood from './assets/flood.png';

type WeatherCondition = 'ExtremeHeat' | 'Sunny' | 'Cloud' | 'Rain' | 'Windy' | 'Flood';

const weatherImages: Record<WeatherCondition, string> = {
  ExtremeHeat,
  Sunny,
  Cloud,
  Rain,
  Windy,
  Flood,
};

function WeatherPhoto({ condition }: { condition: WeatherCondition }) {
  const imageSrc = weatherImages[condition];

  return (
    <div className="weatherContainer">
      <img className="weatherPhoto" src={imageSrc} />
    </div>
  );
}

export default WeatherPhoto;
