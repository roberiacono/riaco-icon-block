import parse from "html-react-parser";
import { SVG, Path } from "@wordpress/primitives";
import { domToReact } from "html-react-parser";

const normalizeAttribs = (attribs = {}) => {
	const fixed = {};

	for (const [key, value] of Object.entries(attribs)) {
		let newKey = key;

		// Convert dashed SVG attributes to camelCase
		if (newKey.includes("-")) {
			newKey = newKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
		}

		// Rename class → className
		if (newKey === "class") newKey = "className";

		fixed[newKey] = value;
	}

	return fixed;
};

export const parseIcon = (icon) => {
	return parse(icon.trim(), {
		replace: ({ name, attribs, children }) => {
			if (!attribs) return;

			const props = normalizeAttribs(attribs);

			if (name === "svg") return <SVG {...props}>{domToReact(children)}</SVG>;
			if (["path", "line", "circle", "rect", "polygon"].includes(name))
				return <Path {...props} />;
		},
	});
};
