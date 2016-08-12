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

    MdCardSentriController.$inject = ['$scope', '$mdDialog', '$filter'];


    function DialogController($scope, $filter, $rootScope, $mdDialog, IS_MOBILE_APP, SYSTEM_EVENT, sentri) {

        $scope.sentri = sentri;

        $scope.showActions = true; //IS_MOBILE_APP;

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
            if (IS_MOBILE_APP && window.cordova) {
                window.cordova.InAppBrowser.open('tel:' + number, '_system');
            }

        };

        $scope.addToContacts = function (entry) {


            var normalizedContact = {
                name: {}
            };
            // first get the first and last name 
            if (entry.AgentFirstName && entry.AgentLastName) {
                normalizedContact.name.familyName = entry.AgentLastName;
                normalizedContact.name.givenName = entry.AgentFirstName;

            } else if (entry.ContactName) {
                var nameBits = contact.name.split(" ");
                if (nameBits.length < 2) {
                    // only have one name so assume it's first

                    normalizedContact.name.givenName = nameBits[0];
                } else {
                    normalizedContact.name.givenName = nameBits[0];
                    normalizedContact.name.familyName = nameBits[nameBits.length - 1];

                }


            } else {
                alert("need a friggen name");
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
            // finally grab any emails...


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
                // normalizedContact.emails = contact.emails;
            }

            $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, normalizedContact);
            // 

            // console.log(phone);
            // $scope.hide()
            // $cordovaContacts.save({
            //     nickname: name,
            //     phoneNumbers: [phone]
            // }).then(function (result) {
            //     console.log("Saved contact", result);
            // });
        }
    };

    function MdCardSentriController($scope, $mdDialog, $filter) {
        var vm = this;

        var entriesNoOneDay = $filter('filterOutOneDayCodeGen')(vm.sentrilock.entries);

        if (vm.limit && vm.limit != -1) {
            $scope.entries = entriesNoOneDay.slice(0, vm.limit);
          //  $scope.entries = vm.sentrilock.entries.slice(0, vm.limit);
        } else {
           // $scope.entries = vm.sentrilock.entries;
            $scope.entries = entriesNoOneDay

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
            // if (vm.limit && vm.limit != -1) {

            //     $scope.entries = data.entries.slice(0, vm.limit);

            // } else {
            //     $scope.entries = data.entries

            // }
               var entriesNoOneDay = $filter('filterOutOneDayCodeGen')(vm.sentrilock.entries);

        if (vm.limit && vm.limit != -1) {
            $scope.entries = entriesNoOneDay.slice(0, vm.limit);
          //  $scope.entries = vm.sentrilock.entries.slice(0, vm.limit);
        } else {
           // $scope.entries = vm.sentrilock.entries;
            $scope.entries = entriesNoOneDay

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