export function DialogComponent() {
	const dialog = document.createElement("dialog");
	dialog.classList.add(
        "hidden",
		"grid",
		"place-items-center",
		"bg-backgroud",
        "border",
        "border-4",
        "border-text",
		"rounded-md",
		"p-4",
		"max-w-[calc(100vw-2rem)]",
	);
	const form = document.createElement("form");
    form.className = "grid grid-cols-1 gap-3 place-items-center"
	form.setAttribute("method", "dialog");
	form.setAttribute("autofocus", "");
	dialog.append(form);

	return {
		element: () => {
			return dialog;
		},
		close: () => {
            dialog.classList.remove('hidden')
			dialog.close();
		},
        show: () => {
            dialog.classList.add('hidden')
            dialog.showModal()
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
