/**
 *
 * Create a simple input 
 * @param { string } placeholder - the text that will appear inside an none active input
 * @param { boolean } [required=false] - if the input is required
 * */
export function DefaultTextareaComponent(placeholder, required = false) {
    const name = placeholder.toLowerCase().trim().replace(" ", "-");
    return (
        `<label for="${name}" class="hidden">${placeholder}</label>
        <textarea name="${name}" class="bg-primary py-2 px-3 text-text font-bold text-base border-none rounded-md max-w-[100%] h-auto focus:border-accent focus:border-2" ${required ? "required" : ""}>
            ${placeholder}
        </textarea>`
    )
}
