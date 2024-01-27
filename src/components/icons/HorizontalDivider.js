/**
 * @param {number} [borderThickness=2] 
 */
export function HorizontalDividerComponent(borderThickness = 2) {
    if (typeof borderThickness !== 'number') {
        borderThickness = 2
    }
    const hr = document.createElement('hr')
    hr.className = `border border-text border-${borderThickness} rounded my-4 w-full`

    return hr.cloneNode(true)
}
