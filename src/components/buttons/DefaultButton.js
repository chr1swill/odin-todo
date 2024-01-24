/**
 * @param { string } text - string you would like to display inside the button
 * @param { string } [type=""] - type attribute of button
 * @param { string } [formName=""] - to be passed to the form and value attributes
 * */
export function DefaultButtonComponent(text, type = "", formName = "") {
	const button = document.createElement("button");
	button.className =
		"flex flex-row items-center gap-1 bg-primary rouned-md py-2 px-3 text-text font-bold text-base";
    button.textContent = text
    
    switch (type.trim().toLowerCase()) {
        case "submit":
            button.type = "submit";
            break
        case "reset":
            button.type = "reset";
            break
        default: 
            button.type = "button";
    }

    if (formName.toString().trim() !== "") {
        const form = formName.toString().trim().toLowerCase().replace(/\s+/g, "-");
        button.setAttribute("form", form);
        button.setAttribute("value", form);
    }

	return button;
}
