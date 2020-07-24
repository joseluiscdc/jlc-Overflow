const handleError = (error, res) => {
    res.status(500).json({
        message: 'An unexpected error has occurred!',
        error
    })
}

const handleLoginFailed = (res, message) => {
    res.status(401).json({
        message: 'Login failed',
        error: message || 'Invalid information!'
    })
}

module.exports = { handleError, handleLoginFailed }
