const createStorage = (typeVal, htmlString) => {
    const oldData = [];
    const checkLocalStorage = () => {
        if (localStorage.getItem("invoice") === null) {
            localStorage.setItem("invoice", "[]");
        }
        if (localStorage.getItem("estimate") === null) {
            localStorage.setItem("estimate", "[]");
        }
    };
    const setItem = (type, htmlStr) => {
        let array;
        array = localStorage.getItem(type);
        if (array !== null) {
            const data = JSON.parse(array);
            data.push(htmlStr);
            localStorage.setItem(type, JSON.stringify(data));
        }
        else {
            document.location.reload();
        }
    };
    // Initialisation
    checkLocalStorage();
    setItem(typeVal, htmlString);
    return { setItem };
};
// Exportez également checkLocalStorage séparément pour une utilisation externe
export const checkLocalStorage = () => {
    if (localStorage.getItem("invoice") === null) {
        localStorage.setItem("invoice", "[]");
    }
    if (localStorage.getItem("estimate") === null) {
        localStorage.setItem("estimate", "[]");
    }
};
export default createStorage;
