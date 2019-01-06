const base_url = "BASE_URL";
const api_key = "API_KEY";

const ApiCall = (url, method, body = null) => {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Flask-Crud-Api-Key": api_key
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(base_url + url, options)
        .then(response => {
            let content_type = response.headers.get("Content-Type");
            if (content_type === "application/json") {
                return response.json(); // For HTTP GET and POST methods
            }
            return response.text(); // For HTTP PUT and DELETE methods
        })
        .catch(error => console.error('Error:', error));
};

export default ApiCall;
