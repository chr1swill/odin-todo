import { PlusSignComponent } from "../icons/PlusSign";

/**
 * @param { string } buttonText
 * */
export function AddButtonComponent(buttonText) {
	const button = document.createElement("button");
	button.className =
		"flex flex-row items-center gap-1 bg-primary py-2 px-3 text-text font-bold text-base whitespace-normal";
	button.appendChild(PlusSignComponent());
	button.appendChild(document.createTextNode(buttonText));
	return button;
}
