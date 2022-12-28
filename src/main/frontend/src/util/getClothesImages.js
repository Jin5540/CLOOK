import { ReactComponent as LongSleeve } from "../assets/imgs/clothes/longSleeve.svg";
import { ReactComponent as Hat } from "../assets/imgs/clothes/hat.svg";
import { ReactComponent as Muffler } from "../assets/imgs/clothes/muffler.svg";
import { ReactComponent as Sleeveless } from "../assets/imgs/clothes/sleeveless.svg";
import { ReactComponent as TShirt } from "../assets/imgs/clothes/tShirt.svg";
import { ReactComponent as Umbrella } from "../assets/imgs/clothes/umbrella.svg";

export function getClothesImages(type, height, selected) {
  if (!type || !height) return;

  const mainColor = selected ? "#FFFFFF" : "#1E3A8A";
  // const subColor = selected ? "#1E3A8A" : "#FFFFFF";

  let image = null;

  switch (type) {
    case "반팔티":
      image = <TShirt height={height} fill={mainColor} />;
      break;
    case "민소매":
      image = <Sleeveless height={height} fill={mainColor} />;
      break;
    case "긴팔티":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "니트":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "얇은셔츠":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "가디건":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "자켓":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "코트":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "패딩":
      image = <LongSleeve height={height} fill={mainColor} />;
      break;
    case "우산":
      image = <Umbrella height={height} fill={mainColor} />;
      break;
    case "목도리":
      image = <Muffler height={height} fill={mainColor} />;
      break;
    case "모자":
      image = <Hat height={height} fill={mainColor} />;
      break;
    default:
      image = null;
      break;
  }

  return image;
}
