define(function() {
	var $ = Framework7.$;

	/**
	 * Starts router, that handle page events
	 */
    function start() {
		$(document).on('pageBeforeInit', function (e) {
			var page = e.detail.page;
			_require(page.name, function(controller) {
				if (controller.init) {
					controller.init(page.query);
				}
			});
		});
		$(document).on('pageBeforeAnimation', function (e) {
			var page = e.detail.page;
			_require(page.name, function(controller) {
				controller.render(page.query);
			});
		});
    }

	/**
	 * Loads controller from js code (another controller) - call it's init and render functions
	 * @param controllerName
	 * @param query
	 */
	function load(controllerName, query) {
		_require(controllerName, function(controller) {
			if (controller.init) {
				controller.init(query);
			}
			controller.render(query);
		});
	}

	function _require(controllerName, callback) {
		require(['js/' + controllerName + '/'+ controllerName + 'Controller'], callback);
	}

    return {
        start: start,
		load: load
    };
});