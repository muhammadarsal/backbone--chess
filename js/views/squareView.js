var app = app || {};
app = app || {};
app.views = app.views || {};

app.views.SquareView = Backbone.View.extend({
	
	className: "square",

	initialize: function(options) {
		this.model.on("change", this.render, this);
	},

	events: {
		"click": "onClickSquare"
	},

	onClickSquare: function() {
		this.trigger('squareClicked', this.model);
	},
	

	render: function() {
		var piece = this.model.get("piece");
		var icon =  piece ? this.model.get("piece").get("icon") : "&nbsp;"
		var template = _.template($("#squareTemplate").html());
		var html = template({icon: icon});

		this.$el.html(html);
		this.$el.toggleClass("square-highlighted", this.model.get("highlighted"));
		// set square color
		var squareData = app.UtilityFunctions.parseSquare(this.el);
		if (piece) piece.set('position', squareData);

		this.$el.toggleClass("square-black", (((squareData.row % 2 === 1) && (squareData.column % 2 === 0)) ||
			  	((squareData.row % 2 === 0) && (squareData.column % 2 === 1)))) ;

		return this;
	}
});