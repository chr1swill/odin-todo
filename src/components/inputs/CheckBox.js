
/**
 * @param { boolean } [isDisabled=false] - choose state: clickable or non-clickable checkbox
 * @param { boolean } [isChecked=false] - choose state: pre-added check indicator(checked) or empty checkbox(unchecked)
 * */
export function CheckBoxComponent(isDisabled = false, isChecked = false) {
	const label = document.createElement("label");
	label.className = "custom-checkbox-wrapper";

	const input = document.createElement("input");
	input.className = "form-checkbox";
	input.type = "checkbox";

	const span = document.createElement("span");
	span.className = "custom-checkbox-indicator";

	if (isDisabled) {
		input.setAttribute("disabled", "");
	}
	if (isChecked) {
		input.setAttribute("checked", "");
	}

	label.append(input, span);

	return {
        element: label,
        input: input,
    }
}
