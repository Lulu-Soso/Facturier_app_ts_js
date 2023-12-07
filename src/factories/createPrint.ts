import { HasPrint } from "../interfaces/HasPrints.js";

const createPrint = (el: HTMLDivElement): HasPrint => {
    const print = (): void => {
        document.body.innerHTML = el.innerHTML;
        window.print();
        document.location.reload();
    }

    return { print }
}

export default createPrint;