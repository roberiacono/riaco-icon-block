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
		iconLink,
		iconLinkOpenInNewTab,
		iconNofollow,
		padding
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			textAlign: iconAlign,
		},
	});

	const iconColorVal = iconColor || "var(--wp--preset--color--foreground)";

	const iconMarkup = (
		<div
			class="icon-wrapper"
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
			<Icon
				icon={getIcon(attributes.icon)}
				color={attributes.iconColor}
				size={attributes.size}
			/>
		</div>
	);

	return (
		<div {...blockProps}>
			{iconLink ? (
				<a
					href={iconLink}
					{...(iconLinkOpenInNewTab && { target: "_blank" })}
					{...((iconLinkOpenInNewTab || iconNofollow) && {
        rel: [
            iconNofollow ? "nofollow" : "",
            iconLinkOpenInNewTab ? "noopener noreferrer" : ""
        ]
            .join(" ")
            .trim()
    })}
				>
					{iconMarkup}
				</a>
			) : (
				iconMarkup
			)}
		</div>
	);
}
