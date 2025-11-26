import { availableIcons } from "../../icons";
import { isString } from "lodash";
import { parseIcon } from "./parse-icon.js";

export function getIcon(name) {
	let icon = availableIcons[name];

	// to keep backward compatibility with names ending with "Icon" for Lucide Icons.
	// TODO: remove this in future major release.
	if (!icon) {
		name = name.replace("Icon", "");
		icon = availableIcons[name];
	}

	if (!icon) return null; // handle missing icons safely

	// If it’s a string, parse it into JSX
	return isString(icon) ? parseIcon(icon) : icon;
}
