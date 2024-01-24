/**
 *
 * Create a simple input
 * @param { string } placeholder - description on the input person to screen readers and inside the input
 * @param { boolean } [required=false] - if the input is required
 *
 * */
export function DefaultInputComponent(placeholder, required = false) {
	const CREATION_TIME_FOR_ID = (Date.now() + Math.random()).toString();
	const name = placeholder.toString().toLowerCase().trim().replace(/\s+/g, "-");
	const uniqueId = name + "-" + CREATION_TIME_FOR_ID;

	const label = document.createElement("label");
	label.setAttribute("for", uniqueId);
	label.className = "hidden";

	const span = document.createElement("span");
	span.className = "sr-only";
	span.textContent = name;

	const input = document.createElement("input");
	input.type = "text";
	input.id = uniqueId;
	input.className =
		"bg-primary py-2 px-3 text-text font-bold text-base border-none rounded-md max-w-[100%] focus:border-accent focus:border-2";
	if (required) {
		input.setAttribute("required", "");
	}

	label.appendChild(span);
	label.appendChild(input);

	return {
		element: () => label,
		value: () => input.value,
	};
}
