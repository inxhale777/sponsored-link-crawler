import { createLogger, transports, format } from 'winston';

export default createLogger({
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.errors({
                stack: true
            }),
        })
    ],
    exitOnError: false
})