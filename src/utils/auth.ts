export const isLoggedIn = (): boolean => {
    return localStorage.getItem('token') !== null;
}

export const logout = (): void => {
    localStorage.removeItem('token');

    // Trigger an event to notify components that the user is logged out
    window.dispatchEvent(new Event('auth-change'));
}