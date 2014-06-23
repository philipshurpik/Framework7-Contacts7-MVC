define(["app","js/contact/contactView", "js/contactModel"], function(app, ContactView, Contact) {

	var contact = null;
	var bindings = [{
		element: '.contact-edit-link',
		event: 'click',
		handler: runEditMode
	}, {
		element: '.contact-back-link',
		event: 'click',
		handler: goBack
	}];

	function init(query){
		var contacts = JSON.parse(localStorage.getItem("f7Contacts"));
		if (query && query.id) {
			contact = new Contact(_.find(contacts, { id: query.id }));
		}
		ContactView.render({
			model: contact,
			bindings: bindings
		});
	}

	function runEditMode() {
		app.router.load('contactEdit', {id: contact.id });
	}

	function goBack() {
		app.router.load('list');
	}

	return {
		init: init
	};
});