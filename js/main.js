console.log("hello requireJS");

// localStorage.clear();　　

require(['Controller-AMD'], function(Controller) {　　
    Controller.initAll();
});