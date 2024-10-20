const counterModule = (function () {
  let instance,
    counter = 0;

  const getCounter = function () {
    return counter;
  };

  const increaseCounter = function () {
    counter++;
  };

  const createInstance = function () {
    return {
      getCounter: getCounter,
      increaseCounter: increaseCounter,
    };
  };

  return {
    getInstance: function () {
      return instance || (instance = createInstance());
    },
  };
})();

export default counterModule;
