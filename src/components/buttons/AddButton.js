import { PlusSign } from '../icons/PlusSign';

/**
 * @param { string } buttonText
 * #returns { string }
 * */
export function AddButton(buttonText) {
  return `<button class="text-text bg-primary py-1 px-2">${PlusSign}${buttonText}</button>`;
}
