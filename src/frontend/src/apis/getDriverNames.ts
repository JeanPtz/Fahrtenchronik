import { getBackendUrl } from "./BaseUrl"

interface DriverName{
   full_name : string
}

export async function getDriverNames(): Promise<DriverName[]> {

    try {
        const response = await fetch(`${getBackendUrl()}/names`, {
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