import { ArrowComponent } from "../icons/Arrow";

/**
 * @param {HTMLSelectElement} select
 * @param {string} DROPDOWN_ID
 */
function toggleSelectVisibilty(select, DROPDOWN_ID) {
	try {
		if (!select) {
			throw new Error("Could not find select element with id: " + DROPDOWN_ID);
		}
		select.classList.toggle("hidden");
		return;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @param {HTMLButtonElement} button
 * @param {HTMLSelectElement} select
 * @param {string} DROPDOWN_ID
 */
function setButtonTextToSelectedOption(button, select, DROPDOWN_ID) {
	try {
		if (!button || !select) {
			throw new Error("Could not find button element with id: " + DROPDOWN_ID);
		}

		const selected = select.options[select.selectedIndex].textContent;
		if (!selected) {
			throw new ReferenceError(
				"Could not access the selected option as a string",
			);
		}
		button.textContent = selected;
		button.appendChild(ArrowComponent());
		select.classList.toggle("hidden");
		return;
	} catch (error) {
		console.error(error);
		return null;
	}
}

/**
 * @param {HTMLButtonElement} button
 * @param {HTMLSelectElement} select
 * @param {string} DROPDOWN_ID
 */
function setupButton(button, select, DROPDOWN_ID) {
	const toggleListner = () => toggleSelectVisibilty(select, DROPDOWN_ID);
	button?.addEventListener("click", toggleListner);

	const observer = new MutationObserver((mutations) => {
		let i = 0;
		while (i < mutations.length) {
			if (!document.body.contains(button)) {
				button.removeEventListener("click", toggleListner);
				observer.disconnect();
				break;
			}
			i++;
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * @param {HTMLButtonElement} button
 * @param {HTMLSelectElement} select
 * @param {string} DROPDOWN_ID
 */
function setupSelect(button, select, DROPDOWN_ID) {
	const buttonUpdateListener = () =>
		setButtonTextToSelectedOption(button, select, DROPDOWN_ID);
	select?.addEventListener("change", buttonUpdateListener);

	const observer = new MutationObserver((mutations) => {
		let i = 0;
		while (i < mutations.length) {
			if (!document.body.contains(select)) {
				select.removeEventListener("change", buttonUpdateListener);
				observer.disconnect();
				break;
			}
			i++;
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

/**
 *
 * Creates a dropdown HTML element
 *
 * @param { string } buttonTitle - initital text that will appear in the button
 * @param { string[] } options - options that will be displayed in select element
 * @returns {{ element: () => HTMLDivElement, selectElement: () => HTMLSelectElement, buttonElement: () => HTMLButtonElement} | null} The dropdown component with methods to access its HTML elements.
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
		const DROPDOWN_ID = (Date.now() + Math.random()).toString();

		/**@type {HTMLSelectElement}*/
		const select = document.createElement("select");
		select.setAttribute("data-dropdown", DROPDOWN_ID);
		select.classList.add(
			"hidden",
			"bg-background",
			"hover:bg-secondary",
			"py-2",
			"px-3",
			"text-text",
			"font-bold",
			"text-base",
			"border-none",
			"rounded-md",
			"absolute",
			"top-[calc(100%-10px)]",
			"right-3",
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
		button.setAttribute("data-toggle-button", DROPDOWN_ID);
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

		const buttonAndSelectWrapper = document.createElement("div");
		buttonAndSelectWrapper.className = "w-full h-auto relative";
		buttonAndSelectWrapper.appendChild(select);
		buttonAndSelectWrapper.appendChild(button);

		const container = document.createElement("div");
		container.classList.add("w-full", "grid", "place-items-center");
		container.appendChild(buttonAndSelectWrapper);

		if (!button) {
			throw new ReferenceError(
				"Could not access button element inside of dropdown",
			);
		}
		setupButton(button, select, DROPDOWN_ID);

		if (!select) {
			throw new ReferenceError(
				"Could not access select element inside of dropdown",
			);
		}
		setupSelect(button, select, DROPDOWN_ID);

		return {
			element: () => container,
			selectElement: () => select,
			buttonElement: () => button,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}
