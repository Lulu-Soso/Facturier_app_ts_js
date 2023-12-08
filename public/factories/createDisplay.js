import createStorage from "../factories/createStorage.js";
const createDisplay = (container, hiddenDiv, btnPrint) => {
    const formContainer = document.getElementById("form-container");
    const render = (docObj, docType) => {
        const htmlString = docObj.htmlFormat();
        container.innerHTML = htmlString;
        createStorage(docType, htmlString);
        if (docType === "invoice") {
            btnPrint.innerText = "Imprimer la facture";
        }
        else {
            btnPrint.innerText = "Imprimer le devis";
        }
        hiddenDiv.classList.remove("invisible");
        // formContainer.classList.add("invisible"); 
        formContainer.innerHTML = "";
    };
    return { render };
};
export default createDisplay;
