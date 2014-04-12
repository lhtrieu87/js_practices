"use strict";

(function($, application, window) {
	application.communicationLayer = function(spec) {
		// spec contains attributes of the returned object.

		self = {
			author: "Lenar"
		};

		self.insert = function(comment, callback) {
			callback({
				id: comment.parentId + 10000,
				body: comment.body,
				date: new Date(),
				author: self.author
			});
		};

		self.delete = function(id, callback) {

		};

		self.update = function(toUpdate, callback) {
			callback();
		};

		self.flag = function(id, reason) {

		};

		return self;
	};

	application.performBinding = function(app, selector) {
		// DOM wrapper element, all event handlers are bound to this element.
		var $wrapper = $(selector || window.document);

		var addCommentTemplate = Handlebars.compile($("#add-comment-template").html());
		var commentTemplate = Handlebars.compile($("#comment-template").html());
		var updateCommentTemplate = Handlebars.compile($("#update-comment-template").html());

		$wrapper.on('click', '.-delete', function() {
			var $comment = $(this).closest('.-comment');
			var data = $comment.data("app");

			var proceed = confirm("Are you sure you would like to delete this comment?");
			if(!proceed)
				return;

			app.delete(data.id);
			$comment.remove();
		});

		$wrapper.on('click', '.-flag', function() {
			var data = $(this).closest('.-comment').data("app");
			var reason = window.prompt("Why would you like to flag this comment?");
			if(!reason) return;
			app.flag(data.id, reason);
		});

		$wrapper.on('click', '.-reply', function() {
			var $comment = $(this).closest('.-comment');
			var data = $comment.data("app");

			var $children = $comment.find(".-child-comments").first();

			var $addCommentForm = $children.find('.-add-comment-template').first();

			if($addCommentForm.length == 0)
				$children.prepend(addCommentTemplate({parentId: data.id}));
		});

		$wrapper.on('click', '.-update', function() {
			var $comment = $(this).closest('.-comment');
			var data = $comment.data("app");

			var $body = $comment.find('.-body').first();
			var body = $body.text();

			$body.empty();
			$body.html(updateCommentTemplate({body: body}));
		});

		$wrapper.on('submit', '.-add-comment-form', function() {
			var $this = $(this);
			var $tmpl = $this.closest(".-add-comment-template");
			var $children = $this.closest(".-child-comments");
			var data = $this.data("app");
			var body = $this.find(".-body").val();

			$tmpl.remove();
			app.insert({parentId: data.parentId, body: body}, function(comment) {
				$children.prepend(commentTemplate(comment));
			});

			return false;
		});

		$wrapper.on('click', '.-add-comment-form .-cancel', function() {
			$(this).closest(".-add-comment-template").remove();
		});

		$wrapper.on('submit', ".-update-comment-form", function() {
			var $tmpl = $(this).closest('.-update-comment-form');
			var $comment = $tmpl.closest('.-comment');
			var $body = $comment.find('.-body').first();
			var data = $comment.data("app");
			var body = $tmpl.find('.-value').val();

			$body.empty();
			app.update({id: data.id, body: body}, function() {
				$body.text(body);
			});

			return false;
		});

		$wrapper.on('click', '.-update-comment-form .-cancel', function() {
			var $tmpl = $(this).closest('.-update-comment-form');
			var $body = $tmpl.closest('.-comment').find('.-body').first();
			var originalValue = $tmpl.find('.-original').val();
			$body.text(originalValue);
			$tmpl.remove();
		});
	};
})(jQuery, window.myApp || (window.myApp = {}), window);