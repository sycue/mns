import { Avatar } from "@chakra-ui/react";
import { toSvg } from "jdenticon";

export default function NameAvatar({ name }) {
  const svgConfig = {
    /*
    hues: [207],
    lightness: {
      color: [0.84, 0.84],
      grayscale: [0.84, 0.84],
    },
    saturation: {
      color: 0.48,
      grayscale: 0.48,
    },
    backColor: "#2a4766",
    */
    lightness: {
      color: [0.4, 0.8],
      grayscale: [0.3, 0.9]
    },
    saturation: {
      color: 0.5,
      grayscale: 0.0
    },
    backColor: "#171923"
  };
  const svg = toSvg(name, 100, svgConfig);
  const svgUri = `data:image/svg+xml;base64,${btoa(svg)}`;

  return <Avatar borderRadius="lg" size={"xl"} alt={name} src={svgUri} />;
}
