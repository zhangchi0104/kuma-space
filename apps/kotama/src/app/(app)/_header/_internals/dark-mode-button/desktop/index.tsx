/** @format */

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import DarkModeButtonContent from "./content";
import DarkModeTrigger from "./trigger";
import type { BaseStyleProps } from "@/src/lib/typings";
const DesktopDarkModeToggle: React.FC<BaseStyleProps> = ({ className }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<DarkModeTrigger className={className} />
			</DropdownMenuTrigger>
			<DarkModeButtonContent />
		</DropdownMenu>
	);
};
export default DesktopDarkModeToggle;
