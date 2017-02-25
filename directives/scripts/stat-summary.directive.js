!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdStatSummary', MdStatSummary);

    function MdStatSummary() {
        return {

            restrict: 'E',
            templateUrl: function (elem, attrs) {

                return (attrs.templatepath) ? attrs.templatepath + "/_md-stat-summary.view.html" : 'templates/_md-stat-summary.view.html';
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

            controller: MdStatSummaryController,

            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.title = attrs.title;

                scope.go = function (val) {

                    scope.$parent.navToSite(val);
                }
            }
        };
    }

    MdStatSummaryController.$inject = ['$scope'];

    function MdStatSummaryController($scope) {
        var vm = this;

        $scope.theListing = vm.listing;

        $scope.showings = vm.showings;

        prepareData();

        updateShowingsViewModel($scope);

        //$scope.theListing.trends = [];

        $scope.$watch('vm.showings', function (showings) {

            vm.showings = showings;

            updateShowingsViewModel($scope);

        });

        $scope.$watch('vm.listing', function (theListing) {

            vm.listing = theListing;

            prepareData();

        });


        function prepareData() {

            vm.listing_views_todayCnt = {
                current: vm.listing.activityAggregate.listing_views_todayCnt
            };

            vm.listing_views_sevenDayCnt = {
                current: vm.listing.activityAggregate.listing_views_sevenDayCnt
            };

            vm.listing_views_thirtyDayCnt = {
                current: vm.listing.activityAggregate.listing_views_thirtyDayCnt
            }

            if (!_.isUndefined(vm.listing.activityAggregate.previous)) {
                var prevData = vm.listing.activityAggregate.previous;
                if (!_.isUndefined(prevData.listing_views_todayCnt)) {
                    vm.listing_views_todayCnt.previous = prevData.listing_views_todayCnt;
                }
                if (!_.isUndefined(prevData.listing_views_sevenDayCnt)) {
                    vm.listing_views_sevenDayCnt.previous = prevData.listing_views_sevenDayCnt;
                }
                if (!_.isUndefined(prevData.listing_views_thirtyDayCnt)) {
                    vm.listing_views_thirtyDayCnt.previous = prevData.listing_views_thirtyDayCnt;
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

        function updateShowingsViewModel() {

            if (_.isUndefined(vm.showings)) {
                return
            }
            vm.sentimentCounter = {
                positive: 0,
                negative: 0,
                neutral: 0,
                notNegative: 0
            }

            for (var i = 0; i < vm.showings.length; i++) {

                // now deal with the sentiment

                var sent = vm.showings[i].sentiment;

                if (sent < -3) {
                    vm.sentimentCounter.negative += 1;
                }
                else if (sent > 3) {
                    vm.sentimentCounter.positive += 1;

                    vm.sentimentCounter.notNegative += 1;

                } else {
                    vm.sentimentCounter.neutral += 1;

                    vm.sentimentCounter.notNegative += 1;
                }
            }
        }
    }

})();