const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";
const token = localStorage.getItem('token');


export const getMyReviews = async () => {
    try {
        const response = await fetch(BASE_URL + "/getUserReviews",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const deleteReview = async (reviewId) => {
    try {
        const response = await fetch(BASE_URL + "/deleteUserReview",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: reviewId })
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const updateReview = async (productId, review) => {
    console.log("productId", productId, "review", review);

    try {
        const response = await fetch(BASE_URL + "/updateUserReview",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, review })
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}