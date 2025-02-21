/** @format */

import { BaseStyleProps } from "@/src/utils/typings";
import clsx from "clsx";
import PortraitImage from "./portrait-image";
import TextSection from "./text-section";
import SocialIcons from "./social-icons";

const HeroContent: React.FC<BaseStyleProps> = ({ className }) => {
  const mobileStyle = clsx("justify-center", "flex-col");
  const desktopStyle = clsx("sm:justify-between sm:flex-row-reverse");
  const textAnimationDuartion = 3;
  const socialIconAnimationsDuration = 0.4;
  const classNames = clsx(
    "flex flex-grow flex-1 items-center",
    mobileStyle,
    desktopStyle,
    className,
  );
  return (
    <div className={classNames}>
      <div>
        <PortraitImage />
      </div>
      <div className="mt-8">
        <TextSection duration={textAnimationDuartion} />
        <SocialIcons
          duration={socialIconAnimationsDuration}
          delay={textAnimationDuartion}
        />
      </div>
    </div>
  );
};
export default HeroContent;
