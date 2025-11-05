export const RETURN_URL_DATA_KEY = "returnUrl";

export const ROUTES = {
    DASHBOARD: "/dashboard",
    EXPENSES: "/expenses",
    EXPENSE_CATEGORIES: "expense-categories",
    REVENUE: "/revenue",
    
    //Auth Routes
    AUTH_ROUTE: "/auth",
    LOGIN:"/auth/login",
    REGISTER:"/auth/login",
    RESET_PASSWORD:"/auth/reset-password",
}

const PROTECTED = [
    ROUTES.DASHBOARD,
    ROUTES.EXPENSES,
    ROUTES.EXPENSE_CATEGORIES,
    ROUTES.REVENUE
]

// const PUBLIC_ROUTES = [
// ]

// const ADMIN_ROUTES = [ 
// ]

const AUTH_ROUTES = [
    ROUTES.AUTH_ROUTE,
]

export const isProtectedRoute = (pathname: string):boolean =>{
    return PROTECTED.some(route=>pathname.startsWith(route))
}

export const isAuthRoute = (pathname: string): boolean => {
    return AUTH_ROUTES.some(route=>pathname.startsWith(route))
}

// export const isAdminRoute = (pathname: string): boolean => {
//     return PROTECTED.some(route=>pathname.startsWith(route))
// }
// export const isPublicRoute = (pathname: string): boolean => {
//     return PROTECTED.some(route=>pathname.startsWith(route))
// }