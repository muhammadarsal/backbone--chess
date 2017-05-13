var app = app || {};
app = app || {};
app.collections = app.collections || {};

app.collections.Board = Backbone.Collection.extend({

	model: app.models.Square,

	localStorage: new Backbone.LocalStorage("board"),

	initialize: function(options) {
		this.fetch();
		if (this.length === 0) {
			this.initializeBoard();
			this.placePiecesOnInitialPositions();
			this.saveBoardToLocalStorage();
		}
	},

	findSquare: function(squareData) {
		return this.find(function(square) {
				return square.get("position").row === squareData.row && square.get("position").column === squareData.column;
			});
	},

	resetSquares: function() {
		this.each(function(square) {
			square.set("highlighted", false);
		});
	},

	movePiece: function(fromSquare, toSquare) {
		this.resetSquares();
		var moveFromSquare = new app.models.Square(fromSquare.toJSON());
		var moveToSquare = new app.models.Square(toSquare.toJSON());
		this.trigger("move", moveFromSquare, moveToSquare);
		var piece  = fromSquare.get('piece');
		// piece.set({position: toSquare.get('position')})
		toSquare.set('piece', piece);
		fromSquare.set('piece', null);

		toSquare.save();
		fromSquare.save();
	},

	isSquareEmpty: function(squareData) {
		return this.findSquare(squareData).get("piece") === null;
	},

	isSquareOccupiedByOpponent: function(squareData, color) {
		var piece = this.findSquare(squareData).get('piece');
		return  piece !== null && piece.get('color') !== color;
	},

	highlightPossibleMoves: function(square) {
		self = this;
		
		if (this.get('selectedSquare')) this.resetSquares();
		var piece = square.get("piece") ? square.get("piece") : null;

		if (piece) {
			var validMoves = this.validateMoves(piece);
			validMoves.forEach(function(move) {
				self.findSquare(move).set("highlighted", true);
			});		
		}
	},

	validateMoves: function(piece) {
		self = this;
		var position = piece.get("position");
		var validMoves = [];

		// Pawn
		if (piece instanceof app.models.pieces.Pawn) {
			piece.getMovePaths().forEach(function(move) {
				// if piece moves up in a column
				if (move.column === position.column && move.row < position.row) {
					for (var i = position.row - 1; i >= move.row ; i--) {
						if (self.isSquareEmpty({row: i, column: move.column})) {
							validMoves.push({row: i, column: move.column});
						} else {
							break;
						}
					}
				}
				// if piece moves down in a column
				if (move.column === position.column && move.row > position.row) {
					for (var i = position.row + 1; i <= move.row ; i++) {
						if (self.isSquareEmpty({row: i, column: move.column})) {
							validMoves.push({row: i, column: move.column});
						} else {
							break;
						}
					}
				}
				// if piece kills in diagonal
				if (move.column !== position.column) {
					if (self.isSquareOccupiedByOpponent({row: move.row, column: move.column}, piece.get('color'))) {
						validMoves.push({row: move.row, column: move.column});
					}
				}

			});
		}

		// Rook, Bishop, King, Queen
		else {
			// console.log(piece.getMovePaths())
			piece.getMovePaths().forEach(function(path) {
				if (path.length > 0) {
					path.every(function(move) {
						if(self.isSquareEmpty(move)) {
							validMoves.push(move);
							return true;
						} else if (self.isSquareOccupiedByOpponent(move, piece.get('color'))) {
							validMoves.push(move);
							return false;
						} else {
							return false;
						}

					});
				}

			});
		}
		return validMoves;
	},

	initializeBoard: function() {

		for (var row = 0; row <= 7; row++) {
			
			for (var column = 0; column <= 7; column++) {
				this.add(new app.models.Square({position: {row: row, column: column}}));
			}
		}
	},

	removePieces: function() {
		this.each(function(square) {
			square.set("piece", null);
		});
	},

	saveBoardToLocalStorage: function() {
		this.each(function(square) {
			square.save();
		});
	},

	placePiecesOnInitialPositions: function() {
		// White Pawns
		for(var i = 0; i <= 7; i++) {
			var pawn = new app.models.pieces.Pawn({color: 'w', position: {row: 6, column: i}});
			this.findSquare({row: 6, column: i}).set("piece", pawn);
		}
		// // Black Pawns
		for(var i = 0; i <= 7; i++) {
			var pawn = new app.models.pieces.Pawn({color: 'b', position: {row: 1, column: i}});
			this.findSquare({row: 1, column: i}).set("piece", pawn);
		}
		// // White Rooks
		rook = new app.models.pieces.Rook({color: 'w', position: {row: 7, column: 0}});
		this.findSquare({row: 7, column: 0}).set("piece", rook);
		rook = new app.models.pieces.Rook({color: 'w', position: {row: 7, column: 7}});
		this.findSquare({row: 7, column: 7}).set("piece", rook);
		// Black Rooks
		rook = new app.models.pieces.Rook({color: 'b', position: {row: 0, column: 0}});
		this.findSquare({row: 0, column: 0}).set("piece", rook);
		rook = new app.models.pieces.Rook({color: 'b', position: {row: 0, column: 7}});
		this.findSquare({row: 0, column: 7}).set("piece", rook);
		// // White Knights
		knight = new app.models.pieces.Knight({color: 'w', position: {row: 7, column: 1}});
		this.findSquare({row: 7, column: 1}).set("piece", knight);
		knight = new app.models.pieces.Knight({color: 'w', position: {row: 7, column: 6}});
		this.findSquare({row: 7, column: 6}).set("piece", knight);
		// Black Knights
		knight = new app.models.pieces.Knight({color: 'b', position: {row: 0, column: 1}});
		this.findSquare({row: 0, column: 1}).set("piece", knight);
		knight = new app.models.pieces.Knight({color: 'b', position: {row: 0, column: 6}});
		this.findSquare({row: 0, column: 6}).set("piece", knight);
		// White Bishops
		bishop = new app.models.pieces.Bishop({color: 'w', position: {row: 7, column: 2}});
		this.findSquare({row: 7, column: 2}).set("piece", bishop);
		bishop = new app.models.pieces.Bishop({color: 'w', position: {row: 7, column: 5}});
		this.findSquare({row: 7, column: 5}).set("piece", bishop);
		// Black Bishops
		bishop = new app.models.pieces.Bishop({color: 'b', position: {row: 0, column: 2}});
		this.findSquare({row: 0, column: 2}).set("piece", bishop);
		bishop = new app.models.pieces.Bishop({color: 'b', position: {row: 0, column: 5}});
		this.findSquare({row: 0, column: 5}).set("piece", bishop);
		// White Queen
		queen = new app.models.pieces.Queen({color: 'w', position: {row: 7, column: 3}});
		this.findSquare({row: 7, column: 3}).set("piece", queen);
		// Black Queen
		queen = new app.models.pieces.Queen({color: 'b', position: {row: 0, column: 3}});
		this.findSquare({row: 0, column: 3}).set("piece", queen);
		// White King
		king = new app.models.pieces.King({color: 'w', position: {row: 7, column: 4}});
		this.findSquare({row: 7, column: 4}).set("piece", king);
		// Black King
		king = new app.models.pieces.King({color: 'b', position: {row: 0, column: 4}});
		this.findSquare({row: 0, column: 4}).set("piece", king);
	}
});