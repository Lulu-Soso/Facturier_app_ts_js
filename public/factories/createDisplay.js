// import { Storage } from "../classes/Storage.js";
const createDisplay = (container, hiddenDiv, btnPrint) => {
    const formContainer = document.getElementById("form-container");
    const render = (docObj, docType) => {
        const htmlString = docObj.htmlFormat();
        container.innerHTML = htmlString;
        // new Storage(docType, htmlString);
        if (docType === "invoice") {
            btnPrint.innerText = "Imprimer la facture";
        }
        else {
            btnPrint.innerText = "Imprimer le devis";
        }
        hiddenDiv.classList.remove("invisible");
        formContainer.innerHTML = "";
    };
    return { render };
};
export default createDisplay;
