export interface SingleResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface NoContentResponse {
    success: boolean;
    message: string;
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

export type ApiResponse<T> = SingleResponse<T> | PaginatedResponse<T> | ErrorResponse;
