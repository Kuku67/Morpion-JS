// J'initialise les valeurs dont j'aurai besoin.
var gameStatus = "";
var player =  [{ "symbole" : "X", "victoire" : 0, "name" : 1 }, { "symbole" : "O", "victoire" : 0, "name" : 2 }];
console.table(player);
var squares = document.getElementsByClassName("button");
var turn = 0;
var finished = false;
var lienRejouer = "<a href='#' class='replay' onClick='reset()'>Rejouer ?</a>";

// FONCTION POUR RESET LA PARTIE
function reset() {
    app(gameStatus, player, squares, turn, finished, lienRejouer);
    $(".button").text("");
    $(".victory").css({'display' : 'none'});
    return;
}

// APPLICATION
function app(gameStatus, player, squares, turn, finished, lienRejouer) {
    setCount(player);
    // Message de commencement de la partie.
    gameStatus = "Commencement de la partie ! Au tour de : <strong>Joueur " + player[turn].name + "</strong>";
    sendMessage(gameStatus);
    playerStatment();
    // Ici on ajoute un événement ONCLICK pour toutes nos cases du jeu.
    // Cela permet en outre de lancer le jeu avec la première action possible, à savoir un click.
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function(){
            // Avant chaque événement, il faut vérifier que le jeu n'est pas terminé.
            // Si le jeu est terminé, on ne laisse personne jouer.
            if(finished) {
                return;
            }
            // Si la case n'est pas occupée (valeur du INNER qui retourne 0), on continue.
            if(getSquareInner(this)) {
                setSquare(this, player[turn].symbole);
                // Le joueur vient de jouer sur une case, on va donc rechercher si le jeu se termine.
                finished = winCheck(turn, squares, player);
                // Si le jeu est donc terminé (si la valeur de finished est TRUE).
                if(finished) {
                    // Je dois afficher un message et on coupe la partie.
                    gameStatus = "<strong>Le joueur " + player[turn].name + "</strong> gagne la partie !<br><br>" + lienRejouer;
                    player[turn].victoire++;
                    sendMessage(gameStatus);
                    playerWins();
                    setCount(player);
                    return;
                }
                // Si le jeu est égalité, pareil, on coupe la partie.
                if(noOneWins(squares)) {
                    // J'affiche le message et je coupe la partie.
                    gameStatus = "Jeu égalité !<br><br>" + lienRejouer;
                    sendMessage(gameStatus);
                    return;
                }
                // S'il ne s'est rien passé de spécial, on continue donc et le tour appartient à l'autre joueur.
                turn++;
                // Cela permet aussi de nous placer toujours au bon endroit dans le tableau "players".
                turn = turn % 2;
                playerStatment();
                // On affiche le message pour indiquer au joueur que c'est à lui de jouer.
                gameStatus = "Au tour de : <strong>Joueur " + player[turn].name + "</strong>";
                sendMessage(gameStatus);
            } else {
                if(!noOneWins(squares)) {
                // Si la case est déjà prise, on prévient le joueur qu'il doit ressayer.
                gameStatus = "Case déjà prise ! Veuillez choisir une autre case.";
                sendMessage(gameStatus);

                }
            }
        });
    }
    // FONCTION DE RECHERCHE DE COMBINAISON
    function winCheck(turn, squares, player) {
        var patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for(var i = 0; i < patterns.length; i++) {
            cond = squares[patterns[i][0]].innerHTML == player[turn].symbole &&
                   squares[patterns[i][1]].innerHTML == player[turn].symbole &&
                   squares[patterns[i][2]].innerHTML == player[turn].symbole;
            switch(true) {
                case cond : return true; break;
            }
        }
    }
    // FONCTION POUR AFFICHER LE DEROULEMENT DE LA PARTIE
    function sendMessage(message) {
        messageElem = document.querySelector("#phrase");
        messageElem.innerHTML = message;
    }
    // FONCTION POUR SAVOIR S'IL Y A EGALITE
    function noOneWins(squares) {
        for(var i = 0; i < squares.length; i++) {
            if(squares[i].innerHTML == 0) {
                return false;
            }
        }
        return true;
    }
    // FONCTION POUR SAVOIR SI UNE CASE EST VIDE
    function getSquareInner(square) {
        return square.innerHTML.length == 0;
    }
    // FONCTION POUR INSERER LE SYMBOLE
    function setSquare(square, value) {
        square.innerHTML = value;
    }
    // AFFICHER DE LA COULEUR ET DES INFORMATIONS EN FONCTION DU TOUR
    function playerStatment(){
        if(turn == 0) {
            $("#joueur1").css({'background-color' : 'rgb(40, 5, 80)', 'color' : 'white'});
            $("#joueur1 .selected").css({'display' : 'block'});
            $("#joueur2").css({'background-color' : 'white', 'color' : 'black'});
            $("#joueur2 .selected").css({'display' : 'none'});
        } else {
            $("#joueur1").css({'background-color' : 'white', 'color' : 'black'});
            $("#joueur1 .selected").css({'display' : 'none'});
            $("#joueur2").css({'background-color' : 'rgb(40, 5, 80)', 'color' : 'white'});
            $("#joueur2 .selected").css({'display' : 'block'});
        }
    }
    // AFFICHAGE DU PARAGRAPHE DE VICTOIRE EN CAS DE VICTOIRE
    function playerWins() {
        if(turn == 0) {
            $("#joueur1 .victory").css({'display' : 'block'});
        } else {
            $("#joueur2 .victory").css({'display' : 'block'});
        }
        $("#joueur1 .selected").css({'display' : 'none'});
        $("#joueur2 .selected").css({'display' : 'none'});
        return;
    }

    // Actualiser le compteur de victoire
    function setCount(player) {
        $("#joueur1 .compteur").text("Victoires : " + player[0].victoire);
        $("#joueur2 .compteur").text("Victoires : " + player[1].victoire);
    }
}
app(gameStatus, player, squares, turn, finished, lienRejouer);
