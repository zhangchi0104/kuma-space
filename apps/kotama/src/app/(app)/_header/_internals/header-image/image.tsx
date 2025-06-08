/** @format */
import Image from "next/image";
import config from "~/config";
import { FC } from "react";
import clsx from "clsx";

const HeaderImage: FC<{ className?: string }> = ({ className }) => (
	<Image
		src={"/images/aris-halo.png"}
		alt="profile image in header bar"
		width={32}
		height={32}
		className={clsx("rounded-full", className)}
	/>
);
export default HeaderImage;
