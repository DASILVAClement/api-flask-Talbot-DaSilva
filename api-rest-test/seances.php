<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Séances de Cinéma</title>
    <!-- Bootstrap CSS depuis CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .movie-session {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
        }

        .movie-session h3 {
            color: #343a40;
        }

        .session-time {
            font-weight: bold;
            color: #007bff;
        }

        .session-details {
            margin-top: 10px;
        }

        .session-details p {
            margin-bottom: 5px;
        }

        .film-poster {
            height: 100%;
            object-fit: cover;
            border-radius: 5px 0 0 5px;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.php">
                <i class="fas fa-film me-2"></i>Ciné App
            </a>
        </div>
    </nav>

    <div class="container py-5">
        <h1 class="text-center mb-5">Toutes les séances</h1>

        <div class="mb-4">
                        <a href="index.php" class="btn btn-outline-secondary">
                            <i class="fas fa-arrow-left me-2"></i>Retour à la liste
                        </a>
                    </div>

        <div class="row">
            <?php
            $film_id = isset($_GET['film_id']) ? intval($_GET['film_id']) : null;
            $api_url = $film_id
                ? "http://localhost:3000/api/seances/film/{$film_id}"
                : "http://localhost:3000/api/seances";

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $api_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($ch);
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($http_code === 200) {
                $data = json_decode($response, true);

                if (isset($data['data']) && !empty($data['data'])) {
                    foreach ($data['data'] as $session) {
                        echo '<div class="col-md-6 mb-4">';
                        echo '<div class="card h-100">';
                        echo '<div class="row g-0">';

                        if (isset($session['film_affiche'])) {
                            echo '<div class="col-md-4">';
                            echo '<img src="' . htmlspecialchars($session['film_affiche']) . '" class="film-poster img-fluid" alt="' . htmlspecialchars($session['film_titre']) . '">';
                            echo '</div>';
                        }

                        echo '<div class="' . (isset($session['film_affiche']) ? 'col-md-8' : 'col-12') . '">';
                        echo '<div class="card-body">';
                        echo '<h5 class="card-title">' . htmlspecialchars($session['film_titre'] ?? 'Titre inconnu') . '</h5>';
                        echo '<p class="text-muted"><i class="fas fa-clock me-2"></i>' . date('d/m/Y à H\hi', strtotime($session['date'] . ' ' . $session['heure'])) . '</p>';
                        echo '<p><i class="fas fa-chair me-2"></i> Places disponibles: ' . htmlspecialchars($session['places_disponibles']) . '</p>';                    
                        echo '</a>';
                        echo '</div>';
                        echo '</div>';

                        echo '</div>';
                        echo '</div>';
                        echo '</div>';
                    }
                } else {
                    echo '<div class="col-12">';
                    echo '<div class="alert alert-info">Aucune séance programmée pour le moment.</div>';
                    echo '</div>';
                }
            } else {
                echo '<div class="col-12">';
                echo '<div class="alert alert-danger">Erreur ' . $http_code . ' lors du chargement des séances.</div>';
                echo '</div>';
            }
            ?>
        </div>
    </div>

    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container text-center">
            <p>&copy; <?php echo date('Y'); ?> Ciné App</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
