var app = app || {};
app = app || {};
app.models = app.models || {};
app.models.pieces = app.models.pieces || {};

app.models.pieces.Pawn = app.models.Piece.extend({

	setIdentifier: function() {
		this.set("identifier", "pawn")
	},

	setIcon: function() {
		if (this.get('color') === 'w') {
			this.set('icon', '&#9817');
		} else {
			this.set('icon', '&#9823');
		}
	},

	getMovePaths: function() {
		var moveMarchForward, moveDiagonalKillRight, moveDiagonalKillLeft, position;
		position = this.get("position");
		movePaths = [];
		if (this.get('color') === 'w') {
			// march forward
			moveMarchForward = {row: position.row - 1, column: position.column}
			if (position.row !== 0) movePaths.push(moveMarchForward);

			// right diagonal kill
			moveDiagonalKillRight = {row: position.row - 1, column:position.column + 1}
			if (position.row !== 0 && position.column !== 7) movePaths.push(moveDiagonalKillRight);

			// left diagonal kill
			moveDiagonalKillLeft = {row: position.row - 1, column:position.column - 1}
			if (position.row !== 0 && position.column !== 0) movePaths.push(moveDiagonalKillLeft);

			// first move two squares
			if (position.row === 6) movePaths.push({row: position.row-2, column: position.column});
		}
		else {
			// march forward
			moveMarchForward = {row: position.row + 1, column: position.column}
			if (position.row !== 7) movePaths.push(moveMarchForward);

			// right diagonal kill
			moveDiagonalKillRight = {row: position.row + 1, column:position.column - 1}
			if (position.row !== 7 && position.column != 0) movePaths.push(moveDiagonalKillRight);

			// left diagonal kill
			moveDiagonalKillLeft = {row: position.row + 1, column:position.column + 1}
			if (position.row !== 7 && position.column != 7) movePaths.push(moveDiagonalKillLeft);

			// first move two squares
			if (position.row === 1) movePaths.push({row: position.row + 2, column: position.column});
		}
		return movePaths;
	}

});