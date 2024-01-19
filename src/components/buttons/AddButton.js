import { PlusSignComponent } from '../icons/PlusSign';

/**
 * @param { string } buttonText
 * #returns { string }
 * */
export function AddButtonComponent(buttonText) {
  return `<button class="flex flex-row items-center gap-1 bg-primary py-2 px-3 text-text font-bold text-base">${PlusSignComponent()}${buttonText}</button>`;
}
