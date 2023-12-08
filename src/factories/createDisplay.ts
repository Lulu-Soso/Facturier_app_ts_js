import { HasHTMLFormat } from "../interfaces/HasHTMLFormat.js";
import { HasRender } from "../interfaces/HasRender.js";
import createStorage from "../factories/createStorage.js";

const createDisplay = (
    container: HTMLDivElement,
    hiddenDiv: HTMLDivElement,
    btnPrint: HTMLButtonElement
): HasRender => {
    const formContainer: HTMLDivElement = document.getElementById("form-container") as HTMLDivElement;

    const render = (docObj: HasHTMLFormat, docType: string): void => {
        const htmlString: string = docObj.htmlFormat();
        container.innerHTML = htmlString;

        createStorage(docType, htmlString);

        if (docType === "invoice") {
            btnPrint.innerText = "Imprimer la facture";
        } else {
            btnPrint.innerText = "Imprimer le devis";
        }

        hiddenDiv.classList.remove("invisible");
        formContainer.innerHTML = "";
    };

    return { render };
};

export default createDisplay;
