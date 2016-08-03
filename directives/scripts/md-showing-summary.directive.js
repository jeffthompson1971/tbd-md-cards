!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdShowingSummary', MdShowingSummary);

    function MdShowingSummary() {
        return {
            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-showing-summary.view.html" : 'templates/_md-showing-summary.view.html';
            },
            scope: {
                showings: '=',
                listing: '=',
                limit: "@",
                ngClass: "=",
            },
            controller: MdShowingSummaryController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.$watch("ngClass", function (value) {
                    $(element).attr("class", value)
                });
                scope.limit = attrs.limit;
                scope.logoUrl = (attrs.logourl !== undefined) ? attrs.logourl : "assets/logos/showings.com_40x146.png";
                scope.title = attrs.title;
                scope.sysId = attrs.sysid;
                scope.imgUrl = attrs.imgurl;
                scope.collapsed = true;
                scope.positiveFB = [];
                scope.negativeFB = [];
                scope.meElement = element;



                // the following used for the aggregate showing stats
                scope.posCnt = 0;
                scope.negCnt = 0;
                scope.totalCnt = 0;

                var parentEl = angular.element(element.find('md-list-item'));

                var el = angular.element(element.find('#md-card-image'));

                el.css({
                    'background-image': 'url(' + scope.imgUrl + ')'
                });


            }
        };
    }

    MdShowingSummaryController.$inject = ['$scope', '$mdDialog', 'ListingSvc'];

    function DialogController($scope, $rootScope, $mdDialog, IS_MOBILE_APP, SYSTEM_EVENT, showing) {

        $scope.showing = showing;

        $scope.showActions =  true; //IS_MOBILE_APP;

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
        $scope.addToContacts = function (showing) {

             $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, showing.contact);


            // console.log(phone);
            // $scope.hide()
            // $cordovaContacts.save({
            //     nickname: name,
            //     phoneNumbers: [phone]
            // }).then(function (result) {
            //     console.log("Saved contact", result);
            // });
        }
    };

    function MdShowingSummaryController($scope, $mdDialog, ListingSvc) {


        var vm = this;

        if (vm.limit && vm.limit != -1) {

            $scope.showings = vm.showings.slice(0, vm.limit);
        } else {
            $scope.showings = vm.showings;

        }

        $scope.theListing = ListingSvc.getSelectedListing();

        $scope.$watch('vm.showings', function (showings, previousShowings) {

            // ng-class failed in a directive - so i use this approach
            // to color the feedback based on sentiment

            // trim to 'limit'
            if (vm.limit && vm.limit != -1) {

                $scope.showings = showings.slice(0, vm.limit);
            } else {
                $scope.showings = showings;
            }


            for (var i = 0; i < showings.length; ++i) {

                // var myEl = angular.element(element.find('md-list-item')[i]);

                // if (showings.potentialOffer) {


                // }
                // if (showings[i].sentiment < -2) {
                //     scope.negativeFB.push(showings[i]);
                //     scope.negCnt += 1;
                //     myEl.addClass('negative-color');

                // } else if (showings[i].sentiment > 2) {
                //     scope.posCnt += 1;
                //     scope.positiveFB.push(showings[i]);
                //     myEl.addClass('positive-color');
                // }
                // scope.totalCnt += 1;
            }

        });

        vm.mdDialog = $mdDialog;

        vm.show = function (ev, selShowing) {
            console.log(selShowing);
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showing: selShowing
                    },
                    controller: DialogController,
                    templateUrl: 'templates/_md-card-showing-detail.view.html',
                    parent: parentEl,
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        vm.showAll = function (ev, showings) {
            console.log("show all called");
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showings: showings
                    },
                    controller: DialogControllerAll,
                    templateUrl: 'templates/_md-card-showing-detail-all.view.html',
                    parent: parentEl,
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        //$scope.$watch('vm.data', activate);
        $scope.show = $scope.vm.show;

        function activate() {

        }
    }

})();