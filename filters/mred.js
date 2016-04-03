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
