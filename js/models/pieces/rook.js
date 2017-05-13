var app = app || {};
app = app || {};
app.models = app.models || {};
app.models.pieces = app.models.pieces || {};

app.models.pieces.Rook = app.models.Piece.extend({
	
	setIdentifier: function() {
		this.set("identifier", "rook")
	},

	setIcon: function() {
		if (this.get('color') === 'w') {
			this.set('icon', '&#9814');
		} else {
			this.set('icon', '&#9820');
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
		return movePaths;
	}
});