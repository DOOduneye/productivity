import { isRouteErrorResponse } from "@remix-run/react";

import { useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-container">
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        );
    }

    return (
        <div className="error-container">
            <h1>Something went wrong</h1>
            <p>{error instanceof Error ? error.message : "Unknown error occurred"}</p>
        </div>
    );
}