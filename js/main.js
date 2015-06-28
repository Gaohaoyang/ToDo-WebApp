console.log("hello requireJS");
require(['Controller-AMD'], function(Controller) {　　
    Controller.initAll();
    // localStorage.clear();　　
});