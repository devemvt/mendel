import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Configuración básica de Winston
const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp( { format: 'DD-MM-YYYY HH:mm:ss' } ),
		format.printf( ( { timestamp, level, message, ...metadata } ) => {
			let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;

			if ( Object.keys( metadata ).length ) {
				msg = `${msg} ${JSON.stringify(metadata)}`;
			}
			return msg;
		} )
	),
	transports: [
		new transports.Console(),
		new DailyRotateFile({
			dirname: 'logs',
			filename: '%DATE%.log',
			datePattern: 'DD-MM-YYYY',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '12m'
		})
	]
});

// Exportar el logger configurado
export default logger;