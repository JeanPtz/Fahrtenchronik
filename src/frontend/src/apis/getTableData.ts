import { getBackendUrl } from "./BaseUrl"

export async function getRouteData(trackId: number) {

    try {
        const response = await fetch(`${getBackendUrl()}/route-data`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                track_id: trackId,
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

export async function getDriverData() {

    try {
        const response = await fetch(`${getBackendUrl()}/driver-data`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                name: name,
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