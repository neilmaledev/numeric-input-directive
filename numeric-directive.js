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
                        if(scope.numeric.type === 'decimal') {
                            value = isNaN(parseFloat(ctrl.$viewValue)) ? undefined : parseFloat(ctrl.$viewValue);
                        } else {
                            value = isNaN(parseInt(ctrl.$viewValue)) ? undefined : parseInt(ctrl.$viewValue);
                            //Integer is default even without adding type
                        }
                    } else {
                        value = isNaN(parseInt(ctrl.$viewValue)) ? undefined : parseInt(ctrl.$viewValue);
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

                        if(scope.numeric.hasOwnProperty('type') && scope.numeric.type === 'decimal') {
                            min = parseFloat(scope.numeric.min);
                        } else {
                            min = parseInt(scope.numeric.min);
                        }

                        if(!isNaN(min) && value < min) {
                            value = min;
                        }

                    } else if (scope.numeric.hasOwnProperty('max')) {

                        if(scope.numeric.hasOwnProperty('type') && scope.numeric.type === 'decimal') {
                            max = parseFloat(scope.numeric.max);
                        } else {
                            max = parseInt(scope.numeric.max);
                        }

                        if(!isNaN(max) && value > max) {
                            value = max;
                        }
                    }
                } else {
                    value = isNaN(parseInt(ctrl.$viewValue)) ? undefined : parseInt(ctrl.$viewValue); /* default */
                }
                if(value){
                    ctrl.$setViewValue(value.toString());
                }
                ctrl.$render();

            });
        }
    };
});

})();
