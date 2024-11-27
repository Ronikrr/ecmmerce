// apiService.js
export const fetchData = async (endpoint) => {
    const accessToken = localStorage.getItem('access_token');

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
        // Handle error (e.g., redirect to login if unauthorized)
    }
};
