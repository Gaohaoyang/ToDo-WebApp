console.log("hello requireJS");
require(['util-AMD', 'DAO-AMD'], function(_, DAO) {　　　　
    console.log(_.isArray("aaaa"));
    console.log(_.isArray([1, 2, 3, 4]));
    DAO.initDataBase();
    DAO.listAllStorage();
});