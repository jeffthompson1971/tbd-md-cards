!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdCardSentri', MdCardSentri);

    function MdCardSentri() {

        return {
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-sentrilock.view.html" : 'templates/_md-card-sentrilock.view.html';
            },
            restrict: 'E',

            scope: {
                sentrilock: '='

            },
            controller: MdCardSentriController,
            controllerAs: 'vm',
            bindToController: true,


            link: function (scope, element, attrs) {
                scope.title = attrs.title;
                scope.pass = attrs.pass;
                scope.limit = attrs.limit;
            }
        };
    }

    MdCardSentriController.$inject = ['$scope'];

    function MdCardSentriController($scope) {
        var vm = this;
        
        $scope.sentrilock = vm.sentrilock;
        console.log("sentri controller");
        
        
     
        
        // // watch for changes in the listing to update the new photo
        $scope.$watch('vm.sentrilock', function (data) {

            if (_.isUndefined(data))
                return;
            $scope.sentrilock = data;

        });

    }
})();