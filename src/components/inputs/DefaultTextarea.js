/**
 *
 * Create a simple textarea
 * @param { string } placeholder - the text that will appear inside an none active textarea
 * @param { boolean } [required=false] - whether input is required or not
 *
 * */
export function DefaultTextareaComponent(placeholder, required = false) {
	const CREATION_TIME_FOR_ID = (Date.now() + Math.random()).toString();
	const name = placeholder.toString().toLowerCase().trim().replace(/\s+/g, "-");
	const uniqueId = name + "-" + CREATION_TIME_FOR_ID;

	const label = document.createElement("label");
	label.setAttribute("for", uniqueId);
	label.className = "hidden";

	const span = document.createElement("span");
	span.className = "sr-only";
	span.textContent = name;

	const textarea = document.createElement("textarea");
	textarea.id = uniqueId;
	textarea.className =
		"bg-primary py-2 px-3 text-text font-bold text-base border-none rounded-md max-w-[100%] focus:border-accent focus:border-2";
	if (required) {
		textarea.setAttribute("required", "");
	}

	label.appendChild(span);
	label.appendChild(textarea);

	return {
		element: () => label,
		value: () => textarea.value,
	};
}
