export function DialogComponent() {
	const dialog = document.createElement("dialog");
	dialog.setAttribute("close", "");
	dialog.classList.add(
		"grid",
		"place-items-center",
		"bg-primary",
		"rounded-md",
		"p-4",
		"max-w-[calc(100vw-2rem)]",
		"backdrop:bg-text/50",
	);
	const form = document.createElement("form");
	form.setAttribute("method", "dialog");
	dialog.append(form);

	return {
		element: () => {
			return dialog;
		},
		close: () => {
			dialog.close();
		},
		/**
		 * Appends an element to the form inside the dialog.
		 * @param {HTMLElement} element - The element to append to the form.
		 */
		appendToForm: (element) => {
			form.append(element);
		},
	};
}
