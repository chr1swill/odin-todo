import { RenderNavBar } from "../buttons/PageLink";
import { HorizontalDividerComponent } from "../icons/HorizontalDivider";

/**
 *
 * @param { string } title - large h2 level text in section
 *
 * */
export function TitleBar(title) {
	try {
		const titleBarWrapper = document.createElement("div");
		titleBarWrapper.className = "grid grid-cols-1 place-content-center";

		const flexRow = document.createElement("div");
		flexRow.className = "flex flex-row place-content-between gap-4";

		const h2 = document.createElement("h2");
		h2.className = "text-text font-bold text-4xl w-full";
		h2.textContent = title;

		const navBar = RenderNavBar();
		if (!navBar) {
			throw new ReferenceError(
				"An attempt to access a rendered nav bar resulted in a null value",
			);
		}
		flexRow.appendChild(h2);
		flexRow.appendChild(navBar);

		const hr = HorizontalDividerComponent(4);

		titleBarWrapper.appendChild(flexRow);
		titleBarWrapper.appendChild(hr);

		return titleBarWrapper;
	} catch (error) {
		console.error(error);
		return null;
	}
}
