/**@param { HTMLTextAreaElement } textarea */
function autoResizeTextAreaHeight(textarea) {
	textarea.style.height = "auto";
	textarea.style.height = textarea.scrollHeight + "px";
}

/**@param { HTMLTextAreaElement } textarea */
function setupTextarea(textarea) {
	const resizeListener = () => autoResizeTextAreaHeight(textarea);

	// Add event listener
	textarea.addEventListener("input", resizeListener);

	// Monitor for removal of the textarea
	const observer = new MutationObserver((mutations) => {
		let i = 0;
		while (i < mutations.length) {
			if (!document.body.contains(textarea)) {
				textarea.removeEventListener("input", resizeListener);
				observer.disconnect();
				break;
			}
			i++;
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * @typedef { "XS" | "SM" | "BASE" | "LG" | "XL" | "TWOXL" | "THREEXL" } TextSizeType
 * @typedef { "LIGHT" | "NORMAL" | "MEDIUM" | "SEMIBOLD" | "BOLD" | "EXTRABOLD" } FontWeightType
 */

/**
 * @param { string | null } textareaText
 * @param { string } todoPropertyName
 * @param { TextSizeType } [textSizeInInput="BASE"] - default is TextSize.BASE
 * @param { FontWeightType } [fontWeightForInput="MEDIUM"] - default is FontWeight.MEDIUM
 * @param { boolean } [required=true] - should the textarea be required or not
 */
export function FakeTextTextareaComponent(
	textareaText,
	todoPropertyName,
	textSizeInInput = "BASE",
	fontWeightForInput = "MEDIUM",
	required = true,
) {
	try {
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
		const span = document.createElement("span");
		const textarea = document.createElement("textarea");
		if (!label || !span || !textarea) {
			throw new Error(
				"Could not create element for fakeTextTextAreaComponent: investigate cause of error",
			);
		}

		label.className = "min-h-[30px] w-full";

		span.className = "sr-only hidden";
		span.textContent = `Add a text for the ${todoPropertyName} of the todo`;

		if (required) {
			textarea.setAttribute("required", "");
		}
		textarea.rows = 1;
		textarea.className = `w-full bg-transparent focus-visible:outline-none ${TextSize[textSizeInInput]} ${FontWeight[fontWeightForInput]}`;
		textarea.value = textareaText || "";

		setupTextarea(textarea);

		label.appendChild(span);
		label.appendChild(textarea);

		return {
            element: label, 
            textarea: textarea,
        }
	} catch (error) {
		console.error(error);
		return null;
	}
}
