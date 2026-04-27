function errorResponse(status, message, details) {
    const error = { status, message };

    if (details) {
        error.details = details;
    }

    return { error };
}

function sendError(res, status, message, details) {
    return res.status(status).json({
        error: { status, message, details }
    });
}

module.exports = { errorResponse, sendError };