import { AddButtonComponent } from '../buttons/AddButton'

/**@param { string } title 
 * @param { string } buttonText
 * @returns { string }
 * */
export function TitleBar(title, buttonText) {
    return `<div class="flex flex-row content-between"><h2 class="text-text font-bold text-2xl">${title}</h2>${AddButtonComponent(buttonText)}</div><hr class="border-text border-t-2 my-4">`
}
