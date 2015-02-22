(function() {
    "use strict";

    var elements = angular.module('elements', []);

    elements.directive('btn', function(){
        return{
            restrict: 'E',
            scope: true,
            templateUrl: '../patterns/2_elements/buttons/button.html',
            link: function(scope, elem, attrs){
                scope.opt = attrs;
            }
        };
    });

})();
