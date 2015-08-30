
angular.module('jeffthompson1971.md-cards', []).
  
  directive('mdCardStat', function () {

  	return {

        scope: {
            statModel: '='
        },

        template: '<div class="summary-item total-count">\
        <div class="data-bit-label">{{title}}</div>\
        <div class="data-bit">\
        {{value}}\
        </div> </div>',

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            scope.$watch('statModel', function (statModel) {

                scope.value = statModel;

            });
        },
    }
    
  });