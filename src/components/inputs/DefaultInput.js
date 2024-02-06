/**
 *
 * Create a simple input
 * @param { string } placeholder - description on the input person to screen readers and inside the input
 * @param { boolean } [required=false] - if the input is required
 * @returns {{ element: () => HTMLLabelElement, value: () => string, inputElement: () => HTMLInputElement }}
 *
 * */
export function DefaultInputComponent(placeholder, required = false) {
	const CREATION_TIME_FOR_ID = (Date.now() + Math.random()).toString();
	const name = placeholder.toString().trim()
	const uniqueId = name.toLowerCase() + "-" + CREATION_TIME_FOR_ID;

	const label = document.createElement("label");
    label.className = "w-full"
	label.setAttribute("for", uniqueId);

	const span = document.createElement("span");
	span.className = "sr-only w-full";
	span.textContent = name;

	const input = document.createElement("input");
	input.type = "text";
	input.id = uniqueId;
    input.placeholder = name
	input.className =
		"w-full bg-background py-2 px-3 text-text font-bold text-base border-none rounded-md max-w-[100%] focus:border-accent focus:border-2 placeholder:text-text";
	if (required) {
		input.setAttribute("required", "");
	}

	label.appendChild(span);
	label.appendChild(input);

	return {
		element: () => label,
		value: () => input.value,
        inputElement: () => input,
	};
}
