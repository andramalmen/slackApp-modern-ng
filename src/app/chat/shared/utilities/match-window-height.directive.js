/* @ngInject */
const MatchWindowHeight = ($timeout, $window) =>
  function(scope, el, attrs) {
    let setHeight = () => {
      let newHeight = $window.innerHeight;
      newHeight = newHeight - 100; // TODO - hack, figure this out properly
      el.css("height", newHeight+"px");
    }
    setHeight();
    $timeout(() => setHeight());
    angular.element($window).on("resize", setHeight);
    let cleanup = () => angular.element($window).off("resize", setHeight);
    return el.on('$destroy', cleanup);
  }

export default MatchWindowHeight;
