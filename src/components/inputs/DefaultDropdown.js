import { ArrowComponent } from "../icons/Arrow";

/**
 *
 * Creates a dropdown HtML element
 *
 * @param { string } buttonTitle - initital text that will appear in the button
 * @param { string[] } options - options that will be displayed in select element
 *
 * @example
 * const dropdown = DefaultDropdownComponent("Select an option", ["Option 1", "Option 2", "Option 3"]);
 * document.body.appendChild(dropdown); // or you could do...
 *
 * const dropdown = DefaultDropdownComponent("Select an option", ["Option 1", "Option 2", "Option 3"]);
 * const div = document.createElement("div");
 * div.textContent = `${otherCustomComponents}dropdown.toString()`
 */
export function DefaultDropdownComponent(buttonTitle, options) {
	try {
		const CREATION_TIME_FOR_ID = (Date.now() + Math.random()).toString();

		/**@type {HTMLSelectElement}*/
		const select = document.createElement("select");
		select.setAttribute("data-dropdown", CREATION_TIME_FOR_ID);
		select.classList.add(
			"hidden",
			"bg-background",
			"py-2",
			"px-3",
			"text-text",
			"font-bold",
			"text-base",
			"border-none",
			"rounded-md",
			"absolute",
			"top-full",
			"left-0",
			"z-10",
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
            "items-center",
            "justify-center",
            "gap-2",
            "w-full",
			"content-between",
			"bg-background",
			"hover:bg-secondary",
			"rounded-md",
			"py-2",
			"px-5",
			"text-text",
			"font-bold",
			"text-base",
			"z-0",
		);
		button.textContent = buttonTitle;
		button.appendChild(ArrowComponent());

		const container = document.createElement("div");
		container.classList.add("w-full", "grid", "place-items-center");
		container.appendChild(button);
		container.appendChild(select);

		if (button) {
			button?.addEventListener("click", (e) => {
				e.preventDefault();
				try {
					if (!select) {
						throw new Error(
							"Could not find select element with id: " + CREATION_TIME_FOR_ID,
						);
					}
					select.classList.toggle("hidden");

					return;
				} catch (error) {
					console.error(error);
				}
			});
		}

		if (select) {
			select?.addEventListener("change", (e) => {
				e.preventDefault();
				try {
					if (!button || !select) {
						throw new Error(
							"Could not find button element with id: " + CREATION_TIME_FOR_ID,
						);
					}
					const selected = select.options[select.selectedIndex].textContent;
					if (selected) {
						button.textContent = selected;
						button.appendChild(ArrowComponent());
					}

					return;
				} catch (error) {
					console.error(error);
				}
			});
		}

		return {
			element: () => container,
			selectElement: () => select,
		};
	} catch (error) {
		console.error(error);
	}
}
