/**
 *
 * Create a simple input 
 * @param { string } placeholder - the text that will appear inside an none active input
 * @param { boolean } [required=false] - if the input is required
 * */
export function DefaultInputComponent(placeholder, required = false) {
    return (
        `<input placeholder="${placeholder}" class="bg-primary py-2 px-3 text-text font-bold text-base border-none rounded-md focus:border-accent" ${required ? "required" : ""}/>`
    )
}
