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

                // var myEl = angular.element(element.find('md-list-item')[i]);

                // if (showings.potentialOffer) {


                // }
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