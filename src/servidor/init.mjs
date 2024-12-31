import { config } from 'dotenv';
import { app } from './config.mjs';

// Cargar las configuraciones.
config();

// Iniciar el servidor
const PORT = process.env.PORT;

app.listen( PORT, () => {
	console.info( `Servidor corriendo en http://localhost:${PORT}` );
});