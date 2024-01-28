export function showListModal() {
	try {
		/**@type{ HTMLDialogElement | null }*/
		const dialog = document.querySelector("#listModal");
		if (!dialog) {
			throw new ReferenceError(
				"Was not able to show dialog element: could not find id listModal",
			);
		}

        dialog.classList.remove('hidden')
		dialog.show();
	} catch (error) {
		console.error(error);
	}
}

export function showTodoModal() {
	try {
		/**@type{ HTMLDialogElement | null }*/
		const dialog = document.querySelector("#todoModal");
		if (!dialog) {
			throw new ReferenceError(
				"Was not able to show dialog element: could not find id todoModal",
			);
		}

        dialog.classList.remove('hidden')
		dialog.show();
	} catch (error) {
		console.error(error);
	}
}

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
		closeDialog: () => {
            dialog.classList.remove('hidden')
			dialog.close();
		},
        showDialog: () => {
            dialog.classList.add('hidden')
            dialog.show()
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
