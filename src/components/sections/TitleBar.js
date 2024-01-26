import { AddButtonComponent } from "../buttons/AddButton";
import { HorizontalDividerComponent } from "../icons/HorizontalDivider";

/**
 *
 * @param { string } title - large h2 level text in section
 * @param { string } buttonText - text that wil be added to the button
 *
 * */
export function TitleBar(title, buttonText) {
	const titleBarWrapper = document.createElement("div");
	titleBarWrapper.className = "grid grid-cols-1 place-content-center";

	const flexRow = document.createElement("div");
	flexRow.className = "flex flex-row place-content-between";

	const h2 = document.createElement("h2");
	h2.className = "text-text font-bold text-4xl";
	h2.textContent = title;

	const addButton = AddButtonComponent(buttonText);
	flexRow.appendChild(h2);
	flexRow.appendChild(addButton);

	const hr = HorizontalDividerComponent();

	titleBarWrapper.appendChild(flexRow);
	titleBarWrapper.appendChild(hr);

	return titleBarWrapper;
}
