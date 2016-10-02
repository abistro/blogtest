// Backbone model

var Blog = Backbone.Model.extend({

	defaults: {
		author: '',
		title: '',
		url: ''
	}
});

// Backbone collection - an array of models

var Blogs = Backbone.Collection.extend({});

// instantiate two Blogs

var blog1 = new Blog({
	author: 'Michael',
	title: 'Michael\'s Blog',
	url: 'http://michaelsblog.com'
});

var blog2 = new Blog({
	author: 'John',
	title: 'John\'s Blog',
	url: 'http://johnblog.com'
});

// instantiate a Collection

var blogs = new Blogs([blog1, blog2]);

// Backbone Views for one blog

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});

// Backbone views for all blog

var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		this.model.on('add', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		})
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	// After document ready, setup on click event on the add blog btn
	$('.add-blog').on('click', function(){
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});

		// Clear out input boxes after 'on click' event
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');

		// output blog model to JSON
		console.log(blog.toJSON());
		blogs.add(blog);
	});
});