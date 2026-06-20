import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";



export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner className="size-8" />
            </div>
        )
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />
    }

    return (
        <>
            {children}
        </>
    )

}