import { ArrowComponent } from "../icons/Arrow";

/**
 *
 * Creates a dropdown HtML element
 *
 * @param { string } buttonTitle - initital text that will appear in the button
 * @param { string[] } options - array of options
 *
 * @example 
 * const dropdown = DefaultDropdownComponent("Select an option", ["Option 1", "Option 2", "Option 3"]);
 * document.body.appendChild(dropdown);
 *
 * //or
 *
 * const dropdown = DefaultDropdownComponent("Select an option", ["Option 1", "Option 2", "Option 3"]);
 * const div = document.createElement("div");
 * div.innerHTML = `${otherCustomComponents} dropdown.toString()`
 */
export function DefaultDropdownComponent(buttonTitle, options) {
	const CREATION_TIME_FOR_ID = (Date.now() + Math.random()).toString();

	const select = document.createElement("select");
	select.setAttribute("data-dropdown", CREATION_TIME_FOR_ID);
	select.classList.add(
		"hidden",
		"bg-primary",
		"py-2",
		"px-3",
		"text-text",
		"font-bold",
		"text-base",
		"border-none",
		"rounded-md",
		"w-auto",
		"h-auto",
		"focus:border-accent",
		"focus:border-1",
	);

	for (let i = 0; i < options.length; i++) {
		const optionEl = document.createElement("option");
		optionEl.value = options[i].toLowerCase().trim().replace(/\s+/g, "-");
		optionEl.textContent = options[i];
		select.appendChild(optionEl);
	}

	const button = document.createElement("button");
	button.setAttribute("data-toggle-button", CREATION_TIME_FOR_ID);
	button.classList.add(
		"flex",
		"flex-row",
		"items-center",
		"content-between",
		"gap-1",
		"bg-primary",
		"max-w-[100%]",
		"hover:bg-secondary",
		"rounded-md",
		"py-2",
		"px-3",
		"text-text",
		"font-bold",
		"text-base",
	);
	button.innerHTML = `${buttonTitle}${ArrowComponent()}`;

	const container = document.createElement("div");
	container.classList.add("max-w-[100%]");

	container.appendChild(button);
	container.appendChild(select);

	document
		.querySelector(`[data-toggle-button="${CREATION_TIME_FOR_ID}]"`)
		?.addEventListener("click", (e) => {
			e.preventDefault();
			try {
				const dropdown = document.querySelector(
					`[data-dropdown="${CREATION_TIME_FOR_ID}]"`,
				);
				if (dropdown) {
					dropdown.classList.toggle("hidden");
					return;
				}
				throw new Error(
					"Could not find dropdown element with id: " + CREATION_TIME_FOR_ID,
				);
			} catch (error) {
				console.error(error);
			}
		});

	document
		.querySelector(`[data-dropdown="${CREATION_TIME_FOR_ID}]"`)
		?.addEventListener("change", (e) => {
			e.preventDefault();
			try {
				const button = document.querySelector(
					`[data-toggle-button="${CREATION_TIME_FOR_ID}]"`,
				);

				/** @type { HTMLSelectElement | null} */
				const select = document.querySelector(
					`[data-dropdown="${CREATION_TIME_FOR_ID}"]`,
				);
				if (button && select) {
					button.textContent =
						select.options[select.selectedIndex].textContent + ArrowComponent();
					return;
				}
				throw new Error(
					"Could not find button element with id: " + CREATION_TIME_FOR_ID,
				);
			} catch (error) {
				console.error(error);
			}
		});

	return container;
}
