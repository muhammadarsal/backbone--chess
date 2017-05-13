var app = app || {};
app = app || {};
app.models = app.models || {};

app.models.Game = Backbone.Model.extend({

	defaults: {
		whitePlayer: null,
		blackPlayer: null,
		activePlayer: null,
		board: null,
		selectedSquare: null,
		moves: null
	},

	initialize: function() {
		this.set('whitePlayer', new app.models.Player({color: 'w', name: 'White'}));
		this.set('blackPlayer', new app.models.Player({color: 'b', name: 'Black'}));
		this.set('activePlayer', new app.models.Player({id: 1}));
		this.set('board', new app.collections.Board());
		this.set('moves', new app.collections.Moves());
		this.get('moves').on('remove', this.undoMove, this);

		this.get('activePlayer').fetch();
		if (!this.get("activePlayer").get("color")) {
			this.get("activePlayer").set({color: 'w', name: "White"});
			this.get("activePlayer").save();
		}

	},

	startNewGame: function() {
		board = this.get("board");
		board.removePieces();
		board.placePiecesOnInitialPositions();
		board.saveBoardToLocalStorage();
		this.get("activePlayer").set({color: 'w', name: "White"});
		this.get("activePlayer").save();
	},

	makeMoveOrShowPossibleMoves: function(square) {
		if (this.get('selectedSquare') && this.isValidMove(square)) {
			this.get('board').movePiece(this.get('selectedSquare'), square);
			this.get('board').resetSquares();
			this.toggleActivePlayer();
		} else if (!this.isSquareEmpty(square) && this.isValidSquare(square)) {
			this.get('board').resetSquares();
			this.get('board').highlightPossibleMoves(square);
			this.set('selectedSquare', square);
		} else if (this.get('selectedSquare')) {
			this.set('selectedSquare', square);
			this.get('board').resetSquares();
		}
	},

	isValidSquare: function(square) {
		return this.get('activePlayer').get('color') === square.get("piece").get("color");
	},

	isValidMove: function(square) {
		return square.get("highlighted");
	},

	isSquareEmpty: function(square) {
		return square.get("piece") === null;
	},

	addMove: function(fromSquare, toSquare) {
		var move = new app.models.Move({fromSquare: fromSquare, toSquare: toSquare});
		this.get('moves').push(move);
		move.save();
	},

	undoMove: function(move) {
		var fromSquare = this.get('board').findSquare(move.get("fromSquare").position);
		var toSquare = this.get('board').findSquare(move.get("toSquare").position);
		fromSquare.set(move.get('fromSquare').toJSON());
		toSquare.set(move.get('toSquare').toJSON());
		fromSquare.save();
		toSquare.save();
		this.get('board').resetSquares();
		this.toggleActivePlayer();
	},

	toggleActivePlayer: function() {
		this.get('activePlayer').set(this.get('activePlayer').get("color") === 'w' ? this.get('blackPlayer').toJSON() : this.get('whitePlayer').toJSON());
		this.get('activePlayer').save();
	}
});