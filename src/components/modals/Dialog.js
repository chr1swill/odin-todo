/**
 * @param {string} idOfDialogElement
 * @returns {null|void}
 */
export function showModal(idOfDialogElement) {
	try {
		/**@type{ HTMLElement | null }*/
		const dialog = document.getElementById(`${idOfDialogElement}`);
		if (!dialog) {
			throw new ReferenceError(
				`Could not find element with id given id in the Dom, id: ${idOfDialogElement}`,
			);
		}

		if (!(dialog instanceof HTMLDialogElement)) {
			throw new TypeError(
				`The provide id does not corrisponde to an element in the DOM that is of type HTMLDialogElement: id ${idOfDialogElement}`,
			);
		}

		dialog.classList.remove("hidden");
		dialog.show();
	} catch (error) {
		console.error(error);
	}
}

/**
 * @param {string} idOfDialogElement
 * @returns {null|void}
 */
export function closeDialog(idOfDialogElement) {
	try {
		/**@type { HTMLElement | null }*/
		const dialog = document.getElementById(idOfDialogElement);
		if (!dialog) {
			throw new ReferenceError(
				`Could not find element with id given id in the Dom, id: ${idOfDialogElement}`,
			);
		}

		if (!(dialog instanceof HTMLDialogElement)) {
			throw new TypeError(
				`The provide id does not corrisponde to an element in the DOM that is of type HTMLDialogElement: id ${idOfDialogElement}`,
			);
		}

		dialog.classList.add("hidden");
		dialog.close();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function DialogComponent() {
	const dialog = document.createElement("dialog");
	dialog.classList.add(
		"hidden",
		"fixed",
		"top-1/2",
        "bottom-1/2",
		"grid",
		"place-items-center",
		"bg-backgroud",
		"border",
		"border-4",
		"border-text",
		"rounded-md",
		"p-4",
	);
	const form = document.createElement("form");
	form.className = "grid grid-cols-1 gap-3 place-items-center";
	form.setAttribute("method", "dialog");
	form.setAttribute("autofocus", "");
	dialog.append(form);

	return {
		element: () => {
			return dialog;
		},
		closeDialog: () => {
			dialog.classList.add("hidden");
			dialog.close();
		},
		showDialog: () => {
			dialog.classList.remove("hidden");
			dialog.show();
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
