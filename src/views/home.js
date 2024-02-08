import { TitleBar } from "../components/sections/TitleBar";
import { RenderTodosFromStorage } from "../components/sections/Todo";
import { ListModalComponet } from "../components/modals/CreateListModal";
import { TodoModalComponent } from "../components/modals/CreateTodoModal";
import { ActionBarComponent } from "../components/buttons/ActionBar";

export function RenderHomePage() {
	try {
		const fragment = document.createDocumentFragment();

		const titleBar = TitleBar("All Todos");
		if (!titleBar) {
			throw new Error(
				"Could not create a title for page, creation of element return a null",
			);
		}
		fragment.appendChild(titleBar);
		const todosInLocalStorage = RenderTodosFromStorage();
		if (!todosInLocalStorage) {
			throw new Error(
				"Could not render Todo from storage, an error occurs in the process",
			);
		}

		const todoContainer = document.createElement("div");
		todoContainer.setAttribute("id", "homePageTodoListContainer");
		todoContainer.appendChild(todosInLocalStorage);

		fragment.appendChild(todoContainer);
		// TODO: section to show my active list
		fragment.appendChild(ActionBarComponent());
		fragment.appendChild(ListModalComponet());

		const todoModal = TodoModalComponent(todoContainer.id);
		if (!todoModal) {
			throw new ReferenceError(
				"Todo modal was not create: the value of the component is undefined",
			);
		}

		fragment.appendChild(todoModal);

		const sectionContent = document.createElement("section");
		sectionContent.className = "w-full";
		sectionContent.appendChild(fragment);

		return sectionContent;
	} catch (error) {
		console.error(error);
	}
}
