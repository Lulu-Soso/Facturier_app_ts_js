const createPrint = (el) => {
    const print = () => {
        document.body.innerHTML = el.innerHTML;
        window.print();
        document.location.reload();
    };
    return { print };
};
export default createPrint;
