/**
 * Creates an SVG representation of a plus sign.
 *
 * @returns { Node } A Node containing the SVG element.
 *
 * @example
 *
 * // Create the PlusSign element and append it to the DOM.
 * const PlusSign = document.createElement('div');
 * PlusSign.appendChild(createPlusSign());
 *
 * // or any other suitable location in the DOM 
 * document.body.appendChild(PlusSign); 
 */
export function createPlusSign() {
    const t = document.createElement('template')
    t.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <line x1="30" y1="50" x2="70" y2="50" stroke="black" stroke-width="10"/>
        <line x1="50" y1="30" x2="50" y2="70" stroke="black" stroke-width="10"/>
    </svg>
    `
    return t.content.cloneNode(true)
}

