!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdListitemSignupSentri', SignupSentri);

    function SignupSentri() {
        return {
            transclude: true,
             controller: SignupSentriController,
            controllerAs: 'vm',
            scope: {

                //  listing: '='

            },

            template: '<div class="item signups">\
                    <img src="assets/logos/sentrilock-logo.png">\
                    <md-icon ng-if="vm.active" md-svg-src="assets/icons/checkmark-32x20.svg" class="signup-icon"></md-icon>\
                    <md-button ng-if="!vm.active && !vm.showForm" class="md-raised signup-btn" ng-click="vm.showForm = !vm.showForm">Connect</md-button>\
            <form  ng-show="vm.showForm" ng-submit="vm.submitLogin(login.perm, login.username, login.password)">\
            <md-input-container>\
                <label for="i2">user name</label>\
                <input id="i2" ng-model="vm.login.userName" required></input>\
            </md-input-container>\
            <md-input-container>\
                <label for="i3">password</label>\
                <input id="i3" type="password" ng-model="vm.login.password" required></input>\
            </md-input-container>\
        <footer>\
        <md-checkbox ng-model="vm.login.perm" checked label="permission">\
       Use broker permissions if available.\
        </md-checkbox><br>\
       <md-button type="submit" value="Login" class="md-raised md-secondary centerme login-form-button">LOG IN</md-button>\
                <md-button value="Cancel" class="md-raised md-warn centerme login-form-button" ng-click="vm.showForm=false">Cancel </md-button>\
      </footer>\
       </form>\
      </div>',

            link: function (scope, element, attrs) {

                scope.source = attrs.source;

            }
        }
    }
    SignupSentriController.$inject = ['$scope', 'PalSvc', 'PrincipalSvc', '$ionicScrollDelegate'];

    function SignupSentriController($scope, PalSvc, PrincipalSvc, $ionicScrollDelegate) {
        var vm = this;
        var myId = 2; // TODO - do this better using config and enums
        vm.showForm = false;

        var mySubscription = PrincipalSvc.getSubsriptionInfo(myId);

        vm.active = (mySubscription !== null && mySubscription.isActive) ? true : false;
        
        // TODO - remove sue's credentials
        vm.login = {
            extSysId: myId,
            perm: false,
            userName: "", // "51259-MCH",
            password: "" // "janebug"
        }
          
        $scope.$watch('vm.showForm', function(show) {

            if (_.isUndefined(show))
                return;

           if (show) {
                $ionicScrollDelegate.scrollBottom();
           }
           
            
        })

        vm.submitLogin = function (values) {
            //if (vm.login.perm)
            vm.login.perm = (vm.login.perm) ? "broker" : "agent";
             PrincipalSvc.createServiceAccount(vm.login).then(function (resp) {
                if (resp.status == 200 && resp.data.success === true) {
                    vm.active = true;
                    vm.showForm = false;
                    PrincipalSvc.syncSubscriptions();
                    PalSvc.alert("Authentication successful!", "Sweet, thanks!");

                } else {

                    PalSvc.alert("Invalid user name or password please try again...", "Got it");

                }
            });
        }
    }
})();