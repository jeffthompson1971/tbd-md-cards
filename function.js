    function DialogController($scope, $filter, $rootScope, $mdDialog, IS_MOBILE_APP, SYSTEM_EVENT, showing) {

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

            normalizedContact.note = "From showings.com feedback.";

            $rootScope.$broadcast(SYSTEM_EVENT.CONTACTS_ADD, normalizedContact);

        }
    };