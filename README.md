# Project62

Outils :
	-Leaflet (car Google Maps n'est pas gratuit)
	-D3.js
	-R (pour la simplification des données)
	-SQL Server


1-- Composition de la carte

On pense composer la map de cette manière :

	On utilisera Leaflet 0.7.5 pour la présentation de la carte.
	Elle sera composer de plusieurs Layer de base tel que les stations ou les arrondissements.

    A droite de la carte, on aura un menu indépendant de la carte qui servira à afficher les contenus de layer (stations de métro en fonction de la ligne etc...), on aura un onglet pour alterner parmis les options.
	
****Pour les conditions d'affichage de données, on reflechi encore comment les positionner afin de rendre le site User Friendly.

_____

Lorsque l'utilisateur se connectera, il verra la carte du Grand Paris avec la Layer Arrondissement placé dessus par défaut.
Il pourra choisir parmis tout les choix proposées : ajouter un layer ou placer des conditions.

Les conditions sont des études de données et seront afficher directement sur la carte pour visualiser celle-ci (touriste en Printemps etc... Nationalité)

____
On fera d'abord des conditions simple que l'on clusterise afin de les positionner globalement sur la carte et fonction du Zoom (plus proche, plus de cluster), cela evite une manipulation trop grande de données à la fois.

On pourra ensuite faire des conditions avec des études plus approfondi tel que, le constat que des touristes canadiens prennent souvent des photos de la Tour Eiffel près de tel gare alors que les chinois préfèrent la prendre d'un autre positionnement.
On prédira les résultats en fonction des cluster avoisinant.


Densité de touristes autour d'une station = Nombre de photo sur un périmètre x Geoposition 

	
-------

23/10

PRESENTATION

-Un résumé de votre projet
-Les choses faites, restant à faire en s'appuyant sur un planning clair. Vous pouvez présenter les éventuelles déviations par rapport à ce qui était prévu au début de votre projet.
-Les problèmes rencontrés et les solutions trouvées ou envisagées
-Les risques identifiés pour la suite et la fin du projet
-Un résumé de votre avancement par rapport à la valorisation

1.Introduction 

Reprendre le contexte et problématique du Cahier des Charges

2.Contenu

Structure globale front-end back-end du projet (HTML/CSS, JS, PHP, R, SQL ...)
Utiliser la première partie de ce Readme pour expliquer nos choix de technologies
Montrer notre carte avec les stations 


3.

Donner nos idées sur comment avancer dans le projet
Metro + Rer eventuellement
Evoquer nos idées de data viz et aussi celle de Jacquot

    
