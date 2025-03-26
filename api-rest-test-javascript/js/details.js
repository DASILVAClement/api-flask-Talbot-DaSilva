const API_BASE_URL = 'http://localhost:3000/api';

document.getElementById('current-year').textContent = new Date().getFullYear();

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function extractYear(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
}

async function loadFilmDetails() {
    const filmDetailsContainer = document.getElementById('film-details-container');
    const filmId = getUrlParameter('id');

    if (!filmId) {
        filmDetailsContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Erreur: Aucun film spécifié.
            </div>
            <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
        `;
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/films/${filmId}`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success' && data.data) {
            const film = data.data;

            filmDetailsContainer.innerHTML = `
                <div class="mb-4">
                    <a href="index.html" class="btn btn-outline-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Retour à la liste
                    </a>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-4">
                        <img src="${film.affiche}" alt="${film.titre}" class="film-poster img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class="film-info">
                            <h1 class="mb-4">${film.titre}</h1>

                            <div class="mb-3">
                                <span class="badge bg-primary me-2">${film.genre_nom}</span>
                                <span class="badge bg-secondary">${extractYear(film.date_sortie)}</span>
                            </div>

                            <p class="lead">${film.description}</p>

                            <hr>

                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <p><strong><i class="fas fa-user-tie me-2"></i>Réalisateur:</strong> ${film.realisateur}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong><i class="fas fa-clock me-2"></i>Durée:</strong> ${film.duree}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong><i class="fas fa-calendar-alt me-2"></i>Date de sortie:</strong> ${formatDate(film.date_sortie)}</p>
                                </div>
                                <div class="col-md-6">
                                    <a href="seances.html?film_id=${filmId}" class="btn btn-primary mt-2">
                                        Voir les séances
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            filmDetailsContainer.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Film non trouvé.
                </div>
                <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
            `;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des détails du film:', error);
        filmDetailsContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Erreur: Impossible de se connecter à l'API.
            </div>
            <a href="index.html" class="btn btn-primary">Retour à la liste des films</a>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadFilmDetails);
