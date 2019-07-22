app.directive('essayCell', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'essayCell.html'
  };
})
