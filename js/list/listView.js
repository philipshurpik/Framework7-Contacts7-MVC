define(['hbs!js/list/contact-list-item'], function(template) {
    var $ = Framework7.$;

	function render(params) {
        $('.contacts-list ul').html(template(params.model));
        $('.searchbar-cancel').click();
		bindEvents(params.bindings);
    }

	function reRender(params) {
		$('.contacts-list ul').html(template(params.model));
		$('.contacts-list-header').text(params.header);
        $('.searchbar-cancel').click();
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
		$('.contacts-list').on('search', fixStickySearchResults);
	}

	function fixStickySearchResults(e) {
		$('.contacts-list .list-group-title').each(function() {
			var title = Framework7.$(this);
			var nextElements = title.nextAll('li');
			var hide = true;
			for (var i = 0; i < nextElements.length; i++) {
				var nextEl = $(nextElements[i]);
				if (nextEl.hasClass('list-group-title')) break;
				if (nextEl.css('display') !== 'none') {
					hide = false;
				}
			}
			if (hide) title.hide();
			else title.css('display', '');
		});
	}

    return {
        render: render,
		reRender: reRender
    };
});