!(function() {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdCardShowingAssist', MdCardShowingAssist);

    function MdCardShowingAssist() {
        return {
            restrict: 'E',
            templateUrl: function(elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-showingassist.view.html" : 'templates/_md-card-showingassist.view.html';
            },
            scope: {
                showings: '='
            },
            controller: MdCardShowingAssistController,
            controllerAs: 'vm',
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.title = attrs.title;
                scope.pass = attrs.pass;
            }
        };
    }

    MdCardShowingAssistController.$inject = ['$scope'];

    function MdCardShowingAssistController($scope) {
        var vm = this;
        $scope.listing = vm.listing;
        console.log("showing assist controller");
        // // watch for changes in the listing to update the new photo
        $scope.$watch('vm.listing', function(theListing) {

            if (_.isUndefined(theListing))
                return;
            $scope.listing = theListing;

        });

    }
})();