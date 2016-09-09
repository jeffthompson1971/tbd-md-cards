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

            var subject = "Regarding showing feedback you left at " + wholeRec.Location;
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
                $scope.entries = $scope.entriesNoOneDay
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