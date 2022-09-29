import mongoose from 'mongoose';
import config from '../config';

export default async () => {
	
	const urlmongo = "mongodb://" + config.databaseHost + ":" + config.databasePort + "/" + config.databaseName; 
	 
	// Nous connectons l'API à notre base de données
	mongoose.connect(urlmongo);
	 
	const db = mongoose.connection; 
	db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
	db.once('open', () => {
	    console.log("Connexion à la base OK"); 
	}); 	
};
