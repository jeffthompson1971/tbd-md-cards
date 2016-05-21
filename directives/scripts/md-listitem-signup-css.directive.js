!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdListitemSignupCss', SignupCss);

    function SignupCss() {
        return {
            
            transclude: true,
            
            controller: SignupCssController,
            
            controllerAs: 'vm',
            
            scope: {

                //  listing: '='

            },

            template: '<div class="item signups">\
                    <img src="assets/logos/ShowingsCom_243.png">\
                     <md-icon ng-if="vm.active" md-svg-src="assets/icons/checkmark-32x20.svg" class="signup-icon"></md-icon>\
                    <md-button ng-if="!vm.active && !vm.showForm" class="md-raised signup-btn" ng-click="vm.showForm = !vm.showForm">Connect</md-button>\
            <form  ng-show="vm.showForm" ng-submit="vm.submitLogin(login.perm, login.username, login.password)">\
           <md-input-container flex>\
                            <h5>Location</h5>\
                            <md-select ng-model="vm.login.userLoc"  ng-model-options="{trackBy: \'$value.userLoc\'}" required>\
                                <md-option ng-repeat="loc in vm.locSet" name="userLoc," value="{{loc.userLoc}}">\
                              {{loc.name}}\
                                </md-option>\
                            </md-select>\
                        </md-input-container><br>\
            <md-input-container>\
                <label for="i2">user name</label>\
                <input id="i2" ng-model="vm.login.userName" required></input>\
            </md-input-container>\
            <md-input-container>\
                <label for="i3">password</label>\
                <input id="i3" ng-model="vm.login.password" required></input>\
            </md-input-container>\
            <footer>\
                <md-button type="submit" value="Login" class="md-raised md-secondary centerme login-form-button">LOG IN</md-button>\
                <md-button value="Cancel" class="md-raised md-warn centerme login-form-button" ng-click="vm.showForm=false">Cancel </md-button>\
                </footer>\
            </form>\
             </div>',

            link: function (scope, element, attrs) {

                scope.active = false;

            }
        }
    }
    SignupCssController.$inject = ['$scope', 'PrincipalSvc', 'CssSvc', 'PalSvc', '$ionicScrollDelegate'];

    function SignupCssController($scope, PrincipalSvc, CssSvc, PalSvc, $ionicScrollDelegate) {

        var vm = this;
        var myId = 8; // TODO - do this better using config and enums
        vm.showForm = false;

        var mySubscription = PrincipalSvc.getSubsriptionInfo(myId);

        vm.active = (mySubscription !== null && mySubscription.isActive) ? true : false;
 
        vm.locSet = [
            {
                userLoc: "11,18,CHIC",
                name: "Chicago"
            }
        ]
        
        vm.login = {
            userLoc: "",
            userName: "",
            password: ""
        }
        
        $scope.$watch('vm.showForm', function(show) {

            if (_.isUndefined(show))
                return;

           if (show) {
                $ionicScrollDelegate.scrollBottom();
           }
           
            
        })
        vm.submitLogin = function (values) {

            vm.login.extSysId = myId;

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