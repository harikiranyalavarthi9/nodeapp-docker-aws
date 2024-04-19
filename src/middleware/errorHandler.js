// Error handler for API endpoints
export const apiErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let errorMessage = 'Something went wrong!';

    // Check if the error is a known type
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        errorMessage = 'Invalid JSON payload received.';
    }

    if (err instanceof ValidationError) {
        errorMessage = err.message;
    }

    if (err instanceof UnauthorizedError) {
        errorMessage = 'Unauthorized access.';
    }

    res.status(500).json({ message: errorMessage });
};

// Error handler for database errors
export const databaseErrorHandler = (error) => {
    console.error('Database error:', error);
    let errorMessage = 'An error occurred while processing your request. Please try again later.';

    // Check if the error is from PostgreSQL
    if (error.code && error.code.startsWith('P')) {
        switch (error.code) {
            case '23505': // Unique violation
                errorMessage = 'The data you provided violates a unique constraint. Please provide unique data.';
                break;
            case '23502': // Not null violation
                errorMessage = 'One or more required fields are missing. Please provide all required data.';
                break;
            case '22P02': // Invalid input syntax
                errorMessage = 'One or more fields contain invalid data. Please provide valid data.';
                break;
            default:
                errorMessage = 'An error occurred while processing your request. Please try again later.';
                break;
        }
    }

    throw new Error(errorMessage);
};