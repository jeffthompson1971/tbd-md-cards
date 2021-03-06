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
