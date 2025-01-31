# Projet API - Gestion d'Annonces

**Auteurs** : Mathis TRUONG & Yoann LE CHEVALIER

## Présentation des Rôles

- **Gestion des Annonces** : Mathis TRUONG  
- **Gestion des Utilisateurs** : Yoann LE CHEVALIER  
- **Intégration OAuth2** : Collaboration entre Mathis et Yoann  

## Description du Projet

Cette application web permet aux utilisateurs de gérer des annonces de manière sécurisée et intuitive. Elle offre les fonctionnalités suivantes :

- **Inscription et Authentification** :  
  - Création de compte utilisateur avec vérification d'email unique.  
  - Connexion via identifiants personnels ou via OAuth2 (Google ou GitHub).  

- **Gestion des Annonces** :  
  - Publication, modification et suppression d'annonces.  
  - Consultation de la liste des annonces et des détails spécifiques.  

- **Sécurité** :  
  - Déconnexion sécurisée pour terminer la session utilisateur.  

## Technologies Utilisées

- **Front-end** : HTML, CSS  
- **Back-end** : Node.js, Express  
- **Base de Données** : MongoDB  
- **Authentification** : JWT (JSON Web Tokens), OAuth2 (Google, GitHub)  
- **API** : RESTful  

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 16 ou supérieure)  
- **MongoDB** (instance locale ou distante)  
- **Navigateur Web** (Chrome, Firefox, etc.)  

## Installation et Configuration

Suivez ces étapes pour configurer et exécuter l'application localement :

1. **Cloner le Dépôt**  
   ```bash
   git clone https://github.com/Mathistrg/Projet-API-Avanc-.git
   cd Projet-API-Avanc-


2. **Installer les Dépendances** 

```bash	
npm install express mongoose jsonwebtoken bcryptjs dotenv cors multer crypto axios nodemon
```

3. **Configurer les Variables d'Environnement** 

Créez un fichier .env à la racine du projet et ajoutez les variables suivantes (les valeurs exactes vous seront communiquées séparément pour des raisons de sécurité)

4. **Démarrer MongoDB** 

mongod

5. **Démarrer le Serveur** 

Démarrer le Serveur