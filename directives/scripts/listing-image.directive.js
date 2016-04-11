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
            transclude: true,
          
            template: '<div style="width: inherit; height: inherit; background-size: cover; background-position: center center; background-repeat: no-repeat;" imagenie="{{source}}"></div>',
            link: function (scope, element, attrs) {

                scope.source = attrs.source;
              

            }
        }
    }

})();