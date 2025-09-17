import { baseURL } from "@/constants/url";

export const customFetch = async (url: string, options?: RequestInit) => {

    const mutationsOptions = options?.method && ['POST', 'PUT', 'DELETE'].includes(options.method.toUpperCase());

    if (mutationsOptions) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options?.headers || {}),
            },
        };
    } else {
        options = {
            ...options,
            cache: 'no-store'
        }
    }
    
    const response = await fetch(baseURL + url, options);

    if (!response.ok) {
        const json = await response.json();
        console.error('Fetch error:', json);
        throw new Error(`${json.message || "Server sent an error"}`);
    }

    return await response.json();
};


