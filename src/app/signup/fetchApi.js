export const HandleSignup = async (data) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL
    try {
        const response = await fetch(`${apiUrl}/auth-gateway/verify`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};