const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";


export const getAllProducts = async () => {
    const response = await fetch(BASE_URL + "/getAllProducts",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            return response.json();
        }
        );
    return response;
}

export const getPopularProducts = async () => {
    const response = await fetch(BASE_URL + "/getTopProducts",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log(response);
            return response.json();
        }
        );
    return response;
}

export const getTopOffers = async () => {
    const response = await fetch(BASE_URL + "/getTopOffers",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            return response.json();
        }
        );
    return response;
}

