(function() {
  'use strict';

  /* global _ */

  /**
   */
angular.module('ngNumericInput', [])

.directive('numeric', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            numeric: '='
        },
        link: function (scope, elem, attr, ctrl) {
            elem.bind('change', function() {
                
                var value, min, max;

                if(scope.numeric !== undefined) {

                    if(scope.numeric.hasOwnProperty('type')) {
                        if(scope.numeric.type === 'integer') {
                            value = isNaN(parseInt(ctrl.$viewValue)) ? 1 : parseInt(ctrl.$viewValue);
                        } else if(scope.numeric.type === 'decimal') {
                            value = isNaN(parseFloat(ctrl.$viewValue)) ? 1 : parseFloat(ctrl.$viewValue);
                        } else {
                            value = isNaN(parseInt(ctrl.$viewValue)) ? 1 : parseInt(ctrl.$viewValue);
                            console.log('Warning: Number type is invalid. ("integer" or "decimal" only). Integer is default even without adding type');
                        }
                    } else {
                        value = isNaN(parseInt(ctrl.$viewValue)) ? 1 : parseInt(ctrl.$viewValue);
                    }

                    if(scope.numeric.hasOwnProperty('min') && scope.numeric.hasOwnProperty('max')) {

                        var minimum, maximum;

                        if(scope.numeric.hasOwnProperty('type') && scope.numeric.type === 'decimal') {
                            minimum = parseFloat(scope.numeric.min);
                            maximum = parseFloat(scope.numeric.max);
                        } else {
                            minimum = parseInt(scope.numeric.min);
                            maximum = parseInt(scope.numeric.max);
                        }

                        min = minimum > maximum ? maximum : minimum;
                        max = maximum < minimum ? minimum : maximum;

                        if(!isNaN(min) && !isNaN(max)) {

                            if(value < min) {
                                value = min;
                            } else if(value > max) {
                                value = max;
                            }
                            
                        } else if (isNaN(min) && !isNaN(max)) {

                            if(value > max) {
                                value = max;
                            }
                            
                        } else if (isNaN(max) && !isNaN(min)) {

                            if(value < min) {
                                value = min;
                            }

                        }

                    } else if (scope.numeric.hasOwnProperty('min')) {

                        min = parseInt(scope.numeric.min);

                        if(!isNaN(min) && value < min) {
                            value = min;
                        }

                    } else if (scope.numeric.hasOwnProperty('max')) {

                        max = parseInt(scope.numeric.max);

                        if(!isNaN(max) && value > max) {
                            value = max;
                        }

                    }
                }

                ctrl.$setViewValue(value.toString());
                ctrl.$render();

            });
        }
    };
});

})();
