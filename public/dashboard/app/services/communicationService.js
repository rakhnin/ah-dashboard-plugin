define(['app'], function (app) {
  app.factory('ahDashboardCommunicationService', function (ahDashboardSession) {
    var ahClient = new actionheroClient();
    var actionEmit = function(action, params, callback){
        if(!callback && typeof params === 'function'){
          callback = params;
          params = null;
        }
        if(ahDashboardSession || (action === "login" || action === "logout" || action === "currentUser")){
          ahClient.action(action, params, function(result){
            if(callback){
              if(callback.length == 2){
                return callback(result.error, result);
              }
              else{
                return callback(result);
              }
            }
          });
        }
        return;
    };
    return {
      action : actionEmit,
      ahClient : ahClient
    };
  });
});
