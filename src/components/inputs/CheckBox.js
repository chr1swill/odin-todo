/**
 * TODO:
 * Setup the this function to do something like:
 * change state in localStorage,
 * if complete remove from storage,
 * then reRender list of todo
 *
 * this show happen in time out to change sure it was not just checked accidentally
 */
function handleInputStateChange() {
	console.log(
		"CheckBox input state changed TODO: set upt logic to handle input being checked",
	);
}

/**
 * @param {HTMLInputElement} input
 */
function setupInput(input) {
	const handleStateChange = () => handleInputStateChange();
	input?.addEventListener("change", handleStateChange);

	const observer = new MutationObserver((mutation) => {
		let i = 0;
		while (i < mutation.length) {
			if (!document.body.contains(input)) {
				input.removeEventListener("change", handleStateChange);
				observer.disconnect();
				break;
			}
			i++;
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

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

	setupInput(input);

	label.append(input, span);

	return {
        element: label,
        input: input,
    }
}
