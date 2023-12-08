import { HasSetItem } from "../interfaces/HasSetItem.js";

const createStorage = (typeVal: string, htmlString: string): HasSetItem => {
  
  const checkLocalStorage = (): void => {
    if (localStorage.getItem("invoice") === null) {
      localStorage.setItem("invoice", "[]");
    }
    if (localStorage.getItem("estimate") === null) {
      localStorage.setItem("estimate", "[]");
    }
  };

  const setItem = (typeVal: string, htmlString: string): void => {
    let array: string | null;
    array = localStorage.getItem(typeVal);
    if (array !== null) {
      const oldData = JSON.parse(array);
      oldData.push(htmlString);
      localStorage.setItem(typeVal, JSON.stringify(oldData));
    } else {
      document.location.reload();
    }
  };

  // Initialisation
  checkLocalStorage();
  setItem(typeVal, htmlString);

  return { setItem };
};

export const checkLocalStorage = (): void => {
  if (localStorage.getItem("invoice") === null) {
    localStorage.setItem("invoice", "[]");
  }
  if (localStorage.getItem("estimate") === null) {
    localStorage.setItem("estimate", "[]");
  }
};

export default createStorage;
