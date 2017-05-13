var app = app || {};
app = app || {};
app.views = app.views || {};

app.views.PlayerView = Backbone.View.extend({

	id: "player",
	
	initialize: function() {
		this.model.on("change", this.render, this);
	},

	render: function() {
		var template = _.template($("#playerTemplate").html());
		var html = template({name: this.model.get("name")});
		this.$el.html(html);
		return this;
	}

});