import { HasHTMLFormat } from "../interfaces/HasHTMLFormat.js";
import { HasRender } from "../interfaces/HasRender.js";
import { HasPrint } from "../interfaces/HasPrints.js";
import createDatas from "./createDatas.js";
import createDisplay from "./createDisplay.js";
import createPrint from "./createPrint.js";

const createFormInput = () => {
  // Sélection des éléments du formulaire
  const form = document.getElementById("form") as HTMLFormElement;
  const type = document.getElementById("type") as HTMLSelectElement;
  const firstName = document.getElementById("firstName") as HTMLInputElement;
  const lastName = document.getElementById("lastName") as HTMLInputElement;
  const address = document.getElementById("address") as HTMLInputElement;
  const country = document.getElementById("country") as HTMLInputElement;
  const town = document.getElementById("town") as HTMLInputElement;
  const zip = document.getElementById("zip") as HTMLInputElement;
  const product = document.getElementById("product") as HTMLInputElement;
  const price = document.getElementById("price") as HTMLInputElement;
  const quantity = document.getElementById("quantity") as HTMLInputElement;
  const tva = document.getElementById("tva") as HTMLInputElement;
  const docContainer = document.getElementById(
    "document-container"
  ) as HTMLDivElement;
  const hiddenDiv = document.getElementById("hiddenDiv") as HTMLDivElement;
  const btnPrint = document.getElementById("print") as HTMLButtonElement;
  const btnReload = document.getElementById("reload") as HTMLButtonElement;

  // Fonction pour récupérer et valider les données du formulaire
  const inputDatas = ():
    | [
        string,
        string,
        string,
        string,
        string,
        string,
        number,
        string,
        number,
        number,
        number
      ]
    | void => {
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
    } else {
      alert("Les valeurs numériques doivent être supérieures à 0 !");
      return;
    }
  };

  const printListener = (
    btn: HTMLButtonElement,
    docContainer: HTMLDivElement
  ) => {
    btn.addEventListener("click", () => {
      const availableDoc: HasPrint = createPrint(docContainer);
      availableDoc.print();
    });
  };

  const deleteListener = (btn: HTMLButtonElement) => {
    btn.addEventListener("click", () => {
      document.location.reload();
      window.scrollTo(0, 0);
    });
  }

  // Gestionnaire d'événements pour la soumission du formulaire
  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    const inputs = inputDatas();

    if (Array.isArray(inputs)) {
      const [
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
      ] = inputs;

      const docData: HasHTMLFormat = createDatas(
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
        new Date()
      );
      const template: HasRender = createDisplay(
        docContainer,
        hiddenDiv,
        btnPrint
      );
      template.render(docData, typeValue);
    }
  };

  // Attachement de l'événement 'submit' au formulaire
  form.addEventListener("submit", handleFormSubmit);
  printListener(
    document.getElementById("print") as HTMLButtonElement,
    document.getElementById("document-container") as HTMLDivElement
  );
  deleteListener(btnReload);

  // Retourne les éléments du formulaire pour une utilisation éventuelle
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
