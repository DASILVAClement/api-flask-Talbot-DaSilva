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
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function loadSeances() {
    const seancesContainer = document.getElementById('seances-container');
    const filmId = getUrlParameter('film_id');

    const apiUrl = filmId ? `${API_BASE_URL}/seances/film/${filmId}` : `${API_BASE_URL}/seances`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success' && data.data) {
            const seances = data.data;

            let seancesHTML = '';
            seances.forEach(seance => {
                seancesHTML += `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${seance.film_affiche}" class="film-poster img-fluid" alt="${seance.film_titre}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${seance.film_titre}</h5>
                                        <p class="text-muted"><i class="fas fa-clock me-2"></i>${formatDate(seance.date + 'T' + seance.heure)}</p>
                                        <p><i class="fas fa-chair me-2"></i> Places disponibles: ${seance.places_disponibles}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            seancesContainer.innerHTML = seancesHTML;
        } else {
            seancesContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">Aucune séance programmée pour le moment.</div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erreur lors du chargement des séances:', error);
        seancesContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">Erreur lors du chargement des séances.</div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadSeances);
