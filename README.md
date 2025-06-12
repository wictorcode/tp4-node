# TP N°4. Sécuriser son API Web -- Victor VAUTRIN

Ce projet à été crée dans le cadre du quatrième TP du cours de Dev. Avancé.

Réalisé par Victor VAUTRIN

## Comment installer/lancer le TP

Pour lancer ce projet, il est nécéssaire de le cloner.

Ensuite il faut installer les dépendances NPM avec...

`npm install`


pour le bon fonctionnement du projet, il faut un fichier .env avec les données suivantes:

```
PORT=
JWT_SECRET=
MONGO_URI=
```

Il suffit de remplir chaque champ avec ses données.

Pour lancer le projet, utilisez la commande `npm run dev`.

Si le projet est sur le port 3000 alors il suffit d'aller sur `localhost:3000/pages/signup` afin de s'inscrire et d'aller sur `localhost:3000/pages/login` afin de se connecter.

**Il est à noter que l'interface Web avec la liste des utilisateurs ne fonctionne pas afin de supprimer/modifier un utilisateur. Pour cela, il faut quand même faire les reqûetes soit-même sur Postman**