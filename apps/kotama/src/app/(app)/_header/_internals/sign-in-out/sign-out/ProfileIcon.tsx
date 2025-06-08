/** @format */

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/src/components/ui/avatar";
import { cn } from "@/src/lib/shadcn";
import type { BaseStyleProps } from "@/src/lib/typings";
type ProfileIconProps = {
	name: string;
	avatarUrl: string;
} & BaseStyleProps;
const ProfileIcon = ({ name, avatarUrl, className }: ProfileIconProps) => {
	return (
		<Avatar className={cn("w-10 h-10", className)}>
			<AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
			<AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
		</Avatar>
	);
};
ProfileIcon.displayName = "ProfileIcon";
export default ProfileIcon;
