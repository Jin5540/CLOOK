import sun from "../assets/imgs/sun.png";
import noCloudNightBackground from "../assets/imgs/noCloudNightBackground.png";
import noCloudAfternoonBackground from "../assets/imgs/noCloudAfternoonBackground.png";
import character1 from "../assets/imgs/character1.png";

export function getWweatherImages(type, value) {
  let image = null;

  if (type === 1) {
    switch (value) {
      // background
      case "구름없는낮":
        image = noCloudAfternoonBackground;
        break;
      case "구름없는밤":
        image = noCloudNightBackground;
        break;
      case "구름많은낮":
        image = noCloudNightBackground;
        break;
      case "구름많은밤":
        image = noCloudNightBackground;
        break;
      case "눈오는흐린배경":
        image = noCloudNightBackground;
        break;
      case "비오는흐린배경":
        image = noCloudNightBackground;
        break;
      case "흐린회색배경":
        image = noCloudNightBackground;
        break;
      default:
        image = noCloudNightBackground;
        break;
    }
  } else if (type === 2) {
    // character
    switch (value) {
      // background
      case "1":
        image = character1; // 기본A타입
        break;
      case "2":
        image = character1; // 기본B타입
        break;
      case "3":
        image = character1; // 더워하는
        break;
      case "4":
        image = character1; // 추워하는
        break;
      default:
        image = character1;
        break;
    }
  } else if (type === 3) {
    // icon
    switch (value) {
      case "해":
        image = sun;
        break;
      case "비":
        image = sun;
        break;
      case "눈":
        image = sun;
        break;
      case "진눈깨비":
        image = sun;
        break;
      case "달":
        image = sun;
        break;
      case "구름":
        image = sun;
        break;
      case "해구름":
        image = sun;
        break;
      case "달구름":
        image = sun;
        break;
      default:
        image = sun;
        break;
    }
  }

  return image;
}
