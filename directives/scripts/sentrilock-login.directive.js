(function () {
 var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('sentrilockLogin', SentrilockLogin);

    SentrilockLogin.$inject = [];

    /* @ngInject */
    function SentrilockLogin() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: sentrilockLoginController,
            controllerAs: 'vm',
            transclude: true,
            restrict: 'E',
            templateUrl: 'templates/_md-card-sentri-login.view.html',
            scope: {
                ngModel: '=',
            //    sitesProductivityData: '=',
             //   colors: "="
            }
        };
        return directive;

    }

    sentrilockLoginController.$inject = [ '$scope', 'SentriSvc'];

   


    /* @ngInject */
    function sentrilockLoginController( $scope, SentriSvc) {
        var vm = this;

     

        // put a deep watch on our main view model ...
     //   $scope.$watch('vm.sitesProductivityData', updateView, true);

   // TODO - remove sue's credentials
    vm.login = {
      extSysId: 2,
      perm: false,
      username: "55103-MCH",
      password: "55103"
    }


    vm.submitLogin = function (values ) {
           //if (vm.login.perm)
           vm.login.perm = (vm.login.perm) ? "broker" : "agent";
           SentriSvc.createAccount(vm.login).then (function (resp) {
                 console.log(resp);
               
           });
       }

        // this makes sure we have a 'current' value
       
    }
})();