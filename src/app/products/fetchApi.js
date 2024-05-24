const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";


export const getAllProducts = async () => {
    const response = await fetch(BASE_URL + "/getAllProducts",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.json();
}

export const getPopularProducts = async () => {
    const response = await fetch(BASE_URL + "/getTopProducts",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.json();
}

export const getTopOffers = async () => {
    const response = await fetch(BASE_URL + "/getTopOffers",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
    return response.json();
}


export const getProductById = async (id) => {
    try {
        const response = await fetch(BASE_URL + "/getProduct/" + id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}
