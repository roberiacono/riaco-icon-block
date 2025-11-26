import { useBlockProps } from "@wordpress/block-editor";
import { Icon } from "@wordpress/icons";

import { getIcon } from "./includes/get-icon.js";

export default function save({ attributes }) {
	const {
		icon,
		size,
		iconColor,
		iconBackgroundColor = null,
		iconBackgroundColorGradient = null,
		iconAlign,
		borderRadius = 50, // default circle
		borderWidth, // default no border
		borderColor, // default no border color
		borderStyle, // default border style
		padding
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			textAlign: iconAlign,
		},
	});

	const iconJSX = getIcon(icon);

	const iconColorVal = iconColor || "var(--wp--preset--color--foreground)";

	return (
		<div {...blockProps}>
			<div
				className="icon-wrapper"
				style={{
					background: iconBackgroundColor || iconBackgroundColorGradient,
					width: size,
					height: size,
					display: "inline-block",
					color: iconColorVal,
					borderRadius: `${borderRadius}%`,
					borderWidth: borderWidth,
					borderStyle: borderStyle,
					borderColor: borderColor,
					padding: padding+'px' ?? '',
				}}
			>
				{icon && iconJSX && (
					<Icon
						icon={iconJSX}
						{...(!iconJSX.props?.stroke ? { fill: iconColorVal } : {})}
						color={iconColorVal}
						size={size}
					/>
				)}
			</div>
		</div>
	);
}
