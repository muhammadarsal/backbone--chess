var app = app || {};
app = app || {};
app.views = app.views || {};

app.views.BoardView = Backbone.View.extend({

	id: "board",
	
	initialize: function(options) {
	},

	onSquareClicked: function(square) {
		this.trigger("squareClickedOnBoard", square);
	},

	render: function() {
		self = this;
		this.collection.each(function(square) {
			var squareView = new app.views.SquareView({id: "row-" + square.get("position").row + "-column-" + square.get("position").column, model: square});
			self.$el.append(squareView.render().$el);
			squareView.on("squareClicked", self.onSquareClicked, self);
		});
		return this;
	}
});