# Courses REST API

Small REST API using Docker, Node and MongoDB for educational purposes.

## Foreword

Be aware that this project uses Node.JS 12 and MongoDB 3.9: **it is not sutable for production**.

The following project is used for educational purposes with students learning about to use REST APIs. With it, I demonstrate them how to use `GET`, `POST`, `PUT`, and `DELETE` requests. It also contains basic authentication and authorization.

## Prerequisites

- [Docker](https://www.docker.com/): the code containning in this project is fully dockerized. You don't need to have Node or MongoDB installed on your computer.

## How to use

## Documentation API Utilisateur

### Utilisation de l'Authentification

Pour accéder aux routes sécurisées, les clients doivent inclure l'en-tête Authorization en utilisant leurs credentials encodés en base64. Par exemple :

```
Authorization: Basic ZXhhbXBsZUBlbWFpbC5jb206bW90ZGVwYXNzZQ==
```

Cet en-tête doit être inclus dans les requêtes aux points d'entrée nécessitant une authentification, comme GET /users. En absence de cet en-tête ou en cas de credentials incorrects, une réponse 401 Unauthorized sera retournée.

### Routes - USERS

#### GET `/api/v1/users`

Récupère les détails de l'utilisateur authentifié.

- **Sécurité** : Authentification Basic HTTP requise.
- **Réponse** :
  - **200 OK**
    ```json
    {
      "data": {
        "username": "Nom d'utilisateur",
        "email": "email@example.com"
        // Le mot de passe n'est pas retourné
      }
    }
    ```
  - **401 Unauthorized** : Informations d'identification non fournies ou incorrectes.

#### POST `/api/v1/users`

Crée un nouveau compte utilisateur.

- **Sécurité** : Aucune authentification requise.
- **Requête** :
  ```json
  {
    "username": "Nom d'utilisateur",
    "email": "email@example.com",
    "password": "motdepasse"
  }
  ```
- **Réponse** : - **201 Created** : Utilisateur créé avec succès. Aucun corps de réponse n'est retourné. - **403 Forbidden** : Tous les champs requis ne sont pas fournis. - **400 Bad Request** : Validation des données échouée (par exemple, adresse email déjà utilisée).

### Routes - COURSES

#### GET `/api/v1/courses`

Récupère une liste de tous les cours disponibles.

- **Sécurité** : Aucune.
- **Réponse** :
  - **200 OK**
    ```json
    {
      "data": [
        {
          "_id": "IdentifiantDuCours",
          "title": "Titre du cours"
          // Autres champs si nécessaire
        }
      ]
    }
    ```

#### GET `/api/v1/courses/:id`

Récupère les détails d'un cours spécifique par son ID.

- **Sécurité** : Aucune.
- **Paramètres** : `id` - l'ID du cours à récupérer.
- **Réponse** :
  - **200 OK**
    ```json
    {
      "data": [
        {
          // Détails complets du cours
        }
      ]
    }
    ```
  - **404 Not Found** : Cours non trouvé.

#### POST `/api/v1/courses`

Crée un nouveau cours.

- **Sécurité** : Authentification Basic HTTP requise.
- **Requête** :
  ```json
  {
    {
        "user": "ObjectIdDeL'utilisateur",
        "title": "Titre du cours",
        "description": "Description du cours",
        "estimatedTime": "Temps estimé pour compléter le cours",
        "materialsNeeded": "Matériaux nécessaires",
        "steps": [
            {
                "title": "Titre de l'étape",
                "description": "Description de l'étape"
            }
        ],
        "reviews": []
    }
  }
  ```
- **Réponse** :
  - **201 Created** : Cours créé avec succès. Aucun corps de réponse n'est retourné.
  - **400 Bad Request** : Données invalides.

#### PUT `/api/v1/courses/:courseId`

Met à jour un cours existant.

- **Sécurité** : Authentification Basic HTTP requise.
- **Paramètres** : courseId - l'ID du cours à mettre à jour.
- **Requête** :
- **Réponse** :
  - **204 No Content** : Mise à jour réussie. Aucun corps de réponse n'est retourné.
  - **400 Bad Request** : Données invalides.
  - **401 Unauthorized** : Utilisateur non autorisé.

#### POST `/api/v1/courses/:courseId/reviews`

Ajoute une critique à un cours.

- **Sécurité** : Authentification Basic HTTP requise.
- **Paramètres** : courseId - l'ID du cours à critiquer.
- **Requête** :
- **Réponse** :
  - **201 Created** : Critique ajoutée avec succès. L'entête Location est définie avec l'URL de la critique.
  - **400 Bad Request** : Données invalides.
