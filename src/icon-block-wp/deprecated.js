import { useBlockProps } from "@wordpress/block-editor";

import * as LucideIcons from "lucide-react";

import { Icon } from "@wordpress/icons";

import { getIcon } from "./includes/get-icon.js";

// Deprecated save versions
export const deprecated = [
	{
		attributes: {
			icon: { type: "string" },
			size: { type: "number" },
			iconColor: { type: "string" },
			iconBackgroundColor: { type: "string" },
			iconBackgroundColorGradient: { type: "string" },
			iconAlign: { type: "string" },
		},
		save: ({ attributes }) => {
			const {
				icon,
				size,
				iconColor,
				iconBackgroundColor,
				iconBackgroundColorGradient,
				iconAlign,
			} = attributes;

			const blockProps = useBlockProps.save({
				style: { textAlign: iconAlign },
			});

			const IconComponent = LucideIcons[icon];

			return (
				<div {...blockProps}>
					<div
						style={{
							color: iconColor || "inherit",
							backgroundColor: iconBackgroundColor || "transparent",
							background: iconBackgroundColorGradient || "transparent",
							display: "inline-block",
						}}
					>
						{IconComponent && <IconComponent size={size} />}
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			icon: { type: "string" },
			size: { type: "number" },
			iconColor: { type: "string" },
			iconBackgroundColor: { type: "string" },
			iconBackgroundColorGradient: { type: "string" },
			iconAlign: { type: "string" },
			borderRadius :  {"type": "number"}, 
			borderWidth :{ 
			"type": "string", 
		}, 
			borderColor : { 
			"type": "string", 

		}, 
			borderStyle: { 
			"type": "string", 
		},
		},
		save: ({ attributes }) => {
			const {
				icon,
				size,
				iconColor,
				iconBackgroundColor,
				iconBackgroundColorGradient,
				iconAlign,
				borderRadius ,
				borderWidth,
				borderColor ,
				borderStyle ,
			} = attributes;

			const blockProps = useBlockProps.save({
				style: { textAlign: iconAlign },
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
		},
	},
];
