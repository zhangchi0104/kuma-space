/** @format */

import clsx from "clsx";

import { BaseStyleProps } from "@/src/utils/typings";
import HeroContent from "./_internals";
import TrailingText from "./_internals/TrailingText";

const HeroSection: React.FC<BaseStyleProps> = ({ className }) => {
  return (
    <HeroSectionContainer className={className}>
      <HeroContent className="flex-1" />
      <TrailingText className="self-center pb-4" />
    </HeroSectionContainer>
  );
};

const HeroSectionContainer: React.FC<
  React.PropsWithChildren<BaseStyleProps>
> = ({ children, className }) => {
  const classNames = clsx("flex flex-col mx-auto min-safe-h-screen", className);
  return <div className={classNames}>{children}</div>;
};
export default HeroSection;
