import { AddButton } from '../buttons/AddButton'

/**@param { string } title 
 * @param { string } buttonText
 * @returns { string }
 * */
export function TitleBar(title, buttonText) {
    return `<div class="flex flex-row"><h2 class="text-text font-bold text-2xl">${title}</h2>${AddButton(buttonText)}</div><hr class="border-text border-t-2 my-4">`
}
