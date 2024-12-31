import express from 'express';

// Inicialización del servidor.
const APP = express();

// Middleware para analizar solicitudes JSON.
APP.use( express.json( { limit: '20mb' } ) );

// Configurar los encabezados de seguridad.
APP.use( helmet() );

// Configuración de CORS.
APP.use( cors() );

// Establecer un tiempo de espera para las solicitudes.
APP.use( timeout( '10s' ) );
APP.use( ( req, res, next ) => {
	if ( !req.timedout ) next();
});	

// Middleware para manejar rutas no encontradas.
APP.use( ( req, res, next ) => {
	res.status( 404 ).json( { error: 'Ruta no encontrada' } );
});

// Middleware para manejar errores internos del servidor.
APP.use( ( error, req, res, next ) => {
	res.status( 500 ).json( { error: 'Error interno del servidor' } );
});

// Exportar el servidor configurado.
export { APP as app };