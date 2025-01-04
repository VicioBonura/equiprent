export const isLoggedIn = (): boolean => {
    return localStorage.getItem('token') !== null;
}

export const logout = (): void => {
    localStorage.removeItem('token');
}