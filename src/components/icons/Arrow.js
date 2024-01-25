export function ArrowComponent() {
    const template = document.createElement("template");
    template.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="20 20 60 60">
        <!-- Arrow Line -->
        <line x1="30" y1="50" x2="70" y2="50" class="stroke-text" stroke-width="14" stroke-linecap="round" />
        <!-- Arrow Head -->
        <line x1="60" y1="40" x2="70" y2="50" class="stroke-text" stroke-width="14" stroke-linecap="round" />
        <line x1="60" y1="60" x2="70" y2="50" class="stroke-text" stroke-width="14" stroke-linecap="round" />
    </svg>`;
    return template.content.cloneNode(true);
}
