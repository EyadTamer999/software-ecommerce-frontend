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



