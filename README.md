## Documentation API cinematic 


#### Introduction

Cette documentation décrit l'API Cinématic, une API REST développée avec Flask (Python) qui permet de récupérer des informations sur des films et leurs genres. L'API utilise une base de données MySQL pour stocker les données.

**Prérequis**

  Python 3.x
  Flask
  Flask-CORS
  mysql-connector-python
  Un serveur MySQL en cours d'exécution
  Une base de données nommée db_cinematic avec les tables films et genres .

#### Installation

1.  **Cloner le dépôt (si applicable) :**

    unfold_less bash

    content_copyterminal

    `git clone https://github.com/Hugotlbt/TP_api.git`

2.  **Créer un environnement virtuel (recommandé) :**

    unfold_less bash

    content_copyterminal

    python3 -m venv venv

3.  **Activer l'environnement virtuel :**

    -   **Windows :**

        unfold_less bash

        content_copyterminal

        venv\Scripts\activate

    -   **macOS/Linux :**

        unfold_less bash

        content_copyterminal

        source venv/bin/activate

4.  **Installer les dépendances :**

    unfold_less bash

    content_copyterminal

    `pip install -r requirements.txt # Si vous avez un fichier requirements.txt
    #ou
    pip install Flask Flask-CORS mysql-connector-python`

#### Base de données

L'API utilise une base de données MySQL nommée db_cinematic. Elle doit contenir les tables suivantes :

  **genres :**
    -   id (INT, PRIMARY KEY, AUTO_INCREMENT)
    -   nom (VARCHAR(255), UNIQUE, NOT NULL)
  **films :**
    -   id (INT, PRIMARY KEY, AUTO_INCREMENT)
    -   titre (VARCHAR(255))
    -   realisateur (VARCHAR(255))
    -   duree (TIME)
    -   affiche (VARCHAR(255))
    -   description (TEXT)
    -   date_sortie (DATE)
    -   genre_id (INT, FOREIGN KEY referencing `[genres.id](http://genres.id/)`)

#### Lancement de l'API

1.  **Activer l'environnement virtuel**

2.  **Se placer dans le dossier api-flask**

3.  **Exécuter la commande :**

    bash sans dépliage

    contenu_copie Terminal

    python run.py

    L'API sera accessible à l'adresse `[http://localhost:3000](http://localhost:3000/)` .

#### Points d'accès (Endpoints)

L'API propose ces differents points d'accès :

  **GET /api/films**

    -   **Description :** Récupère la liste de tous les films.
    

  **GET /api/films/<film_id>**

    -   **Description :** Récupère les détails d'un film spécifique.


  **GET /api/seances/film/<int:film_id>**
    -   **Description :** Récupère les seances d'un film choisi selon son id.
