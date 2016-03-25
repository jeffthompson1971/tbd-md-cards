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
        return function (items) {
          var filtered = [];
          
          for (var i = 0; i < items.length; i++) {
              if (items[i].AccessType != "1DayCodeGen") {
                 filtered.push(items[i]);
              }
          }
        
          return filtered;

        };
    })

  
})();
