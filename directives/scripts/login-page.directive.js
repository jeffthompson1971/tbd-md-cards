!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('loginPage', LoginPage);

    function LoginPage() {
        return {

            restrict: 'E',

            scope: {
                title: '@',
                pass: '@'
            },
            controller: LoginPageController,
            controllerAs: 'vm',
            bindToController: true,

            template: '<div class= "login-div">\
                        <div class= "input-background">\
                            <h5>{{title}}</h5>\
                            <md-input-container md-no-float>\
                                <input id="login-email" placeholder="" class= "input-border">\
                            </md-input-container>\
                        </div>\
                        <div class= "input-background">\
                            <h5>{{pass}}</h5>\
                            <md-input-container md-no-float>\
                                <input type="password" name="loginPassword" placeholder="" class= "input-border">\
                            </md-input-container>\
                        </div>\
                    </div>',
            link: function (scope, element, attrs) {
                scope.title = attrs.title;
                scope.pass = attrs.pass;
            }
        };
    }

    LoginPageController.$inject = ['$scope'];

    function LoginPageController($scope) {
        var vm = this;
    }
})();