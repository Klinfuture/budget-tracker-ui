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
        console.error('Fetch error:', response);
        throw new Error("An error occurred while fetching data");
    }

    return await response.json();
};


