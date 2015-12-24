/*
 md-custom-directives - bunch of own mobile design cards

 ** depends on all our common templates being a availabe vi ngTemplateCache at /views/templates

 */



var mdCardStat = function () {

    return {

        scope: {
            statModel: '='
        },

        template: '<div class="summary-item total-count">\
                        <div class="data-bit-label">\
                            <div >\
                                <i ng-show="mdIconName !== undefined" class="mdi md-accent  md-stat-icon {{mdIconName}}"></i>\
                                <div class="label-text">{{title}}</div>\
                            </div>\
                        </div>\
                        <div class="data-bit">\
                        {{value}}\
                    </div> </div>',

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            scope.height = attrs.height;

            scope.mdIconName = attrs.mdIcon;

            if (attrs.height) {
                var el = angular.element(element.find('.summary-item'));

                el.css({
                    'height': attrs.height + "px",

                });
            }

            if (attrs.icon !== undefined) {

                var labelEl = angular.element(element.find('.data-bit-label'));

                // get the label-icon element so we can add the chat icon (hack)
                var iconEl = angular.element(labelEl.find('.label-icon'));

                iconEl.addClass("chat-icon")

                if (attrs.specialClass) {

                    iconEl.addClass(attrs.specialClass)
                }

                var width = labelEl.width() + 50;

            } ;

            scope.$watch('statModel', function (statModel) {

                scope.value = statModel;

            });
        },
    }
};

var loginPage = function () {
    return {
        template: ' <div class= "login-div">\
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
    }
};

var signUp = function () {

    return {
        scope: {
            mlsset: '=',
            mlsdata: '='
        },

        template: ' <div class= "login-div">\
                        <div class= "input-background">\
                        <md-input-container flex>\
                            <h5>Primary MLS</h5>\
                            <md-select ng-model="mlsdata.mls" required>\
                                <md-option ng-repeat="mls in mlsset" value="{{mls.id}}">\
                               {{mls.id}} - {{mls.name}}\
                                </md-option>\
                            </md-select>\
                        </md-input-container>\
                        </div>\
                        <div class= "input-background">\
                               <h5>{{agentId}}</h5>\
                            <md-input-container md-no-float >\
                                <input placeholder="" name="agentId" ng-model="mlsdata.agentId" class="input-border" required>\
                            </md-input-container>\
                        </div>\
                        <div class= "input-background">\
                            <h5>{{pass}}</h5>\
                            <md-input-container md-no-float >\
                                <input type= "password" name="agentPassword" placeholder="" ng-model="mlsdata.password" class="input-border" required>\
                            </md-input-container>\
                        </div>\
                    </div>',

        link: function (scope, element, attrs) {
            scope.agentId = attrs.agentid;

            scope.pass = attrs.pass;

        }
    }
};


var mdCardImageOverlay = function () {

    return {

        scope: {
            listing: '='
        },

        templateUrl: "views/templates/md-card-image-overlay.html",

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            // watch for changes in the listing to update the new photo.
            scope.$watch('listing', function (theListing) {

                var el = angular.element(element.find('#md-card-image'));

                el.css({
                    'background-image': 'url(' + scope.listing.photoUrl + ')'

                });
            });
        }
    }
}


var listingImage = function () {

    return{

        scope: {

            listing: '='

        },
        // template: '<img src="{{source}}"></img>',

        link: function (scope, element, attrs) {

            scope.source = attrs.source;

                var el = angular.element(element.find('#image-l'));

                el.css({
                    'background-image': 'url(' + scope.source + ')'

                });
            
        }
    }
}

var mdCardRedfin = function () {

    return {
        transpose: true,

        scope: {
            listing: '='
        },

        templateUrl: 'views/templates/md-card-redfin.html',

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            var el = angular.element(element.find('#md-card-image'));

            el.css({
                'background-image': 'url(/assets/logos/redfin_logo_40x166.png)'
            });

            scope.browse = function (url) {

                $window.open(url, '_blank');

            };

            // watch for changes in the listing to update the new photo
            scope.$watch('siteSummaries', function (listing) {
                // maybe do something here..
            });
        }
    }
};


var mdCardZillow = ['$log', '$window', 'TEMPLATES', function ($log, $window, TEMPLATES) {
    return {
        transpose: true,

        scope: {
            listing: '='
        },

        templateUrl: TEMPLATES + '/md-card-zillow.html',

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            scope.logoUrl = ( attrs.logourl !== undefined) ? attrs.logourl : "/assets/logos/zillow_logo_40x189.png";

            // handle the button press to GO to trulia
            scope.go = function (val) {
                scope.$parent.navToSite(val);
            }


            //// watch for changes in the listing to update the new photo
            scope.$watch('siteSummaries', function (listing) {

                console.log("path: " + TEMPLATES);
              //  scope.listing = listing;
                var el = angular.element(element.find('#md-card-image'));

                el.css({
                    'background-image': 'url(' + scope.logoUrl + ')'

                });
            });

            scope.browse = function (url) {

                $window.open(url);

            }
        }
    }
}];


var mdCardTrulia = ['$log', '$window', function ($log, $window) {
    return {
        transpose: true,

        scope: {
            listing: '='
        },

        templateUrl: '/views/templates/md-card-trulia.html',

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            // handle the button press to GO to trulia
            scope.go = function (val) {

                scope.$parent.navToSite(val);
            }

            scope.logoUrl = ( attrs.logourl !== undefined) ? attrs.logourl : "/assets/logos/trulia_logo_40x113.png";

            // watch for changes in the listing to update the new photo
            scope.$watch('siteSummaries', function (listing) {

               // scope.listing = listing;

                var el = angular.element(element.find('#md-card-image'));

                el.css({
                    'background-image': 'url(' + scope.logoUrl + ')'

                });
            });
        }
    }
}];


var mdShowingSummary = ['$log', '$window', '$mdDialog', function ($log, $window, $mdDialog) {

    return {
        scope: {
            showings: '=',
            ngClass: "="
        },

        templateUrl: '/views/templates/md-showing-summary.html',

        link: function (scope, element, attrs) {

            scope.$watch("ngClass", function (value) {
                $(element).attr("class", value)
            });

            scope.logoUrl = ( attrs.logourl !== undefined) ? attrs.logourl : "/assets/logos/showings.com_40x146.png";

            scope.title = attrs.title;

            scope.sysId = attrs.sysid;

            scope.imgUrl = attrs.imgurl;

            scope.collapsed = true;

            scope.positiveFB = [];

            scope.negativeFB = [];

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
            scope.$watch('showings', function (showings) {

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
            };

            scope.show = function (ev, selShowing) {
                $mdDialog.show(
                    {
                        locals: {
                            showing: selShowing
                        },
                        controller: DialogController,
                        templateUrl: '/views/templates/md-card-showing-detail.html',
                        parent: parentEl,
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function (answer) {
                        scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
                        scope.status = 'You cancelled the dialog.';
                    });
            }
        }
    }
}
]

