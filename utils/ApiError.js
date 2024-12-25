// @desc: Custom error class to handle errors in the application
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status=`${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}
module.exports = ApiError;
