// generic error handling
function errorResponseHandler(err, res) {
    let statusCode = 500;
    let message = "Internal server error";

    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if (err.message) {
        message = err.message;
    }

    return res.status(statusCode).json({
        data: null,
        message,
    });
}

module.exports = errorResponseHandler;
