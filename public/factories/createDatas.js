const createDatas = (documentType, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date) => {
    const subtotal = (price, quantity, tva) => {
        const tvaPercent = tva / 100;
        const totalTva = price * tvaPercent;
        return (price + totalTva) * quantity;
    };
    const htmlFormat = () => {
        const totalPrice = subtotal(price, quantity, tva);
        return `
        <div class="row p-5">
            <div class="col-md-6">
                <h2 class="text-left">LOGO</h2>
            </div>
            <div class="col-md-6 text-right">
                <p class="font-weight-bold mb-1">${documentType === "invoice" ? "Facture" : "Devis"} <span class="font-weight-normal"> N° ${Math.floor(Math.random() * 101)}</span></p>
                <p class="font-weight-bold mb-1">Date <span class="font-weight-normal">${date.toLocaleDateString()}</span></p>
            </div>
        </div>
        
        <div class="row pb-5 p-5">
            <div class="col-sm-6 text-left">
                <p class="font-weight-bold">Entreprise de Toto</p>
                <p class="mb-1">22 boulevard Moe Szyslak</p>
                <p>75008 - Paris</p>
                <p class="mb-1">Tél: 00.00.00.00.00</p>
            </div>
        
            <div class="col-sm-6 text-right">
                <p class="font-weight-bold">Informations du client</p>
                <p class="mb-1">Mr/Mme ${firstName} ${lastName}</p>
                <p class="mb-1">${address}</p>
                <p>${zip}</p>
                <p>${town}</p>
                <p>${country}</p>
            </div>
        </div>
        
        <div class="row p-5">
            <div class="col-md-12">
                <table class="table">
                <thead>
                    <tr>
                    <th class="border-0 text-uppercase small font-weight-bold">Produit/Service</th>
                    <th class="border-0 text-uppercase small font-weight-bold">Prix unitaire HT</th>
                    <th class="border-0 text-uppercase small font-weight-bold">Quantité</th>
                    <th class="border-0 text-uppercase small font-weight-bold">Total HT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>${product}</td>
                    <td>${price} € HT</td>
                    <td>${quantity}</td>
                    <td>${price * quantity} € HT</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        
        <div class="d-flex flex-row-reverse bg-light p-4">
            <div class="py-3 px-5">
                <div class="mb-2">TOTAL TTC</div>
                <div class="h2 font-weight-light"> ${totalPrice.toFixed(2)} €</div>
            </div>
        </div>
        `;
    };
    return { htmlFormat };
};
export default createDatas;
