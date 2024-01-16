/**@param { boolean } isDisabled - choose state: clickable or non-clickable checkbox
 * @param { boolean } isChecked - choose state: checked or not checked
 * */
export function CheckBox(isDisabled, isChecked = false) {
	return isDisabled
		? `<label class="custom-checkbox-wrapper">
     <input class="form-checkbox" type="checkbox" disabled />
     <span class="disabled-indicator"></span>
   </label>`
		: `<label class="custom-checkbox-wrapper">
     <input class="form-checkbox" type="checkbox" ${isChecked ? "checked" : ""}/>
     <span class="custom-checkbox-indicator" ></span>
   </label>`;
}
