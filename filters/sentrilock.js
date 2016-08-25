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
