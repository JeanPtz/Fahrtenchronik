import { getBackendUrl } from "./BaseUrl"

interface TableData{
    milage: number
    avg_speed: number
    duration: number
    time_error: boolean
}

export async function getRouteData(trackId: string): Promise<TableData> {

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

export async function getDriverData(license_plate: string): Promise<TableData> {

    try {
        const response = await fetch(`${getBackendUrl()}/driver-data`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                license_plate: license_plate,
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