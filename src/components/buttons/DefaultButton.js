/**
 * @param { string } text - string you would like to display inside the button
 * @param { string } [type=""] - type attribute of button
 * @param { string } [form=""] - form attribute of button
 * @param { string } [value=""] - value attribute of button
 * */
export function DefaultButtonComponent(text, type = "", value = "", form = "") {
    return `<button class="flex flex-row items-center gap-1 bg-primary rouned-md py-2 px-3 text-text font-bold text-base" form="${form}" value="${value}" type="${type}">${text}</button>`
}
