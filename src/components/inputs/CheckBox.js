/**
 * @param { boolean } [isDisabled=false] - choose state: clickable or non-clickable checkbox
 * @param { boolean } [isChecked=false] - choose state: checked or not checked
 * */
export function CheckBoxComponent(isDisabled = false, isChecked = false) {
	const label = document.createElement("label");
	label.className = "custom-checkbox-wrapper";

	const input = document.createElement("input");
	input.className = "form-checkbox";
	input.type = "checkbox";

	const span = document.createElement("span");

	if (isDisabled) {
		input.setAttribute("disabled", "");
		span.className = "disabled-indicator";
	} else {
		span.className = "custom-checkbox-indicator";
	}

	if (isChecked) {
		input.setAttribute("checked", "");
	}

	input.addEventListener("change", (e) => {
		e.preventDefault();
		span.classList.value = `${span.classList.value === "disabled-indicator" ? "custom-checkbox-indicator" : "disabled-indicator"}`;
	});

	label.append(input, span);

	return label;
}
