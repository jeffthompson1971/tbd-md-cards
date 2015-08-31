
angular.module('jeffthompson1971.md-cards', [])
.  directive('mdCardStat', function () {

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
    
  })

  .directive('mdCardImageOverlay', function () {

    return {

        scope: {
            listing: '='

        },

        templateUrl: "views/templates/md-card-image-overlay.html",

        link: function (scope, element, attrs) {

            scope.title = attrs.title;

            // watch for changes in the listing to update the new photo
            scope.$watch('listing', function (listing) {

                var el = angular.element(element.find('#md-card-image'));

                el.css({
                    'background-image': 'url(' + listing.photoUrl + ')'

                });
            });
        }
    }
})

.directive('mdCardZillow', function () {

    return {

        transpose: true,
      scope: {
        listing: '='
      },

      templateUrl: '/views/templates/md-card-zillow.html',

      link: function (scope, element, attrs) {

        scope.title = attrs.title;

        // scope.imgUrl =  imgUrl="/assets/logos/zillow-logo-150x150.png"

        // watch for changes in the listing to update the new photo
        scope.$watch('siteSummaries', function (listing) {

          var el = angular.element(element.find('#md-card-image'));

          el.css({
            'background-image': 'url(assets/logos/zillow-logo-150x150.png)'

          });
        });
      }
    }
    }
)