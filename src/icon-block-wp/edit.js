/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";

import {
	PanelBody,
	RangeControl,
	BorderBoxControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import IconPicker from "./components/IconPicker";

import { Icon } from "@wordpress/icons";

import { getIcon } from "./includes/get-icon.js";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		icon,
		size,
		iconColor,
		iconBackgroundColor = null,
		iconBackgroundColorGradient = null,
		iconAlign,
		borderRadius = 0, // default circle
		borderWidth , // default no border
		borderColor, // default no border color
		borderStyle, // default border style
		padding,
	} = attributes;

	const blockProps = useBlockProps({
		style: {
			textAlign: iconAlign,
		},
	});

	const iconJSX = getIcon(icon);

	const iconColorVal = iconColor || "var(--wp--preset--color--foreground)";

	console.log('attributes', attributes);

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={iconAlign}
					onChange={(newAlign) => setAttributes({ iconAlign: newAlign })}
					label={__("Icon Alignment", "riaco-icon-block")}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__("Icon Picker", "riaco-icon-block")}>
					<IconPicker
						selected={icon}
						onSelect={(name) => setAttributes({ icon: name })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<div className="full-width-control-wrapper">
					<PanelColorGradientSettings
						title={__("Icon Colors", "riaco-icon-block")}
						initialOpen={true}
						settings={[
							{
								colorValue: iconColor,
								onColorChange: (color) => setAttributes({ iconColor: color }),
								label: __("Icon Color", "riaco-icon-block"),
							},
							{
								colorValue: iconBackgroundColor,
								gradientValue: iconBackgroundColorGradient,
								onColorChange: (value) => {
									setAttributes({ iconBackgroundColor: value });
								},
								onGradientChange: (value) => {
									setAttributes({ iconBackgroundColorGradient: value });
								},
								label: __("Background Color", "riaco-icon-block"),
							},
						]}
					/>
				</div>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__("Size", "riaco-icon-block")}>
					<RangeControl
						label={__("Icon Size", "riaco-icon-block")}
						value={size}
						onChange={(value) => setAttributes({ size: value })}
						min={8}
						max={256}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__("Padding", "riaco-icon-block")}>
					<RangeControl
						label={__("Padding", "riaco-icon-block")}
						value={padding}
						onChange={(value) => setAttributes({ padding: value })}
						min={0}
						max={256}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody title={__("Border", "riaco-icon-block")}>
					<div className="full-width-control-wrapper">
						<BorderBoxControl
							label={__("Border", "riaco-icon-block")}
							value={{
								width: borderWidth,
								color: borderColor,
								style: 'solid',
							}}
							enableStyle={false}
							onChange={(newValues) => {
								setAttributes({
									borderWidth: newValues.width ?? '',
									borderColor: newValues.color ?? '',
									borderStyle: newValues.style ?? '',
								});
							}}
							__next40pxDefaultSize={true}
						/>
					</div>
					<div className="full-width-control-wrapper">
						<RangeControl
							label={__("Border Radius", "riaco-icon-block")}
							value={borderRadius}
							onChange={(value) => setAttributes({ borderRadius: value })}
							min={0}
							max={100} // percentage
						/>
					</div>
				</PanelBody>
			</InspectorControls>
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
		</>
	);
}
