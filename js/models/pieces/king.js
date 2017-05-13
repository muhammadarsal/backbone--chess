var app = app || {};
app = app || {};
app.models = app.models || {};
app.models.pieces = app.models.pieces || {};

app.models.pieces.King = app.models.Piece.extend({

	setIdentifier: function() {
		this.set("identifier", "king")
	},

	setIcon: function() {
		if (this.get('color') === 'w') {
			this.set('icon', '&#9812');
		} else {
			this.set('icon', '&#9818');
		}
	},

	getMovePaths: function() {
		position = this.get("position");
		movePaths = [];
		// Move right
		moveRight = [];
		movePaths.push(moveRight);
		if (position.column != 7) moveRight.push({row: position.row, column: position.column + 1}) 
		// Move up right
		moveUpRight = [];
		movePaths.push(moveUpRight);
		if (position.column != 7 && position.row != 0) moveUpRight.push({row: position.row - 1, column: position.column + 1}) 
		// Move up
		moveUp = [];
		movePaths.push(moveUp);
		if (position.row != 0) moveUp.push({row: position.row - 1, column: position.column}) 
		// Move up left
		moveUpLeft = [];
		movePaths.push(moveUpLeft);
		if (position.row != 0 && position.column != 0) moveUpLeft.push({row: position.row - 1, column: position.column - 1}) 
		// Move left
		moveLeft = [];
		movePaths.push(moveLeft);
		if (position.row != 0) moveLeft.push({row: position.row, column: position.column - 1}) 
		// Move down left
		moveDownLeft = [];
		movePaths.push(moveDownLeft);
		if (position.row != 7 && position.column != 0) moveDownLeft.push({row: position.row + 1, column: position.column - 1}) 
		// Move down
		moveDown = [];
		movePaths.push(moveDown);
		if (position.row != 7) moveDown.push({row: position.row + 1, column: position.column});
		// Move down right
		moveDownRight = [];
		movePaths.push(moveDownRight);
		if (position.row != 7 && position.column != 7) moveDownRight.push({row: position.row + 1, column: position.column + 1});

		return movePaths;
	}
});