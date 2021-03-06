!(function () {
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
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-showing-assist.view.html" : 'templates/_md-card-showing-assist.view.html';
            },
            scope: {
                showings: '=',
                listing: '=',
                limit: "@",
                ngClass: "=",
            },
            controller: MdCardShowingAssistController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {
                scope.$watch("ngClass", function (value) {
                    $(element).attr("class", value)
                });
                scope.limit = attrs.limit;
                scope.logoUrl = (attrs.logourl !== undefined) ? attrs.logourl : "assets/logos/showingassist-logo.png";
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

    MdCardShowingAssistController.$inject = ['$scope', '$mdDialog', 'ListingSvc'];

    function DialogController($scope, $filter, $rootScope, $mdDialog, IS_MOBILE_APP, SYSTEM_EVENT, showing, listing) {

        $scope.showing = showing;
        $scope.extId = 10;
        $scope.showActions = IS_MOBILE_APP;
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
            var dialable = $filter('normalizePhoneNumber')(number, true);
            if (IS_MOBILE_APP && window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + dialable, '_system');
            }

        };

        $scope.addToContacts = function (showing) {
            if (showing.contact == undefined)
                return;
            var contact = showing.contact;
            var normalizedContact = {
                name: {}
            };
            var nameBits = contact.name.split(" ");

            // ignore any middle initial or name
            if (nameBits.length < 2) {
                // only have one name so assume it's last

                normalizedContact.name.familyName = nameBits[0];
            } else {
                normalizedContact.name.givenName = nameBits[0];
                normalizedContact.name.familyName = nameBits[nameBits.length - 1];

            }
            if (contact.phone) {
                normalizedContact.phoneNumbers = [];
                if (contact.phone.mobile) {

                    normalizedContact.phoneNumbers.push({
                        type: "mobile",
                        value: $filter('normalizePhoneNumber')(contact.phone.mobile)
                    })
                }
                if (contact.phone.office) {

                    normalizedContact.phoneNumbers.push({
                        type: "work",
                        value: $filter('normalizePhoneNumber')(contact.phone.office)
                    })
                }
                if (contact.phone.home) {
                    normalizedContact.phoneNumbers.push({
                        type: "home",
                        value: $filter('normalizePhoneNumber')(contact.phone.home)
                    })
                }

            }
            if (contact.emails) {
                normalizedContact.emails = [];
                for (var i = 0; i < contact.emails.length; i++) {
                    normalizedContact.emails.push({
                        type: "work",
                        value: contact.emails[i]
                    })
                }
                // normalizedContact.emails = contact.emails;
            }

            normalizedContact.note = "From ShowingAssit feedback.";

            $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, normalizedContact);

        }
    };

    function MdCardShowingAssistController($scope, $mdDialog, ListingSvc) {
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

                // var myEl = angular.element($scope.meEl.find('md-list-item')[i]);

                // if (showings.potentialOffer) {


                // }
                if (showings[i].sentiment < -2) {

                    $scope.negativeFB.push(showings[i]);
                    $scope.negCnt += 1;
                    //  myEl.addClass('negative-color');

                } else if (showings[i].sentiment > 2) {
                    $scope.posCnt += 1;
                    $scope.positiveFB.push(showings[i]);
                    //  myEl.addClass('positive-color');
                }
                $scope.totalCnt += 1;
            }

        });

        vm.mdDialog = $mdDialog;

        vm.show = function (ev, selShowing) {
            console.log(selShowing);
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showing: selShowing,
                        listing: vm.listing

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

        vm.showAll = function (ev, showings, listing) {
            console.log("show all called");
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showings: showings,
                        listing: vm.listing
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