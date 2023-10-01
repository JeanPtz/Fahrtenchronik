import { getBackendUrl } from "./BaseUrl"

interface SearchPageProps {
    name: string;
    licensePlate: string;
    startDate: string;
    endDate: string;
}

export async function searchRoutes(event: React.MouseEvent<HTMLButtonElement>, props: SearchPageProps) {
    event.preventDefault();
    const { name, licensePlate, startDate, endDate } = props;

    try {
        const response = await fetch(`${getBackendUrl()}/search`, {
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                kind: "user-login",
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
