import { getBackendUrl } from "./BaseUrl";

export async function uploadGpxFile(gpxFile: FormData) {
    try {
        const response = await fetch(`${getBackendUrl()}/upload-gpx-file`, {
            method: "POST",
            body: gpxFile,
        });

        if (response.status >= 400) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
}
