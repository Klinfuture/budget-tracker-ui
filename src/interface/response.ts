export interface NormalResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}
