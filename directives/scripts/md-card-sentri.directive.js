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
                sentrilock: '=',
                listing: '=',
                limit: "@",

            },
            controller: MdCardSentriController,
            controllerAs: 'vm',
            bindToController: true,


            link: function (scope, element, attrs) {
                scope.title = attrs.title;
                scope.pass = attrs.pass;
                scope.meElement = element;
                scope.limit = attrs.limit;
            }
        };
    }

    MdCardSentriController.$inject = ['$scope', '$mdDialog', '$cordovaContacts'];


    function DialogController($scope, $mdDialog, $cordovaContacts, sentri) {

        $scope.sentri = sentri;

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

        $scope.saveContact = function (name, phone) {
            console.log(phone);
            $scope.hide()
            $cordovaContacts.save({
                nickname: name,
                phoneNumbers: [phone]
            }).then(function (result) {
                console.log("Saved contact", result);
            });
        }
    };

    function MdCardSentriController($scope, $mdDialog) {
        var vm = this;
        if (vm.limit && vm.limit != -1) {

            $scope.entries = vm.sentrilock.entries.slice(0, vm.limit);
        } else {
            $scope.entries = vm.sentrilock.entries;

        }

        vm.mdDialog = $mdDialog;

        vm.show = function (ev, selSentri) {
            console.log('selsentri', selSentri);
            // var parentEl = angular.element($scope.$$watchers.find('md-list-item'));
            $scope.vm.mdDialog.show({
                locals: {
                    sentri: selSentri
                },
                controller: DialogController,
                templateUrl: 'templates/_md-card-sentri-detail.view.html',
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        }

        // // watch for changes in the listing to update the new photo
        $scope.show = $scope.vm.show;

        $scope.$watch('vm.sentrilock', function (data) {

            if (_.isUndefined(data))
                return;
            if (vm.limit && vm.limit != -1) {

                $scope.entries = data.entries.slice(0, vm.limit);

            } else {
                $scope.entries = data.entries

            }
        });
    }
})();