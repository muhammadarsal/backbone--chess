var app = app || {};
app = app || {};
app.models = app.models || {};

app.models.Player = Backbone.Model.extend({

	localStorage: new Backbone.LocalStorage("activePlayer"),
	
	defaults: {
		color: null,
		name: null
	}

});