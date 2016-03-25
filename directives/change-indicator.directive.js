(function () {
     var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
	angular
			.module(appName)
			.directive('changeIndicator', ChangeIndicator);

	function ChangeIndicator() {
		return {
			restrict: 'E',
			templateUrl: 'templates/_change-indicator.html',
			scope: {
				data: '=',
                color: '@',
				rateDecimals: '=?',
                pctDecimals: '=?',
                valueType: '@?',
                displayRateOfChange: '=?'
            },
			controller: ChangeIndicatorController,
			controllerAs: 'vm',
			bindToController: true,
             link: function (scope, element, attrs) {

               scope.color = attrs.color;
                scope.textCss = "dark-text";

            
               
            }
		};
	}

	ChangeIndicatorController.$inject = ['$scope'];
	
	function ChangeIndicatorController($scope) {
		var vm = this;

        activate();
        vm.textCss = vm.color;

        $scope.$watch('vm.data', activate);

        function activate() {
            vm.displayRateOfChange = _.isUndefined(vm.displayRateOfChange) ? true : vm.displayRateOfChange;
            vm.valueType = vm.valueType || 'number'; 
            vm.typeOfChange = vm.typeOfChange || 'number';
            vm.rateDecimals = _.isUndefined(vm.rateDecimals) ? 2 : vm.rateDecimals;
            vm.pctDecimals = _.isUndefined(vm.pctDecimals) ? 2 : vm.pctDecimals;
            if(vm.data){
                vm.canCalculateChange = vm.data.hasOwnProperty('previous') && vm.data.hasOwnProperty('current');
                if(!vm.data.previous && !vm.data.current){
                    vm.noChange = false;
                } else if (vm.data.previous === vm.data.current) {
                    vm.noChange = true;
                } else {
                    vm.noChange = false;
                }
            }
        
            if(vm.canCalculateChange){
                vm.controlCss = getIndicatorCss(vm.data);
                vm.rateOfChange = calculateRateOfChange(vm.data, vm.pctDecimals);
                vm.amountChanged = calculateAmountChanged(vm.data);
            } else{
                vm.controlCss = 'neutral';
            }
        }
	}

    
	function getIndicatorCss(data){
		if(data){
			if(data.current > data.previous){
				return 'pos';
			}else if(data.current < data.previous) {
				return 'neg';
			} else if(data.current === data.previous) {
				return 'neutral';
			}
		}
	}
	
	function calculateAmountChanged(data){
		if(data){
			return Math.abs(data.previous - data.current);
		}	
	}
	
	function calculateRateOfChange(data, pctDecimals) {
		if(data){
			if(data.previous === 0 && data.current === 0){
				return '0.0';
			} else {
				return Math.abs((data.current - data.previous)/(data.previous === 0 ? data.current : data.previous)*100).toFixed(pctDecimals);
			}
		}
	}
})();