var app = app || {};
app = app || {};
app.collections = app.collections || {};

app.collections.Moves = Backbone.Collection.extend({
	
	model: app.models.Move,

	localStorage: new Backbone.LocalStorage("moves"),

	initialize: function() {
		this.fetch();
	}

});