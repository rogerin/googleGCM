// Ionic Starter App
var noti = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform,$cordovaPush,$rootScope,$http) {
  //$scope.resultado = null;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }




  var androidConfig = {
    "senderID": "770131062120",
  };

   $cordovaPush.register(androidConfig).then(function(result) {
        //alert(result);
    }, function(err) {
        //alert(err);
      // Error
    });

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {

      if (notification.alert) {
        navigator.notification.alert(notification.alert);
      }

      if (notification.sound) {
        var snd = new Media(event.sound);
        snd.play();
      }

      if (notification.badge) {
        $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      }
      
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            alert('registration ID = ' + notification.regid);
            $http.post('http://192.168.0.6:3001/gcm', {user: 'rogerio', id: notification.regid, not: notification});

          }
          break;

        case 'message':
          $http.post('http://192.168.0.6:3001/gcm', {user: 'message', not: notification});

          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
         $http.post('http://192.168.0.6:3001/gcm', {user: 'error', not: notification});

          //alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });


    // WARNING: dangerous to unregister (results in loss of tokenID)
    //$cordovaPush.unregister(options).then(function(result) {
      // Success!
    //}, function(err) {
      // Error
    //});


  });
})
