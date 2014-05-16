angular.module('myApp.services', []).
 factory('socket', function ($rootScope) {

  var socket = io.connect('http://localhost:3001');
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

  // factory('socket', function (socketFactory) {
  //   return socketFactory();
  // }).
  // value('version', '0.1');