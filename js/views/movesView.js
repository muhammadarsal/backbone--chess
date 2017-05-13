var app = app || {};
app = app || {};
app.views = app.views || {};

app.views.MovesView = Backbone.View.extend({

	tagName: "button",

	id: "undo",

	events: {
		"click": "onClick"
	},

	onClick: function() {
		var lastMove = this.collection.at(this.collection.length - 1);
		if (lastMove) lastMove.destroy();
	},

	render: function() {
		var template = _.template($("#movesTemplate").html());
		var html = template({text: "Undo Last Move"});
		this.$el.html(html);
		return this;
	}

});