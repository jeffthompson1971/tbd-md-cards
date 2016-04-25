!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('shareIt', ShareIt);

    function ShareIt($animate) {
        return {

            restrict: 'A',

            scope: {
                listing: '='
            },
            controller: ShareItController,
            controllerAs: 'vm',
            bindToController: true,

            link: function (scope, element, attrs) {
                element.bind('click', function () {

                    scope.share();
                });

                var myEl = angular.element(document.querySelector('#fab-share'));
            }
        };
    }

    ShareItController.$inject = ['$scope', 'ShareSvc', '$mdDialog', 'PalSvc', 'ConfigSvc', '$cordovaSocialSharing'];

    function ShareItController($scope, ShareSvc, $mdDialog, PalSvc, ConfigSvc, $cordovaSocialSharing) {

        var vm = this;

        vm.expired = true;

        $scope.listing = vm.listing;

        vm.share = function () {

            // show("some long as URL that keeps getting longer and longer");
            ShareSvc.shareIt($scope.listing).then(function (resp) {


                if (resp.data === null || _.isUndefined(resp.data.success) || (resp.data.success === false)) {

                    PalSvc.alert("Sorry :(", "Got it...", "Share service is not contactable please try again in a minute..");
                } else {

                    $scope.url = resp.data.fullUrl;

                    if (ConfigSvc.isMobileApp()) {

                        var msgStr = "Current activity on \"" + $scope.listing.address + "\": \n";

                        $cordovaSocialSharing
                            .share(msgStr, "Your listing details from SnapListings.io!", null, $scope.url) // Share via native share sheet
                            .then(function (result) {
                                PalSvc.alert("Share successful", "OK", "Your share was successful...");
                                //alert("successfully shared: " + JSON.stringify(result));

                            }, function (err) {
                                PalSvc.alert("Share failed", "OK", JSON.stringify(err));
                                // alert(JSON.stringify(err));
                            });

                    } else {

                        show($scope.url);
                    }
                }

            })
        }
        $scope.share = vm.share;

        $scope.$watch('vm.listing', function (theListing) {

            if (_.isUndefined(theListing))
                return;
            $scope.listing = theListing;
        });

        vm.mdDialog = $mdDialog;

        var show = function (url) {

            $scope.theUrl = url;
            $scope.vm.mdDialog.show({
                locals: {
                    theUrl: url
                },
                controller: DialogController,

                template: '<md-dialog style="width: 400px; padding: 10px"> <md-dialog-content>\
                                <h4> Copy the link to share this listing...</h4>\
                        <input type="text" style="float: left; width: 80%" id="shareUrl" value="{{theUrl}}">\
                        <md-button style="float:right; min-width: inherit"  ngclipboard data-clipboard-target="#shareUrl" ngclipboard-success="onSuccess(e);" ngclipboard-error="onError(e);">\
                        <img src="assets/icons/clippy.svg" width=20 alt="Copy to clipboard">\
                         <md-tooltip id="errorTip" md-visible="copyError" style="visibility: hidden; font-size: 16px; font-weight: 600" md-direction="left">Link selected - press Ctrl-C \n to copy </md-tooltip></md-button> </md-dialog-content></md-dialog>',

                parent: angular.element(document.body),


                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        function DialogController($scope, $mdDialog, theUrl) {
            $scope.$on('keypress', function (onEvent, keypressEvent) {
                if (keypress.which === 120) {
                    $scope.keyPressed = 'x';
                }
                else {
                    $scope.keyPressed = 'Keycode: ' + keypressEvent.which;
                }
            });


            $scope.theUrl = theUrl;
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };

            $scope.copyError = false;
            $scope.onSuccess = function (e) {
                $scope.hide()
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);

                e.clearSelection();
            };
            $scope.onError = function (e) {

                var myEl = angular.element(document.querySelector('#errorTip'));
                myEl.css('visibility', 'visible');
                $scope.copyError = true;

            }
        }

    };
})();