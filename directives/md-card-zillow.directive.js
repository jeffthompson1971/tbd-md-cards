!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdCardZillow', MdCardZillow);

    function MdCardZillow() {
        return {

            restrict: 'E',
            templateUrl: function (elem, attrs) {

                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-zillow.view.html" : 'templates/_md-card-zillow.view.html';
            },
            scope: {

                listing: '=',
                data: '=',
                rateDecimals: '=?',
                pctDecimals: '=?',
                valueType: '@?',
                displayRateOfChange: '=?'
            },
            controller: MdCardZillowController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.title = attrs.title;

                scope.logoUrl = (attrs.logourl !== undefined) ? attrs.logourl : "assets/logos/zillow_logo_40x189.png";

                // handle the button press to GO to trulia
                scope.go = function (val) {
                    scope.$parent.navToSite(val);
                }

             
            }
        };
    }

    MdCardZillowController.$inject = ['$scope', 'PalSvc'];

    function MdCardZillowController($scope, PalSvc) {
        var vm = this;
        $scope.listing = vm.listing;
        
        //vm.openInBrowser = openInBrowser;
        //$scope.openInBrowser = openInBrowser;
        vm.openInBrowser = PalSvc.openWindow;
        
        activate();

       // $scope.$watch('vm.data', activate);

        $scope.$watch('vm.listing', function (theListing) {

            if (_.isUndefined(theListing))
                return;
            $scope.listing = theListing;

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