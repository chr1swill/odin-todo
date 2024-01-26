import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { DialogComponent, showListModal } from "./Dialog";
import { List } from "../../logic/list";

export function ListModalComponet() {
	const cancelBtn = DefaultButtonComponent("Cancel");
	const createBtn = DefaultButtonComponent("Create List", "submit", "sumbit");

	const btnContainer = document.createElement("div");
	btnContainer.className = "w-full grid grid-cols-2 gap-3";
	btnContainer.append(cancelBtn, createBtn);

	const input = DefaultInputComponent("List Name", true);

	const dialog = DialogComponent();
	dialog.element().setAttribute("id", "listModal");
	dialog.appendToForm(input.element());
	dialog.appendToForm(btnContainer);

	cancelBtn.addEventListener("click", (e) => {
		e.preventDefault();

		/**@type { HTMLDialogElement | null }*/
		const dialog = document.querySelector("#listModal");
		if (!dialog) {
			console.error('Could not find element with the id: "listModal"');
			return;
		}

		dialog.classList.add("hidden");
		dialog.close();
	});

	createBtn.addEventListener("click", (e) => {
		e.preventDefault();
		try {
			const listName = input.value();
			if (listName) {
				new List(listName);

                showListModal()
			}
			throw new Error("List was not created: Could not access list name");
		} catch (error) {
			console.error(error);
		}
	});

	return dialog.element();
}
