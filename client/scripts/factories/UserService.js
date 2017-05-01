myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

//users
  //variables
  var userObject = {};

  //functions
  function getuser(){
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            userObject.userName = response.data.username;
            console.log('User Data: ', userObject.userName);
        } else {
            $location.path("/login");
        }
    });//ends $http.get/user
  }//ends getuser

  function logout(){
    $http.get('/user/logout').then(function(response) {
      $location.path("/login");
    });//ends $http.get/user/logout
  }//ends logout


//chooseTheme
  //variables
  var themes = {};
  var currentThemeObject = {};
  currentThemeObject.theme = '';
  currentThemeObject.questionsArray = [];

  //functions
  function getAllThemes(){
    $http.get('/themes/getAll').then(function(response){
      themes.data = response.data;
      return themes.data;
    });//ends http.get/themes/getAll
  }//ends getAllThemes

  function addTheme(newThemeObject){
    $http.post('/themes/addTheme', newThemeObject).then(function(response){
        currentThemeObject.data = response.data;
        currentSessionObject.theme = currentThemeObject.data;
        $location.path("/addParticipants");
    });//ends http.post/themes/addTheme
  }//ends createTheme

  function updateTheme(updateObject){
    $http.put('/themes/updateTheme', updateObject).then(function(response){
      currentThemeObject.data = response.data;
      currentSessionObject.theme = currentThemeObject.data;
      $location.path("/addParticipants");
    });//ends http.put/themes/updateTheme
  }//ends updateTheme

//addParticipants
  var currentSessionObject = {};
  currentSessionObject.theme = currentThemeObject;
  currentSessionObject.participantsArray = [];

  // function saveParticipants(currentSessionObject, sessionObject){
  //   if(currentSessionObject.data.questionsArray.length < sessionObject.participantsArray.length){
  //     console.log("you have fewer questions than participants, that is not going to work.");
  //   }
  //   var putObject = {};
  //   putObject.id = currentSessionObject.data._id;
  //   putObject.participantsArray = sessionObject.participantsArray;
  //   console.log("putObject", putObject);
  //   $http.put('/createSession/saveParticipants', putObject).then(function(response){
  //     console.log("response", response);
  //     currentSessionObject.data = response.data;
  //     console.log("currentSessionObject.data", currentSessionObject.data);
  //   $location.path("/sessionIntro");
  //   });//ends put to saveParticipants
  // }//ends saveParticipants




  return {
    userObject : userObject,
    getuser: getuser,
    logout: logout,

    currentThemeObject: currentThemeObject,
    themes: themes,
    getAllThemes: getAllThemes,
    addTheme: addTheme,
    updateTheme: updateTheme,

    //addParticipants
    currentSessionObject: currentSessionObject,


  };//ends return
}]);//ends myApp.factory
