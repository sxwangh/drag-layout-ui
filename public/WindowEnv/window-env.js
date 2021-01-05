((window) => {
  const MY_ENV = {
    sessionId: '',
    userId: '4b21158a395311e88a710242ac110002',
    configId: '114',
    appId: '3cfcca372829495b970b14f3adc7ec58',
  };
  Object.freeze(MY_ENV);
  window.MY_ENV = MY_ENV;
  Object.defineProperty(window, 'MY_ENV', {
    writable: false,
  });
})(window);
