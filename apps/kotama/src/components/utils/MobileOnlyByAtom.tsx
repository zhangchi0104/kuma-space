/** @format */
"use client";
import { useIsMobile } from "@/src/lib/hooks/viewports";
import { FC, PropsWithChildren } from "react";
import { useIsClient } from "usehooks-ts";

const MobileOnlyByAtom: FC<PropsWithChildren> = ({ children }) => {
  const isClient = useIsClient();

  const isMobile = useIsMobile();

  if (!isClient) return null;

  if (!isMobile) return null;

  return children;
};
export default MobileOnlyByAtom;
