import { getBackendUrl } from "./BaseUrl"

interface Routes{
    id: string
}

export async function getTrackIdByLicensePlate(licensePlate: string): Promise<Routes[]> {

    try {
        const response = await fetch(`${getBackendUrl()}/license-plate-routes`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                licensePlate: licensePlate,
            }),
            method: "POST"
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