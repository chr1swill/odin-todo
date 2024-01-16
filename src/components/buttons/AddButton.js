import { PlusSign } from '../icons/PlusSign';

/**
 * @param { string } buttonText
 * #returns { string }
 * */
export function AddButton(buttonText) {
  return `<button class="bg-primary py-2 px-3 text-text font-bold text-base">${PlusSign}${buttonText}</button>`;
}
