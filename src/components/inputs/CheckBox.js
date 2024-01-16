/**@param { boolean } isDisabled - choose state: clickable or non-cliable checkbox*/
export function CheckBox(isDisabled) {
  return `<label class="custom-checkbox-wrapper">
            <input class="form-checkbox" type="checkbox" ${isDisabled ? 'disabled' : '' } />
            <span class="custom-checkbox-indicator ${isDisabled ? 'disabled-indicator' : '' }"></span>
          </label>`;
}
