export function apiGet(url) {
    return fetch(url)
        .then(async response => {
            if (response.ok) {
                return await response.json();
            } else {
                const errorMessage = await response.text();
                return Promise.reject(new Error(errorMessage));
            }
        })
}