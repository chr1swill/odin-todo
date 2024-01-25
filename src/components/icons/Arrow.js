export function ArrowComponent() {
	const template = document.createElement("template");
	template.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><!-- Arrow Line --><line x1="10" y1="25" x2="90" y2="25" class="stroke-text" stroke-width="2" stroke-linecap="round" /><!-- Arrow Head --><line x1="80" y1="15" x2="90" y2="25" class="stroke-text" stroke-width="2" stroke-linecap="round" /><line x1="80" y1="35" x2="90" y2="25" class="stroke-text" stroke-width="2" stroke-linecap="round" /></svg>`;
	return template.content.cloneNode(true);
}
