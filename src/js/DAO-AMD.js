/**
 *
 * DAO
 *
 * 数据访问对象，包含数据的各种增删查改
 *
 * @file DAO-AMD.js
 * @author Gaohaoyang(gaohaoyang126@126.com)
 *
 */

//*******数据库设计************

/**
 *
 * 使用数据库的思想，构建3张表。
 * cateJson 分类
 * childCateJson 子分类
 * taskJson 任务
 *
 * 分类表 cate
 * ----------------------
 * id* | name | child(FK)
 * ----------------------
 *
 * 子分类表 childCate
 * --------------------------------
 * id* | pid(FK) | name | child(FK)
 * --------------------------------
 *
 * 任务表 task
 * ----------------------------------------------
 * id* | pid(FK) | finish | name | date | content
 * ----------------------------------------------
 */

define(['util-AMD'], function(_) {

    /**
     * 初始化数据
     * @return {[type]} [description]
     */
    var initDataBase = (function() {
        console.log("立即执行函数");
        if (!localStorage.cate || !localStorage.childCate || !localStorage.task) {
            console.log("初始化数据库");
            var cateJson = [{
                "id": 0,
                "name": "默认分类",
                "child": [0]
            }];

            var childCateJson = [{
                "id": 0,
                "pid": 0,
                "name": "默认子分类",
                "child": [-1],
            }];

            var taskJson = [{
                "id": -1,
                "pid": 0,
                "finish": true,
                "name": "使用说明",
                "date": "2015-06-05",
                "content": "本应用为离线应用，数据将存储在本地硬盘\n\n左侧为分类列表\n中间为当前分类下的任务列表\n右侧为任务详情\n\n可以添加删除分类，添加任务，修改任务，以及给任务标记是否完成等功能\n\nby Gaohaoyang\nhttp://gaohaoyang.github.io ",
            }];

            // DataBase init
            localStorage.cate = JSON.stringify(cateJson);
            localStorage.childCate = JSON.stringify(childCateJson);
            localStorage.task = JSON.stringify(taskJson);
        }
    })();

    // *********query*************
    /**
     * 查询所有分类
     * @return {Array} 对象数组
     */
    var queryCates = function() {
        return JSON.parse(localStorage.cate);
    };

    /**
     * 通过id查询分类  暂时没用到
     * @param  {number} id
     * @return {Object}    一个分类对象
     */
    var queryCateById = function(id) {
        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                return cate[i];
            }
        }
    };

    /**
     * 根据主分类 id 查询任务个数
     * @param  {number} id 主分类 id
     * @return {number}    任务个数
     */
    var queryTasksLengthByCateId = function(id) {
        var cate = queryCateById(id);
        var result = 0;
        if (cate.child.length !== 0) {
            for (var i = 0; i < cate.child.length; i++) {
                var childCate = queryChildCatesById(cate.child[i]);
                result += childCate.child.length;
            }
        }
        return result;
    };

    /**
     * 根据主分类查询任务个数
     * @param  {Object} cateObject 主分类对象
     * @return {number}            任务个数
     */
    var queryTasksLengthByCate = function(cateObject) {
        var result = 0;
        if (cateObject.child.length !== 0) {
            for (var i = 0; i < cateObject.child.length; i++) {
                var childCate = queryChildCatesById(cateObject.child[i]);
                result += childCate.child.length;
            }
        }
        return result;
    };
    // console.log(queryTasksLengthByCateId(0));
    // console.log(queryTasksLengthByCateId(1));
    // console.log(queryTasksLengthByCateId(2));
    // console.log(queryCateById(1));

    /**
     * 查询所有子分类
     * @return {Array} 子分类对象数组
     */
    var queryAllChildCates = function() {
        return JSON.parse(localStorage.childCate);
    };
    /**
     * 根据 id 查找子分类
     * @param  {number} id
     * @return {Object}    一个子分类对象
     */
    var queryChildCatesById = function(id) {
        var childCate = JSON.parse(localStorage.childCate);
        for (var i = 0; i < childCate.length; i++) {
            if (childCate[i].id == id) {
                return childCate[i];
            }
        }
    };
    // console.log(queryChildCatesById(0));
    // console.log("queryChildCatesById----->" + queryChildCatesById(0));
    // console.log(queryChildCatesById(0));

    // console.log("queryChildCatesByIdArray---->" + queryChildCatesByIdArray([0, 1]));
    // console.log(queryChildCatesByIdArray([0, 1]));
    /**
     * 根据一个 id 数组查询子分类
     * @param  {Array} idArr id 数组
     * @return {Array}       子分类对象数组
     */
    var queryChildCatesByIdArray = function(idArr) {
        if (_.isArray(idArr)) {
            var cateArr = [];
            for (var i = 0; i < idArr.length; i++) {
                cateArr.push(queryChildCatesById(idArr[i]));
            }
            return cateArr;
        }
    };

    /**
     * 查询所有任务
     * @param {boolean} status 任务完成状态
     * @return {Array} 任务对象数组
     */
    var queryAllTasks = function(status) {
        var tasksArr = JSON.parse(localStorage.task);
        var resultArr = [];
        if (status !== undefined) {
            for (var i = 0; i < tasksArr.length; i++) {
                if (status) {
                    if (tasksArr[i].finish === true) {
                        resultArr.push(tasksArr[i]);
                    }
                } else {
                    if (tasksArr[i].finish === false) {
                        resultArr.push(tasksArr[i]);
                    }
                }
            }
            return resultArr;
        } else {
            return tasksArr;
        }
    };
    // console.log(queryAllTasks(true));

    /**
     * 根据日期在指定任务列表中查询任务
     * @param  {String} date 日期字符串
     * @param  {Array} taskArr 指定任务对象列表
     * @return {Array}      任务对象数组
     */
    var queryTasksByDateInTaskArr = function(date, taskArr) {
        var tasks = [];
        // var allTasks = queryAllTasks();
        for (var i = 0; i < taskArr.length; i++) {
            if (taskArr[i].date == date) {
                tasks.push(taskArr[i]);
            }
        }
        return tasks;
    };

    /**
     * 根据 id 查询任务
     * @param  {number} id 任务 id
     * @return {Object}    一个任务对象
     */
    var queryTaskById = function(id) {
        var allTasks = queryAllTasks();
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {
                return allTasks[i];
            }
        }
    };
    // console.log("queryTaskById(3)");
    // console.log(queryTaskById(3));

    /**
     * 根据子分类 id 查询任务
     * @param  {number} id 子分类 id
     * @param  {String} status 任务完成状态
     * @return {Array}    任务对象数组
     */
    var queryTasksByChildCateId = function(id, status) {
        var resultArr = [];
        var tempArr = queryChildCatesById(id).child;
        console.log("子分类对象 child 字段内容---->" + tempArr);
        for (var i = 0; i < tempArr.length; i++) {
            var task = queryTaskById(tempArr[i]);
            if (status !== undefined) {
                console.log(status);
                if (status) {
                    if (task.finish === true) {
                        resultArr.push(task);
                    }
                } else {
                    if (task.finish === false) {
                        resultArr.push(task);
                    }
                }
            } else {
                resultArr.push(task);
            }
        }
        console.log(resultArr + "----------success");
        return resultArr;

    };
    // console.log("单独测试");
    // console.log(queryTasksByChildCateId(0, false));

    /**
     * 根据主分类 id 查询任务
     * @param  {number} id 主分类 id
     * @param  {String} status 任务完成状态
     * @return {Array}    任务对象数组
     */
    var queryTasksByCateId = function(id, status) {
        var resultArr = [];
        var cateChild = queryCateById(id).child;
        for (var i = 0; i < cateChild.length; i++) {
            if (status !== undefined) {
                console.log(status);
                resultArr = resultArr.concat(queryTasksByChildCateId(cateChild[i], status));
            } else {
                resultArr = resultArr.concat(queryTasksByChildCateId(cateChild[i]));
            }
        }
        return resultArr;
    };
    // console.log(queryTasksByCateId(1, true));
    console.log(queryTasksByCateId(0));


    //**********************ADD**************************
    /**
     * 添加分类
     * @param {String} name 分类名称
     */
    var addCate = function(name) {
        if (!name) {
            console.log("name is undefined");
        } else {
            var cateJsonTemp = JSON.parse(localStorage.cate);
            var newCate = {};
            newCate.id = cateJsonTemp[cateJsonTemp.length - 1].id + 1;
            newCate.name = name;
            newCate.child = [];
            cateJsonTemp.push(newCate);
            localStorage.cate = JSON.stringify(cateJsonTemp);
            console.log(cateJsonTemp);
            console.log(newCate);
        }
    };

    /**
     * 添加子分类
     * @param {number} pid  父节点 id
     * @param {String} name 子分类名称
     */
    var addChildCate = function(pid, name) {
        if (!pid || !name) {
            console.log("pid or name is undefined");
        } else {
            var childCateJsonTemp = JSON.parse(localStorage.childCate);
            var newChildCate = {};
            newChildCate.id = childCateJsonTemp[childCateJsonTemp.length - 1].id + 1;
            newChildCate.pid = pid;
            newChildCate.name = name;
            newChildCate.child = [];

            childCateJsonTemp.push(newChildCate);
            localStorage.childCate = JSON.stringify(childCateJsonTemp);

            //同时将父分类中的 child 添加数字
            updateCateChildByAdd(pid, newChildCate.id);

        }
    };

    /**
     * 添加一个任务
     * @param {Object} taskObject 任务对象，但是不包含 id 属性
     */
    var addTask = function(taskObject) {
        var taskArr = queryAllTasks();
        taskObject.id = taskArr[taskArr.length - 1].id + 1; //id 生成
        taskArr.push(taskObject);
        console.log(taskObject);
        console.log(taskArr);

        updateChildCateChildByAdd(taskObject.pid, taskObject.id); //更新子分类的 child 字段
        localStorage.task = JSON.stringify(taskArr);

        return taskObject.id; //将当前任务 id 返回，方便调用
    };
    // console.log(queryAllTasks()[queryAllTasks().length-1].id+1);
    // {
    //            "id": 4,
    //            "pid": 2,
    //            "finish": false,
    //            "name": "运维",
    //            "date": "2015-05-31",
    //            "content": "数据库备份",
    //        }
    //*****************UPDATE*******************
    /**
     * 更新分类的 child 字段
     * 添加一个 childId 到 这个 id 的分类对象里
     * @param  {number} id      要更新的分类的 id
     * @param  {number} childId 要添加的 childId
     * @return {[type]}         [description]
     */
    var updateCateChildByAdd = function(id, childId) {

        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                cate[i].child.push(childId);
            }
        }
        localStorage.cate = JSON.stringify(cate);
    };
    /**
     * 更新分类的 child 字段
     * 删除一个 childId 在这个 id 的分类对象里
     * @param  {number} id      要更新的分类的 id
     * @param  {number} childId 要删除的 childId
     * @return {[type]}         [description]
     */
    var updateCateChildByDelete = function(id, childId) {
        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                for (var j = 0; j < cate[i].child.length; j++) {
                    if (cate[i].child[j] == childId) {
                        cate[i].child = _.deleteInArray(cate[i].child, j);
                    }
                }
            }
        }
        localStorage.cate = JSON.stringify(cate);
    };
    // updateCateChildByAdd(1,3);
    // listAllStorage();
    // console.log("updateCateChildByDelete");
    // updateCateChildByDelete(1, 0);
    // listAllStorage();

    /**
     * 更新子分类的 child 字段
     * 添加一个 childId 在这个 id 的子分类对象里
     * 添加一个 task 时使用
     * @param  {number} id      子分类 id
     * @param  {number} childId 要添加的 childId
     * @return {[type]}         [description]
     */
    var updateChildCateChildByAdd = function(id, childId) {
        var childCate = queryAllChildCates();
        for (var i = 0; i < childCate.length; i++) {

            if (childCate[i].id == id) {
                childCate[i].child.push(childId);
            }
        }
        localStorage.childCate = JSON.stringify(childCate);
    };
    // updateChildCateChildByAdd(0,1000);
    // listAllStorage();

    /**
     * 根据任务 id 更新任务状态
     * @param  {number} taskId 任务 id
     * @return {[type]}        [description]
     */
    var updateTaskStatusById = function(taskId) {
        var allTasks = queryAllTasks();
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == taskId) {
                allTasks[i].finish = true;
            }
        }
        localStorage.task = JSON.stringify(allTasks);
    };
    // updateTaskStatusById(4);
    // listAllStorage();

    /**
     * 修改任务
     * @param  {number} id      任务id
     * @param  {String} name    任务标题
     * @param  {String} date    任务日期
     * @param  {String} content 任务内容
     * @return {[type]}         [description]
     */
    var updateTaskById = function(id, name, date, content) {
        var allTasks = queryAllTasks();
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {
                allTasks[i].name = name;
                allTasks[i].date = date;
                allTasks[i].content = content;
            }
        }
        localStorage.task = JSON.stringify(allTasks);
    };

    //**************DELETE*****************

    /**
     * 根据 id 删除分类
     * @param  {number} id 主分类 id
     * @return {[type]}    [description]
     */
    var deleteCate = function(id) {
        var result = [];
        var cateArr = queryCates();
        for (var i = 0; i < cateArr.length; i++) {
            if (cateArr[i].id == id) {
                result = _.deleteInArray(cateArr, i);
                if (cateArr[i].child.length !== 0) {
                    for (var j = 0; j < cateArr[i].child.length; j++) {
                        deleteChildCate(cateArr[i].child[j]);
                    }
                }
            }
        }
        localStorage.cate = JSON.stringify(result);
    };
    // deleteCate(1);
    // listAllStorage();
    // initCates();
    /**
     * 根据 id 删除子分类
     * @param  {number} id 子分类 id
     * @return {[type]}    [description]
     */
    var deleteChildCate = function(id) {
        var result = [];
        var childCateArr = queryAllChildCates();
        for (var i = 0; i < childCateArr.length; i++) {
            if (childCateArr[i].id == id) {
                result = _.deleteInArray(childCateArr, i);
                //更新父节点中的 childId 字段
                updateCateChildByDelete(childCateArr[i].pid, childCateArr[i].id);
                //查看 child
                if (childCateArr[i].child.length !== 0) {
                    for (var j = 0; j < childCateArr[i].child.length; j++) {
                        deleteTaskById(childCateArr[i].child[j]);
                    }
                }
            }
        }
        localStorage.childCate = JSON.stringify(result); //save
    };
    // deleteChildCate(0);
    // listAllStorage();
    // initCates();

    /**
     * 根据 id 删除一条任务
     * @param  {number} id 任务 id
     * @return {[type]}    [description]
     */
    var deleteTaskById = function(id) {
        var result = [];
        var allTasksArr = queryAllTasks();
        for (var i = 0; i < allTasksArr.length; i++) {
            if (allTasksArr[i].id == id) {
                result = _.deleteInArray(allTasksArr, i);
            }
        }
        localStorage.task = JSON.stringify(result); //save
    };
    // deleteTaskById(0);
    // listAllStorage();
    /**
     * 列举所有存储内容 测试时使用
     * @return {[type]} [description]
     */
    var listAllStorage = function() {
        console.log("=============listAllStorage==============");
        for (var i = 0; i < localStorage.length; i++) {
            var name = localStorage.key(i);
            var value = localStorage.getItem(name);
            console.log("name----->" + name);
            console.log("value---->" + value);
            console.log("---------------------");
        }
        console.log("======End=======listAllStorage==============");
    };

    return {
        // 初始化数据库
        initDataBase: initDataBase,

        // 查询
        queryCates: queryCates,
        queryCateById: queryCateById,
        queryTasksLengthByCateId: queryTasksLengthByCateId,
        queryTasksLengthByCate: queryTasksLengthByCate,
        queryAllChildCates: queryAllChildCates,
        queryChildCatesById: queryChildCatesById,
        queryChildCatesByIdArray: queryChildCatesByIdArray,
        queryAllTasks: queryAllTasks,
        queryTasksByDateInTaskArr: queryTasksByDateInTaskArr,
        queryTaskById: queryTaskById,
        queryTasksByChildCateId: queryTasksByChildCateId,
        queryTasksByCateId: queryTasksByCateId,

        // 增加
        addCate: addCate,
        addChildCate: addChildCate,
        addTask: addTask,

        // 修改
        updateCateChildByAdd: updateCateChildByAdd,
        updateCateChildByDelete: updateCateChildByDelete,
        updateChildCateChildByAdd: updateChildCateChildByAdd,
        updateTaskStatusById: updateTaskStatusById,
        updateTaskById: updateTaskById,

        // 删除
        deleteCate: deleteCate,
        deleteChildCate: deleteChildCate,
        deleteTaskById: deleteTaskById,

        // 打印数据库
        listAllStorage: listAllStorage
    };
});