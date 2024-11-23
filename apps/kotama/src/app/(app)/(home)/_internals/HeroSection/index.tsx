/** @format */

import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseStyleProps } from "@/src/utils/typings";
import HeroContent from "./HeroContent";
import TrailingText from "./TrailingText";

const HeroSection: React.FC<BaseStyleProps> = ({ className }) => {
  return (
    <HeroSectionContainer className={className}>
      <HeroContent className="flex-1" />
      <TrailingText className="self-center pb-4" />
    </HeroSectionContainer>
  );
};

const HeroSectionContainer: React.FC<PropsWithChildren<BaseStyleProps>> = ({
  children,
  className,
}) => {
  const classNames = clsx("flex flex-col mx-auto safe-h-screen", className);
  return <div className={classNames}>{children}</div>;
};
export default HeroSection;
