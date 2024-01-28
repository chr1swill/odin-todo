import { PlusSignComponent } from "../icons/PlusSign";

/**
 * @param { string } buttonText
 * */
export function AddButtonComponent(buttonText) {
	const button = document.createElement("button");
	button.className =
		"flex flex-row place-content-center place-items-center gap-2 bg-primary hover:bg-secondary transition ease-out duration-1 p-1 text-text font-bold text-base rounded";

	const iconWrapper = document.createElement("span");
	iconWrapper.className = "";
	iconWrapper.appendChild(PlusSignComponent());

	const textWrapper = document.createElement("span");
	textWrapper.className = "";
	textWrapper.textContent = buttonText;

	button.appendChild(iconWrapper);
	button.appendChild(textWrapper);

	return button;
}
