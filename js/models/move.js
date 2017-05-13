var app = app || {};
app = app || {};
app.models = app.models || {};

app.models.Move = Backbone.Model.extend({
	
	defaults: {
		fromSquare: null,
		toSquare: null
	},

	parse: function(response) {
		// console.log(response.fromSquare)

		var fromSquare = response.fromSquare;
		var toSquare = response.toSquare;
		var fromSquarePiece = fromSquare.piece;
		var toSquarePiece = toSquare.piece;

		var fromSquareBackbone = new app.models.Square(fromSquare);
		var toSquareBackbone = new app.models.Square(toSquare);

		fromSquarePieceIdentifier = fromSquarePiece ? fromSquarePiece.identifier : null
		if (fromSquarePieceIdentifier === "pawn") fromSquareBackbone.set('piece', new app.models.pieces.Pawn(fromSquarePiece));
		if (fromSquarePieceIdentifier === "bishop") fromSquareBackbone.set('piece', new app.models.pieces.Bishop(fromSquarePiece));
		if (fromSquarePieceIdentifier === "knight") fromSquareBackbone.set('piece', new app.models.pieces.Knight(fromSquarePiece));
		if (fromSquarePieceIdentifier === "king") fromSquareBackbone.set('piece', new app.models.pieces.King(fromSquarePiece));
		if (fromSquarePieceIdentifier === "queen") fromSquareBackbone.set('piece', new app.models.pieces.Queen(fromSquarePiece));
		if (fromSquarePieceIdentifier === "rook") fromSquareBackbone.set('piece', new app.models.pieces.Rook(fromSquarePiece));

		toSquarePieceIdentifier = toSquarePiece ? toSquarePiece.identifier : null
		if (toSquarePieceIdentifier === "pawn") toSquareBackbone.set('piece', new app.models.pieces.Pawn(toSquarePiece));
		if (toSquarePieceIdentifier === "bishop") toSquareBackbone.set('piece', new app.models.pieces.Bishop(toSquarePiece));
		if (toSquarePieceIdentifier === "knight") toSquareBackbone.set('piece', new app.models.pieces.Knight(toSquarePiece));
		if (toSquarePieceIdentifier === "king") toSquareBackbone.set('piece', new app.models.pieces.King(toSquarePiece));
		if (toSquarePieceIdentifier === "queen") toSquareBackbone.set('piece', new app.models.pieces.Queen(toSquarePiece));
		if (toSquarePieceIdentifier === "rook") toSquareBackbone.set('piece', new app.models.pieces.Rook(toSquarePiece));


		response.fromSquare = fromSquareBackbone;
		response.toSquare = toSquareBackbone;

		return response;

	}
	
});