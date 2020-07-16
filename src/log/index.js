let log = (message, severity) => {
    let data = {
        app: 'ntail',
        severity: severity,
        message: message
    }
    console.log(JSON.stringify(data))
}

const methods = {
    debug: (message) => {
        if (process.env.NODE_ENV !== 'production') {
            log(message, 'debug')
        }
    },
    info: (message) => {
        log(message, 'info')
    },
    warning: (message) => {
        log(message, 'warning')
    },
    error: (message) => {
        log(message, 'error')
    },
}

module.exports = methods
