const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function fetchPantries() {
    try {
        const response = await fetch(`${API_BASE}/pantries`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch pantries");
        }

        console.log("Pantries fetched", data);
        return data;

    } catch (err) {
        console.error("fetchPantries error:", err);
        throw err;
    }
};


export { fetchPantries };