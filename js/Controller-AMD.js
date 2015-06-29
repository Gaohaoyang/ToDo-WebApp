/**
 *
 * Controller
 *
 * 控制层
 *
 * 控制各种交互和事件
 *
 * @file Controller-AMD.js
 * @author Gaohaoyang(gaohaoyang126@126.com)
 *
 */

define(['util-AMD', 'DAO-AMD'], function(_, DAO) {

    //全局变量
    var currentCateId = -1; //当前分类id
    var currentCateTable = "AllCate"; //当前分类表
    var currentTaskId = -1; //当前任务 id

    /**
     * 初始化全部
     */
    var initAll = function() {
        // localStorage.clear();
        initCates(); //初始化分类
        initModal(); //初始化模态框

        var taskList = _.$("#task-list");
        taskList.innerHTML = createTaskList(DAO.queryAllTasks()); //初始化任务列表
        cateTaskStatusController(); //任务状态分类
        generateTaskById(taskList.getElementsByTagName("li")[0].getAttribute("taskid")); //初始化任务详细
        _.addClass(_.$("[taskid]"), "active"); //将第一个有 taskid 属性的元素高亮
        DAO.listAllStorage();

        // ---------------------分类列表区的监听------------
        var listContentArea = _.$("#listcontent");
        // 事件代理 绑定事件
        _.delegateEventBubbleOnce(listContentArea, "h2", "click", function() {
            clickCate(this);
        });
        _.delegateEventBubbleOnce(listContentArea, "h3", "click", function() {
            clickCate(this);
        });

        // 所有分类绑定事件
        _.addClickEvent(_.$("#allTasks"), function() {
            clickCate(this);
            generateTaskById(taskList.getElementsByTagName("li")[0].getAttribute("taskid"));
        });

        // 对删除绑定事件
        _.delegateEventTrash(listContentArea, "i", "click", "fa fa-trash-o", function() {
            del(event, this);
        });

        // 给新建分类绑定监听
        _.addClickEvent(_.$("#addCate"), function() {
            clickAddCate();
        });

        //------------------------------modal------------------------
        // 确认按钮绑定事件
        _.addClickEvent(_.$("#ok-modal"), function() {
            ok();
        });

        // 取消按钮绑定事件
        _.addClickEvent(_.$("#cancel-modal"), function() {
            cancel();
        });

        // -----------------------任务列表区-----------------------
        // 点击到任务条目上
        _.delegateEventBubbleOnce(_.$("#task-list"), "li", "click", function() {
            clickTask(this);
        });

        // 新建任务
        _.addClickEvent(_.$("#add-task"), function() {
            clickAddTask();
        });
    };

    /**
     * 初始化分类
     */
    var initCates = function() {

        var cate = DAO.queryCates(); //查出所有分类
        var tempStr = '<ul>';
        var defaultChildCate = DAO.queryChildCatesById(0);

        for (var i = 0; i < cate.length; i++) {
            var liStr = "";

            if (cate[i].child.length === 0) {
                // if (i === 0) {
                //     liStr = '<li><h2 cateid=' + cate[i].id + '><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + DAO.queryTasksLengthByCate(cate[i]) + ')</h2></li>';
                // } else {
                liStr = '<li><h2 cateid=' + cate[i].id + '><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + DAO.queryTasksLengthByCate(cate[i]) + ')<i class="fa fa-trash-o"></i></h2></li>';
                // }
            } else {
                if (i === 0) {
                    // var childCateDefault = DAO.queryChildCatesById(0);
                    // liStr = '<li><h2 cateid=' + cate[i].id + '><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + DAO.queryTasksLengthByCate(cate[i]) + ')</h2><ul><li><h3 cateid=' + childCateArr[j].id + '><i class="fa fa-file-o"></i><span>' + childCateDefault.name + '</span> (' + childCateDefault.length + ')</h3></li>';
                    liStr = '<li><h2 cateid=0><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + DAO.queryTasksLengthByCate(cate[i]) + ')</h2><ul><li><h3 cateid=0><i class="fa fa-file-o"></i><span>' + defaultChildCate.name + '</span> (' + defaultChildCate.child.length + ')</h3></li>';
                } else {
                    liStr = '<li><h2 cateid=' + cate[i].id + '><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + DAO.queryTasksLengthByCate(cate[i]) + ')<i class="fa fa-trash-o"></i></h2><ul>';
                    var childCateArr = DAO.queryChildCatesByIdArray(cate[i].child);
                    for (var j = 0; j < childCateArr.length; j++) {
                        var innerLiStr = "";
                        innerLiStr = '<li><h3 cateid=' + childCateArr[j].id + '><i class="fa fa-file-o"></i><span>' + childCateArr[j].name + '</span> (' + childCateArr[j].child.length + ')<i class="fa fa-trash-o"></i></h3></li>';
                        liStr += innerLiStr;
                    }
                    liStr += '</ul></li>';
                }
            }
            tempStr += liStr;
        }
        tempStr += '</ul>';

        var listContentArea = _.$("#listcontent");

        //写入列表内容区
        listContentArea.innerHTML = tempStr;

        //设置所有任务个数
        _.$(".list-title span").innerHTML = DAO.queryAllTasks().length;
    };

    /**
     * 点击垃圾桶图标
     * @param  {Object} e       事件对象
     * @param  {Object} element 元素
     * @return {[type]}         [description]
     */
    var del = function(e, element) {
        //这里要阻止事件冒泡
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        console.log("=====del======");
        var cateClicked = element.parentNode;
        if (cateClicked.tagName.toLowerCase() === "h2") {
            console.log("h2");
            cateClicked.getAttribute("cateid");
            console.log(cateClicked.getAttribute("cateid"));
            var r = confirm("是否确定删除分类？");
            if (r === true) {
                DAO.deleteCate(cateClicked.getAttribute("cateid"));
            }
        } else if (cateClicked.tagName.toLowerCase() === "h3") {
            console.log("h3");
            console.log(cateClicked.getAttribute("cateid"));
            var rr = confirm("是否确定删除分类？");
            if (rr === true) {
                DAO.deleteChildCate(cateClicked.getAttribute("cateid"));
            }
        }
        initCates();
        initModal(); //刷新模态框选项
        _.$("#task-list").innerHTML = createTaskList(DAO.queryAllTasks()); //初始化任务列表
    };

    /**
     * 添加分类
     */
    var clickAddCate = function() {
        console.log("=========clickAddCate===========");
        var cover = _.$(".cover");
        cover.style.display = "block";
    };

    /**
     * 初始化模态框
     *
     */
    var initModal = function() {
        var cate = DAO.queryCates();
        var selectContent = '<option value="-1">新增主分类</option>';
        for (var i = 1; i < cate.length; i++) {
            selectContent += '<option value="' + cate[i].id + '">' + cate[i].name + '</option>';
        }
        _.$("#modal-select").innerHTML = selectContent;
        _.$("#newCateName").value = "";
    };

    /**
     * 取消按钮
     */
    var cancel = function() {
        _.$(".cover").style.display = "none";
    };

    /**
     * 确认按钮
     */
    var ok = function() {
        console.log("----click ok----");
        console.log(_.$("#modal-select").value);
        var selectValue = _.$("#modal-select").value;
        var newCateName = _.$("#newCateName").value;
        if (newCateName === "") {
            alert("请输入分类名称");
        } else {
            if (selectValue == -1) {
                console.log("新增主分类");
                DAO.addCate(newCateName);
            } else {
                console.log("增加分类");
                DAO.addChildCate(selectValue, newCateName);
            }
            initCates(); //初始化分类
            _.$(".cover").style.display = "none";
        }
        initModal();
    };

    // var bindClickCate = function() {

    // };

    /**
     * 点击分类
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    var clickCate = function(element) {
        console.log("=======clickCate=======");
        console.log(element);
        var taskList = _.$("#task-list");
        setHighLight(element); //设置高亮

        console.log(element.getAttribute("cateid"));
        var cateId = element.getAttribute("cateid");
        if (cateId == -1) { //点击所有分类
            taskList.innerHTML = createTaskList(DAO.queryAllTasks());
            currentCateId = -1;
            currentCateTable = "AllCate";
        } else { //点击在主分类或子分类上
            if (element.tagName.toLowerCase() == "h2") {
                console.log("main cate--->" + cateId);
                
                var innerHTMLString = createTaskList(DAO.queryTasksByCateId(cateId));
                taskList.innerHTML = innerHTMLString;
                currentCateId = cateId;
                currentCateTable = "cate";

                if (innerHTMLString==="") {
                    generateTaskById(-2);
                } else{
                    generateTaskById(currentTaskId);
                }

            } else {
                console.log("childCate--->" + cateId);
                //子分类
                console.log(DAO.queryTasksByChildCateId(cateId));

                var innerHTMLString2 = createTaskList(DAO.queryTasksByChildCateId(cateId));
                taskList.innerHTML = innerHTMLString2;

                currentCateId = cateId;
                currentCateTable = "childCate";

                 if (innerHTMLString2==="") {
                    generateTaskById(-2);
                } else{
                    generateTaskById(currentTaskId);
                }
            }
        }

        //状态按钮默认跳到所有上面
        cleanAllActiveOnStatusButton();
        _.addClass(_.$("#all-tasks"), "active");
        if (_.$("[taskid]") !== undefined) {
            _.addClass(_.$("[taskid]"), "active"); //将第一个有 taskid 属性的元素高亮
        }

        

        showScreen2();
    };

    /**
     * 设置高亮
     * @param {Object} element 点击的 element 对象
     */
    var setHighLight = function(element) {
        cleanAllActive();
        _.addClass(element, "active");
    };

    /**
     * 清除所有高亮
     * @return {[type]} [description]
     */
    var cleanAllActive = function() {
        _.removeClass(_.$("#allTasks"), "active");
        var h2Elements = _.$("#listcontent").getElementsByTagName('h2');
        for (var i = 0; i < h2Elements.length; i++) {
            _.removeClass(h2Elements[i], "active");
        }
        var h3Elements = _.$("#listcontent").getElementsByTagName('h3');
        for (var j = 0; j < h3Elements.length; j++) {
            _.removeClass(h3Elements[j], "active");
        }
    };

    /**
     * 创建任务列表
     * @param  {Array} taskArr 任务对象数组
     * @return {String}        字符串形式的html代码
     */
    var createTaskList = function(taskArr) {
        var tempStr = "";
        console.log("dateTasksArr------->");
        console.log(taskArr);
        if (taskArr.length === 0) {
            tempStr = "";
        } else {

            var dateTasksArr = createDateData(taskArr);
            console.log("dateTasksArr------->" + dateTasksArr);
            for (var i = 0; i < dateTasksArr.length; i++) {
                var innerLiStr = "<div>" + dateTasksArr[i].date + "</div><ul>";
                for (var j = 0; j < dateTasksArr[i].tasks.length; j++) {
                    var finishOrNotStr = "";
                    if (dateTasksArr[i].tasks[j].finish) {
                        finishOrNotStr = '<li class="task-done" taskid="' + dateTasksArr[i].tasks[j].id + '"><i class="fa fa-check"></i> ' + dateTasksArr[i].tasks[j].name + '</li>';
                    } else {
                        finishOrNotStr = '<li taskid="' + dateTasksArr[i].tasks[j].id + '">' + dateTasksArr[i].tasks[j].name + '</li>';
                    }

                    // innerLiStr += '<li taskid="' + dateTasksArr[i].tasks[j].id + '">' + dateTasksArr[i].tasks[j].name + '</li>';
                    innerLiStr += finishOrNotStr;
                }
                innerLiStr += "</ul>";
                tempStr += innerLiStr;
            }
        }
        // console.log(tempStr);
        return tempStr;
    };
    // console.log(createTaskList(DAO.queryAllTasks()));

    /**
     * 创建日期数据格式
     * @param  {Array} taskArr 任务数组
     * @return {Array}         日期任务对象数组
     */
    var createDateData = function(taskArr) {
        var dateArr = []; //日期数组
        var newDateTasks = []; //日期数据格式数组
        //想让任务根据日期归档
        //1.先把出现的所有日期提取出来
        //2.对日期排序
        //3.根据日期查询出任务对象数组
        //4.组合日期和任务对象数组

        //取出所有时间
        for (var i = 0; i < taskArr.length; i++) {
            if (dateArr.indexOf(taskArr[i].date) == -1) {
                dateArr.push(taskArr[i].date);
            }
        }
        console.log(dateArr);
        console.log(taskArr);

        //对日期排序
        dateArr = dateArr.sort().reverse();

        //根据时间查找任务对象
        for (var j = 0; j < dateArr.length; j++) {
            var tempObject = {};
            tempObject.date = dateArr[j];
            tempObject.tasks = DAO.queryTasksByDateInTaskArr(dateArr[j], taskArr);
            newDateTasks.push(tempObject);
        }
        currentTaskId = newDateTasks[0].tasks[0].id;
        return newDateTasks;
    };

    /**
     * 分类任务状态控制按钮
     * @return {[type]} [description]
     */
    var cateTaskStatusController = function() {
        _.addClickEvent(_.$("#all-tasks"), function() {
            console.log("click all tasks");
            cateTaskStatusControllerHelper(this);
        });
        _.addClickEvent(_.$("#unfinish-tasks"), function() {
            console.log("click unfinish tasks");
            cateTaskStatusControllerHelper(this, false);
        });
        _.addClickEvent(_.$("#finished-tasks"), function() {
            console.log("click finished-tasks");
            cateTaskStatusControllerHelper(this, true);
        });
    };

    /**
     * 任务列表状态切换辅助
     * 根据状态不同，修改不同的html代码
     *
     * @param  {boolean} finish 完成状态
     */
    var cateTaskStatusControllerHelper = function(element, finish) {
        cleanAllActiveOnStatusButton(); //清除状态按钮高亮
        _.addClass(element, "active");

        var taskList = _.$("#task-list");

        if (currentCateId == -1) {
            taskList.innerHTML = createTaskList(DAO.queryAllTasks(finish));
        } else {
            if (currentCateTable == "cate") {
                taskList.innerHTML = createTaskList(DAO.queryTasksByCateId(currentCateId, finish));
            } else {
                console.log("**************************");
                console.log(currentCateId);
                taskList.innerHTML = createTaskList(DAO.queryTasksByChildCateId(currentCateId, finish));
                console.log("*********** END **********");
            }
        }
    };

    /**
     * 清除状态按钮高亮
     */
    var cleanAllActiveOnStatusButton = function() {
        _.removeClass(_.$("#all-tasks"), "active");
        _.removeClass(_.$("#unfinish-tasks"), "active");
        _.removeClass(_.$("#finished-tasks"), "active");
    };

    /**
     * 点击任务
     * @param  {Object} element 点击的 li 对象
     * @return {[type]}         [description]
     */
    var clickTask = function(element) {

        var taskId = element.getAttribute("taskid");

        currentTaskId = taskId;

        generateTaskById(taskId);

        cleanTasksHighLight();
        _.addClass(element, "active");

        showScreen3();
    };

    /**
     * 根据任务 id 生成右边的具体内容
     * @param  {number} taskId 任务id
     * @return {[type]}        [description]
     */
    var generateTaskById = function(taskId) {

        var todoName = _.$(".todo-name");
        var taskDateSpan = _.$(".task-date span");
        var textareaContent = _.$(".textarea-content");
        var manipulate = _.$(".manipulate");

        textareaContent.setAttribute("readonly","readonly");
        textareaContent.setAttribute("disabled","disabled");

        if (taskId===-2) {
            console.log("-----2-2-2-2-2-2-2-2-2-2-2--2-2-2-2-2--2-2-2-2-2-2-2-");
            todoName.innerHTML = "无";
            taskDateSpan.innerHTML = "无";
            textareaContent.value = "无";
            manipulate.innerHTML = "";
        } else{
            var task = DAO.queryTaskById(taskId);
            var contentArea = _.$(".content");

            todoName.innerHTML = task.name;
            taskDateSpan.innerHTML = task.date;
            textareaContent.value = task.content;
            contentArea.setAttribute("class", "content content-no-button");

            _.$(".button-area").style.display = "none";

            if (task.finish) { //若已完成
                manipulate.innerHTML = "";
            } else { //未完成
                manipulate.innerHTML = '<a id="checkTaskDone"><i class="fa fa-check-square-o"></i></a><a id="changeTask"><i class="fa fa-pencil-square-o"></i></a>';

                // -----------------------任务详情区-----------------------
                // 点击任务完成
                _.addClickEvent(_.$("#checkTaskDone"), function() {
                    checkTaskDone();
                });
                // 点击编辑任务
                _.addClickEvent(_.$("#changeTask"), function() {
                    changeTask();
                });
            }
        }
    };

    /**
     * 清除任务列表的高亮
     */
    var cleanTasksHighLight = function() {
        var aLi = _.$("#task-list").getElementsByTagName('li');
        for (var i = 0; i < aLi.length; i++) {
            _.removeClass(aLi[i], "active");
        }
    };

    /**
     * 点击增加任务按钮
     * @return {[type]} [description]
     */
    var clickAddTask = function() {
        console.log("clickAddTask");
        // _.$(".right").innerHTML = '';

        // 如果当前的主分类没有子分类，提示先建立子分类
        // if (currentCateId != -1) {

        // }
        // var cateChild = DAO.queryCateById(currentCateId).child;
        if (currentCateId != -1 && currentCateTable == "cate" && DAO.queryCateById(currentCateId).child.length === 0) {
            alert("请先建立子分类");
            // confirm("请先建立子分类");
            showScreen1();
        } else {
            _.$(".todo-name").innerHTML = '<input type="text" class="input-title" placeholder="请输入标题">';
            _.$(".manipulate").innerHTML = "";
            _.$(".task-date span").innerHTML = '<input type="date" class="input-date">';
            var contentArea = _.$(".content");
            contentArea.innerHTML = '<textarea class="textarea-content" placeholder="请输入任务内容"></textarea>';
            // _.removeClass(contentArea, "content-no-button");
            // _.addClass(contentArea, "content-with-button");
            contentArea.setAttribute("class", "content content-with-button");
            _.$(".button-area").innerHTML = '<span class="info"></span>                    <button class="save">保存</button>                    <button class="cancel-save">放弃</button>';
            _.$(".button-area").style.display = "block";
            clickSaveOrCancel();
            showScreen3();
        }

    };

    /**
     * 点击保存任务或放弃保存
     * @return {[type]} [description]
     */
    var clickSaveOrCancel = function() {
        _.addClickEvent(_.$(".save"), function() {
            var title = _.$(".input-title");
            var content = _.$(".textarea-content");
            var date = _.$(".input-date");
            var info = _.$(".info");
            console.log("save");
            console.log(currentCateId);
            console.log(currentCateTable);
            console.log(content.value);


            if (title.value === "") {
                info.innerHTML = "标题不能为空";
            } else if (date.value === "") {
                info.innerHTML = "日期不能为空";
            } else if (content.value === "") {
                info.innerHTML = "内容不能为空";
            } else {
                var taskObject = {};
                taskObject.finish = false;
                taskObject.name = _.changeCode(title.value);
                taskObject.date = _.changeCode(date.value);
                // taskObject.content = _.changeCode(content.value);
                taskObject.content = content.value;

                //对 pid 的处理
                if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                    taskObject.pid = 0;
                } else if (currentCateTable === "cate") {
                    taskObject.pid = DAO.queryCateById(currentCateId).child[0];
                } else {
                    taskObject.pid = currentCateId;
                }
                console.log(taskObject);

                var curTaskId = DAO.addTask(taskObject);

                initCates(); //初始化分类

                //更新任务列表
                var taskList = _.$("#task-list");
                if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                    taskList.innerHTML = createTaskList(DAO.queryAllTasks());
                } else if (currentCateTable === "cate") {
                    taskList.innerHTML = createTaskList(DAO.queryTasksByCateId(currentCateId));
                } else {
                    taskList.innerHTML = createTaskList(DAO.queryTasksByChildCateId(currentCateId));
                }
                //更新详细内容区
                currentTaskId = curTaskId;
                generateTaskById(curTaskId); //初始化任务详细
            }
        });
        _.addClickEvent(_.$(".cancel-save"), function() {
            console.log("cancel save");
            showScreen2();
            // 判断屏幕宽度是否小于 770
            if (window.innerWidth >= 770) {
                generateTaskById(currentTaskId);
            }
        });
    };

    /**
     * 点击完成
     * @return {[type]} [description]
     */
    var checkTaskDone = function() {
        var r = confirm("确定将任务标记为已完成吗？");
        if (r) {

            console.log(currentTaskId);
            DAO.updateTaskStatusById(currentTaskId); //更新状态
            DAO.listAllStorage();
            console.log(currentTaskId);
            generateTaskById(currentTaskId);
            console.log(currentTaskId);
            var temp = currentTaskId;
            //更新任务列表
            var taskList = _.$("#task-list");
            if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                taskList.innerHTML = createTaskList(DAO.queryAllTasks());
            } else if (currentCateTable === "cate") {
                taskList.innerHTML = createTaskList(DAO.queryTasksByCateId(currentCateId));
            } else {
                taskList.innerHTML = createTaskList(DAO.queryTasksByChildCateId(currentCateId));
            }

            currentTaskId = temp;
        }
    };

    /**
     * 点击修改
     * @return {[type]} [description]
     */
    var changeTask = function() {
        var task = DAO.queryTaskById(currentTaskId);
        var contentArea = _.$(".content");
        _.$(".todo-name").innerHTML = '<input type="text" class="input-title" placeholder="请输入标题" value="' + task.name + '">';
        _.$(".manipulate").innerHTML = "";
        _.$(".task-date span").innerHTML = '<input type="date" class="input-date" value="' + task.date + '">';
        contentArea.innerHTML = '<textarea class="textarea-content" placeholder="请输入任务内容">' + task.content + '</textarea>';
        contentArea.setAttribute("class", "content content-with-button");
        _.$(".button-area").innerHTML = '<span class="info"></span>                    <button class="save">保存修改</button>                    <button class="cancel-save">放弃</button>';
        _.$(".button-area").style.display = "block";
        changeSaveOrNot();
    };

    /**
     * 保存修改或不修改
     * @return {[type]} [description]
     */
    var changeSaveOrNot = function() {
        _.addClickEvent(_.$(".save"), function() {

            var title = _.$(".input-title");
            var content = _.$(".textarea-content");
            var date = _.$(".input-date");
            var info = _.$(".info");

            if (title.value === "") {
                info.innerHTML = "标题不能为空";
            } else if (date.value === "") {
                info.innerHTML = "日期不能为空";
            } else if (content.value === "") {
                info.innerHTML = "内容不能为空";
            } else {
                /*var taskObject = {};
            taskObject.finish = false;
            taskObject.name = title.value;
            taskObject.content = content.value;
            taskObject.date = date.value;*/
                console.log("before save change, check currentTaskId");
                console.log(currentTaskId);
                DAO.updateTaskById(currentTaskId, title.value, date.value, content.value);
                generateTaskById(currentTaskId);
                console.log(currentTaskId);
                var temp = currentTaskId;
                //更新任务列表
                var taskList = _.$("#task-list");
                if (currentCateTable === "AllCate") { //如果焦点在所有分类上
                    taskList.innerHTML = createTaskList(DAO.queryAllTasks());
                } else if (currentCateTable === "cate") {
                    taskList.innerHTML = createTaskList(DAO.queryTasksByCateId(currentCateId));
                } else {
                    taskList.innerHTML = createTaskList(DAO.queryTasksByChildCateId(currentCateId));
                }

                currentTaskId = temp;
            }
        });

        _.addClickEvent(_.$(".cancel-save"), function() {
            generateTaskById(currentTaskId);
        });
    };

    function showScreen1() {
        _.$(".left").setAttribute("class", "left page-active");
        _.$(".mid").setAttribute("class", "mid page-next");
        _.$(".right").setAttribute("class", "right page-next-next");
        currentScreen = 1;
        clickBackBtn(currentScreen);

    }

    function showScreen2() {
        _.$(".left").setAttribute("class", "left page-pre");
        _.$(".mid").setAttribute("class", "mid page-active");
        _.$(".right").setAttribute("class", "right page-next");
        currentScreen = 2;
        clickBackBtn(currentScreen);
    }

    function showScreen3() {
        _.$(".left").setAttribute("class", "left page-pre-pre");
        _.$(".mid").setAttribute("class", "mid page-pre");
        _.$(".right").setAttribute("class", "right page-active");
        currentScreen = 3;
        clickBackBtn(currentScreen);
    }

    /**
     * 返回键监听
     * @param  {number} currentScreen 当前页
     * @return {[type]}               [description]
     */
    var clickBackBtn = function(currentScreen) {

        // 这里判断是否是手机端
        if (window.innerWidth < 770) {
            var backBtn = _.$("#backBtn");

            switch (currentScreen) {
                case 1:
                    backBtn.style.display = "none";
                    break;
                case 2:
                    backBtn.style.display = "block";
                    _.addClickEvent(backBtn, function() {
                        showScreen1();
                    });
                    break;
                case 3:
                    backBtn.style.display = "block";
                    _.addClickEvent(backBtn, function() {
                        showScreen2();
                    });
                    break;
                default:
                    break;
            }
        }
    };

    return {
        initAll: initAll
    };
});