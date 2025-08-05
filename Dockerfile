# Utiliser une image officielle Node.js
FROM node:18-alpine

# Créer un dossier de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (si existant)
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste du code
COPY . .

# Exposer le port (doit matcher celui dans le code)
EXPOSE 10000

# Commande pour démarrer le serveur
CMD ["node", "server.js"]
