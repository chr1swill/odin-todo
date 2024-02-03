/**
 * @typedef { "XS" | "SM" | "BASE" | "LG" | "XL" | "TWOXL" | "THREEXL" } TextSizeType
 * @typedef { "LIGHT" | "NORMAL" | "MEDIUM" | "SEMIBOLD" | "BOLD" | "EXTRABOLD" } FontWeightType
 */

/**
 * @param { string | null } inputText
 * @param { string } todoPropertyName
 * @param { TextSizeType } [textSizeInInput="BASE"] - default is TextSize.BASE
 * @param { FontWeightType } [fontWeightForInput="MEDIUM"] - default is FontWeight.MEDIUM
 * @param { boolean } [required=true] - should the input be required or not
 */
export function FakeTextInputComponent(
	inputText,
	todoPropertyName,
	textSizeInInput = "BASE",
	fontWeightForInput = "MEDIUM",
	required = true,
) {
	/**
	 * Mapping for Tailwind text sizes.
	 * @enum {string}
	 */
	const TextSize = {
		XS: "text-xs",
		SM: "text-sm",
		BASE: "text-base",
		LG: "text-lg",
		XL: "text-xl",
		TWOXL: "text-2xl",
		THREEXL: "text-3xl",
	};

	/**
	 *
	 * Mapping for Tailwind font weights.
	 * @enum {string}
	 */
	const FontWeight = {
		LIGHT: "font-light",
		NORMAL: "font-normal",
		MEDIUM: "font-medium",
		SEMIBOLD: "font-semibold",
		BOLD: "font-bold",
		EXTRABOLD: "font-extrabold",
	};

	const label = document.createElement("label");
	label.className = "min-h-[30px] w-full";

	const span = document.createElement("span");
	span.className = "sr-only hidden";
	span.textContent = `Add a text for the ${todoPropertyName} of the todo`;

	const input = document.createElement("input");
	if (required) {
		input.setAttribute("required", "");
	}
	input.type = "text";
	input.className = `w-full bg-transparent focus-visible:outline-none ${TextSize[textSizeInInput]} ${FontWeight[fontWeightForInput]}`;
	input.value = inputText || "";

	label.appendChild(span);
	label.appendChild(input);

	return {
        element: label,
        input: input,
    }
}
