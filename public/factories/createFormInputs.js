import createDatas from "./createDatas.js";
import createDisplay from "./createDisplay.js";
import createPrint from "./createPrint.js";
const createFormInput = () => {
    const form = document.getElementById("form");
    const type = document.getElementById("type");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const country = document.getElementById("country");
    const town = document.getElementById("town");
    const zip = document.getElementById("zip");
    const product = document.getElementById("product");
    const price = document.getElementById("price");
    const quantity = document.getElementById("quantity");
    const tva = document.getElementById("tva");
    const docContainer = document.getElementById("document-container");
    const hiddenDiv = document.getElementById("hiddenDiv");
    const storedEl = document.getElementById("stored-data");
    const btnPrint = document.getElementById("print");
    const btnReload = document.getElementById("reload");
    const btnStoredInvoices = document.getElementById("stored-invoices");
    const btnStoredEstimates = document.getElementById("stored-estimates");
    const inputDatas = () => {
        const typeValue = type.value;
        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;
        const addressValue = address.value;
        const countryValue = country.value;
        const townValue = town.value;
        const zipValue = zip.valueAsNumber;
        const productValue = product.value;
        const priceValue = price.valueAsNumber;
        const quantityValue = quantity.valueAsNumber;
        const tvaValue = tva.valueAsNumber;
        if (zipValue > 0 && priceValue > 0 && quantityValue > 0 && tvaValue > 0) {
            return [
                typeValue,
                firstNameValue,
                lastNameValue,
                addressValue,
                countryValue,
                townValue,
                zipValue,
                productValue,
                priceValue,
                quantityValue,
                tvaValue,
            ];
        }
        else {
            alert("Les valeurs numériques doivent être supérieures à 0 !");
            return;
        }
    };
    const printListener = (btn, docContainer) => {
        btn.addEventListener("click", () => {
            const availableDoc = createPrint(docContainer);
            availableDoc.print();
        });
    };
    const deleteListener = (btn) => {
        btn.addEventListener("click", () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    };
    const getStoredDocListeners = () => {
        btnStoredInvoices.addEventListener("click", () => getItems("invoice"));
        btnStoredEstimates.addEventListener("click", () => getItems("estimate"));
    };
    const getItems = (docType) => {
        if (storedEl.hasChildNodes()) {
            storedEl.innerHTML = "";
        }
        const array = localStorage.getItem(docType);
        if (array) {
            const arrayData = JSON.parse(array);
            if (arrayData.length > 0) {
                arrayData.forEach((doc) => {
                    const card = document.createElement("div");
                    const cardBody = document.createElement("div");
                    card.classList.add("card", "mt-5");
                    cardBody.classList.add("card-body");
                    cardBody.innerHTML = doc;
                    card.appendChild(cardBody);
                    storedEl.appendChild(card);
                });
            }
            else {
                storedEl.innerHTML = "<div class='p-5'>Aucune data disponible !</div>";
            }
        }
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const inputs = inputDatas();
        if (Array.isArray(inputs)) {
            const [typeValue, firstNameValue, lastNameValue, addressValue, countryValue, townValue, zipValue, productValue, priceValue, quantityValue, tvaValue,] = inputs;
            const docData = createDatas(typeValue, firstNameValue, lastNameValue, addressValue, countryValue, townValue, zipValue, productValue, priceValue, quantityValue, tvaValue, new Date());
            const template = createDisplay(docContainer, hiddenDiv, btnPrint);
            template.render(docData, typeValue);
        }
    };
    // Listeners
    form.addEventListener("submit", handleFormSubmit);
    printListener(document.getElementById("print"), document.getElementById("document-container"));
    deleteListener(btnReload);
    getStoredDocListeners();
    return {
        form,
        type,
        firstName,
        lastName,
        address,
        country,
        town,
        zip,
        product,
        price,
        quantity,
        tva,
    };
};
export default createFormInput;
