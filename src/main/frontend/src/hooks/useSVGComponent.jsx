import React from "react";
import { ReactComponent as LongSleeve } from "../assets/imgs/clothes/longSleeve.svg";
import { ReactComponent as Hat } from "../assets/imgs/clothes/hat.svg";
import { ReactComponent as Muffler } from "../assets/imgs/clothes/muffler.svg";
import { ReactComponent as Sleeveless } from "../assets/imgs/clothes/sleeveless.svg";
import { ReactComponent as TShirt } from "../assets/imgs/clothes/tShirt.svg";
import { ReactComponent as Umbrella } from "../assets/imgs/clothes/umbrella.svg";
import { ReactComponent as Coat } from "../assets/imgs/clothes/coat.svg";
import { ReactComponent as Jacket } from "../assets/imgs/clothes/jacket.svg";
import { ReactComponent as PaddedJacket } from "../assets/imgs/clothes/paddedJacket.svg";
import { ReactComponent as ThinShirt } from "../assets/imgs/clothes/thinShirt.svg";
import { ReactComponent as Sweater } from "../assets/imgs/clothes/sweater.svg";
import { ReactComponent as Cardigan } from "../assets/imgs/clothes/cardigan.svg";

export default function useSVGComponent(type, height, selected) {
  const selectedColor = selected ? "#FFFFFF" : "#1E3A8A";

  let image = null;

  switch (type) {
    case "민소매":
      image = <Sleeveless height={height} fill={selectedColor} />;
      break;
    case "반팔티":
      image = <TShirt height={height} fill={selectedColor} />;
      break;
    case "긴팔티":
      image = <LongSleeve height={height} fill={selectedColor} />;
      break;
    case "니트":
      image = <Sweater height={height} fill={selectedColor} />;
      break;
    case "얇은셔츠":
      image = <ThinShirt height={height} fill={selectedColor} />;
      break;
    case "가디건":
      image = <Cardigan height={height} fill={selectedColor} />;
      break;
    case "자켓":
      image = <Jacket height={height} fill={selectedColor} />;
      break;
    case "코트":
      image = <Coat height={height} fill={selectedColor} />;
      break;
    case "패딩":
      image = <PaddedJacket height={height} fill={selectedColor} />;
      break;
    case "우산":
      image = <Umbrella height={height} fill={selectedColor} />;
      break;
    case "목도리":
      image = <Muffler height={height} fill={selectedColor} />;
      break;
    case "모자":
      image = <Hat height={height} fill={selectedColor} />;
      break;
    default:
      image = null;
      break;
  }

  return image;
}
