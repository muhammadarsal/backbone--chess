var app = app || {};
app = app || {};
app.models = app.models || {};
app.models.pieces = app.models.pieces || {};

app.models.pieces.Queen = app.models.Piece.extend({

	setIdentifier: function() {
		this.set("identifier", "queen")
	},

	setIcon: function() {
		if (this.get('color') === 'w') {
			this.set('icon', '&#9813');
		} else {
			this.set('icon', '&#9819');
		}
	},

	getMovePaths: function() {
		position = this.get("position");
		movePaths = [];
		// move right
		moveRight = [];
		movePaths.push(moveRight);
		for(var column = position.column + 1; column <= 7; column++) {
			moveRight.push({row: position.row, column: column});
		}

		// move left
		moveLeft = [];
		movePaths.push(moveLeft);
		for(var column = position.column - 1; column >= 0 ; column--) {
			moveLeft.push({row: position.row, column: column});
		}

		// move up
		moveUp = [];
		movePaths.push(moveUp);
		for(var row = position.row - 1; row >= 0 ; row--) {
			moveUp.push({row: row, column: position.column});
		}

		// move down
		moveDown = [];
		movePaths.push(moveDown);
		for(var row = position.row + 1; row <= 7; row++) {
			moveDown.push({row: row, column: position.column});
		}

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
		// move in upper left diagonal
		moveUpLeft = [];
		movePaths.push(moveUpLeft);
		for (currentColumn = position.column - 1, currentRow = position.row - 1; currentColumn >= 0 && currentRow >=0; currentColumn--, currentRow-- ) {
				
			moveUpLeft.push({row: currentRow, column: currentColumn})

		}
		// move lower left diagonal
		moveDownLeft = [];
		movePaths.push(moveDownLeft);
		for (currentColumn = position.column-1, currentRow = position.row+1; currentColumn >= 0 && currentRow <= 7; currentColumn--, currentRow++ ) {
			
			moveDownLeft.push({row: currentRow, column: currentColumn});

		}
		return movePaths;
	}
});