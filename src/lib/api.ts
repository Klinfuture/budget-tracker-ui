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
        let errorMessage = "An error occurred while fetching data";
        let errorData = null;

        try {
            errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
            console.error(response.statusText)
            errorMessage = errorMessage;
        }

        throw new Error(errorMessage);
    }

    return await response.json();
};


