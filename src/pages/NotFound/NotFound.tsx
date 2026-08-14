
function NotFound() {

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
            <div className="text-center">
                <p className="text-7xl font-bold text-text-primary">
                    404
                </p>

                <h1 className="mt-4 text-2xl font-semibold text-text-primary">
                    Page not found
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    The page you're looking for doesn't exist or may have
                    been moved.
                </p>

            </div>
        </div>
    );
}

export default NotFound;