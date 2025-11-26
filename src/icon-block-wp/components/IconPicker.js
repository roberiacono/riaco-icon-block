import { __ } from "@wordpress/i18n";

import { useState } from "react";

import { availableIcons } from "../../icons";

import LazyIcon from "./LazyIcon";

export default function IconPicker({ selected, onSelect }) {
	const [search, setSearch] = useState("");

	const iconNames = Object.keys(availableIcons);

	const filtered = iconNames.filter((name) =>
		name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div>
			<input
				type="text"
				placeholder={__("Search icons...", "riaco-icon-block")}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				style={{ width: "100%", padding: "6px", marginBottom: "8px" }}
			/>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
					gap: "8px",
					maxHeight: "300px",
					overflowY: "auto",
				}}
			>
				{filtered.map((name) => (
					<LazyIcon
						key={name}
						name={name}
						selected={selected}
						onSelect={onSelect}
					/>
				))}
			</div>
		</div>
	);
}
