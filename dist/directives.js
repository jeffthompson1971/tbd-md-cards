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
!(function() {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('imListItem', IMListItem);

    function IMListItem() {
        return {
            transclude: true,
            scope: {

                listing: '='

            },
            template: ' <div class="item item-avatar item-icon-right">\
                    <img src="img/jon-snow.jpg">\
                    <h2>Jon Snow</h2>\
                    <p>Da illest illegitimate</p>\
                    <i class="icon ion-chatbubble muted"></i>\
                </div>',

            link: function(scope, element, attrs) {

                scope.source = attrs.source;

            }
        }
    }

})();
!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('listingImage', ListingImage);

    function ListingImage() {
        return {
           // transclude: true,
            scope: {

                listing: '='

            },
            //template: '<img src="{{source}}"></img>',

            link: function (scope, element, attrs) {

                scope.source = attrs.source;

                //var el = angular.element(element.find('#image-l'));
                var el = angular.element(element[0].querySelector('#image-l'));
                el.css({
                    'background-image': 'url(' + scope.source + ')'

                });

            }
        }
    }

})();
!(function() {
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

            link: function(scope, element, attrs) {
                element.bind('click', function() {

                    scope.share();
                });

                var myEl = angular.element(document.querySelector('#fab-share'));
            }
        };
    }

    ShareItController.$inject = ['$scope', 'ShareSvc', '$mdDialog', 'PalSvc'];

    function ShareItController($scope, ShareSvc, $mdDialog, PalSvc ) {

        var vm = this;
        
        vm.expired = true;

        $scope.listing = vm.listing;

        vm.share = function() {

            // show("some long as URL that keeps getting longer and longer");
            ShareSvc.shareIt($scope.listing).then(function(resp) {


                if (resp.data === null || _.isUndefined(resp.data.success) || (resp.data.success === false)) {
                    
                    PalSvc.alert("Sorry :(", "Got it...", "Share service is not contactable please try again in a minute..");
                } else {
                 $scope.url = resp.data.fullUrl;

                 show($scope.url);
                }

            })
        }
        $scope.share = vm.share;
        
        $scope.$watch('vm.listing', function(theListing) {

            if (_.isUndefined(theListing))
                return;
            $scope.listing = theListing;
            
         

        });
        vm.mdDialog = $mdDialog;

        var show = function(url) {

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
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        function DialogController($scope, $mdDialog, theUrl) {
             $scope.$on('keypress', function(onEvent, keypressEvent) {
          if (keypress.which === 120) {
            $scope.keyPressed = 'x';
          }
          else {
            $scope.keyPressed = 'Keycode: ' + keypressEvent.which;
          }
        });


            $scope.theUrl = theUrl;
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.copyError = false;
            $scope.onSuccess = function(e) {
                $scope.hide()
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);

                e.clearSelection();
            };
            $scope.onError = function(e) {

                var myEl = angular.element( document.querySelector( '#errorTip' ) );
                myEl.css('visibility','visible');
                $scope.copyError = true;
              
            }
        }

    };
})();
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
            //var el = ($scope.meElement.find('#md-card-image'));
            
              var el = angular.element($scope.meElement [0].querySelector('#md-card-image'));

            el.css({
                'background-image': 'url(' + theListing.photoUrl + ')'

            });
            
            $scope.listing = theListing;
        });

        $scope.$watch('vm.showings', function (theShowings) {

           if (_.isUndefined(theShowings))
                return;
           for (var i = 0; i < theShowings.length; ++i) {

                      var showing = theShowings[i];

                        if (showing.potentialOffer) {
                              $scope.listing.trends.push("POTENTIAL OFFER");
                            //alert();

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
!(function () {

    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }

    angular
        .module(appName)
        .directive('mdCardMred', MdCardMred);

    function MdCardMred() {
        return {

            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-mred.view.html" : 'templates/_md-card-mred.view.html';
            },
            scope: {

                listing: '=',
                data: '=',
                rateDecimals: '=?',
                pctDecimals: '=?',
                valueType: '@?',
                displayRateOfChange: '=?'
            },
            controller: MdCardMredController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.title = attrs.title;

                scope.browse = function (url) {

                     $window.open(url, '_blank');

                };

            }
        };
    }

    MdCardMredController.$inject = ['$scope', 'PalSvc'];

    function MdCardMredController($scope, PalSvc) {
        var vm = this;
        $scope.listing = vm.listing;
        activate();

         
        vm.openInBrowser = PalSvc.openWindow;
        //$scope.$watch('vm.data', activate);
        
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
!(function () {

    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }

    angular
        .module(appName)
        .directive('mdCardRedfin', MdCardRedfin);

    function MdCardRedfin() {
        return {

            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-redfin.view.html" : 'templates/_md-card-redfin.view.html';
            },
            scope: {

                listing: '=',
                data: '=',
                rateDecimals: '=?',
                pctDecimals: '=?',
                valueType: '@?',
                displayRateOfChange: '=?'
            },
            controller: MdCardRedfinController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.title = attrs.title;

                scope.browse = function (url) {

                     $window.open(url, '_blank');

                };

            }
        };
    }

    MdCardRedfinController.$inject = ['$scope', 'PalSvc'];

    function MdCardRedfinController($scope, PalSvc) {
        var vm = this;
        $scope.listing = vm.listing;
        activate();

         
        vm.openInBrowser = PalSvc.openWindow;
        //$scope.$watch('vm.data', activate);
        
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
!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdCardSentri', MdCardSentri);

    function MdCardSentri() {

        return {
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-sentrilock.view.html" : 'templates/_md-card-sentrilock.view.html';
            },
            restrict: 'E',

            scope: {
                sentrilock: '='

            },
            controller: MdCardSentriController,
            controllerAs: 'vm',
            bindToController: true,


            link: function (scope, element, attrs) {
                scope.title = attrs.title;
                scope.pass = attrs.pass;
            }
        };
    }

    MdCardSentriController.$inject = ['$scope'];

    function MdCardSentriController($scope) {
        var vm = this;
        
        $scope.sentrilock = vm.sentrilock;
        console.log("sentri controller");
        
        
     
        
        // // watch for changes in the listing to update the new photo
        $scope.$watch('vm.sentrilock', function (data) {

            if (_.isUndefined(data))
                return;
            $scope.sentrilock = data;

        });

    }
})();
!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdCardTrulia', MdCardTrulia);

    function MdCardTrulia() {
        return {

            restrict: 'E',
            templateUrl: function (elem, attrs) {

                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-trulia.view.html" : 'templates/_md-card-trulia.view.html';
            },
            scope: {

                listing: '=',
                data: '=',
                rateDecimals: '=?',
                pctDecimals: '=?',
                valueType: '@?',
                displayRateOfChange: '=?'
            },
            controller: MdCardTruliaController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {

                scope.title = attrs.title;

                // handle the button press to GO to trulia
                scope.go = function (val) {

                    scope.$parent.navToSite(val);
                }

                scope.logoUrl = (attrs.logourl !== undefined) ? attrs.logourl : "assets/logos/trulia_logo_40x113.png";
               
            }
        };
    }

    MdCardTruliaController.$inject = ['$scope', 'PalSvc'];

    function MdCardTruliaController($scope, PalSvc) {
        var vm = this;
        $scope.listing = vm.listing;
        activate();
        
        vm.openInBrowser = PalSvc.openWindow;
        

        //$scope.$watch('vm.data', activate);
        
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
    SignupCssController.$inject = ['$scope', 'PrincipalSvc', 'CssSvc', 'PalSvc'];

    function SignupCssController($scope, PrincipalSvc, CssSvc, PalSvc) {

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
                <input id="i3" ng-model="vm.login.password" required></input>\
            </md-input-container>\
        <footer>\
        <md-checkbox ng-model="vm.login.perm" checked label="permission">\
       Use broker permissions if available.\
        </md-checkbox><br>\
       <md-button type="submit" value="Login" class="md-raised md-secondary centerme login-form-button">LOG IN</md-button>\
                <md-button value="Cancel" class="md-raised md-warn centerme login-form-button" ng-click="vm.showForm=false">Cancel </md-button>\
      </footer>\
      </div>',

            link: function (scope, element, attrs) {

                scope.source = attrs.source;

            }
        }
    }
    SignupSentriController.$inject = ['$scope', 'PalSvc', 'PrincipalSvc'];

    function SignupSentriController($scope, PalSvc, PrincipalSvc) {
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
!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdShowingSummary', MdShowingSummary);

    function MdShowingSummary() {
        return {

            restrict: 'E',

            templateUrl: function (elem, attrs) {

                return (attrs.templatepath) ? attrs.templatepath + "/_md-showing-summary.view.html" : 'templates/_md-showing-summary.view.html';
            },

            scope: {
                showings: '=',
                ngClass: "=",

            },

            controller: MdShowingSummaryController,

            controllerAs: 'vm',

            bindToController: true,

            link: function (scope, element, attrs) {

                scope.$watch("ngClass", function (value) {
                    $(element).attr("class", value)
                });

                scope.logoUrl = (attrs.logourl !== undefined) ? attrs.logourl : "assets/logos/showings.com_40x146.png";

                scope.title = attrs.title;

                scope.sysId = attrs.sysid;

                scope.imgUrl = attrs.imgurl;

                scope.collapsed = true;

                scope.positiveFB = [];

                scope.negativeFB = [];

                scope.meElement = element;

                // the following used for the aggregate showing stats
                scope.posCnt = 0;
                scope.negCnt = 0;
                scope.totalCnt = 0;

                var parentEl = angular.element(element.find('md-list-item'));

                var el = angular.element(element.find('#md-card-image'));

                el.css({
                    'background-image': 'url(' + scope.imgUrl + ')'
                });

                // watch for changes in the listing to update the new photo
                scope.$watch('vm.showings', function (showings) {

                    // ng-class failed in a directive - so i use this approach
                    // to color the feedback based on sentiment
                    for (var i = 0; i < showings.length; ++i) {

                        var myEl = angular.element(element.find('md-list-item')[i]);

                        if (showings.potentialOffer) {


                        }
                        if (showings[i].sentiment < -2) {
                            scope.negativeFB.push(showings[i]);
                            scope.negCnt += 1;
                            myEl.addClass('negative-color');

                        } else if (showings[i].sentiment > 2) {
                            scope.posCnt += 1;
                            scope.positiveFB.push(showings[i]);
                            myEl.addClass('positive-color');
                        }
                        scope.totalCnt += 1;
                    }

                });

            }
        };
    }

    MdShowingSummaryController.$inject = ['$scope', '$mdDialog'];

    function DialogController($scope, $mdDialog, showing) {

        $scope.showing = showing;

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        $scope.dial = function (number) {
            if (window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + number, '_system');
            } 
           
        };
    };

    function MdShowingSummaryController($scope, $mdDialog) {
        var vm = this;
        $scope.showings = vm.showings;
        // activate();

        vm.mdDialog = $mdDialog;
        vm.show = function (ev, selShowing) {

            var parentEl = angular.element($scope.meElement.find('md-list-item'));

            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showing: selShowing
                    },
                    controller: DialogController,
                    templateUrl: 'templates/_md-card-showing-detail.view.html',
                    parent: parentEl,
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        }

        //$scope.$watch('vm.data', activate);
        $scope.show = $scope.vm.show;
        function activate() {



        }
    }



})();
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
                               <h5>{{agentId}}</h5>\
                            <md-input-container md-no-float >\
                                <input placeholder="" name="agentId" ng-model="vm.mlsdata.agentId" class="input-border" required>\
                            </md-input-container>\
                        </div>\
                        <div class= "input-background">\
                            <h5>{{pass}}</h5>\
                            <md-input-container md-no-float >\
                                <input type= "password" name="agentPassword" placeholder="" ng-model="vm.mlsdata.password" class="input-border" required>\
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

                // handle the button press to GO to trulia
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
   


        $scope.theListing.trends = [];

        $scope.$watch('vm.showings', function (showings) {
            vm.showings = showings;
           // $scope.showings = showings;
            updateShowingsViewModel($scope);

        });

        $scope.$watch('vm.listing', function (theListing) {
            vm.listing = theListing;
           // $scope.theListing = theListing;
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