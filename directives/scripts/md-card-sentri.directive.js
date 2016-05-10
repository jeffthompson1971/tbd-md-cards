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
                scope.meElement = element;
            }
        };
    }


    function DialogControllerAll($scope, $mdDialog, sentrilock) {
        console.log("DATA", sentrilock);
        
        $scope.sentrilock = sentrilock;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        $scope.dial = function (number) {
            if (window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + number, '_system');
            }

        };
    }
    



    MdCardSentriController.$inject = ['$scope', '$mdDialog'];

    function MdCardSentriController($scope, $mdDialog) {
        var vm = this;
        vm.mdDialog = $mdDialog;
        $scope.sentrilock = vm.sentrilock;
        console.log("sentri controller");
        
        vm.showAll = function (ev, sentrilock) {
            console.log("show all called", sentrilock);
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            console.log(sentrilock)
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        sentrilock: sentrilock
                    },
                    controller: DialogControllerAll,
                    templateUrl: 'templates/_md-card-sentrilock-detail-all.view.html',
                    parent: parentEl,
                    targetEvent: ev,
                    clickOutsideToClose: true
                    
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
                console.log(sentrilock)
        }
        
     
        
        // // watch for changes in the listing to update the new photo
        $scope.$watch('vm.sentrilock', function (data) {

            if (_.isUndefined(data))
                return;
            $scope.sentrilock = data;

        });

    }
})();