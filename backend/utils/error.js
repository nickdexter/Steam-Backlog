function errorResponse(status, message, details) {
    const error = { status, message };

    if (details) {
        error.details = details;
    }

    return { error };
}

module.exports = errorResponse;