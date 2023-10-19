import { getBackendUrl } from "./BaseUrl"

export async function getLicensePlate() {

    try {
        const response = await fetch(`${getBackendUrl()}/license-plate`, {
            headers: { "content-type": "application/json" },
            method: "GET"
        })
        if (response.status >= 400) {
            throw response.status.toString();
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}