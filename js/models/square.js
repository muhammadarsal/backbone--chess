var app = app || {};
app = app || {};
app.models = app.models || {};

app.models.Square = Backbone.Model.extend({

	defaults: {
		piece: null,
		highlighted: false,
		position: null
	},

	parse: function(response) {
		piece = response.piece;
		pieceIdentifier = piece ? piece.identifier : null
		if (pieceIdentifier === "pawn") response.piece = new app.models.pieces.Pawn(piece);
		if (pieceIdentifier === "bishop") response.piece = new app.models.pieces.Bishop(piece);
		if (pieceIdentifier === "knight") response.piece = new app.models.pieces.Knight(piece);
		if (pieceIdentifier === "king") response.piece = new app.models.pieces.King(piece);
		if (pieceIdentifier === "queen") response.piece = new app.models.pieces.Queen(piece);
		if (pieceIdentifier === "rook") response.piece = new app.models.pieces.Rook(piece);

		return response;
	},

	initialize: function(options) {
		this.position = options.position;
	}

});