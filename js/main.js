$(document).ready(function() {
	var game = new app.models.Game();
	var gameView = new app.views.GameView({model: game, el: "#game"});
	gameView.render();
});