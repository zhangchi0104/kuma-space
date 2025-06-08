/** @format */

import { signOut } from "../../actions";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import ProfileIcon from "../ProfileIcon";
import type { BaseStyleProps } from "@/src/lib/typings";
type ProfileProps = {
	name: string;
	avatarUrl: string;
} & BaseStyleProps;
const Profile: React.FC<ProfileProps> = ({ name, avatarUrl, className }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ProfileIcon name={name} avatarUrl={avatarUrl} className={className} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2">
				<DropdownMenuItem>
					<form
						action={async () => {
							"use server";
							await signOut();
						}}
					>
						<button type="submit" className="flex items-center gap-2">
							<span>
								<ExitIcon />
							</span>
							Sign Out
						</button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
Profile.displayName = "Profile";
export default Profile;
