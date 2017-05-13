var app = app || {};
app = app || {};
app.models = app.models || {};

app.models.Piece = Backbone.Model.extend({

	defaults: {
		color: null,
		position: null,
		icon: null,
		identifier: null
	},
	
	initialize: function() {
		this.setIcon();
		this.setIdentifier();
	},

	validate: function(attrs) {
		if (!attrs.color || !attrs.position) return "Please provide color and current position";
	},

	getMovePaths: function() {
		return [];
	},

	setIcon: function() {
	},

	setIdentifier: function() {
	}

});