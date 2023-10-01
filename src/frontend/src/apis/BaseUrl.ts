export function getBackendUrl(): string {
    if (process.env.NODE_ENV === 'development')
        return "http://localhost:5000"
    else
        return "https://gpx-api.jptz.de"
}