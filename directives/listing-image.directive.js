!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('listingImage', ListingImage);

    function ListingImage() {
        return {
           // transclude: true,
            scope: {

                listing: '='

            },
            //template: '<img src="{{source}}"></img>',

            link: function (scope, element, attrs) {

                scope.source = attrs.source;

                //var el = angular.element(element.find('#image-l'));
                var el = angular.element(element[0].querySelector('#image-l'));
                el.css({
                    'background-image': 'url(' + scope.source + ')'

                });

            }
        }
    }

})();