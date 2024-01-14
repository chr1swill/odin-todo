import { PlusSign } from '../icons/PlusSign'

/**
 * @param { string } buttonText 
 * #returns { string }
 * */
export function AddButton(buttonText) {
    return `
        <button>${PlusSign}${buttonText}</button>
    `
}
