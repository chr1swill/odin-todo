import { AddButtonComponent } from "../buttons/AddButton";
import { HorizontalDividerComponent } from '../icons/HorizontalDivider'

/**
 *
 * @param { string } title - large h2 level text in section
 * @param { string } buttonText - text that wil be added to the button
 *
 * */
export function TitleBar(title, buttonText) {
	const container = document.createElement("div");
	container.className = "flex flex-row content-between";

	const h2 = document.createElement("h2");
	h2.className = "text-text font-bold text-2xl";
	h2.textContent = title;

	const addButton = AddButtonComponent(buttonText);

	const hr = HorizontalDividerComponent()

	container.appendChild(h2);
	container.appendChild(addButton);
	container.appendChild(hr);

	return container;
}
