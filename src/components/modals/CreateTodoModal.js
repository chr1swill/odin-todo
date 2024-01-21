import { DefaultInputComponent } from '../inputs/DefaultInput'
import { DefaultTextareaComponent } from '../inputs/DefaultTextarea'
import { DefaultDropdownComponent } from '../inputs/DefaultDropdown'
import { DefaultButtonComponent } from '../buttons/DefaultButton'
/**
 *
 *
 * i am broke fix my import and all other componets to return html element and not sting bc they are more flexible and useful
 * you can dom parse after the fact but you loose alot of the control you add before 
 * you can also make them in a more web component way if you want also as you create them in such way that the content you need to change is not in the string 
 * IS REAL HTML ELEMENT
 *
 * */
export function TodoModalComponent() {
    const card = document.createElement('div')
    card.classList.add('grid', 'place-items-center', 'bg-background', 'p-4', 'rounded-md', 'w-[90%]', 'max-w-[400px]') 

    card.innerHTML = ( 
        `
        ${DefaultInputComponent('Title', true)}
        ${DefaultTextareaComponent('Notes', true)}
        ${DefaultDropdownComponent('Choose Priority', ['None','Low', 'Medium', 'High'])}
        <div class="flex flex-row gap-2">
            ${DefaultButtonComponent('Cancel')}
            ${DefaultButtonComponent('Create Todo')}
        </div>
        `
    )
    const input = DefaultInputComponent('Title', true)

    const p = new DOMParser().parseFromString(input, 'text/html')
    p.addEventListener('change', (e) => {
        
    })
    const dropDown = DefaultDropdownComponent('Choose Priority', ['None','Low', 'Medium', 'High'])
    dropDown.addEventListener('change', (e) => {
        
    })
}
