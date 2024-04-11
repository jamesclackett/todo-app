/// QUERY SERVICE:
// Simplifies API queries for other services and components

export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

export const API = {
    AUTH: 'http://localhost:8080/auth',
    TODO: 'http://localhost:8081/todos',
}

// creates HTTP Request and ends to the API
// Takes a HTTP method, a URL and an optional payload
export async function queryAPI(HTTP_METHOD, URL, payload = null) {
    const options = {
        method: HTTP_METHOD,
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload ? JSON.stringify(payload) : payload
    }
    const response = await fetch(URL, options);

    if (!response.ok) {
        throw new Error(`Api query failed: ${response.statusText}`)
    }
    return response;
}