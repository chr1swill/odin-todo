export function HorizontalDividerComponent() {
    const hr = document.createElement('hr')
    hr.className =  "border-text border-t-2 my-4"

    return hr.cloneNode(true)
}
