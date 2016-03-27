!(function() {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('imListItem', IMListItem);

    function IMListItem() {
        return {
            transclude: true,
            scope: {

                listing: '='

            },
            template: ' <div class="item item-avatar item-icon-right">\
                    <img src="img/jon-snow.jpg">\
                    <h2>Jon Snow</h2>\
                    <p>Da illest illegitimate</p>\
                    <i class="icon ion-chatbubble muted"></i>\
                </div>',

            link: function(scope, element, attrs) {

                scope.source = attrs.source;

            }
        }
    }

})();