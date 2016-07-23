!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('signupPage', SignupPage);

    function SignupPage() {
        return {

            restrict: 'E',
            scope: {
                mlsset: '=',
                mlsdata: '='
            },
            controller: SignupPageController,
            controllerAs: 'vm',
            bindToController: true,
                    
            template: ' <div class= "login-div">\
                        <div class= "input-background">\
                        <md-input-container flex>\
                            <h5>Primary MLS</h5>\
                            <md-select ng-model="mlsdata.pMLS" ng-model-options="{trackBy: \'$value.userLoc\'}" required>\
                                <md-option ng-repeat="mls in vm.mlsset" value="{{mls.id}}">\
                               {{mls.id}} - {{mls.name}}\
                                </md-option>\
                            </md-select>\
                        </md-input-container>\
                        </div>\
                        <div class= "input-background">\
                            <md-input-container >\
                                <label class="label">{{agentId}}</label>\
                                <input autocomplete="off"  name="agentId" ng-model="vm.mlsdata.agentId" required class="input-border" >\
                            </md-input-container>\
                        </div>\
                        <div class= "input-background">\
                            <md-input-container>\
                                <label class="label">{{pass}}</label>\
                                <input autocomplete="off" type= "password" name="agentPassword" required ng-model="vm.mlsdata.password" class="input-border" >\
                            </md-input-container>\
                        </div>\
                    </div>',

            link: function (scope, element, attrs) {
                scope.agentId = attrs.agentid;

                scope.pass = attrs.pass;

            }
        };
    }

    SignupPageController.$inject = ['$scope'];

    function SignupPageController($scope) {
        var vm = this;

    }


})();