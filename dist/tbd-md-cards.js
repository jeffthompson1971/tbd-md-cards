!(function() {
THE_APP='tbd';
angular.module('tbd', []);
})();
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
            transclude: true,
          
            template: '<div style="width: inherit; height: inherit; background-size: cover; background-position: center center; background-repeat: no-repeat;" imagenie="{{source}}"></div>',
            link: function (scope, element, attrs) {

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

                    PalSvc.alert("Sorry :(", "Got it...", "Share service is not contactable please try again in a few minutes...");

                } else {

                    $scope.url = resp.data.fullUrl;

                    if (ConfigSvc.isMobileApp()) {

                        var msgStr = "Current activity on \"" + $scope.listing.address + "\": \n";

                        $cordovaSocialSharing
                            .share(msgStr, "What's trending on your listing - only from SnapListings.io!", null, $scope.url) // Share via native share sheet
                            .then(function (result) {
                                PalSvc.alert("Done", "OK", "All good, no drama...");
                                //alert("successfully shared: " + JSON.stringify(result));

                            }, function (err) {
                                PalSvc.alert("Fail", "OK", JSON.stringify(err));
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

            $scope.listing = theListing;

            // TODO - this needs to look for any showing service ID not just
            // hardcode CSS 
            if (theListing.activityAggregate && theListing.activityAggregate.snapshots) {

                var snaps = theListing.activityAggregate.snapshots;

                _.each(snaps, function (snap) {

                    if (_.has(snap, "listing_trend")) {

                        $scope.listing.trends.push(snap.listing_trend);
                    }
                })

                if (theListing.activityAggregate.snapshots["8"]) {

                    vm.showings = (theListing.activityAggregate.snapshots["8"].data) ?
                        theListing.activityAggregate.snapshots["8"].data : [];
                } else if (theListing.activityAggregate.snapshots["10"]) {

                    vm.showings = (theListing.activityAggregate.snapshots["10"].data) ?
                        theListing.activityAggregate.snapshots["10"].data : [];
                } else {
                    vm.showings = [];

                }
            } else {
                vm.showings = [];
            }
        });

        $scope.$watch('vm.showings', function (theShowings) {


            if (_.isUndefined(theShowings))
                return;
            for (var i = 0; i < theShowings.length; ++i) {

                var showing = theShowings[i];

                if (showing.potentialOffer) {
                    $scope.listing.trends.push("POTENTIAL OFFER");
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
!(function() {
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
            templateUrl: function(elem, attrs) {
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
            link: function(scope, element, attrs) {
                scope.title = attrs.title;
                scope.browse = function(url) {
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

        $scope.$watch('vm.listing', function(theListing) {

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
                sentrilock: '=',
                listing: '=',
                limit: "@",

            },
            controller: MdCardSentriController,
            controllerAs: 'vm',
            bindToController: true,


            link: function (scope, element, attrs) {
                scope.title = attrs.title;
                scope.pass = attrs.pass;
                scope.meElement = element;
                scope.limit = attrs.limit;
            }
        };
    }

    function DialogController($scope, $filter, $rootScope, $mdDialog, PalSvc, IS_MOBILE_APP, SYSTEM_EVENT, sentri) {

        $scope.sentri = sentri;

        $scope.haveUserInfo = (sentri.AccessType !== "ContractorCode");

        $scope.showActions = IS_MOBILE_APP && $scope.haveUserInfo;

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        $scope.sendMail = function (addy, wholeRec) {

            var subject = "Regarding Sentrilock access at " + wholeRec.Location;
            var emailList = [];
            emailList.push(addy);

            PalSvc.email(emailList, subject);
        };

        $scope.dial = function (number) {

            var dialable = $filter('normalizePhoneNumber')(number, true);

            if (IS_MOBILE_APP && window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + dialable, '_system');
            }
        };

        $scope.addToContacts = function (entry) {

            var normalizedContact = {
                name: {}
            };
            // first try using AgentFirstName and last...
            if (entry.AgentFirstName && entry.AgentLastName) {
                normalizedContact.name.familyName = entry.AgentLastName;
                normalizedContact.name.givenName = entry.AgentFirstName;

            } else if (entry.ContactName) {
                // if that's not there try ContactName
                var nameBits = contact.name.split(" ");
                if (nameBits.length < 2) {
                    // only have one name so assume it's first
                    normalizedContact.name.givenName = nameBits[0];
                } else {
                    normalizedContact.name.givenName = nameBits[0];
                    normalizedContact.name.familyName = nameBits[nameBits.length - 1];
                }

            } else {
                alert("Need at least a name");
                return;
            }

            // now grab phone number(s)
            if (entry.ContactNumber || entry.PhoneNumber) {
                var normCtNum = undefined;
                var normPhnNum = undefined;
                normalizedContact.phoneNumbers = [];
                if (entry.ContactNumber) {
                    normCtNum = $filter('normalizePhoneNumber')(entry.ContactNumber);
                    normalizedContact.phoneNumbers.push({
                        type: "work",
                        value: normCtNum
                    })
                }
                if (entry.PhoneNumber) {
                    normPhnNum = $filter('normalizePhoneNumber')(entry.PhoneNumber);

                    if (normCtNum !== normPhnNum) {
                        normalizedContact.phoneNumbers.push({
                            type: "work",
                            value: normPhnNum
                        })
                    }
                }
            }

            // now grab any emails...
            if (entry.emailAddy || entry.emailAddy2) {
                normalizedContact.emails = [];
                if (entry.emailAddy) {
                    normalizedContact.emails.push({
                        type: "work",
                        value: entry.emailAddy
                    });
                }
                if (entry.emailAddy2 && (entry.emailAddy !== entry.emailAddy2)) {
                    normalizedContact.emails.push({
                        type: "work",
                        value: entry.emailAddy2
                    });

                }

            }
            /*
                alert("Pref: "      + contacts[i].organizations[j].pref       + "\n" +
                "Type: "        + contacts[i].organizations[j].type       + "\n" +
                "Name: "        + contacts[i].organizations[j].name       + "\n" +
                "Department: "  + contacts[i].organizations[j].department + "\n" +
                "Title: "       + contacts[i].organizations[j].title);
            */

            var organizations = [];
            // add Association or CompanyName
            if (entry.Association && entry.Association.length > 1) {
                organizations.push({
                    type: "Association",
                    name: entry.Association

                })
            }
            if (entry.CompanyName && entry.CompanyName.length > 1) {
                organizations.push({
                    type: "Company",
                    name: entry.CompanyName
                })
            }
            // if we have any organizations add them ...
            if (organizations.length > 0) {
                normalizedContact.organizations = organizations;
            }
            normalizedContact.note = "From SentriLock entry log.";
            // fire it off to our contacts module to do the heavy lifting
            $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, normalizedContact);
        }
    };

    MdCardSentriController.$inject = ['$scope', '$mdDialog', '$filter'];

    function MdCardSentriController($scope, $mdDialog, $filter) {

        var vm = this;

        $scope.entriesNoOneDay = $filter('filterOutOneDayCodeGen')(vm.sentrilock.entries);

        if (vm.limit && vm.limit != -1) {

            $scope.entries = $scope.entriesNoOneDay.slice(0, vm.limit);
        } else {

            $scope.entries = $scope.entriesNoOneDay;
        }

        vm.mdDialog = $mdDialog;

        vm.show = function (ev, selSentri) {

            console.log('selsentri', selSentri);
            // var parentEl = angular.element($scope.$$watchers.find('md-list-item'));
            $scope.vm.mdDialog.show({
                locals: {
                    sentri: selSentri
                },
                controller: DialogController,
                templateUrl: 'templates/_md-card-sentri-detail.view.html',
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        }

        // // watch for changes in the listing to update the new photo
        $scope.show = $scope.vm.show;

        $scope.$watch('vm.sentrilock', function (data) {

            if (_.isUndefined(data))
                return;

            $scope.entriesNoOneDay = $filter('filterOutOneDayCodeGen')(vm.sentrilock.entries);

            if (vm.limit && vm.limit != -1) {
                $scope.entries = $scope.entriesNoOneDay.slice(0, vm.limit);

            } else {
                $scope.entries = $scope.entriesNoOneDay;
            }
        });
    }
})();

/*
"object:150"
AccessLogID
:
"AL00002J1U5O"
AccessType
:
"SmartMACGen"
AccessedBy
:
"AG0000008F2M"
AccessedByContact
:
"(847) 222-5000 <a href='mailto:stephanie.szigetvari@cbexchange.com?subject=425+Grand+Meadow+Lane+MCHENRY+IL+60051'>stephanie.szigetvari@cbexchange.com</a>"
AccessedByName
:
"Stephanie Szigetvari - Coldwell Banker Residential<br>(847) 222-5000 <a href='mailto:stephanie.szigetvari@cbexchange.com?subject=425+Grand+Meadow+Lane+MCHENRY+IL+60051'>stephanie.szigetvari@cbexchange.com</a>"
AgentFirstName
:
"Stephanie"
AgentID
:
"AG0000008F2M"
AgentLastName
:
"Szigetvari"
Association
:
"MainStreet Organization of REALTORS"
CompanyName
:
"Coldwell Banker Residential"
ContactName
:
"Stephanie Szigetvari"
ContactNumber
:
"(847) 222-5000"
Created
:
"2016-07-31 14:23:05"
Date
:
"Sunday, Jul 31 2016"
EmailAddress
:
"<a href='mailto:stephanie.szigetvari@cbexchange.com?subject=425+Grand+Meadow+Lane+MCHENRY+IL+60051'>stephanie.szigetvari@cbexchange.com</a>"
FromOneDayCode
:
false
LBID
:
"LB00000090BI"
LBSerialNumber
:
"00450831"
LoanNumber
:
"None"
Location
:
"425 Grand Meadow Lane MCHENRY IL 60051"
Origin
:
""
OwnerAgentID
:
"AG000000766B"
PhoneNumber
:
"(847) 222-5000"
RoleCode
:
""
Time
:
"13:23:05"
UTCAccessedDT
:
"Sunday, Jul 31 2016 - 01:23 PM"
UserFirstName
:
"Stephanie"
UserID
:
"US0000008SBD"
UserLastName
:
"Szigetvari"
emailAddy
:
"stephanie.szigetvari@cbexchange.com"
emailAddy2
:
"stephanie.szigetvari@cbexchange.com"
rowcolor
:
"#FF9"
*/
/*

// STRANGE CASE
{
"AccessedByContact":"",
"RoleCode":"",
"Association":null,
"OwnerAgentID":"AG000000766B",
"LBID":"LB0000009AEV",
"FromOneDayCode":false,
"UserID":"US000000824J",
"Origin":"",
"emailAddy":null,
"Time":"19:17:04",
"Created":"2016-08-15 20:19:09",
"Date":"Monday, Aug 01 2016",
"UserLastName":"Tabick",
"EmailAddress":"",
"LoanNumber":"None",
"ContactNumber":null,
"emailAddy2":null,
"AccessedByName":"ROB WILDER 847-951-3033",
"ContactName":"ROB WILDER 847-951-3033",
"AgentFirstName":null,
"Location":"9617 Richardson Road SPRING GROVE IL 60081",
"PhoneNumber":"",
"CompanyName":"",
"AgentID":null,
"AccessLogID":"AL00002JSBSK",
"rowcolor":"#FF9",
"AccessType":"1DayCode",
"AgentLastName":null,
"UserFirstName":"Nicholas",
"LBSerialNumber":"00470838",
"AccessedBy":"LBSNCNTCODE1",
"UTCAccessedDT":"Monday, Aug 01 2016 - 07:17 PM"
},


*/
!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }
    angular
        .module(appName)
        .directive('mdCardShowingAssist', MdCardShowingAssist);

    function MdCardShowingAssist() {
        return {
            restrict: 'E',
            templateUrl: function (elem, attrs) {
                return (attrs.templatepath) ? attrs.templatepath + "/_md-card-showing-assist.view.html" : 'templates/_md-card-showing-assist.view.html';
            },
            scope: {
                showings: '=',
                listing: '=',
                limit: "@",
                ngClass: "=",
            },
            controller: MdCardShowingAssistController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {
                scope.$watch("ngClass", function (value) {
                    $(element).attr("class", value)
                });
                scope.limit = attrs.limit;
                scope.logoUrl = (attrs.logourl !== undefined) ? attrs.logourl : "assets/logos/showingassist-logo.png";
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

            }
        };
    }

    MdCardShowingAssistController.$inject = ['$scope', '$mdDialog', 'ListingSvc'];

    function DialogController($scope, $filter, $rootScope, $mdDialog, IS_MOBILE_APP, SYSTEM_EVENT, showing, listing) {

        $scope.showing = showing;
        $scope.extId = 10;
        $scope.showActions = IS_MOBILE_APP;
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
            var dialable = $filter('normalizePhoneNumber')(number, true);
            if (IS_MOBILE_APP && window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + dialable, '_system');
            }

        };

        $scope.addToContacts = function (showing) {
            if (showing.contact == undefined)
                return;
            var contact = showing.contact;
            var normalizedContact = {
                name: {}
            };
            var nameBits = contact.name.split(" ");

            // ignore any middle initial or name
            if (nameBits.length < 2) {
                // only have one name so assume it's last

                normalizedContact.name.familyName = nameBits[0];
            } else {
                normalizedContact.name.givenName = nameBits[0];
                normalizedContact.name.familyName = nameBits[nameBits.length - 1];

            }
            if (contact.phone) {
                normalizedContact.phoneNumbers = [];
                if (contact.phone.mobile) {

                    normalizedContact.phoneNumbers.push({
                        type: "mobile",
                        value: $filter('normalizePhoneNumber')(contact.phone.mobile)
                    })
                }
                if (contact.phone.office) {

                    normalizedContact.phoneNumbers.push({
                        type: "work",
                        value: $filter('normalizePhoneNumber')(contact.phone.office)
                    })
                }
                if (contact.phone.home) {
                    normalizedContact.phoneNumbers.push({
                        type: "home",
                        value: $filter('normalizePhoneNumber')(contact.phone.home)
                    })
                }

            }
            if (contact.emails) {
                normalizedContact.emails = [];
                for (var i = 0; i < contact.emails.length; i++) {
                    normalizedContact.emails.push({
                        type: "work",
                        value: contact.emails[i]
                    })
                }
                // normalizedContact.emails = contact.emails;
            }

            normalizedContact.note = "From ShowingAssit feedback.";

            $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, normalizedContact);

        }
    };

    function MdCardShowingAssistController($scope, $mdDialog, ListingSvc) {
        var vm = this;

        if (vm.limit && vm.limit != -1) {
            $scope.showings = vm.showings.slice(0, vm.limit);
        } else {
            $scope.showings = vm.showings;
        }

        $scope.theListing = ListingSvc.getSelectedListing();
        $scope.$watch('vm.showings', function (showings, previousShowings) {

            // ng-class failed in a directive - so i use this approach
            // to color the feedback based on sentiment

            // trim to 'limit'
            if (vm.limit && vm.limit != -1) {

                $scope.showings = showings.slice(0, vm.limit);
            } else {
                $scope.showings = showings;
            }


            for (var i = 0; i < showings.length; ++i) {

                // var myEl = angular.element($scope.meEl.find('md-list-item')[i]);

                // if (showings.potentialOffer) {


                // }
                if (showings[i].sentiment < -2) {

                    $scope.negativeFB.push(showings[i]);
                    $scope.negCnt += 1;
                    //  myEl.addClass('negative-color');

                } else if (showings[i].sentiment > 2) {
                    $scope.posCnt += 1;
                    $scope.positiveFB.push(showings[i]);
                    //  myEl.addClass('positive-color');
                }
                $scope.totalCnt += 1;
            }

        });

        vm.mdDialog = $mdDialog;

        vm.show = function (ev, selShowing) {
            console.log(selShowing);
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showing: selShowing,
                        listing: vm.listing

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

        vm.showAll = function (ev, showings, listing) {
            console.log("show all called");
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showings: showings,
                        listing: vm.listing
                    },
                    controller: DialogControllerAll,
                    templateUrl: 'templates/_md-card-showing-detail-all.view.html',
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
             var myRe = /\d\d\d\d\d/g;    
         if (_.isUndefined(theListing))
                return;
            $scope.listing = theListing;
            try{
                  $scope.mZip = myRe.exec(theListing.address)[0]; 
            
            } catch (ex) {
            
                
            }
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
                <input id="i3" type="password" ng-model="vm.login.password" required></input>\
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
                listing: '=',
                limit: "@",
                ngClass: "=",
            },
            controller: MdShowingSummaryController,
            controllerAs: 'vm',
            bindToController: true,
            link: function (scope, element, attrs) {
                scope.$watch("ngClass", function (value) {
                    $(element).attr("class", value)
                });
                scope.limit = attrs.limit;
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

            }
        };
    }

    MdShowingSummaryController.$inject = ['$scope', '$mdDialog', 'ListingSvc'];

    function DialogController($scope, $filter, $rootScope, $mdDialog, PalSvc, IS_MOBILE_APP, SYSTEM_EVENT, showing, listing) {

        $scope.showing = showing;
        $scope.extId = 8;
        $scope.showActions = IS_MOBILE_APP;
        
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        
        $scope.sendMail = function (addy, wholeRec) {

            var subject = "Regarding showing feedback you left at " + listing.address;
            
            var emailList = [];
           
            emailList.push(addy);

            PalSvc.email(emailList, subject);  
        };

        $scope.dial = function (number) {
            
            var dialable =  $filter('normalizePhoneNumber')(number, true);
            
            if (IS_MOBILE_APP && window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + dialable, '_system');
            }

        };
       
        $scope.addToContacts = function (showing) {
            if (showing.contact == undefined)
                return;
            var contact = showing.contact;
            var normalizedContact = {
                name: {}
            };
            var nameBits = contact.name.split(" ");

            // ignore any middle initial or name
            if (nameBits.length < 2) {
                // only have one name so assume it's last
                
                normalizedContact.name.familyName = nameBits[0];
            } else {
                normalizedContact.name.givenName = nameBits[0];
                normalizedContact.name.familyName = nameBits[nameBits.length - 1];

            }
            if (contact.phone) {
                normalizedContact.phoneNumbers = [];
                if (contact.phone.mobile) {
                    
                    normalizedContact.phoneNumbers.push({
                        type: "mobile",
                        value:  $filter('normalizePhoneNumber')(contact.phone.mobile)
                    })
                }
                if (contact.phone.office) {

                    normalizedContact.phoneNumbers.push({
                        type: "work",
                        value: $filter('normalizePhoneNumber')(contact.phone.office)
                    })
                }
                if (contact.phone.home) {
                    normalizedContact.phoneNumbers.push({
                        type: "home",
                        value: $filter('normalizePhoneNumber')(contact.phone.home)
                    })
                }
                
            }
            if (contact.emails) {
                normalizedContact.emails = [];
                for (var i = 0; i < contact.emails.length; i++) {
                    normalizedContact.emails.push({
                        type: "work",
                        value: contact.emails[i]
                    })
                }
               // normalizedContact.emails = contact.emails;
            }
            
            normalizedContact.note = "From showings.com feedback.";

            $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, normalizedContact);
 
        }
    };

    function MdShowingSummaryController($scope, $mdDialog, ListingSvc) {
        var vm = this;

        if (vm.limit && vm.limit != -1) {
            $scope.showings = vm.showings.slice(0, vm.limit);
        } else {
            $scope.showings = vm.showings;
        }

       // $scope.theListing = ListingSvc.getSelectedListing();
        
        // need this so detail dialog can access info like address
      //  vm.listing = $scope.theListing;
        
        $scope.$watch('vm.showings', function (showings, previousShowings) {

            // ng-class failed in a directive - so i use this approach
            // to color the feedback based on sentiment

            // trim to 'limit'
            if (vm.limit && vm.limit != -1) {

                $scope.showings = showings.slice(0, vm.limit);
            } else {
                $scope.showings = showings;
            }


            for (var i = 0; i < showings.length; ++i) {

               // var myEl = angular.element($scope.meEl.find('md-list-item')[i]);

                // if (showings.potentialOffer) {


                // }
                if (showings[i].sentiment < -2) {

                    $scope.negativeFB.push(showings[i]);
                    $scope.negCnt += 1;
                  //  myEl.addClass('negative-color');

                } else if (showings[i].sentiment > 2) {
                    $scope.posCnt += 1;
                    $scope.positiveFB.push(showings[i]);
                   //  myEl.addClass('positive-color');
                }
                $scope.totalCnt += 1;
            }

        });

        vm.mdDialog = $mdDialog;

        vm.show = function (ev, selShowing) {
            console.log(selShowing);
            
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showing: selShowing,
                        listing: vm.listing
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

        vm.showAll = function (ev, showings, listing) {
            console.log("show all called");
            var parentEl = angular.element($scope.meElement.find('md-list-item'));
            $scope.vm.mdDialog.show(
                {
                    locals: {
                        showings: showings,
                        listing: vm.listing
                    },
                    controller: DialogControllerAll,
                    templateUrl: 'templates/_md-card-showing-detail-all.view.html',
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
/* feedback structure

"startTime":"2016-07-26T18:00:00+00:00",
"feedback":"",
"potentialOffer":false,
"sentiment":0,
"time":"6:00 PM - 7:00 PM",
"intShowingId":"fe7a48cd-0f65-4617-a188-a7eb94109cd1",
"listing_id":"6D5DE6BD-FF92-4030-8A8A-3F302F8C05F9",
"type":{
"result":"Cancelled by Agent",
"name":"Showing",
"msg":""
},
"date":"07-26-2016",
"contact":{
"phone":{
"office":"847-634-1000",
"mobile":""
},
"name":"Justin Mcandrews"
}

OR type is :
"9:45 AM - 11:30 AM"
type: {
    msg: ""
    name: "Showing"
    result:"Setup"

msg:""
name:"Inspection"
result:"Setup"

msg:""
name :"Showing"
result :"In Process" or "Declined By Seller"
*/
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
!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }

    angular
        .module(appName)

        


        .filter('toProperCase', function () {
            return function (item) {

                return item.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            };
        })

        // filters out duplicate strings in array of strings
        .filter('unique', function () {

            return function (arr, field) {
                return _.uniq(arr, function (a) { return a; });
            };
        })

        .filter('agentEmail', function () {

            return function (item) {
                var emails = item.split(';')
                var all = [];

                _.each(emails, function (el, index, list) {

                    if (all.indexOf(el) === -1) {
                        var str = '<a href="mailto:' + el + ' target="_top">' + el + '</a>'
                        all.push(el);
                    }
                });

                return all.shift();
            };
        })

        .filter('normalizePhoneNumber', function () {
            return function (item, forDialer) {
                if (item) {
                    var finalNum = ""

                    // replace multiple spaces, newlines etc. with single space
                    var str = item.replace(/\s\s+/g, ' ');

                    var re = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?\s*(\d+))?$/im;
                    // var str = phone;
                    var m;
                    var rawNum = "";
                    var ext = "";

                    if ((m = re.exec(str)) !== null) {
                        if (m.index === re.lastIndex) {
                            re.lastIndex++;
                        }
                        // View your result using the m-variable.
                        if (m[2] != undefined)
                            rawNum = m[2];
                        if (m[3] != undefined)
                            ext = m[3];
                        // next pull apart number and any extention

                        //normalize string and remove all unnecessary characters
                        var phone = rawNum.replace(/[^\d]/g, "");

                        // iff 11 and first is a 1 just strip it...
                        if (phone.length == 11 && phone[0] == 1) {

                            phone = phone.slice(1);
                        }
                        // should have 10 digits 
                        if (phone.length == 10) {
                            //reformat and return phone number
                            if (forDialer != undefined && forDialer === true) {
                                finalNum = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1$2$3");
                            } else {
                                finalNum = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                            }

                        }

                        if (ext != "") {
                            if (forDialer != undefined && forDialer === true) {
                                finalNum += ";" + ext;
                            } else {
                                finalNum += " ext. " + ext;
                            }

                        }
                        return finalNum;

                    }

                }
                return item;
            };
        })

        // for days on market when item is time in epoch (looks like)
        .filter('makeDaysOn', function () {

            return function (item) {
                var nowInMs = (new Date).getTime();
                var diff = nowInMs - item;

                // now how many days is diff ms??
                var day = 24 * 60 * 60 * 1000;

                return Math.round(diff / day);
            };
        })

        .filter('percentChange', function () {
            // will be passed the current site data
            return function (newValue, baseline) {

                if (newValue == undefined)
                    return "";
                var diff = baseline - newValue;

                var val = (diff / baseline);

                return val;
            };
        })

        .filter('noFractionCurrency', ['$filter', '$locale', function ($filter, $locale) {

            var currencyFilter = $filter('currency');
            var formats = $locale.NUMBER_FORMATS;
            return function (amount, currencySymbol) {
                var value = currencyFilter(amount, currencySymbol);
                if (value === undefined)
                    return amount;
                var sep = value.indexOf(formats.DECIMAL_SEP);

                if (amount >= 0) {
                    return value.substring(0, sep);
                }
                return value.substring(0, sep) + ')';
            };
        }])

        .filter('percentOf', ['$filter', function ($filter) {
            return function (count, total) {
                return count / total;
            };
        }])

        .filter('maxRecords', ['$filter', function ($filter) {
            var MAX = 4;
            return function (recs) {
                return recs.slice(0, MAX);
            };
        }])

        // This filter makes the assumption that the input will be in decimal form (i.e. 17% is 0.17).
        .filter('percentage', ['$filter', function ($filter) {
            return function (input, decimals) {
                return Math.round($filter('number')(input * 100, decimals)) + '%';
            };
        }])

        // This
        .filter('name', ['$filter', function ($filter) {
            return function (input, decimals) {

            };
        }])

        .filter("timeago", function () {
            //time: the time
            //local: compared to what time? default: now
            //raw: whether you want in a format of "5 minutes ago", or "5 minutes"
            return function (time, local, raw) {
                if (!time) return "never";

                if (!local) {
                    (local = Date.now())
                }

                if (angular.isDate(time)) {
                    time = time.getTime();
                } else if (typeof time === "string") {
                    var sentriLockDate = /[A-Za-z].*, .*-.*:.*/;
                    if (sentriLockDate.test(time)) {
                        time = new Date(time.replace('-', ',')).getTime();
                    } else {
                        ////time = new Date(time.replace(' ','T')+"+00:00").getTime();
                        time = new Date(time.replace(' ', 'T')).getTime();
                    }
                }

                if (angular.isDate(local)) {
                    local = local.getTime();
                } else if (typeof local === "string") {
                    local = new Date(local).getTime();
                }

                if (typeof time !== 'number' || typeof local !== 'number') {
                    return;
                }

                var
                    offset = Math.abs((local - time) / 1000),
                    span = [],
                    MINUTE = 60,
                    HOUR = 3600,
                    DAY = 86400,
                    WEEK = 604800,
                    MONTH = 2629744,
                    YEAR = 31556926,
                    DECADE = 315569260;

                if (offset <= MINUTE) span = ['', raw ? 'now' : 'less than a minute'];
                else if (offset < (MINUTE * 60)) span = [Math.round(Math.abs(offset / MINUTE)), 'min'];
                else if (offset < (HOUR * 24)) span = [Math.round(Math.abs(offset / HOUR)), 'hr'];
                else if (offset < (DAY * 7)) span = [Math.round(Math.abs(offset / DAY)), 'day'];
                else if (offset < (WEEK * 52)) span = [Math.round(Math.abs(offset / WEEK)), 'week'];
                else if (offset < (YEAR * 10)) span = [Math.round(Math.abs(offset / YEAR)), 'year'];
                else if (offset < (DECADE * 100)) span = [Math.round(Math.abs(offset / DECADE)), 'decade'];
                else span = ['', 'a long time'];

                span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
                span = span.join(' ');

                if (raw === true) {
                    return span;
                }
                return (time <= local) ? span + ' ago' : 'in ' + span;
            }
        })

        .filter('groupBy', ['$parse', function ($parse) {
            return function (list, group_by) {

                var filtered = [];
                var prev_item = null;
                var group_changed = false;
                // this is a new field which is added to each item where we append "_CHANGED"
                // to indicate a field change in the list
                //was var new_field = group_by + '_CHANGED'; - JB 12/17/2013
                var new_field = 'group_by_CHANGED';

                // loop through each item in the list
                angular.forEach(list, function (item) {

                    group_changed = false;

                    // if not the first item
                    if (prev_item !== null) {

                        // check if any of the group by field changed

                        //force group_by into Array
                        group_by = angular.isArray(group_by) ? group_by : [group_by];

                        //check each group by parameter
                        for (var i = 0, len = group_by.length; i < len; i++) {
                            if ($parse(group_by[i])(prev_item) !== $parse(group_by[i])(item)) {
                                group_changed = true;
                            }
                        }

                    }// otherwise we have the first item in the list which is new
                    else {
                        group_changed = true;
                    }

                    // if the group changed, then add a new field to the item
                    // to indicate this
                    if (group_changed) {
                        item[new_field] = true;
                    } else {
                        item[new_field] = false;
                    }

                    filtered.push(item);
                    prev_item = item;

                });

                return filtered;
            }
        }])
})();

!(function() {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }

    angular
        .module(appName)


        .filter('unknownYearBuilt', function() {
            return function(item) {
                if (_.isUndefined(item)) {
                    return "";
                }
                return item.replace(/U/g, "Unknown");
            };
        })

        .filter('formatSchoolName', function() {
            return function(item) {

                if (_.isUndefined(item)) {
                    return "";
                }

                return item.replace(/HIGH SCHOOL|MIDDLE SCHOOL|ELEMENTARY SCHOOL|SCHOOL/g, "");

            };
        })

        .filter('lotSizeTranslation', function() {
            return function(mredCode) {

                if (_.isUndefined(mredCode)) {
                    return "";
                }

                var fieldText = "";

                var items = mredCode.split(",");

                for (var i = 0; i < items.length; i++) {
                    switch (items[i]) {
                        case "A":
                            fieldText += "< 0.25 Acres";
                            break;
                        case "B":
                            fieldText += ".25 - .49 Acres";
                            break;
                        case "C":
                            fieldText += ".50 to 0.99 Acres";
                            break;
                        case "D":
                            fieldText += "1 - 1.99 Acres";
                            break;
                        case "E1":
                            fieldText += "2 - 2.99 Acres";
                            break;
                        case "E2":
                            fieldText += "3 - 3.99 Acres";
                            break;
                        case "E3":
                            fieldText += "4 - 4.99 Acres";
                            break;
                        case "F1":
                            fieldText += "5 - 5.99 Acres";
                            break;
                        case "F2":
                            fieldText += "6 - 7.99 Acres";
                            break;
                        case "F3":
                            fieldText += "8 - 9.99 Acres";
                            break;
                        case "G":
                            fieldText += "10+ Acres";
                            break;
                        case "K":
                            fieldText += "Oversized Chicago Lot";
                            break;
                        case "L":
                            fieldText += "Standard Chicago Lot";
                            break;

                        default:
                            fieldText += mredCode;
                    }

                    if (items.length > 1 && i < (items.length - 1)) {
                        fieldText += ", ";
                    }
                }

                return fieldText;
            };
        })

        .filter('sewerSourceTranslation', function() {
            return function(mredCode) {
                if (_.isUndefined(mredCode)) {
                    return "";
                }

                var fieldText = "";

                var items = mredCode.split(",");


                for (var i = 0; i < items.length; i++) {
                    switch (items[i]) {
                        case "A":
                            fieldText += "Septic ‐ Mechanical";
                            break;
                        case "B":
                            fieldText += "Septic ‐ Private";
                            break;
                        case "C":
                            fieldText += "Septic ‐ Shared";
                            break;
                        case "D":
                            fieldText += "Sewer ‐ Public";
                            break;
                        case "E":
                            fieldText += "Sewer Storm";
                            break;
                        case "F":
                            fieldText += "Holding Tank(s)";
                            break;
                        case "G":
                            fieldText += "Overhead Sewers";
                            break;
                        case "H":
                            fieldText += "Other";
                            break;
                        default:
                            fieldText += "Not Set";
                    }

                    if (items.length > 1 && i < (items.length - 1)) {
                        fieldText += ", ";
                    }
                }

                return fieldText;
            };
        })

        .filter('waterSourceTranslation', function() {
            return function(mredCode) {

                if (_.isUndefined(mredCode)) {
                    return "";
                }
                var fieldText = "";

                var items = mredCode.split(",");


                for (var i = 0; i < items.length; i++) {
                    switch (items[i]) {
                        case "A":
                            fieldText += "Lake Michigan";
                            break;
                        case "B":
                            fieldText += "Public";
                            break;
                        case "C":
                            fieldText += "Private Company";
                            break;
                        case "D":
                            fieldText += "Well Community";
                            break;
                        case "E":
                            fieldText += "Well Private";
                            break;
                        case "F":
                            fieldText += "Well Private Company";
                            break;
                        case "G":
                            fieldText += "Well Shared";
                            break;
                        case "H":
                            fieldText += "Other";
                            break;
                        default:
                            fieldText += "Not Set";
                    }

                    if (i > 0) {
                        fieldText += ", ";
                    }
                }

                return fieldText;
            };
        })


})();

!(function () {
    var appName = "app";
    try {
        appName = THE_APP;
    } catch (e) {

    }

    angular
        .module(appName)

        // filter out the fact that fuck-heads put one-day-code gen
        // shit in the system but we don't care about those...
        .filter('filterOutOneDayCodeGen', function () {

            var pattern = /1DayCode/i;

            return function (items) {

                var filtered = [];

                for (var i = 0; i < items.length; i++) {

                    if (!pattern.test(items[i].AccessType)) {
                        filtered.push(items[i]);
                    }
                }
                return filtered;
            };
        })

        // filter out the fact that fuck-heads put one-day-code gen
        // shit in the system but we don't care about those...
        .filter('accessorName', function () {
            return function (entry) {
                //var filtered = [];
                var name = entry;
                try {
                    name = entry.split("-")[0];
                } catch (ex) {

                }

                return name;

            };
        })
})();

angular.module('tbd').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/_change-indicator.html',
    "\n" +
    "<style>\n" +
    "    change-indicator {\n" +
    "        float: right;\n" +
    "        font-size: .9em;\n" +
    "    }\n" +
    "    \n" +
    "    /*.data-change.pos {\n" +
    "    color: #7cb342;\n" +
    "}*/\n" +
    "/*\n" +
    ".data-change.pos {\n" +
    "    color: #7cb342;\n" +
    "}*/\n" +
    "/*.data-change.neg {\n" +
    "    color: #de4848;\n" +
    "}*/\n" +
    ".data-change.neg {\n" +
    "    color: #FFFFFF;\n" +
    "}\n" +
    "\n" +
    ".data-change.neutral {\n" +
    "    color: #a5a5a5;\n" +
    "}\n" +
    ".data-change {\n" +
    "   /* font-size: 14px !important;*/\n" +
    "    font-weight: 400;\n" +
    "    line-height: 22px;\n" +
    "}\n" +
    ".data-change.pos .change-triangle {\n" +
    "    margin-bottom: 2px;\n" +
    "    height: 0;\n" +
    "    border-bottom: 6px solid #7cb342;\n" +
    "}\n" +
    "\n" +
    ".data-change.neg .change-triangle {\n" +
    "    margin-bottom: 1px;\n" +
    "    height: 0;\n" +
    "    border-top: 6px solid #de4848;\n" +
    "}\n" +
    "\n" +
    ".change-triangle {\n" +
    "    display: inline-block;\n" +
    "    width: 0;\n" +
    "    border-right: 6px solid transparent;\n" +
    "    margin-right: 2px;\n" +
    "    border-left: 6px solid transparent;\n" +
    "}\n" +
    "\n" +
    "    </style>\n" +
    "<div class=\"data-change\" ng-class=\"vm.controlCss\">\n" +
    "    <div ng-if=\"vm.noChange\">0 (0.00%)</div>\n" +
    "    <div ng-if=\"!vm.canCalculateChange && !vm.noChange\" i18n=\"common.na\"></div>\n" +
    "    <div ng-class=\"vm.textCss\" ng-if=\"vm.canCalculateChange && !vm.noChange\">\n" +
    "    	<div class=\"change-triangle\"></div>\n" +
    "        <span ng-if=\"vm.valueType === 'number'\">{{vm.amountChanged | number: vm.rateDecimals}}</span>\n" +
    "        <span ng-if=\"vm.valueType === 'percentage'\">{{vm.amountChanged | number: vm.rateDecimals}}%</span>\n" +
    "        <span ng-if=\"vm.valueType === 'currency'\">{{vm.amountChanged | currency}}</span> <span ng-if=\"vm.displayRateOfChange\">({{vm.rateOfChange | number}}%)</span>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/_md-card-image-overlay.html',
    "<md-card ng-cloak id=\"md-card\">\n" +
    "\n" +
    "    <div id=\"md-card-image\" style=\"position: relative\">\n" +
    "\n" +
    "        <div class=\"trending-list-guard\">\n" +
    "\n" +
    "            <div ng-repeat=\"trend in listing.trends\" ng-click=\"\">\n" +
    "\n" +
    "                <span class=\"trend-box\">\n" +
    "                    <md-icon md-svg-src=\"/assets/icons/ic_whatshot_black_48px.svg\" tabindex=\"0\" aria-hidden=\"true\">\n" +
    "                    </md-icon>\n" +
    "                {{trend}}\n" +
    "                </span>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"image-text-guard\">\n" +
    "            <h5>MLS: {{listing.mls_id}}</h5>\n" +
    "            <label>{{listing.address}}</label>\n" +
    "            <span>{{listing.listing_price | noFractionCurrency}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</md-card>\n"
  );


  $templateCache.put('templates/_md-card-image-overlay.view.html',
    "<style>\n" +
    "    .trends {\n" +
    "    padding: 20px 0px;\n" +
    "    }\n" +
    "    </style>\n" +
    "<md-card ng-cloak id=\"md-card\">\n" +
    "\n" +
    "    <div id=\"md-card-image\" style=\"position: relative\" imagenie=\"{{listing.photoUrl}}\">\n" +
    "\n" +
    "        <div class=\"trending-list-guard\">\n" +
    "\n" +
    "            <!--<div  ng-repeat=\"trend in listing.trends track by $index\" ng-click=\"\">-->\n" +
    "                 <div  ng-repeat=\"trend in listing.trends | unique\" ng-click=\"\">\n" +
    "\n" +
    "                <span class=\"trend-box\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_whatshot_black_48px.svg\" tabindex=\"0\" aria-hidden=\"true\">\n" +
    "                    </md-icon>\n" +
    "                {{trend}}\n" +
    "                </span>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"image-text-guard\">\n" +
    "            <h5 style=\"color: #fff;\">MLS: {{listing.mls_id}}</h5>\n" +
    "            <label>{{listing.address}}</label>\n" +
    "            <span>{{listing.listing_price | noFractionCurrency}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <md-stat-summary ng-if=\"listing.activityAggregate\"  listing=\"listing\" showings=\"showings\" title=\"Showing Summary\"> </md-stat-summary>\n" +
    "\n" +
    "\n" +
    "</md-card>\n"
  );


  $templateCache.put('templates/_md-card-mred.view.html',
    "<md-card class=\"md-card  site-summary-card\">\n" +
    "    <div class=\"site-header\">\n" +
    "     \n" +
    "        <div class=\"logo\">\n" +
    "            \n" +
    "         <img src=\"assets/logos/mred-logo-small.png\" alt=\"MRED\"/>         \n" +
    "\n" +
    "        </div>\n" +
    "   \n" +
    "    </div>\n" +
    "    <div layout=\"row\">\n" +
    "        <div flex class=\"left\">\n" +
    "            <div>\n" +
    "                <label>ID</label>\n" +
    "                <span><b>{{vm.listing.ListingId}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Status</label>\n" +
    "                <span><b>{{vm.listing.MlsStatus}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "\n" +
    "                <label>Built</label>\n" +
    "\n" +
    "                <span ng-if=\"vm.listing.YearBuilt != undefined\"><b>{{vm.listing.YearBuilt | unknownYearBuilt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"vm.listing.YearBuilt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Approx SF</label>\n" +
    "                <span ng-if=\"vm.listing.LivingArea != undefined\"><b>{{vm.listing.LivingArea}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Total Room</label>\n" +
    "                <span><b>{{vm.listing.RoomsTotal}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Bedrooms</label>\n" +
    "                <span><b>{{vm.listing.BedsTotal}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Bathrooms</label>\n" +
    "                <span><b>{{vm.listing.BathsFull}}.{{vm.listing.BathsHalf}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div flex class=\"right\">\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Current price</label>\n" +
    "\n" +
    "                <span ng-show=\"listing.listing_price\">\n" +
    "                    <b>{{vm.listing.listing_price  | noFractionCurrency}} </b>\n" +
    "                    </span>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <!--<div style=\"border-bottom: 1px solid #eee;\">\n" +
    "                <label style=\"color: #636075;\"><b>Activity on Mred</b></label>\n" +
    "            </div>-->\n" +
    "            <div>\n" +
    "                <label>Water/Sewer</label>\n" +
    "                <span><b>{{vm.listing.WaterSource | waterSourceTranslation}} / {{vm.listing.Sewer | sewerSourceTranslation}}</b></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>High School</label>\n" +
    "                <span><b>{{vm.listing.HighSchool | formatSchoolName | toProperCase}}</b></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>Middle School</label>\n" +
    "                <span><b>{{vm.listing.MiddleOrJuniorSchool | formatSchoolName | toProperCase}}</b></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>Elem School</label>\n" +
    "                <span><b>{{vm.listing.ElementarySchool  | formatSchoolName | toProperCase}}</b></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>Lot Size</label>\n" +
    "                <span><b>{{vm.listing.LotSizeArea | lotSizeTranslation}}</b></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-card>"
  );


  $templateCache.put('templates/_md-card-redfin.view.html',
    "<md-card class=\"md-card  site-summary-card\">\n" +
    "    <div class=\"site-header\">\n" +
    "        <!--<div id= \"md-card-image\"></div>-->\n" +
    "        <div class=\"logo\">\n" +
    "             <img src=\"assets/logos/redfin_logo_40x166.png\" alt=\"Redfin\"/>\n" +
    "      \n" +
    "           \n" +
    "        </div>\n" +
    "        <!--<i class=\"mdi md-accent mdi-share-variant\"></i>-->\n" +
    "\n" +
    "        <div class=\"card-icons-wrapper\">\n" +
    "            <md-button class=\"md-icon-button\" ng-click=\"vm.openInBrowser(listing.subjectUrl)\">\n" +
    "                <md-icon md-svg-src=\"assets/icons/ic_open_in_browser_black_48px.svg\" aria-label=\"Launch in browser\"></md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div layout=\"row\">\n" +
    "        <div flex class=\"left\">\n" +
    "            <div>\n" +
    "                <label>Days listed</label>\n" +
    "                <span><b>{{listing.listing_daysOn}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Views today</label>\n" +
    "                <span ng-if=\"listing.listing_views_todayCnt != undefined\"><b>{{listing.listing_views_todayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_todayCnt == undefined\"><b>*</b></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "\n" +
    "                <label>7-day views</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_sevenDayCnt != undefined\"><b>{{listing.listing_views_sevenDayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_sevenDayCnt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>30-day views</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_thirtyDayCnt != undefined\"><b>{{listing.listing_views_thirtyDayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_thirtyDayCnt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Total views</label>\n" +
    "                <span><b>{{listing.listing_views_totalCnt}}</b></span>\n" +
    "            </div>\n" +
    "            <!--<div>-->\n" +
    "            <!--<label>All time views</label>-->\n" +
    "            <!--<span><b>5880</b></span>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "        <div flex class=\"right\">\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Current price</label>\n" +
    "                <span ng-show=\"listing.listing_price\">\n" +
    "                    <b>{{listing.listing_price | noFractionCurrency }} </b>\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.listing_price\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>Redfin Estimate</label>\n" +
    "                <span ng-show=\"listing.redfinEstimate\">\n" +
    "                    <b>{{listing.redfinEstimate  | noFractionCurrency}} </b>\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.redfinEstimate\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div style=\"border-bottom: 1px solid #eee;\">\n" +
    "                <label style=\"color: #636075;\"><b>Activity on Redfin</b></label>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>Favorites</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_prefs_favoritesCnt\">\n" +
    "                  <md-icon  class=\"favs inline-small\" md-svg-src=\"assets/icons/ic_favorite_black_24px.svg\"></md-icon>\n" +
    "                  <b>{{listing.listing_prefs_favoritesCnt}}</b>\n" +
    "              \n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <!--<div>-->\n" +
    "            <!--<label>All time Favorites</label>-->\n" +
    "            <!--<span><b>18</b></span>-->\n" +
    "            <!--</div>-->\n" +
    "            <div>\n" +
    "                <label>X-outs</label>\n" +
    "                <span><b>{{listing.listing_prefs_xOutCnt}}</b></span>\n" +
    "            </div>\n" +
    "            <!--<div>-->\n" +
    "            <!--<label>All time X-outs</label>-->\n" +
    "            <!--<span><b>12</b></span>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- <div layout=\"row\" layout-align=\"space-around center\" style=\"padding: 10px\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"md-card-left-of-image\">\n" +
    "            <table ng-show='listing.est_currentValue == undefined'>\n" +
    "                <thead>\n" +
    "\n" +
    "                </thead>\n" +
    "\n" +
    "                <div style=\"overflow: hidden; height: 100%\"\n" +
    "                        >\n" +
    "                    <tbody>\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan=\"2\" class=\"card-section-label redfin-color\">listing price</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\">\n" +
    "                        <td class=\"card-data-label\">current value</td>\n" +
    "                        <td class=\"data\">{{listing.est_currentValue | currency:\"$\":0 }}\n" +
    "                            <md-icon class=\"negative-color\"\n" +
    "                                     ng-show=\"listing.est_thirtyDayChange < 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_down_black_18px.svg\"></md-icon>\n" +
    "\n" +
    "                            <md-icon class=\"\"\n" +
    "                                     ng-show=\"listing.est_thirtyDayChange >= 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_up_black_18px.svg\"></md-icon>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </div>\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "        </div>\n" +
    "        <div id=\"md-card-image\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div ng-show='listing.listing_daysOn != undefined' class=\"logo-caption\">\n" +
    "                {{listing.listing_daysOn}} Days On\n" +
    "            </div>\n" +
    "            <div ng-show='listing.listing_ts != undefined' class=\"logo-caption\">\n" +
    "                {{listing.listing_ts | makeDaysOn}} Days On\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div> -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!-- <md-card-content>\n" +
    "\n" +
    "        <h2>{{title}}</h2>\n" +
    "\n" +
    "        <div layout=\"row\" padding layout-align=\"space-around center\">\n" +
    "\n" +
    "            <div> <md-card-stat title=\"VIEWS\" stat-model=\"listing.listing_views_totalCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"LIKES\" stat-model=\"listing.listing_prefs_favoritesCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"X-OUTS\" stat-model=\"listing.listing_prefs_xOutCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat ng-show='listing.summary.listing_views_totalCnt' title=\"TOTAL\" value=\"{{listing.listing_views_totalCnt}}\"></md-card-stat></div>\n" +
    "\n" +
    "\n" +
    "            <div ng-show='listing.summary.listing_views_sevenDayCnt' class=\"summary-item seven-count\">\n" +
    "                {{listing.summary.listing_views_sevenDayCnt}} in last 7 days\n" +
    "            </div>\n" +
    "            <div ng-show='listing.summary.listing_views_thirtyDayCnt' class=\"summary-item thirty-count\">\n" +
    "                {{listing.summary.listing_views_thirtyDayCnt}} in last 30 days\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card-content> -->\n" +
    "    <!-- <div class=\"md-actions md-card-actions\" layout=\"row\" layout-align=\"end center\">\n" +
    "\n" +
    "\n" +
    "        <md-button>SHARE\n" +
    "            <i class=\"mdi md-accent mdi-share-variant\"></i>\n" +
    "\n" +
    "            <md-button  ng-show=\"listing.subjectUrl\"\n" +
    "\n" +
    "                        ng-click=\"go(listing.subjectUrl)\">\n" +
    "                REDFIN\n" +
    "                <i class=\"mdi md-accent  mdi-forward md-card-icon\"></i>\n" +
    "            </md-button>\n" +
    "\n" +
    "\n" +
    "    </div> -->\n" +
    "    <p class=footer> {{listing.t.time | timeago }} </p>\n" +
    "\n" +
    "</md-card>\n" +
    "<!--\n" +
    "\n" +
    "\"activitySummary\":[\n" +
    "{\n" +
    "\"est_rentLowRange\":\"1\",\n" +
    "\"prop_views_totalCnt\":\"766\",\n" +
    "\"est_highRange\":\"277\",\n" +
    "\"status\":\"For Sale\",\n" +
    "\"listing_mlsId\":\"08990196\",\n" +
    "\"est_thirtyDayChange\":\"-677\",\n" +
    "\"listing_views_totalCnt\":\"591\",\n" +
    "\"est_rent\":\"1994\",\n" +
    "\"est_rentHighRange\":\"2\",\n" +
    "\"t\":{\n" +
    "    \"time\":1440105194147,\n" +
    "    \"minutes\":13,\n" +
    "    \"seconds\":14,\n" +
    "    \"hours\":16,\n" +
    "    \"month\":7,\n" +
    "    \"timezoneOffset\":300,\n" +
    "    \"year\":115,\n" +
    "    \"day\":4,\n" +
    "    \"date\":20\n" +
    "},\n" +
    "\"address\":\"11521 N BURLINGTON RD RICHMOND, IL 60071\",\n" +
    "\"listing_id\":\"4F134C97-4E33-45AC-AB89-8A36CB072DDC\",\n" +
    "\"listing_daysOn\":\"27\",\n" +
    "\"est_rentThirtyDayChange\":\"5\",\n" +
    "\"est_lowRange\":\"238\",\n" +
    "\"mls_id\":\"08990196\",\n" +
    "\"extSysId\":3,\n" +
    "\"listing_trend\":null,\n" +
    "\"est_currentValue\":\"256344\",\n" +
    "\"prop_prefs_favoritesCnt\":\"14\"\n" +
    "}\n" +
    "],\n" +
    "\"success\":true\n" +
    "-->"
  );


  $templateCache.put('templates/_md-card-sentri-detail.view.html',
    "<style>\n" +
    "    .dialogdemoBasicUsage #popupContainer {\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    \n" +
    "    .dialogdemoBasicUsage .debt-be-gone {\n" +
    "        font-weight: bold;\n" +
    "        /*color: blue;*/\n" +
    "        text-decoration: underline;\n" +
    "    }\n" +
    "    \n" +
    "    i.plain {\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "    \n" +
    "    .gray {\n" +
    "        background-color: #F0F2F2 !important;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<md-dialog id=\"sentrilockDetails\" aria-label=\"Sentrilock Details\">\n" +
    "    <form>\n" +
    "        <md-toolbar>\n" +
    "            <div class=\"md-toolbar-tools gray\">\n" +
    "                <img style=\"width: 180px; margin-left: -10px;\" src=\"assets/logos/sentrilock-logo.png\" alt=\"Sentrilock\" />\n" +
    "                <span flex></span>\n" +
    "                <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_close_black_24px.svg\" aria-label=\"Close dialog\"></md-icon>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "\n" +
    "        <md-dialog-content>\n" +
    "\n" +
    "            <div>\n" +
    "\n" +
    "                <!--<md-button ng-if=\"showActions\" class=\"md-fab  md-fab-bottom-right\" aria-label=\"Add to Contacts\" ng-click=\"addToContacts(sentri)\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_person_add_black_48px.svg\"></md-icon>\n" +
    "                </md-button>-->\n" +
    "                <span ng-if=\"haveUserInfo\" class=\"name\">\n" +
    "                    <md-icon class=person-icon md-svg-src=\"assets/icons/ic_person_black_48px.svg\">\n" +
    "\n" +
    "                    </md-icon>\n" +
    "                    {{sentri.AgentFirstName}} {{ sentri.AgentLastName }}\n" +
    "                   </span>\n" +
    "                    <table>\n" +
    "\n" +
    "                        <tr>\n" +
    "                            <td class=\"label\">Access time</td>\n" +
    "                            <td class=card-value>\n" +
    "\n" +
    "                                <span class=no-wrap>{{sentri.UTCAccessedDT | date: 'short'}}</span>\n" +
    "                                <span>&middot;</span>\n" +
    "\n" +
    "                                <span class=no-wrap> {{sentri.UTCAccessedDT | timeago}}</span>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td class=\"label\">Lockbox SN</td>\n" +
    "                            <td> <span class=card-value> {{sentri.LBSerialNumber}}</span></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td class=\"label\">Access type</td>\n" +
    "                            <td> <span class=\"card-value\">{{sentri.AccessType}}</span></td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td class=\"label\">Location</td>\n" +
    "                            <td><span class=\"card-value\" style=\"text-align: center\">{{sentri.Location}} </span></td>\n" +
    "                        </tr>\n" +
    "\n" +
    "\n" +
    "                    </table>\n" +
    "\n" +
    "                    <hr ng-if=\"haveUserInfo\">\n" +
    "\n" +
    "\n" +
    "                    <div ng-if=\"haveUserInfo\" class=\"orgs\" layout=\"row\" layout-xs=\"column\">\n" +
    "                        <div flex class=\"card-value\" style=\"text-align: center\">\n" +
    "                            {{sentri.Association}}\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"sentri.Association && sentri.CompanyName\" class=\"card-value\" style=\"text-align: center; font-size: 32px;\">\n" +
    "                            &middot;\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div flex style=\"text-align: center\" class=\"card-value\">\n" +
    "                            {{sentri.CompanyName}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-if=\"haveUserInfo\" class=\"contact-info\">\n" +
    "                         <md-button ng-if=\"showActions\" class=\"md-fab  md-fab-bottom-right\" aria-label=\"Add to Contacts\" ng-click=\"addToContacts(sentri)\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_person_add_black_48px.svg\"></md-icon>\n" +
    "                </md-button>\n" +
    "\n" +
    "                        <md-button ng-disabled=\"!showActions\" class=\"md-raised\" ng-click=\"dial(sentri.ContactNumber)\" ng-show='sentri.ContactNumber'\n" +
    "                            class=\"contact-method\">\n" +
    "\n" +
    "                            <md-icon md-svg-src=\"assets/icons/ic_phone_iphone_black_48px.svg\" aria-label=\"dial\"></md-icon>\n" +
    "                            {{sentri.ContactNumber | normalizePhoneNumber}} (Mobile)\n" +
    "                        </md-button>\n" +
    "\n" +
    "                        <md-button ng-if='(sentri.emailAddy && sentri.emailAddy.length > 3)' ng-click=\"sendMail(sentri.emailAddy, sentri)\" class=\"md-raised\">\n" +
    "\n" +
    "                            <md-icon md-svg-src=\"assets/icons/ic_mail_outline_black_48px.svg\" aria-label=\"Email\"></md-icon>\n" +
    "                            {{ sentri.emailAddy }}\n" +
    "\n" +
    "                        </md-button>\n" +
    "\n" +
    "                        <md-button ng-if='(sentri.emailAddy2 && (sentri.emailAddy2 != sentri.emailAddy))' ng-click=\"sendMail(sentri.emailAddy2, sentri)\"\n" +
    "                            class=\"md-raised\">\n" +
    "\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-if=\"showActions\" style=\"width: 100%; height: 40px\"></div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </md-dialog-content>\n" +
    "\n" +
    "    </form>\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/_md-card-sentri-login.view.html',
    "<div>\n" +
    "    <!--   <div class=\"container absolute-center login-form\"> -->\n" +
    "    <br>\n" +
    "\n" +
    "    <md-card style=\"width: 50%; min-width: 500px; text-align: inherit;\" class=\"center-me  site-summary-card\">\n" +
    "        <md-whiteframe class=\"md-whiteframe-z3\" layout layout-align=\"center center\">\n" +
    "            <span>\n" +
    "\n" +
    "<md-toolbar class=\"\">\n" +
    "                    <h1 class=\"md-toolbar-tools\" style=\"letter-spacing: .4em;\">SentriLock Login</h1>\n" +
    "                </md-toolbar>\n" +
    "  <md-content class=\"md-padding\">\n" +
    "    <div class=\"sw-logo\">\n" +
    "      <img ng-src=\"/assets/logos/sentrilock-logo.png\"   width=\"281\" style=\"width: 281px !important;\"></div>\n" +
    "\n" +
    "    <p> Log in to SentriLock just once, we'll take it from there! </p>\n" +
    "\n" +
    "\n" +
    "    <form  ng-submit=\"vm.submitLogin(login.perm, login.username, login.password)\" >\n" +
    "\n" +
    "    {{ contact.name }}\n" +
    "    <button ng-click=\"saveContact(contact.name, contact.phone)\">Save</button>\n" +
    "    \n" +
    "      <md-input-container ng-disabled=\"false\" >\n" +
    "        <label for=\"i2\">user name</label>\n" +
    "\n" +
    "        <input id=\"i2\" ng-model=\"vm.login.username\" ></input>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <md-input-container ng-disabled=\"false\">\n" +
    "        <label for=\"i3\">password</label>\n" +
    "        <input id=\"i3\" ng-model=\"vm.login.password\"></input>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <footer>\n" +
    "        <md-checkbox ng-model='vm.login.perm' checked label=\"permission\">\n" +
    "       Use broker permissions if available.\n" +
    "        </md-checkbox>\n" +
    "        <md-button type=\"submit\" value=\"Login\" class=\"md-raised md-primary centerme\">LOG IN</md-button>\n" +
    "        <!--  <md-button type=\"submit\" value=\"Login\" class=\"md-button-raised my-md-button centerme\">Log In</md-button> -->\n" +
    "      </footer>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </md-content>\n" +
    "     </span>\n" +
    "        </md-whiteframe>\n" +
    "\n" +
    "    </md-card>\n" +
    "</div>"
  );


  $templateCache.put('templates/_md-card-sentrilock-detail-all.view.html',
    "<!--template for the little popo up. -->\n" +
    "<style>\n" +
    "    .dialogdemoBasicUsage #popupContainer {\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    \n" +
    "    .dialogdemoBasicUsage .debt-be-gone {\n" +
    "        font-weight: bold;\n" +
    "        /*color: blue;*/\n" +
    "        text-decoration: underline;\n" +
    "    }\n" +
    "    \n" +
    "    i.plain {\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<md-dialog aria-label=\"Showing Details\" flex=\"95\">\n" +
    "\n" +
    "\n" +
    "    <div ng-repeat=\"entry in sentrilock.entries\">\n" +
    "       \n" +
    "        <md-toolbar ng-if=\"$index == 0\">\n" +
    "            <div class=\"md-toolbar-tools md-primary\">\n" +
    "                <h2>\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_chat_white_24px.svg\">\n" +
    "                        <md-button class=\"md-icon-button\" ng-if=\"$index == 0\">\n" +
    "                    </md-icon>\n" +
    "                </h2>\n" +
    " \n" +
    "                <span flex></span>\n" +
    "\n" +
    "                <md-icon md-svg-src=\"assets/icons/ic_close_white_24px.svg\" ng-click=\"cancel()\" aria-label=\"Close dialog\"></md-icon>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "\n" +
    "        <md-dialog-content style=\"max-width:95%;max-height:95%; padding: 20px\">\n" +
    "            <div>\n" +
    "\n" +
    "                <!--<h3> {{ entry.ContactName }} </h3>-->\n" +
    "\n" +
    "                <h3>{{entry.CompanyName}}</h3>\n" +
    "\n" +
    "                <h3>{{entry.City}}</h3>\n" +
    "                <h4>{{entry.State}}</h4>\n" +
    "                <h5 class=\"order-address\">{{entry.Time | date: \"medium\" }} - {{entry.UTCAccessedDT | timeago }}</h5>\n" +
    "                <hr>\n" +
    "                <!-- contact\":{\"phone\":{\"office\":\"815-385-6990\",\"mobile\":\"815-861-0099\"} -->\n" +
    "                <div ng-click=\"dial(entry.ContactNumber)\" class=\"contact-method\">\n" +
    "                    <a class='plain' ng-href=\"\">\n" +
    "\n" +
    "                        <span class=\"contact-label\"> \n" +
    "                             <md-icon md-svg-src=\"assets/icons/ic_phone_iphone_black_48px.svg\" aria-label=\"Mobile\"></md-icon> </span>\n" +
    "\n" +
    "                        <span class=\"contact-value\">\n" +
    "                    {{ entry.ContactNumber }} (Mobile)\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                </a>\n" +
    "                <div ng-click=\"dial(entry.PhoneNumber)\" class=\"contact-method\">\n" +
    "                    <!--<a class='plain' ng-href=\"tel:+1-{{showing.contact.phone.office}} \">-->\n" +
    "                    <a class='plain' ng-href=\"\">\n" +
    "\n" +
    "\n" +
    "                        <span class=\"contact-label\">  <md-icon md-svg-src=\"assets/icons/ic_local_phone_black_48px.svg\" aria-label=\"Office\"></md-icon> </span>\n" +
    "                        <span class=\"contact-value\">\n" +
    "                    {{ entry.PhoneNumber }} (Phone Number)\n" +
    "                    </span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"md-3-line\" ng-repeat=\"email in showing.contact.emails\">\n" +
    "                    <div class=\"contact-method\">\n" +
    "                        <span class=\"contact-label\">  <md-icon md-svg-src=\"assets/icons/ic_mail_outline_black_48px.svg\" aria-label=\"Email\"></md-icon> </span>\n" +
    "                        <span class=\"contact-value\">\n" +
    "                   {{entry.EmailAddress}}\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </md-dialog-content>\n" +
    "  \n" +
    "    </div>\n" +
    "\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/_md-card-sentrilock.view.html',
    "\n" +
    "<md-card class=\"md-card  site-summary-card\">\n" +
    "\n" +
    "    <div class=\"site-header\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"logo\">\n" +
    "            <img src=\"assets/logos/sentrilock-logo.png\" alt=\"Sentrilock\" />\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"feedback-div\">\n" +
    "\n" +
    "        <div ng-repeat=\"entry in entries\" ng-click=\"show($event, entry)\">\n" +
    "            <label><b> {{entry.AccessedByName | accessorName}}</b></label>\n" +
    "            <div class=\"time-wrapper\">\n" +
    "                <span class=datetime> {{entry.UTCAccessedDT | timeago}}</span>\n" +
    "                <span class=datetime>&middot;</span>\n" +
    "                <span class=datetime>{{entry.UTCAccessedDT | date: 'short'}}</span>\n" +
    "\n" +
    "\n" +
    "                <br>\n" +
    "                <span class=datetime>Lockbox Serial Number: {{entry.LBSerialNumber}}</span>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <table class=\"card-table\">\n" +
    "\n" +
    "                <tr>\n" +
    "                    <td class=\"label\">Access type</td>\n" +
    "                    <td class=\"value\">{{entry.AccessType}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td class=\"label\">Location</td>\n" +
    "                    <td class=\"value\">{{entry.Location}}</td>\n" +
    "                </tr>\n" +
    "\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "            <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"footer\" ng-if=\"vm.limit != -1 && entriesNoOneDay.length > vm.limit\" ng-click=\"showMoreFeedback()\">\n" +
    "            <span style=\"width: 100%\">\n" +
    "            <md-button style=\"float: left\" class=\"md-icon-button\" ui-sref=\"app.feedback({card:'sentri'})\">\n" +
    "                <md-icon md-svg-src=\"assets/icons/ic_more_horiz_black_48px.svg\" aria-label=\"more\"></md-icon>\n" +
    "            </md-button>\n" +
    "\n" +
    "          <span class=\"nofm\">{{vm.limit}} of {{entriesNoOneDay.length}}</span>\n" +
    "            </span>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</md-card>\n" +
    "\n" +
    "<!--\n" +
    "  \"BorrowingAgentName \":\"Dawn Zurick \",\n" +
    "\"CompanyExternalID \":\"5064 \",\n" +
    "\"CurrentListingID \":\"LI000009NJSU \",\n" +
    "\"listing_id \":\"LI000009NJSU \",\n" +
    "\"address \":\"2203 Bay Oaks Drive LAKEMOOR, IL 60051 \",\n" +
    "\"ListingAgentName \":\"Dawn Zurick \",\n" +
    "\"updated \":{\n" +
    "\"time \":1451762461841,\n" +
    "\"minutes \":21,\n" +
    "\"seconds \":1,\n" +
    "\"hours \":13,\n" +
    "\"month \":0,\n" +
    "\"year \":116,\n" +
    "\"timezoneOffset \":360,\n" +
    "\"day \":6,\n" +
    "\"date \":2\n" +
    "},\n" +
    "\"mls_id \":\"08680589 \",\n" +
    "\"LBSerialNumber \":\"00445969 \",\n" +
    "\"entries \":[\n" +
    "\"AccessedByContact \":\" \",\n" +
    "\"Association \":null,\n" +
    "\"OwnerAgentID \":\"AG0000008DLQ \",\n" +
    "\"LBID \":\"LB0000008ZFB \",\n" +
    "\"FromOneDayCode \":false,\n" +
    "\"UserID \":\"US0000007HLH \",\n" +
    "\"Origin \":\" \",\n" +
    "\"Time \":\"12:31:44 \",\n" +
    "\"Created \":\"2014-10-31 18:37:44 \",\n" +
    "\"emailAddy \":null,\n" +
    "\"Date \":\"Monday, Oct 20 2014 \",\n" +
    "\"EmailAddress \":\" \",\n" +
    "\"UserLastName \":\"Rossman \",\n" +
    "\"ContactNumber \":null,\n" +
    "\"emailAddy2 \":null,\n" +
    "\"AccessedByName \":\"Contractor Code 3 \",\n" +
    "\"ContactName \":\"Contractor Code 3 \",\n" +
    "\"AgentFirstName \":null,\n" +
    "\"Location \":\"2203 Bay Oaks Drive LAKEMOOR IL 60051 \",\n" +
    "\"PhoneNumber \":\" \",\n" +
    "\"CompanyName \":\" \",\n" +
    "\"AgentID \":null,\n" +
    "\"AccessLogID \":\"AL00001R3CLW \",\n" +
    "\"AccessType \":\"ContractorCode \",\n" +
    "\"rowcolor \":\"#FF9 \",\n" +
    "\"AgentLastName \":null,\n" +
    "\"LBSerialNumber \":\"00445969 \",\n" +
    "\"UserFirstName \":\"Joy \",\n" +
    "\"AccessedBy \":\"STATCNTCODE3 \",\n" +
    "\"UTCAccessedDT \":\"Monday, Oct 20 2014 - 12:31 PM \"\n" +
    "}...]\n" +
    "    --->"
  );


  $templateCache.put('templates/_md-card-showing-assist.view.html',
    "<md-card class=\"site-summary-card\">\n" +
    "    <div class=\"site-header\">\n" +
    "        <div class=\"logo\">\n" +
    "            <img src=\"assets/logos/showingassist-logo.png\" alt=\"Showing Assist\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"feedback-div\">\n" +
    "        <div class=\"show-item\" ng-repeat=\"showing in showings | orderBy:'-startTime'\" ng-click=\"show($event, showing)\" ng-class=\"{'negative': showing.sentiment < -3, 'positive': showing.sentiment > 3, 'positive': showing.potentialOffer == true}\">\n" +
    "            <label><b> {{showing.contact.name}}</b></label>\n" +
    "            <div class=\"time-wrapper\">\n" +
    "                <span class=datetime>{{showing.startTime | timeago }}</span>\n" +
    "                <span class=datetime>&middot;</span>\n" +
    "                <span class=datetime>{{showing.date | date:'short'}}</span><br>\n" +
    "                <span class=datetime>{{showing.type.name}} \n" +
    "                 &middot;\n" +
    "                {{showing.type.result}}\n" +
    "                <div ng-if=\"showing.type.message && showing.type.message.length>0\"> &middot;</div>\n" +
    "                 {{showing.type.msg}} \n" +
    "                </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <p style=\"clear: both;\" ng-if=\"showing.feedback\" class=\"feedback\">\"{{showing.feedback}}\"</p>\n" +
    "            <p style=\"clear: both;\" ng-if=\"!showing.feedback\" class=\"feedback\"><i>\"No feedback was provided by agent.\"</i></p>\n" +
    "            <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"footer\" ng-if=\"vm.limit != -1 && vm.showings.length > vm.limit\" ng-click=\"showMoreFeedback()\">\n" +
    "            <span style=\"width: 100%\">\n" +
    "                <md-button style=\"float: left;\" class=\"md-icon-button\" ui-sref=\"app.feedback({card:'saShowings'})\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_more_horiz_black_48px.svg\" aria-label=\"more\"></md-icon>\n" +
    "                </md-button>\n" +
    "\n" +
    "                 <span class=\"nofm\">{{vm.limit}} of {{vm.showings.length}}</span>\n" +
    "            </span>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "</md-card>"
  );


  $templateCache.put('templates/_md-card-showing-detail.view.html',
    "<!--template for the little popo up. -->\n" +
    "<style>\n" +
    "    .dialogdemoBasicUsage #popupContainer {\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    \n" +
    "    .dialogdemoBasicUsage .debt-be-gone {\n" +
    "        font-weight: bold;\n" +
    "        /*color: blue;*/\n" +
    "        text-decoration: underline;\n" +
    "    }\n" +
    "    \n" +
    "    i.plain {\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "    \n" +
    "    .gray {\n" +
    "        background-color: #F0F2F2 !important;\n" +
    "    }\n" +
    "    \n" +
    "    .contact-method {\n" +
    "        padding-top: 4px;\n" +
    "        padding-bottom: 4px;\n" +
    "    }\n" +
    "    /*#showingDetails {\n" +
    "        max-width: 90%;\n" +
    "        width: 500px;\n" +
    "    }*/\n" +
    "</style>\n" +
    "\n" +
    "<md-dialog id=\"showingDetails\" aria-label=\"Showing Details\">\n" +
    "    <form>\n" +
    "        <md-toolbar>\n" +
    "            <!--<div class=\"logo\">\n" +
    "            <img src=\"assets/logos/showings.com_logo_40x146.png\" alt=\"Showings.com\" />\n" +
    "        </div>-->\n" +
    "            <div class=\"md-toolbar-tools gray\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "  \n" +
    "\n" +
    "                 <img ng-if=\"extId == 8\" style=\"margin-left: -12px;\" src=\"assets/logos/showings.com_logo_40x146.png\" alt=\"Showings.com\" />\n" +
    "                      <img ng-if=\"extId == 10\" style=\"margin-left: -12px;\" src=\"assets/logos/showingassist-logo.png\" alt=\"SA\" />\n" +
    "                <!--<h3 style=\"padding-left: 10px; color: #fff;\"> {{showing.contact.name}}</h3>-->\n" +
    "                <span flex></span>\n" +
    "                <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_close_black_24px.svg\" aria-label=\"Close dialog\"></md-icon>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "\n" +
    "        <md-dialog-content>\n" +
    "            <span class=\"name\">\n" +
    "                 <md-icon  class=person-icon md-svg-src=\"assets/icons/ic_person_black_48px.svg\">\n" +
    "                       \n" +
    "                    </md-icon>\n" +
    "                  \n" +
    "                \n" +
    "                {{showing.contact.name}}\n" +
    "            </span>\n" +
    "\n" +
    "            <div class=feedback-div>\n" +
    "\n" +
    "\n" +
    "                <table>\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td ng-if=\"extId == 8\" class=\"label\">Showing time</td>\n" +
    "                        <td ng-if=\"extId == 10\" class=\"label\">ShowingAssist</td>\n" +
    "\n" +
    "                        <td class=card-value>\n" +
    "\n" +
    "                            <span class=datetime>{{showing.startTime | date:'short'}}</span>\n" +
    "                            <span class=datetime>&middot;</span>\n" +
    "                            <span class=datetime style=\"white-space: nowrap\">{{showing.startTime | timeago }}</span>\n" +
    "\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td class=\"label\">Showing type</td>\n" +
    "\n" +
    "                        <td> <span class=\"card-value\">{{showing.type.name}} </span>\n" +
    "\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <td class=\"label\">Result</td>\n" +
    "                        <td> <span class=\"card-value\"> {{showing.type.result}}</span></td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"showing.type.message && showing.type.message.length>0\">\n" +
    "                        <td class=\"label\">Message</td>\n" +
    "                        <td>\n" +
    "                            <span class=\"card-value\">{{showing.type.message}}</span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "\n" +
    "                </table>\n" +
    "                <div class=\"contact-info\">\n" +
    "                    <md-button ng-if=\"showActions\" class=\"md-fab  md-fab-bottom-right\" aria-label=\"Add to Contacts\" ng-click=\"addToContacts(showing)\">\n" +
    "                        <md-icon md-svg-src=\"assets/icons/ic_person_add_black_48px.svg\"></md-icon>\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <p style=\"clear: both;\" ng-if=\"showing.feedback\" class=\"feedback card-value\">\n" +
    "                        <blockquote>\"{{showing.feedback}}\"</blockquote>\n" +
    "\n" +
    "                    </p>\n" +
    "                    <p style=\"clear: both;\" ng-if=\"!showing.feedback\" class=\"feedback card-value\">\n" +
    "\n" +
    "                        <i>\"No feedback was provided by agent.\"</i></p>\n" +
    "\n" +
    "                    <hr>\n" +
    "\n" +
    "                    <md-button ng-disabled=\"!showActions\" class=\"md-raised\" ng-click=\"dial(showing.contact.phone.mobile)\" ng-show='showing.contact.phone && showing.contact.phone.mobile'>\n" +
    "\n" +
    "                        <md-icon md-svg-src=\"assets/icons/ic_phone_iphone_black_48px.svg\" aria-label=\"dial\"></md-icon>\n" +
    "                        {{showing.contact.phone.mobile}} (Mobile)\n" +
    "                    </md-button>\n" +
    "\n" +
    "                    <md-button ng-disabled=\"!showActions\" class=\"md-raised\" ng-click=\"dial(showing.contact.phone.office)\" ng-show='showing.contact.phone && showing.contact.phone.office'>\n" +
    "\n" +
    "                        <md-icon md-svg-src=\"assets/icons/ic_local_phone_black_48px.svg\" aria-label=\"dial\"></md-icon>\n" +
    "                        {{showing.contact.phone.office}} (Office)\n" +
    "                    </md-button>\n" +
    "\n" +
    "\n" +
    "                    <md-button ng-if='showing.contact.emails.length > 0' class=\"md-raised\" ng-repeat=\"email in showing.contact.emails\" ng-click=\"sendMail(email, showing)\">\n" +
    "                        <md-icon md-svg-src=\"assets/icons/ic_mail_outline_black_48px.svg\" aria-label=\"Email\"></md-icon>\n" +
    "                        {{email}}\n" +
    "\n" +
    "                    </md-button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-if=\"showActions\" style=\"width: 100%; height: 40px\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </md-dialog-content>\n" +
    "\n" +
    "    </form>\n" +
    "</md-dialog>"
  );


  $templateCache.put('templates/_md-card-site-summary.html',
    "<md-card class=\"site-summary-card\">\n" +
    "\n" +
    "    <div layout=\"row\" layout-align=\"space-around center\" style=\"padding: 10px\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"md-card-left-of-image\">\n" +
    "\n" +
    "            <table ng-show='listing.activitySummary[0].est_currentValue != undefined'>\n" +
    "                <thead>\n" +
    "\n" +
    "                </thead>\n" +
    "\n" +
    "                <div style=\"overflow: hidden; height: 100%\"\n" +
    "                     ng-show='listing.activitySummary[0].est_currentValue != undefined'>\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan=\"2\" class=\"card-section-label\"></td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\">\n" +
    "                        <td class=\"card-data-label\">current value</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_currentValue | currency:\"$\":0 }}\n" +
    "                            <md-icon class=\"negative-color\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange < 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_down_black_18px.svg\"></md-icon>\n" +
    "\n" +
    "                            <md-icon class=\"\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange >= 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_up_black_18px.svg\"></md-icon>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_thirtyDayChange'>\n" +
    "                        <td class=\"card-data-label\">thirty-day change</td>\n" +
    "                        <td class=\"data\"\n" +
    "                            ng-class=\"listing.activitySummary[0].est_thirtyDayChange < 0  ? 'negative-color' : ''\">\n" +
    "                            {{listing.activitySummary[0].est_thirtyDayChange | currency:\"$\":0 }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_highRange'>\n" +
    "                        <td class=\"card-data-label\">high range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_highRange | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_lowRange'>\n" +
    "                        <td class=\"card-data-label\">low range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_lowRange | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </div>\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "\n" +
    "            <!-- something for Redfin -->\n" +
    "            <table ng-show='listing.activitySummary[0].est_currentValue == undefined'>\n" +
    "                <thead>\n" +
    "\n" +
    "                </thead>\n" +
    "\n" +
    "                <div style=\"overflow: hidden; height: 100%\"\n" +
    "                   >\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan=\"2\" class=\"card-section-label\">listing price</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\">\n" +
    "                        <td class=\"card-data-label\">current value</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_currentValue | currency:\"$\":0 }}\n" +
    "                            <md-icon class=\"negative-color\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange < 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_down_black_18px.svg\"></md-icon>\n" +
    "\n" +
    "                            <md-icon class=\"\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange >= 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_up_black_18px.svg\"></md-icon>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_thirtyDayChange'>\n" +
    "                        <td class=\"card-data-label\">change thirty day</td>\n" +
    "                        <td class=\"data\"\n" +
    "                            ng-class=\"listing.activitySummary[0].est_thirtyDayChange < 0  ? 'negative-color' : ''\">\n" +
    "                            {{listing.activitySummary[0].est_thirtyDayChange | currency:\"$\":0 }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_highRange'>\n" +
    "                        <td class=\"card-data-label\">high range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_highRange * 1000 | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_lowRange'>\n" +
    "                        <td class=\"card-data-label\">low range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_lowRange * 1000 | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </div>\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "\n" +
    "            <!--this is cool this is coolthis is cool this is coolthis is cool this is coolthis is cool this is coolthis is cool this is cool-->\n" +
    "            <!--{{listing.activitySummary[0].listing_views_totalCnt}}-->\n" +
    "\n" +
    "            <!--as of  {{listing.activitySummary[0].t.time | date:\"EEEE, MMM d - h:m a\" }}-->\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<comment>show the proper value for days on even when we only have list_ts (listing date) by using-->\n" +
    "        <!--a filter-->\n" +
    "        <!--</comment>-->\n" +
    "\n" +
    "        <!-- show the proper value for days on even when we only have list_ts (listing date) by using -->\n" +
    "        <div id=\"md-card-image\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div ng-show='listing.activitySummary[0].listing_daysOn != undefined' class=\"logo-caption\">\n" +
    "                {{listing.activitySummary[0].listing_daysOn}} Days On\n" +
    "            </div>\n" +
    "            <div ng-show='listing.activitySummary[0].listing_ts != undefined' class=\"logo-caption\">\n" +
    "                {{listing.activitySummary[0].listing_ts | makeDaysOn}} Days On\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <md-card-content>\n" +
    "\n" +
    "        <h2>{{title}}</h2>\n" +
    "\n" +
    "        <div layout=\"row\" padding layout-align=\"space-around center\">\n" +
    "\n" +
    "\n" +
    "            <div> <md-card-stat title=\"TOTAL\" stat-model=\"listing.activitySummary[0].listing_views_totalCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"FAVORITES\" stat-model=\"listing.activitySummary[0].listing_prefs_favoritesCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"X-OUTs\" stat-model=\"listing.activitySummary[0].listing_prefs_xOutCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat ng-show='listing.summary.listing_views_totalCnt' title=\"TOTAL\" value=\"{{listing.activitySummary[0].listing_views_totalCnt}}\"></md-card-stat></div>\n" +
    "\n" +
    "            <div ng-show='listing.summary.listing_views_sevenDayCnt' class=\"summary-item seven-count\">\n" +
    "                {{listing.summary.listing_views_sevenDayCnt}} in last 7 days\n" +
    "            </div>\n" +
    "            <div ng-show='listing.summary.listing_views_thirtyDayCnt' class=\"summary-item thirty-count\">\n" +
    "                {{listing.summary.listing_views_thirtyDayCnt}} in last 30 days\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "\n" +
    "\n" +
    "</md-card>\n" +
    "<!--\n" +
    "\n" +
    "\"activitySummary\":[\n" +
    "{\n" +
    "\"est_rentLowRange\":\"1\",\n" +
    "\"prop_views_totalCnt\":\"766\",\n" +
    "\"est_highRange\":\"277\",\n" +
    "\"status\":\"For Sale\",\n" +
    "\"listing_mlsId\":\"08990196\",\n" +
    "\"est_thirtyDayChange\":\"-677\",\n" +
    "\"listing_views_totalCnt\":\"591\",\n" +
    "\"est_rent\":\"1994\",\n" +
    "\"est_rentHighRange\":\"2\",\n" +
    "\"t\":{\n" +
    "    \"time\":1440105194147,\n" +
    "    \"minutes\":13,\n" +
    "    \"seconds\":14,\n" +
    "    \"hours\":16,\n" +
    "    \"month\":7,\n" +
    "    \"timezoneOffset\":300,\n" +
    "    \"year\":115,\n" +
    "    \"day\":4,\n" +
    "    \"date\":20\n" +
    "},\n" +
    "\"address\":\"11521 N BURLINGTON RD RICHMOND, IL 60071\",\n" +
    "\"listing_id\":\"4F134C97-4E33-45AC-AB89-8A36CB072DDC\",\n" +
    "\"listing_daysOn\":\"27\",\n" +
    "\"est_rentThirtyDayChange\":\"5\",\n" +
    "\"est_lowRange\":\"238\",\n" +
    "\"mls_id\":\"08990196\",\n" +
    "\"extSysId\":3,\n" +
    "\"listing_trend\":null,\n" +
    "\"est_currentValue\":\"256344\",\n" +
    "\"prop_prefs_favoritesCnt\":\"14\"\n" +
    "}\n" +
    "],\n" +
    "\"success\":true\n" +
    "-->\n"
  );


  $templateCache.put('templates/_md-card-trulia.view.html',
    "<md-card class=\"md-card site-summary-card\">\n" +
    "    <div class=\"site-header\">\n" +
    "        <div class=\"logo\">\n" +
    "             <img src=\"assets/logos/trulia_logo_40x113.png\" alt=\"Trulia\"/>\n" +
    "        </div>\n" +
    "       \n" +
    "       <div class=\"card-icons-wrapper\">\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"vm.openInBrowser(listing.subjectUrl)\">\n" +
    "            <md-icon md-svg-src=\"assets/icons/ic_open_in_browser_black_48px.svg\" aria-label=\"Launch in browser\"></md-icon>\n" +
    "                </md-button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div layout=\"row\">\n" +
    "        <div flex class=\"left\">\n" +
    "            <div>\n" +
    "                <label>Days listed</label>\n" +
    "                <span><b>{{listing.listing_daysOn}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Views today</label>\n" +
    "                <span ng-if=\"listing.listing_views_todayCnt != undefined\"><b>{{listing.listing_views_todayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_todayCnt == undefined\"><b>*</b></span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "\n" +
    "                <label>7-day views</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_sevenDayCnt != undefined\"><b>{{listing.listing_views_sevenDayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_sevenDayCnt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>30-day views</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_thirtyDayCnt != undefined\"><b>{{listing.listing_views_thirtyDayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_thirtyDayCnt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Total views</label>\n" +
    "                <span><b>{{listing.listing_views_totalCnt}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div flex class=\"right\">\n" +
    "            <div>\n" +
    "                <label>Current price</label>\n" +
    "                <span ng-show=\"listing.listing_price\">\n" +
    "                    <b>{{listing.listing_price  | noFractionCurrency}} </b>\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.listing_price\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div style=\"border-bottom: 1px solid #eee;\">\n" +
    "\n" +
    "                <label style=\"color: #636075; font-size: 11px;\"><b>Real Estate Trends for {{mZip}}</b></label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Similar listing</label>\n" +
    "                <span ng-show=\"listing.mkt_avgListComps\">\n" +
    "                    <b>{{listing.mkt_avgListComps  | noFractionCurrency}} </b>\n" +
    "                      ({{listing.mkt_avgListComps | percentChange:listing.listing_price | percentage:1 }})\n" +
    "\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.mkt_avgListComps\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Similar sale</label>\n" +
    "                <span ng-show=\"listing.mkt_avgSaleComps\">\n" +
    "                    <b>{{listing.mkt_avgSaleComps | noFractionCurrency}} </b>\n" +
    "                     ({{listing.mkt_avgSaleComps | percentChange:listing.listing_price | percentage:1 }})\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.mkt_avgSaleComps\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Average listing</label>\n" +
    "                <span ng-show=\"listing.mkt_avgListComps\">\n" +
    "                    <b>{{listing.mkt_avgListComps | noFractionCurrency}} </b>\n" +
    "                      ({{listing.mkt_avgListComps | percentChange:listing.listing_price |  percentage:1 }})\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.mkt_avgListComps\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Median sale</label>\n" +
    "                <span ng-show=\"listing.mkt_medianSalePrice\">\n" +
    "\n" +
    "                     <b>{{listing.mkt_medianSalePrice | noFractionCurrency}} </b>\n" +
    "                    ({{listing.mkt_medianSalePrice | percentChange:listing.listing_price | percentage:1 }})\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.mkt_medianSalePrice\">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- <div layout=\"row\" layout-align=\"space-around center\" style=\"padding: 10px\">\n" +
    "\n" +
    "        <div class=\"md-card-left-of-image\">\n" +
    "\n" +
    "            <table ng-show='listing.est_currentValue != undefined'>\n" +
    "                <thead>\n" +
    "\n" +
    "                </thead>\n" +
    "\n" +
    "                <div style=\"overflow: hidden; height: 100%\"\n" +
    "                     ng-show='listing.est_currentValue != undefined'>\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan=\"2\" class=\"card-section-label\">Zestimate&trade;</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\">\n" +
    "                        <td class=\"card-data-label\">current value</td>\n" +
    "                        <td class=\"data\">{{listing.est_currentValue | currency:\"$\":0 }}\n" +
    "                            <md-icon class=\"negative-color\"\n" +
    "                                     ng-show=\"listing.est_thirtyDayChange < 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_down_black_18px.svg\"></md-icon>\n" +
    "\n" +
    "                            <md-icon class=\"\"\n" +
    "                                     ng-show=\"listing.est_thirtyDayChange > 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_up_black_18px.svg\"></md-icon>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.est_thirtyDayChange'>\n" +
    "                        <td class=\"card-data-label\">thirty-day change</td>\n" +
    "                        <td class=\"data\"\n" +
    "                            ng-class=\"listing.est_thirtyDayChange < 0  ? 'negative-color' : ''\">\n" +
    "                            {{listing.est_thirtyDayChange | currency:\"$\":0 }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\" ng-show='listing.est_highRange'>\n" +
    "                        <td class=\"card-data-label\">high range</td>\n" +
    "                        <td class=\"data\">{{listing.est_highRange | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.est_lowRange'>\n" +
    "                        <td class=\"card-data-label\">low range</td>\n" +
    "                        <td class=\"data\">{{listing.est_lowRange | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </div>\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "        <div id=\"md-card-image\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div ng-show='listing.listing_daysOn != undefined' class=\"logo-caption\">\n" +
    "                {{listing.listing_daysOn}} Days On\n" +
    "            </div>\n" +
    "            <div ng-show='listing.listing_ts != undefined' class=\"logo-caption\">\n" +
    "                {{listing.listing_ts | makeDaysOn}} Days On\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div> -->\n" +
    "\n" +
    "\n" +
    "    <!-- <md-card-content>\n" +
    "\n" +
    "        <h2>{{title}}</h2>\n" +
    "\n" +
    "        <div layout=\"row\" padding layout-align=\"space-around center\">\n" +
    "\n" +
    "            <div ng-show=\"listing.listing_views_sevenDayCnt\">\n" +
    "                <md-card-stat title=\"7 DAY\" stat-model=\"listing.listing_views_sevenDayCnt\">\n" +
    "\n" +
    "                </md-card-stat>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"listing.listing_views_thirtyDayCnt\">\n" +
    "                <md-card-stat title=\"30 DAY\" stat-model=\"listing.listing_views_thirtyDayCnt\">\n" +
    "\n" +
    "                </md-card-stat>\n" +
    "            </div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"TOTAL\" stat-model=\"listing.listing_views_totalCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div ng-show='listing.summary.listing_views_sevenDayCnt' class=\"summary-item seven-count\">\n" +
    "                {{listing.summary.listing_views_sevenDayCnt}} in last 7 days\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show='listing.summary.listing_views_thirtyDayCnt' class=\"summary-item thirty-count\">\n" +
    "                {{listing.summary.listing_views_thirtyDayCnt}} in last 30 days\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card-content> -->\n" +
    "\n" +
    "    <!-- <div class=\"md-actions md-card-actions\" layout=\"row\" layout-align=\"end center\">\n" +
    "\n" +
    "        <md-button>\n" +
    "            SHARE\n" +
    "            <i class=\"mdi md-accent mdi-share-variant md-card-icon\"></i>\n" +
    "        </md-button>\n" +
    "\n" +
    "        <md-button  ng-show=\"listing.subjectUrl\"\n" +
    "\n" +
    "                   ng-click=\"go(listing.subjectUrl)\">\n" +
    "            TRULIA\n" +
    "            <i class=\"mdi md-accent  mdi-forward md-card-icon\"></i>\n" +
    "        </md-button>\n" +
    "\n" +
    "\n" +
    "    </div> -->\n" +
    " <p class=footer> {{listing.t.time | timeago }} </p>\n" +
    "\n" +
    "</md-card>\n" +
    "<!--\n" +
    "\n" +
    "\"activitySummary\":[\n" +
    "{\n" +
    "\"est_rentLowRange\":\"1\",\n" +
    "\"prop_views_totalCnt\":\"766\",\n" +
    "\"est_highRange\":\"277\",\n" +
    "\"status\":\"For Sale\",\n" +
    "\"listing_mlsId\":\"08990196\",\n" +
    "\"est_thirtyDayChange\":\"-677\",\n" +
    "\"listing_views_totalCnt\":\"591\",\n" +
    "\"est_rent\":\"1994\",\n" +
    "\"est_rentHighRange\":\"2\",\n" +
    "\"t\":{\n" +
    "    \"time\":1440105194147,\n" +
    "    \"minutes\":13,\n" +
    "    \"seconds\":14,\n" +
    "    \"hours\":16,\n" +
    "    \"month\":7,\n" +
    "    \"timezoneOffset\":300,\n" +
    "    \"year\":115,\n" +
    "    \"day\":4,\n" +
    "    \"date\":20\n" +
    "},\n" +
    "\"address\":\"11521 N BURLINGTON RD RICHMOND, IL 60071\",\n" +
    "\"listing_id\":\"4F134C97-4E33-45AC-AB89-8A36CB072DDC\",\n" +
    "\"listing_daysOn\":\"27\",\n" +
    "\"est_rentThirtyDayChange\":\"5\",\n" +
    "\"est_lowRange\":\"238\",\n" +
    "\"mls_id\":\"08990196\",\n" +
    "\"extSysId\":3,\n" +
    "\"listing_trend\":null,\n" +
    "\"est_currentValue\":\"256344\",\n" +
    "\"prop_prefs_favoritesCnt\":\"14\"\n" +
    "}\n" +
    "],\n" +
    "\"success\":true\n" +
    "-->\n"
  );


  $templateCache.put('templates/_md-card-zillow.view.html',
    "<md-card class=\"md-card site-summary-card\">\n" +
    "    <div class=\"site-header\">\n" +
    "        <div class=\"logo\">\n" +
    "            <img src=\"assets/logos/zillow_logo_40x189.png\" alt=\"\"/>\n" +
    "        </div>\n" +
    "      \n" +
    "\n" +
    "        <div class=\"card-icons-wrapper\">\n" +
    "            <md-button class=\"md-icon-button\" ng-click=\"vm.openInBrowser(listing.subjectUrl)\">\n" +
    "                <md-icon md-svg-src=\"assets/icons/ic_open_in_browser_black_48px.svg\" aria-label=\"Launch in browser\"></md-icon>\n" +
    "            </md-button>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div layout=\"row\">\n" +
    "\n" +
    "        <div flex class=\"left\">\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Days listed</label>\n" +
    "                <span><b>{{listing.listing_daysOn}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Views today</label>\n" +
    "                <span ng-if=\"listing.listing_views_todayCnt != undefined\"><b>{{listing.listing_views_todayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_todayCnt == undefined\"><b>*</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>7-day views</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_sevenDayCnt != undefined\"><b>{{listing.listing_views_sevenDayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_sevenDayCnt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>30-day views</label>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_thirtyDayCnt != undefined\"><b>{{listing.listing_views_thirtyDayCnt}}</b></span>\n" +
    "\n" +
    "                <span ng-if=\"listing.listing_views_thirtyDayCnt == undefined\"><b>*</b></span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Total views</label>\n" +
    "                <span><b>{{listing.listing_views_totalCnt}}</b></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Favorites</label>\n" +
    "                <span ng-if=\"listing.listing_favoritesCnt\">\n" +
    "                     <md-icon  class=\"favs\" md-svg-src=\"assets/icons/ic_favorite_black_24px.svg\"></md-icon>\n" +
    "                  <b>{{listing.listing_favoritesCnt}}</b>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div flex class=\"right \">\n" +
    "            <div>\n" +
    "                <label>Current price</label>\n" +
    "                <span ng-show=\"listing.listing_price \">\n" +
    "                    <b>{{listing.listing_price  | noFractionCurrency}} </b>\n" +
    "                    </span>\n" +
    "\n" +
    "                <span ng-show=\"! listing.listing_price \">\n" +
    "                     <b>*</b>\n" +
    "                 </span>\n" +
    "            </div>\n" +
    "            <div style=\"border-bottom: 1px solid #eee; \">\n" +
    "                <label style=\"color: #636075; \"><b>Zestimate</b></label>\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <label>Current value</label>\n" +
    "\n" +
    "                <span><b>{{listing.est_currentValue | noFractionCurrency}}</b> </span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>30-day change</label>\n" +
    "\n" +
    "                <span><b>{{listing.est_thirtyDayChange | noFractionCurrency}}</b> </span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>High range</label>\n" +
    "\n" +
    "                <span><b>{{listing.est_highRange | noFractionCurrency}}</b> </span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>Low range</label>\n" +
    "                <span><b>{{listing.est_lowRange | noFractionCurrency}}</b> </span>\n" +
    "\n" +
    "            </div>\n" +
    "            <!--<div>-->\n" +
    "            <!--<label>1-yr forecast</label>-->\n" +
    "            <!--<span><b>$203858</b></span>-->\n" +
    "            <!--</div>-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--<div layout=\"row\" class=\"footer\">-->\n" +
    "       <p class=footer> {{listing.t.time | timeago }} </p>\n" +
    "        <!--</div>-->\n" +
    "\n" +
    "</md-card>\n" +
    "<!--\n" +
    "\n" +
    "\"activitySummary\":[\n" +
    "{\n" +
    "\"est_rentLowRange\":\"1\",\n" +
    "\"prop_views_totalCnt\":\"766\",\n" +
    "\"est_highRange\":\"277\",\n" +
    "\"status\":\"For Sale\",\n" +
    "\"listing_mlsId\":\"08990196\",\n" +
    "\"est_thirtyDayChange\":\"-677\",\n" +
    "\"listing_views_totalCnt\":\"591\",\n" +
    "\"est_rent\":\"1994\",\n" +
    "\"est_rentHighRange\":\"2\",\n" +
    "\"t\":{\n" +
    "    \"time\":1440105194147,\n" +
    "    \"minutes\":13,\n" +
    "    \"seconds\":14,\n" +
    "    \"hours\":16,\n" +
    "    \"month\":7,\n" +
    "    \"timezoneOffset\":300,\n" +
    "    \"year\":115,\n" +
    "    \"day\":4,\n" +
    "    \"date\":20\n" +
    "},\n" +
    "\"address\":\"11521 N BURLINGTON RD RICHMOND, IL 60071\",\n" +
    "\"listing_id\":\"4F134C97-4E33-45AC-AB89-8A36CB072DDC\",\n" +
    "\"listing_daysOn\":\"27\",\n" +
    "\"est_rentThirtyDayChange\":\"5\",\n" +
    "\"est_lowRange\":\"238\",\n" +
    "\"mls_id\":\"08990196\",\n" +
    "\"extSysId\":3,\n" +
    "\"listing_trend\":null,\n" +
    "\"est_currentValue\":\"256344\",\n" +
    "\"prop_prefs_favoritesCnt\":\"14\"\n" +
    "}\n" +
    "],\n" +
    "\"success\":true\n" +
    "-->"
  );


  $templateCache.put('templates/_md-showing-summary.view.html',
    "<md-card class=\"site-summary-card\">\n" +
    "    <div class=\"site-header\">\n" +
    "        <div class=\"logo\">\n" +
    "            <img ng-if=\"sysId == 8\" src=\"assets/logos/showings.com_logo_40x146.png\" alt=\"Showings.com\" />\n" +
    "            <img ng-if=\"sysId == 10\" src=\"/assets/logos/showingassist-logo.png\" alt=\"SA\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"feedback-div\">\n" +
    "        <div class=\"show-item\" ng-repeat=\"showing in showings | orderBy:'-startTime'\" ng-click=\"show($event, showing)\"\n" +
    "        ng-class=\"{'negative': showing.sentiment < -3, 'positive': showing.sentiment > 3 || showing.potentialOffer == true}\">\n" +
    "            <label><b> {{showing.contact.name}}</b></label>\n" +
    "            <div class=\"time-wrapper\">\n" +
    "                <span class=datetime>{{showing.startTime | timeago }}</span>\n" +
    "                <span class=datetime>&middot;</span> \n" +
    "                <span class=datetime>{{showing.startTime | date:'short'}}</span><br>\n" +
    "                 <span class=datetime>{{showing.type.name}} \n" +
    "                 &middot;\n" +
    "                {{showing.type.result}}\n" +
    "                <div ng-if=\"showing.type.message && showing.type.message.length>0\"> &middot;</div>\n" +
    "                 {{showing.type.message}} \n" +
    "                </span>\n" +
    "            </div>\n" +
    "           \n" +
    "            <p style=\"clear: both;\" ng-if=\"showing.feedback\" class=\"feedback\">\"{{showing.feedback}}\"</p>\n" +
    "            <p style=\"clear: both;\" ng-if=\"!showing.feedback\" class=\"feedback\"><i>\"No feedback was provided by agent.\"</i></p>\n" +
    "             <md-divider ng-if=\"!$last\"></md-divider>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"footer\" ng-if=\"vm.limit != -1 && vm.showings.length > vm.limit\" ng-click=\"showMoreFeedback()\">\n" +
    "            <span style=\"width: 100%\">\n" +
    "                <md-button style=\"float: left;\" class=\"md-icon-button\" ui-sref=\"app.feedback({card:'showings'})\">\n" +
    "                    <md-icon md-svg-src=\"assets/icons/ic_more_horiz_black_48px.svg\" aria-label=\"more\"></md-icon>\n" +
    "                </md-button>\n" +
    "\n" +
    "                 <span class=\"nofm\">{{vm.limit}} of {{vm.showings.length}}</span>\n" +
    "            </span>\n" +
    "\n" +
    "        </div>\n" +
    "        <!--\n" +
    "            \"feedback\":\"1 feedback requests have been sent.\",\n" +
    "                \"startTime\":\"2015-11-28T09:30:00-06:00\",\n" +
    "                \"sentiment\":0,\n" +
    "                \"potentialOffer\":false,\n" +
    "                \"time\":\"9:30 AM - 10:30 AM\",\n" +
    "                \"intShowingId\":\"5e41609e-f7af-4c5a-93bd-eca04af14971\",\n" +
    "                \"listing_id\":\"4F134C97-4E33-45AC-AB89-8A36CB072DDC\",\n" +
    "                \"date\":\"11-28-2015\",\n" +
    "                \"type\":{\n" +
    "                \"result\":\"Setup\",\n" +
    "                \"name\":\"Showing\",\n" +
    "                \"msg\":\"\"\n" +
    "                },\n" +
    "                \"contact\":{\n" +
    "                \"phone\":{\n" +
    "                \"office\":\"847-395-3000\",\n" +
    "                \"mobile\":\"847-878-7653\"\n" +
    "                },\n" +
    "                \"name\":\"DIANE KELLY\",\n" +
    "                \"emails\":\"DIANEKELLY42@YAHOO.COM\"\n" +
    "                }\n" +
    "                },\n" +
    "            \n" +
    "        -->\n" +
    "    </div>\n" +
    "</md-card>"
  );


  $templateCache.put('templates/_md-stat-summary.view.html',
    "<div id=\"stats-table\" class=\"site-summary-card\">\n" +
    "    <div class=\"row\">\n" +
    "\n" +
    "        <span class=\"cell showings-div\">\n" +
    "           \n" +
    "             <div style=\"min-height: 50px;\">\n" +
    "                    <md-icon class=\"stat-icon\" md-svg-src=\"assets/icons/showings.svg\"></md-icon>\n" +
    "                    <label>{{vm.listing.activityAggregate.listing_shows_todayCnt}}</label>\n" +
    "                </div>\n" +
    "                <div class=\"box-label\">\n" +
    "                    <span class=\"title no-wrap\">showings</span>\n" +
    "\n" +
    "    </div>\n" +
    "    </span>\n" +
    "\n" +
    "\n" +
    "    <span class=\"cell clicks-div\">\n" +
    "        \n" +
    "       <div style=\"min-height: 50px;\">                  \n" +
    "            <!--<img src=\"assets/icons/arrow.png\">  -->\n" +
    "                <md-icon class=\"stat-icon\" md-svg-src=\"assets/icons/clicks.svg\"></md-icon>\n" +
    "                <label>{{vm.listing_views_todayCnt.current}}</label> \n" +
    "            <change-indicator data=\"vm.listing_views_todayCnt\" rate-decimals=\"0\" pct-decimals=\"0\" color=\"light\"></change-indicator>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"box-label\">\n" +
    "            <span class=\"title no-wrap\">clicks</span>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "</span>\n" +
    "\n" +
    "<span ng-if=\"vm.showings != undefined\" class=\"cell positive-div\">\n" +
    "        \n" +
    "        <div style=\"min-height: 50px;\">\n" +
    "           \n" +
    "                <!--<img src=\"assets/icons/chat.png\"/>-->\n" +
    "                      <md-icon class=\"stat-icon\" md-svg-src=\"assets/icons/feedback.svg\"></md-icon>\n" +
    "                <label>{{vm.sentimentCounter.notNegative | percentOf:vm.showings.length | percentage}}</label>\n" +
    "                        </div>\n" +
    "                        <div class=\"box-label\">\n" +
    "                            <span class=\"title no-wrap\">non-negative</span>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "</span>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "\n" +
    "    <span class=\"cell showings-detail-div\">\n" +
    "        \n" +
    "        <div class=\"statrow\">\n" +
    "            <span class=\"label\">7-day</span>\n" +
    "    <span class=\"stat\">{{vm.listing.activityAggregate.listing_shows_sevenDayCnt}}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"statrow\">\n" +
    "    <span class=\"label\">30-day</span>\n" +
    "    <span class=\"stat\">{{vm.listing.activityAggregate.listing_shows_thirtyDayCnt}}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"statrow\">\n" +
    "    <span class=\"label\">Total</span>\n" +
    "    <span class=\"stat\">{{vm.listing.activityAggregate.listing_shows_totalCnt}}</span>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "</span>\n" +
    "\n" +
    "<span class=\"cell clicks-detail-div\">\n" +
    "        \n" +
    "        \n" +
    "        <div class=\"statrow\">\n" +
    "            <span class=\"label\">7-day</span>\n" +
    "\n" +
    "<span class=\"stat\">{{vm.listing_views_sevenDayCnt.current}}</span>\n" +
    "<span class=\"stat asterisk\" ng-if=\"!vm.listing.activityAggregate.sevenDayViewsComplete\"> * </span>\n" +
    "<br>\n" +
    "<change-indicator style=\"color: #999; \" data=\"vm.listing_views_sevenDayCnt \" rate-decimals=\"0\n" +
    "\" pct-decimals=\"0 \" color=\"dark \"></change-indicator>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"statrow \">\n" +
    "        <span class=\"label \">30-day</span>\n" +
    "        <span class=\"stat \">{{vm.listing_views_thirtyDayCnt.current}}</span>\n" +
    "        <span class=\"stat asterisk\" ng-if=\"!vm.listing.activityAggregate.thirtyDayViewsComplete \"> * </span>\n" +
    "        <br>\n" +
    "\n" +
    "        <change-indicator data=\"vm.listing_views_thirtyDayCnt \" rate-decimals=\"0 \" pct-decimals=\"0 \" color=\"dark \"></change-indicator>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"statrow \">\n" +
    "        <span class=\"label \" class=\"statrow \">Total</span>\n" +
    "        <span class=\"stat \">{{vm.listing.activityAggregate.listing_views_totalCnt}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    </span>\n" +
    "\n" +
    "\n" +
    "    <span ng-if=\"vm.showings != undefined\" class=\"cell positive-detail-div \">\n" +
    "        \n" +
    "       \n" +
    "            <div class=\"statrow \">\n" +
    "                <span class=\"label \">Positive</span>\n" +
    "    <span class=\"stat \">{{vm.sentimentCounter.positive}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"statrow \">\n" +
    "        <span class=\"label \">Negative</span>\n" +
    "        <span class=\"stat \" ngClass=\"vm.sentimentCounter.negative> 5\">{{vm.sentimentCounter.negative}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"statrow\">\n" +
    "        <span class=\"label\">Neutral</span>\n" +
    "        <span class=\"stat\">{{vm.sentimentCounter.neutral}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"statrow\">\n" +
    "        <span class=\"label\">Total</span>\n" +
    "        <span class=\"stat\">{{vm.showings.length}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    </span>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>"
  );


  $templateCache.put('templates/md-card-site-summary.html',
    "<md-card class=\"md-card site-summary-card\">\n" +
    "\n" +
    "    <div layout=\"row\" layout-align=\"space-around center\" style=\"padding: 10px\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"md-card-left-of-image\">\n" +
    "\n" +
    "            <table ng-show='listing.activitySummary[0].est_currentValue != undefined'>\n" +
    "                <thead>\n" +
    "\n" +
    "                </thead>\n" +
    "\n" +
    "                <div style=\"overflow: hidden; height: 100%\"\n" +
    "                     ng-show='listing.activitySummary[0].est_currentValue != undefined'>\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan=\"2\" class=\"card-section-label\"></td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\">\n" +
    "                        <td class=\"card-data-label\">current value</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_currentValue | currency:\"$\":0 }}\n" +
    "                            <md-icon class=\"negative-color\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange < 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_down_black_18px.svg\"></md-icon>\n" +
    "\n" +
    "                            <md-icon class=\"\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange >= 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_up_black_18px.svg\"></md-icon>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_thirtyDayChange'>\n" +
    "                        <td class=\"card-data-label\">thirty-day change</td>\n" +
    "                        <td class=\"data\"\n" +
    "                            ng-class=\"listing.activitySummary[0].est_thirtyDayChange < 0  ? 'negative-color' : ''\">\n" +
    "                            {{listing.activitySummary[0].est_thirtyDayChange | currency:\"$\":0 }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_highRange'>\n" +
    "                        <td class=\"card-data-label\">high range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_highRange | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_lowRange'>\n" +
    "                        <td class=\"card-data-label\">low range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_lowRange | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </div>\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "\n" +
    "            <!-- something for Redfin -->\n" +
    "            <table ng-show='listing.activitySummary[0].est_currentValue == undefined'>\n" +
    "                <thead>\n" +
    "\n" +
    "                </thead>\n" +
    "\n" +
    "                <div style=\"overflow: hidden; height: 100%\"\n" +
    "                   >\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan=\"2\" class=\"card-section-label\">listing price</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\">\n" +
    "                        <td class=\"card-data-label\">current value</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_currentValue | currency:\"$\":0 }}\n" +
    "                            <md-icon class=\"negative-color\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange < 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_down_black_18px.svg\"></md-icon>\n" +
    "\n" +
    "                            <md-icon class=\"\"\n" +
    "                                     ng-show=\"listing.activitySummary[0].est_thirtyDayChange >= 0\"\n" +
    "                                     md-svg-src=\"/assets/icons/ic_trending_up_black_18px.svg\"></md-icon>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_thirtyDayChange'>\n" +
    "                        <td class=\"card-data-label\">change thirty day</td>\n" +
    "                        <td class=\"data\"\n" +
    "                            ng-class=\"listing.activitySummary[0].est_thirtyDayChange < 0  ? 'negative-color' : ''\">\n" +
    "                            {{listing.activitySummary[0].est_thirtyDayChange | currency:\"$\":0 }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_highRange'>\n" +
    "                        <td class=\"card-data-label\">high range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_highRange * 1000 | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"data-row\" ng-show='listing.activitySummary[0].est_lowRange'>\n" +
    "                        <td class=\"card-data-label\">low range</td>\n" +
    "                        <td class=\"data\">{{listing.activitySummary[0].est_lowRange * 1000 | currency:\"$\":0 }}</td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </div>\n" +
    "\n" +
    "            </table>\n" +
    "\n" +
    "\n" +
    "            <!--this is cool this is coolthis is cool this is coolthis is cool this is coolthis is cool this is coolthis is cool this is cool-->\n" +
    "            <!--{{listing.activitySummary[0].listing_views_totalCnt}}-->\n" +
    "\n" +
    "            <!--as of  {{listing.activitySummary[0].t.time | date:\"EEEE, MMM d - h:m a\" }}-->\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!--<comment>show the proper value for days on even when we only have list_ts (listing date) by using-->\n" +
    "        <!--a filter-->\n" +
    "        <!--</comment>-->\n" +
    "\n" +
    "        <!-- show the proper value for days on even when we only have list_ts (listing date) by using -->\n" +
    "        <div id=\"md-card-image\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div ng-show='listing.activitySummary[0].listing_daysOn != undefined' class=\"logo-caption\">\n" +
    "                {{listing.activitySummary[0].listing_daysOn}} Days On\n" +
    "            </div>\n" +
    "            <div ng-show='listing.activitySummary[0].listing_ts != undefined' class=\"logo-caption\">\n" +
    "                {{listing.activitySummary[0].listing_ts | makeDaysOn}} Days On\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <md-card-content>\n" +
    "\n" +
    "        <h2>{{title}}</h2>\n" +
    "\n" +
    "        <div layout=\"row\" padding layout-align=\"space-around center\">\n" +
    "\n" +
    "\n" +
    "            <div> <md-card-stat title=\"TOTAL\" stat-model=\"listing.activitySummary[0].listing_views_totalCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"FAVORITES\" stat-model=\"listing.activitySummary[0].listing_prefs_favoritesCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat title=\"X-OUTs\" stat-model=\"listing.activitySummary[0].listing_prefs_xOutCnt\"></md-card-stat></div>\n" +
    "\n" +
    "            <div> <md-card-stat ng-show='listing.summary.listing_views_totalCnt' title=\"TOTAL\" value=\"{{listing.activitySummary[0].listing_views_totalCnt}}\"></md-card-stat></div>\n" +
    "\n" +
    "\n" +
    "            <div ng-show='listing.summary.listing_views_sevenDayCnt' class=\"summary-item seven-count\">\n" +
    "                {{listing.summary.listing_views_sevenDayCnt}} in last 7 days\n" +
    "            </div>\n" +
    "            <div ng-show='listing.summary.listing_views_thirtyDayCnt' class=\"summary-item thirty-count\">\n" +
    "                {{listing.summary.listing_views_thirtyDayCnt}} in last 30 days\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-card-content>\n" +
    "\n" +
    "\n" +
    "</md-card>\n" +
    "<!--\n" +
    "\n" +
    "\"activitySummary\":[\n" +
    "{\n" +
    "\"est_rentLowRange\":\"1\",\n" +
    "\"prop_views_totalCnt\":\"766\",\n" +
    "\"est_highRange\":\"277\",\n" +
    "\"status\":\"For Sale\",\n" +
    "\"listing_mlsId\":\"08990196\",\n" +
    "\"est_thirtyDayChange\":\"-677\",\n" +
    "\"listing_views_totalCnt\":\"591\",\n" +
    "\"est_rent\":\"1994\",\n" +
    "\"est_rentHighRange\":\"2\",\n" +
    "\"t\":{\n" +
    "    \"time\":1440105194147,\n" +
    "    \"minutes\":13,\n" +
    "    \"seconds\":14,\n" +
    "    \"hours\":16,\n" +
    "    \"month\":7,\n" +
    "    \"timezoneOffset\":300,\n" +
    "    \"year\":115,\n" +
    "    \"day\":4,\n" +
    "    \"date\":20\n" +
    "},\n" +
    "\"address\":\"11521 N BURLINGTON RD RICHMOND, IL 60071\",\n" +
    "\"listing_id\":\"4F134C97-4E33-45AC-AB89-8A36CB072DDC\",\n" +
    "\"listing_daysOn\":\"27\",\n" +
    "\"est_rentThirtyDayChange\":\"5\",\n" +
    "\"est_lowRange\":\"238\",\n" +
    "\"mls_id\":\"08990196\",\n" +
    "\"extSysId\":3,\n" +
    "\"listing_trend\":null,\n" +
    "\"est_currentValue\":\"256344\",\n" +
    "\"prop_prefs_favoritesCnt\":\"14\"\n" +
    "}\n" +
    "],\n" +
    "\"success\":true\n" +
    "-->\n"
  );


  $templateCache.put('templates/_listing-detail.feedback.view.html',
    "\n" +
    "<div ng-if=\"card === 'sentri'\"> <!--ng-if=\"vm.sentrilock.entries.length>0\"-->\n" +
    "    <md-card-sentri sentrilock='vm.sentrilock' title=\"Summary - Feedback on your sentrilock\"\n" +
    "    sysId=\"2\" limit=\"-1\" >\n" +
    "    </md-card-sentri>\n" +
    "</div>\n" +
    "<div ng-if=\"card == 'showings'\">\n" +
    "    <md-showing-summary \n" +
    "                imgurl=\"/assets/logos/ShowingsCom_243.png\" listing='vm.theListing' showings='vm.showings' title=\"Summary - Feedback on your showings\" \n" +
    "                sysId=\"8\" limit=\"-1\">\n" +
    "    </md-showing-summary>\n" +
    "            \n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"card == 'saShowings'\">\n" +
    "    <md-showing-summary \n" +
    "                imgurl=\"/assets/logos/showingassist-logo.png\" listing='vm.theListing' showings='vm.showings' title=\"Summary - Feedback on your showings\" \n" +
    "                sysId=\"10\" limit=\"-1\">\n" +
    "    </md-showing-summary>\n" +
    "            \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('templates/_listing-detail.view.html',
    "<style>\n" +
    "\n" +
    "    .negative-color {\n" +
    "        background: #992222;\n" +
    "    }\n" +
    "    .positive-color {\n" +
    "        background: #229922;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"listing-detail\" style=\"text-align: left;\" class=\"content\">\n" +
    "\n" +
    "    <div id=\"three-columns\" class=\"grid-container\" style=\"display:block;\">\n" +
    "\n" +
    "        <ul class=\"rig columns-2\">\n" +
    "            <li>\n" +
    "                <div style=\"width: 100%;\">\n" +
    "                    <md-card-image-overlay listing=\"vm.theListing\" showings=\"vm.showings\" title=\"Listing summary stats\"></md-card-image-overlay>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=no-border>\n" +
    "\n" +
    "                <div class=\"upper-right no-border\">\n" +
    "\n" +
    "                    <div ng-if=\"vm.theListing.extSysId=9\" layout=\"row\" layout-align=\"space-around center\">\n" +
    "                        <div style=\"width: 100%; \">\n" +
    "                            <md-card-mred listing=\"vm.theListing\" title=\"Activity on MRED\"></md-card-mred>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <br>\n" +
    "\n" +
    "                    <div ng-if=\"vm.theListing.activityAggregate.snapshots[5]\" layout=\"row\" layout-align=\"space-around center\">\n" +
    "                        <div style=\"width: 100%; \">\n" +
    "                            <md-card-redfin listing=\"vm.theListing.activityAggregate.snapshots[5]\" title=\"Activity on Redfin\"></md-card-redfin>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            \n" +
    "\n" +
    "            <li ng-if=\"vm.theListing.activityAggregate.snapshots[3]\">\n" +
    "\n" +
    "                <div ng-if=\"vm.theListing.activityAggregate.snapshots[3]\" layout=\"row\" layout-align=\"space-around center\">\n" +
    "\n" +
    "                    <div style=\"width: 100%; \">\n" +
    "\n" +
    "                        <md-card-zillow listing=\"vm.theListing.activityAggregate.snapshots[3] \" title=\"Activity on Zillow\">\n" +
    "\n" +
    "                        </md-card-zillow>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </li>\n" +
    "            \n" +
    "            <li  ng-if=\"vm.theListing.activityAggregate.snapshots[4]\">\n" +
    "                <div ng-if=\"vm.theListing.activityAggregate.snapshots[4]\" layout=\"row\" layout-align=\"space-around center\">\n" +
    "                    <div style=\"width: 100%;\">\n" +
    "                        <md-card-trulia listing=\"vm.theListing.activityAggregate.snapshots[4]\" title=\"Activity on Trulia\" launch=\"browse(url) \">\n" +
    "                        </md-card-trulia>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "            \n" +
    "            <li ng-if=\"vm.theListing.activityAggregate.snapshots[8] && vm.theListing.activityAggregate.snapshots[8].data.length> 0\">\n" +
    "                <md-showing-summary ng-if=\"vm.theListing.activityAggregate.snapshots[8] && vm.theListing.activityAggregate.snapshots[8].data.length> 0\"\n" +
    "                imgurl=\"/assets/logos/ShowingsCom_243.png\" listing='vm.theListing' showings='vm.theListing.activityAggregate.snapshots[8].data' title=\"Summary - Feedback on your showings\" \n" +
    "                sysId=\"8\" limit=\"4\">\n" +
    "                </md-showing-summary>\n" +
    "                <!---->\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"vm.theListing.activityAggregate.snapshots[10] && vm.theListing.activityAggregate.snapshots[10].data.length> 0\">\n" +
    "                <md-card-showing-assist ng-if=\"vm.theListing.activityAggregate.snapshots[10] && vm.theListing.activityAggregate.snapshots[10].data.length> 0\"\n" +
    "                imgurl=\"/assets/logos/showingassist-logo.png\" listing='vm.theListing' showings='vm.theListing.activityAggregate.snapshots[10].data' title=\"Summary - Feedback on your showings\"\n" +
    "                sysId=\"10\" limit = \"4\">\n" +
    "                </md-card-showing-assist>\n" +
    "            </li>\n" +
    "           \n" +
    "            <li ng-if=\"vm.sentrilock.entries.length>0\">\n" +
    "                <md-card-sentri ng-if=\"vm.sentrilock.entries.length>0\" sentrilock='vm.sentrilock' title=\"Sentilock Entry Logs\"\n" +
    "                sysId=\"2\" limit=\"4\">\n" +
    "                </md-card-sentri>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
