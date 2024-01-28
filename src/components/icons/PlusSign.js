export function PlusSignComponent() {
	const template = document.createElement("template");
	template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="20 20 60 60"><line x1="30" y1="50" x2="70" y2="50" class="stroke-text" stroke-width="14" stroke-linecap="round"/><line x1="50" y1="30" x2="50" y2="70" class="stroke-text" stroke-width="14" stroke-linecap="round"/></svg>`;
	return template.content.cloneNode(true);
}
