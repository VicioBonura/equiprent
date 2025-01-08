export type AccessType = 'public' | 'not-auth' | 'auth-only';

export interface ProtectedRouteProps {
    children: React.ReactNode;
    accessType: AccessType;
}