import { getBackendUrl } from "./BaseUrl"

export async function searchRoute(name: string, licensePlate: string, startDate: string, endDate: string) {

    try {
        const response = await fetch(`${getBackendUrl()}/search`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                name: name,
                licensePlate: licensePlate,
                startDate: startDate,
                endDate: endDate,
            }),
            method: "POST"
        });

        if (response.status >= 400) {
            throw response.status.toString();
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error in searchRoute:", error);
        throw error;
    }
}
