var app = app || {};
app = app || {};
app.views = app.views || {};

app.views.GameView = Backbone.View.extend({

	onSquareClickedOnBoard: function(square) {
		this.model.makeMoveOrShowPossibleMoves(square);
	},

	onMove: function(fromSquare, toSquare) {
		this.model.addMove(fromSquare, toSquare);
	},

	events: {
		"click #new-game": "onNewGame"
	},

	onNewGame: function() {
		this.model.startNewGame();
	},


	render: function() {
		var template = _.template($("#gameTemplate").html());
		var html = template({text: "New Game"});
		this.$el.html(html);

		var boardView = new app.views.BoardView({collection: this.model.get('board')});
		boardView.on("squareClickedOnBoard", this.onSquareClickedOnBoard, this);
		boardView.collection.on("move", this.onMove, this);
		this.$el.append(boardView.render().$el);

		var playerView = new app.views.PlayerView({model: this.model.get('activePlayer')});
		this.$el.append(playerView.render().$el);

		var movesView = new app.views.MovesView({collection: this.model.get('moves')});

		this.$el.append(movesView.render().$el);
		return this;
	}

});