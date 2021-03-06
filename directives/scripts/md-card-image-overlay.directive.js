!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }

    angular
        .module(appName)
        .directive('mdCardImageOverlay', MdCardImageOverlay);

    function MdCardImageOverlay() {
        return {

            restrict: 'E',
            templateUrl: function (elem, attrs) {

                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-image-overlay.view.html" : 'templates/_md-card-image-overlay.view.html';
            },
            scope: {

                listing: '=',
                showings: '=',
                data: '=',
                rateDecimals: '=?',
                pctDecimals: '=?',
                valueType: '@?',
                displayRateOfChange: '=?'
            },
            controller: MdCardImageOverlayController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.title = attrs.title;
                scope.meElement = element;

            }
        };
    }

    MdCardImageOverlayController.$inject = ['$scope'];

    function MdCardImageOverlayController($scope) {
        var vm = this;
        $scope.listing = vm.listing;
        $scope.showings = vm.showings;
        activate();

        $scope.$watch('vm.data', activate);

        $scope.$watch('vm.listing', function (theListing) {

            if (_.isUndefined(theListing))
                return;

            $scope.listing = theListing;

            // TODO - this needs to look for any showing service ID not just
            // hardcode CSS 
            if (theListing.activityAggregate && theListing.activityAggregate.snapshots) {

                var snaps = theListing.activityAggregate.snapshots;

                _.each(snaps, function (snap) {

                    if (_.has(snap, "listing_trend")) {

                        $scope.listing.trends.push(snap.listing_trend);
                    }
                })

                if (theListing.activityAggregate.snapshots["8"]) {

                    vm.showings = (theListing.activityAggregate.snapshots["8"].data) ?
                        theListing.activityAggregate.snapshots["8"].data : [];
                } else if (theListing.activityAggregate.snapshots["10"]) {

                    vm.showings = (theListing.activityAggregate.snapshots["10"].data) ?
                        theListing.activityAggregate.snapshots["10"].data : [];
                } else {
                    vm.showings = [];

                }
            } else {
                vm.showings = [];
            }
        });

        $scope.$watch('vm.showings', function (theShowings) {


            if (_.isUndefined(theShowings))
                return;
            for (var i = 0; i < theShowings.length; ++i) {

                var showing = theShowings[i];

                if (showing.potentialOffer) {
                    $scope.listing.trends.push("POTENTIAL OFFER");
                }
            }

            $scope.showings = theShowings;
        });

        function activate() {
            vm.displayRateOfChange = _.isUndefined(vm.displayRateOfChange) ? true : vm.displayRateOfChange;
            vm.valueType = vm.valueType || 'number';
            vm.typeOfChange = vm.typeOfChange || 'number';
            vm.rateDecimals = _.isUndefined(vm.rateDecimals) ? 2 : vm.rateDecimals;
            vm.pctDecimals = _.isUndefined(vm.pctDecimals) ? 2 : vm.pctDecimals;
            if (vm.data) {
                vm.canCalculateChange = vm.data.hasOwnProperty('previous') && vm.data.hasOwnProperty('current');
            }

            if (vm.canCalculateChange) {
                vm.controlCss = getIndicatorCss(vm.data);
                vm.rateOfChange = calculateRateOfChange(vm.data, vm.pctDecimals);
                vm.amountChanged = calculateAmountChanged(vm.data);
            } else {
                vm.controlCss = 'neutral';
            }
        }
    }

    function getIndicatorCss(data) {
        if (data) {
            if (data.current > data.previous) {
                return 'pos';
            } else if (data.current < data.previous) {
                return 'neg';
            } else if (data.current === data.previous) {
                return 'neutral';
            }
        }
    }

    function calculateAmountChanged(data) {
        if (data) {
            return Math.abs(data.previous - data.current);
        }
    }

    function calculateRateOfChange(data, pctDecimals) {
        if (data) {
            if (data.previous === 0 && data.current === 0) {
                return '0.0';
            } else {
                return Math.abs((data.current - data.previous) / (data.previous === 0 ? data.current : data.previous) * 100).toFixed(pctDecimals);
            }
        }
    }
})();