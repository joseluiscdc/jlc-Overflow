
const handleLoginFailed = (res, message) => {
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'Invalid information!'
    })
}

const handleError = (error, res) => {
    res.status(500).json({
        message: 'An unexpected error has occurred!',
        error
    })
}

module.exports = { handleError }
