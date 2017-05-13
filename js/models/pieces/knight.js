var app = app || {};
app = app || {};
app.models = app.models || {};
app.models.pieces = app.models.pieces || {};

app.models.pieces.Knight = app.models.Piece.extend({

	setIdentifier: function() {
		this.set("identifier", "knight")
	},

	setIcon: function() {
		if (this.get('color') === 'w') {
			this.set('icon', '&#9816');
		} else {
			this.set('icon', '&#9822');
		}
	},

	getMovePaths: function() {
		var position = this.get("position");
		movePaths = [];
		var move1, move2, move3, move4, move5, move6, move7, move8;
		// MOVE 1
		path1 = [];
		movePaths.push(path1);
		move1 = {row: position.row - 1, column: position.column + 2};
		if (app.UtilityFunctions.isMoveInsideBoard(move1)) {
			path1.push(move1);
		}
		// MOVE 2
		path2 = [];
		movePaths.push(path2);
		move2 = {row: position.row - 2, column: position.column + 1};
		if (app.UtilityFunctions.isMoveInsideBoard(move2)) {
			path2.push(move2);
		}
		// MOVE 3
		path3 = [];
		movePaths.push(path3);
		move3 = {row: position.row-2, column: position.column-1};
		if (app.UtilityFunctions.isMoveInsideBoard(move3)) {
			path3.push(move3);
		}
		// MOVE 4
		path4 = [];
		movePaths.push(path4);
		move4 = {row: position.row-1, column: position.column-2};
		if (app.UtilityFunctions.isMoveInsideBoard(move4)) {
			path4.push(move4);
		}
		// MOVE 5
		path5 = [];
		movePaths.push(path5);
		move5 = {row: position.row+1, column: position.column-2};
		if (app.UtilityFunctions.isMoveInsideBoard(move5)) {
			path5.push(move5);
		}
		// MOVE 6
		path6 = [];
		movePaths.push(path6);	
		move6 = {row: position.row+2, column: position.column-1};
		if (app.UtilityFunctions.isMoveInsideBoard(move6)) {
			path6.push(move6);
		}
		// MOVE 7
		path7 = [];
		movePaths.push(path7);
		move7 = {row: position.row+2, column: position.column+1};
		if (app.UtilityFunctions.isMoveInsideBoard(move7)) {
			path7.push(move7);
		}
		// MOVE 8
		path8 = [];
		movePaths.push(path8);
		move8 = {row: position.row+1, column: position.column+2};
		if (app.UtilityFunctions.isMoveInsideBoard(move8)) {
			path8.push(move8);
		}
		
		return movePaths;
	}

});