export function HorizontalDividerComponent() {
    const hr = document.createElement('hr')
    hr.className =  "border border-text border-2 rounded my-4 w-full"

    return hr.cloneNode(true)
}
