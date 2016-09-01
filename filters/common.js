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
                console.log(amount, value);
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
