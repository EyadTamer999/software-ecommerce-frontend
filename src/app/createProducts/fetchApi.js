const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product"

export const creatProduct = async (product) => {

    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("discount", product.discount);
    formData.append("description", product.description);
    formData.append("images", product.images);
    formData.append("buyPrice", product.buyPrice);
    formData.append("rentPrice", product.rentPrice);
    formData.append("availability", product.availability);
    formData.append("stock", product.stock);
    formData.append("specifications", product.specifications);


    const response = await fetch(BASE_URL + "/createProduct",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData
        }).then((response) => {
            return response.json();
        }
        );
    return response;
}