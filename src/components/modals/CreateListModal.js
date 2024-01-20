import { DefaultInputComponent } from "../inputs/DefaultInput";
import { DefaultButtonComponent } from "../buttons/DefaultButton";
import { List } from "../../logic/list";

export function ListModalComponet() {
	const cancelBtn = document.createElement("div");
	const createBtn = document.createElement("div");

	cancelBtn.innerHTML = DefaultButtonComponent("Cancel");
	createBtn.innerHTML = DefaultButtonComponent(
		"Create List",
		"submit",
		"sumbit",
	);

	cancelBtn.addEventListener("click", (e) => {
		e.preventDefault();
		cancelBtn?.closest("dialog")?.close();
	});

	createBtn.addEventListener("click", (e) => {
		e.preventDefault();
		try {
			const listName = createBtn?.parentElement?.closest("input")?.value;
			if (listName) {
				new List(listName);
				createBtn?.closest("dialog")?.close();
			}
            createBtn?.closest("dialog")?.close();
			throw new Error("List was not created: Could not access list name");
		} catch (error) {
			console.error(error);
		}
	});

	return `<dialog close class="bg-primary rounded-md p-5 max-w-[calc(100vw-2rem)] backdrop:bg-text/50">
            <form method="dialog">
                ${DefaultInputComponent("List Name", true)}
                <div class="grid grid-col-2 gap-3">
                    ${cancelBtn}
                    ${createBtn}
                </div>
            </form>
        </dialog>`;
}
