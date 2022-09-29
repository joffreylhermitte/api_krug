# API de l'application krug

API en nodejs qui utilise le framework express js. L' API utilise une base de données MySQL et une base de données mongoDB. 


# Installation

1. git clone https://github.com/joffreylhermitte/api_krug.git
2. Créer un fichier .env avec les informations suivantes :
	- SERVER_PORT 
	- JWT_SECRET 
	- DATABASE_HOST  
	- DATABASE_LOGIN 
	- DATABASE_PASSWORD  
	- DATABASE_NAME  
	- SQL_DATABASE_HOST  
	- SQL_DATABASE_LOGIN
	- SQL_DATABASE_PASSWORD 
	- SQL_DATABASE_NAME 
	- SQL_DATABASE_PORT 
3. npm install
4. npm start en développement
5. npm run prod en production

## Utilisation de l'API

L'API utilise les méthodes POST, GET, PUT et DELETE .

Exemples méthode GET : 
	- /api/account/all
	- /api/account/:id

Exemple méthode POST :
	- /api/auth/register

Exemple méthode PUT :
	- /api/ban/edit/:id

Exemple méthode DELETE :
	- /api/account/delete/:id
          



