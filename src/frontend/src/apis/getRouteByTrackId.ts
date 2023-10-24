import { getBackendUrl } from "./BaseUrl"

interface Route{
    latitude: number,
    longitude: number
}

export async function getRouteByTrackId(trackId: string): Promise<Route[]> {

    try {
        const response = await fetch(`${getBackendUrl()}/track-id-routes`, {
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