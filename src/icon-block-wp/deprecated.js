import { useBlockProps } from "@wordpress/block-editor";

import * as LucideIcons from "lucide-react";

import { Icon } from "@wordpress/icons";

import { getIcon } from "./includes/get-icon.js";

const v1 = {
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
	}

const v2 = {
		attributes: {
				"icon": {
				"type": "string",
				"default": "WordPressIcon"
			},
			"size": {
				"type": "number",
				"default": 24
			},
			"iconColor": {
				"type": "string"
			},
			"iconBackgroundColor": {
				"type": "string"
			},
			"iconBackgroundColorGradient": {
				"type": "string"
			},
			"iconAlign": {
				"type": "string",
				"default": "center"
			},
			"borderRadius": { 
				"type": "number", 
				"default": 50 
			},
			"borderWidth": { 
				"type": "string", 
				"default": "0px" 
			},
			"borderColor": { 
				"type": "string", 
				"default": "" 
			},
			"borderStyle": { 
				"type": "string", 
				"default": "solid" 
			},
			"margin": {
				"type": "number",
				"default": 0
			}
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
							borderRadius: borderRadius ? `${borderRadius}%`: undefined,
							borderWidth: borderWidth || undefined,
							borderStyle: borderStyle || undefined,
							borderColor: borderColor || undefined,
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
	}

// Deprecated save versions
export const deprecated = [v2, v1];
