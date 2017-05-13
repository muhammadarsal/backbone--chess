var app = app || {};
app = app || {};
app.models = app.models || {};
app.models.pieces = app.models.pieces || {};

app.models.pieces.Bishop = app.models.Piece.extend({
	
	setIdentifier: function() {
		this.set("identifier", "bishop")
	},

	setIcon: function() {
		if (this.get('color') === 'w') {
			this.set('icon', '&#9815');
		} else {
			this.set('icon', '&#9821');
		}
	},

	getMovePaths: function() {
		position = this.get("position");
		var currentRow, currentColumn;
		movePaths = [];
		// move in upper right diagonal
		moveUpRight = [];
		movePaths.push(moveUpRight);
		for (currentColumn = position.column + 1, currentRow = position.row - 1; currentColumn <= 7 && currentRow >= 0; currentColumn++, currentRow-- ) {

			moveUpRight.push({row: currentRow, column: currentColumn});
		}
		// move in lower right diagonal
		moveDownRight = [];
		movePaths.push(moveDownRight);
		for (currentColumn = position.column + 1, currentRow = position.row + 1; currentColumn <= 7 && currentRow <= 7; currentColumn++, currentRow++ ) {
			
			moveDownRight.push({row: currentRow, column: currentColumn});

		}
		// move up left
		moveUpLeft = [];
		movePaths.push(moveUpLeft);
		for (currentColumn = position.column - 1, currentRow = position.row - 1; currentColumn >= 0 && currentRow >=0; currentColumn--, currentRow-- ) {
				
			moveUpLeft.push({row: currentRow, column: currentColumn})

		}
		// move down left
		moveDownLeft = [];
		movePaths.push(moveDownLeft);
		for (currentColumn = position.column-1, currentRow = position.row+1; currentColumn >= 0 && currentRow <= 7; currentColumn--, currentRow++ ) {
			
			moveDownLeft.push({row: currentRow, column: currentColumn});

		}

		return movePaths;
	}
});