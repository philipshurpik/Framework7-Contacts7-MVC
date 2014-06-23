define(function() {
	var $ = Framework7.$;

	/**
	 * Starts router,
	 */
    function start() {
		$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			initController(page.name, page.query);
		});
		$(document).on('pageBeforeAnimation', function (e) {
			var page = e.detail.page;
			renderController(page.name, page.query);
		});
    }

	/**
	 * Loads controller from js code (another controller) - call it's init and render functions
	 * @param controllerName
	 * @param query
	 */
	function load(controllerName, query) {
		require(['js/' + controllerName + '/'+ controllerName + 'Controller'], function(controller) {
			if (controller.init) {
				controller.init(query);
			}
			controller.render(query);
		});
	}

    function initController(controllerName, query) {
        require(['js/' + controllerName + '/'+ controllerName + 'Controller'], function(controller) {
            if (controller.init) {
				controller.init(query);
			}
        });
    }

	function renderController(controllerName, query) {
		require(['js/' + controllerName + '/'+ controllerName + 'Controller'], function(controller) {
			controller.render(query);
		});
	}

    return {
        start: start,
		load: load
    };
});