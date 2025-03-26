from app_flask import app, con
from flask import jsonify
from datetime import timedelta, datetime, date

def format_timedelta(td):
    if isinstance(td, timedelta):
        seconds = int(td.total_seconds())
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        seconds = seconds % 60
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    else:
        return ""

def format_date(date_obj):
    if isinstance(date_obj, date):
        return date_obj.strftime("%Y-%m-%d")
    else:
        return ""

@app.route("/")
def index():
    return "Hello, World! (API)"

@app.route("/api/films")
def get_films():
    try:
        cursor = con.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                f.id,
                f.titre, 
                f.realisateur,
                f.duree,
                f.affiche,
                g.nom AS genre_nom, 
                f.description,
                f.date_sortie
            FROM films f
            INNER JOIN genres g ON f.genre_id = g.id;
        """)
        films_data = cursor.fetchall()
        cursor.close()

        formatted_films = []
        for film in films_data:
            formatted_film = {
                "id": film["id"],
                "titre": film["titre"],
                "realisateur": film["realisateur"],
                "duree": format_timedelta(film.get("duree")),
                "affiche": film["affiche"],
                "genre_nom": film["genre_nom"],
                "description": film["description"],
                "date_sortie": format_date(film.get("date_sortie")),
            }
            formatted_films.append(formatted_film)

        return jsonify({"status": "success", "data": formatted_films})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/films/<int:film_id>")
def get_film(film_id):
    try:
        cursor = con.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                f.id,
                f.titre, 
                f.realisateur,
                f.duree,
                f.affiche,
                g.nom AS genre_nom, 
                f.description,
                f.date_sortie
            FROM films f
            INNER JOIN genres g ON f.genre_id = g.id
            WHERE f.id = %s;
        """, (film_id,))
        film_data = cursor.fetchone()
        cursor.close()

        if film_data:
            formatted_film = {
                "id": film_data["id"],
                "titre": film_data["titre"],
                "realisateur": film_data["realisateur"],
                "duree": format_timedelta(film_data.get("duree")),
                "affiche": film_data["affiche"],
                "genre_nom": film_data["genre_nom"],
                "description": film_data["description"],
                "date_sortie": format_date(film_data.get("date_sortie")),
            }
            return jsonify({"status": "success", "data": formatted_film})
        else:
            return jsonify({"message": "Film non trouvé"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/seances")
def get_seances():
    try:
        cursor = con.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                s.id,
                s.film_id,
                s.date,
                s.heure,
                s.places_disponibles,
                f.titre AS film_titre,
                f.affiche AS film_affiche
            FROM seances s
            INNER JOIN films f ON s.film_id = f.id
            ORDER BY s.date, s.heure
        """)
        seances_data = cursor.fetchall()
        cursor.close()

        formatted_seances = []
        for seance in seances_data:
            formatted_seance = {
                "id": seance["id"],
                "film_id": seance["film_id"],
                "film_titre": seance["film_titre"],
                "film_affiche": seance["film_affiche"],
                "date": format_date(seance.get("date")),
                "heure": str(seance.get("heure")),
                "places_disponibles": seance["places_disponibles"],
            }
            formatted_seances.append(formatted_seance)

        return jsonify({"status": "success", "data": formatted_seances})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/seances/film/<int:film_id>")
def get_seances_by_film(film_id):
    try:
        cursor = con.cursor(dictionary=True)
        cursor.execute("""
            SELECT 
                s.id,
                s.film_id,
                s.date,
                s.heure,
                s.places_disponibles,
                f.titre AS film_titre,
                f.affiche AS film_affiche
            FROM seances s
            INNER JOIN films f ON s.film_id = f.id
            WHERE s.film_id = %s
            ORDER BY s.date, s.heure
        """, (film_id,))
        seances_data = cursor.fetchall()
        cursor.close()

        formatted_seances = []
        for seance in seances_data:
            formatted_seance = {
                "id": seance["id"],
                "film_id": seance["film_id"],
                "film_titre": seance["film_titre"],
                "film_affiche": seance["film_affiche"],
                "date": format_date(seance.get("date")),
                "heure": str(seance.get("heure")),
                "places_disponibles": seance["places_disponibles"],
            }
            formatted_seances.append(formatted_seance)

        return jsonify({"status": "success", "data": formatted_seances})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
