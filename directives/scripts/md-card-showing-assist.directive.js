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
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-showing-assist.view.html" : 'templates/_md-card-showing-assist.view.html';
            },
            scope: {
                showings: '=',
                ngClass: "=",
            },
            controller: MdCardShowingAssistController,
            controllerAs: 'vm',
            bindToController: true,
            link: function(scope, element, attrs) {
                scope.$watch("ngClass", function(value) {
                    $(element).attr("class", value)
                });
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

                // watch for changes in the listing to update the new photo
                scope.$watch('vm.showings', function(showings) {

                    // ng-class failed in a directive - so i use this approach
                    // to color the feedback based on sentiment
                    for (var i = 0; i < showings.length; ++i) {

                        var myEl = angular.element(element.find('md-list-item')[i]);

                        if (showings.potentialOffer) {


                        }
                        if (showings[i].sentiment < -2) {
                            scope.negativeFB.push(showings[i]);
                            scope.negCnt += 1;
                            myEl.addClass('negative-color');

                        } else if (showings[i].sentiment > 2) {
                            scope.posCnt += 1;
                            scope.positiveFB.push(showings[i]);
                            myEl.addClass('positive-color');
                        }
                        scope.totalCnt += 1;
                    }

                });

            }
        };
    }

    MdCardShowingAssistController.$inject = ['$scope', , '$mdDialog'];

    function DialogController($scope, $mdDialog, showing) {

        $scope.showing = showing;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.dial = function(number) {
            if (window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + number, '_system');
            }

        };
    };

    function MdCardShowingAssistController($scope, $mdDialog) {
        var vm = this;
        $scope.showings = vm.showings;
        // activate();

        vm.mdDialog = $mdDialog;
        vm.show = function(ev, selShowing) {

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
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        //$scope.$watch('vm.data', activate);
        $scope.show = $scope.vm.show;
        function activate() {



        }
    }
})();