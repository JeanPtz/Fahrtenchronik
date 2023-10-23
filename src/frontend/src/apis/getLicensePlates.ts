import { getBackendUrl } from "./BaseUrl"

interface Vehicle{
    id: number
    license_plate: string
}

export async function getLicensePlate(): Promise<Vehicle[]> {

    try {
        const response = await fetch(`${getBackendUrl()}/license-plates`, {
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