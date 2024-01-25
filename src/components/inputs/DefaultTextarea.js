/**
 *
 * Create a simple textarea
 * @param { string } placeholder - the text that will appear inside an none active textarea
 * @param { boolean } [required=false] - whether input is required or not
 *
 * */
export function DefaultTextareaComponent(placeholder, required = false) {
	const CREATION_TIME_FOR_ID = (Date.now() + Math.random()).toString();
	const name = placeholder.toString().trim().replace(/\s+/g, "-");
	const uniqueId = name.toLowerCase() + "-" + CREATION_TIME_FOR_ID;

	const label = document.createElement("label");
    label.className = "w-full"
	label.setAttribute("for", uniqueId);

	const span = document.createElement("span");
	span.className = "sr-only w-full";
	span.textContent = name;

	const textarea = document.createElement("textarea");
	textarea.id = uniqueId;
    textarea.placeholder = name
	textarea.className =
		"w-full bg-background py-2 px-3 text-text font-bold text-base border-none rounded-md max-w-[100%] focus:border-accent focus:border-2 placeholder:text-text";
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
