/**
 *
 * 一些基础的工具方法
 *
 * @file util-AMD.js
 * @author Gaohaoyang(gaohaoyang126@126.com)
 *
 */
define(function() {

    /**
     * 判断是否为数组
     * @param  {Any}  arr 输入的任意类型
     * @return {Boolean}     是否为数组
     */
    var isArray = function(arr) {
        return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
    };

    /**
     * 判断是否为函数
     * @param  {Any} fn 输入的任意类型
     * @return {Boolean}     是否为函数
     */
    var isFunction = function(fn) {
        return typeof fn === "function";
    };

    /**
     * 深度克隆
     *
     * 可以复制一个目标对象，返回一个完整拷贝
     * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
     *
     * @param  {Object} src 目标对象
     * @return {Object}     复制对象
     */
    var cloneObject = function(src) {
        var o; //result
        if (Object.prototype.toString.call(src) === "[object Array]") {
            o = []; //判断是否是数组，并赋初始值
        } else {
            o = {};
        }
        for (var i in src) { //遍历这个对象
            if (src.hasOwnProperty(i)) { //排出继承属性
                if (typeof src[i] === "object") {
                    o[i] = cloneObject(src[i]); //递归赋值
                } else {
                    o[i] = src[i]; //直接赋值
                }
            }
        }
        return o;
    };

    /**
     * 数组去重
     *
     * 只考虑数组中元素为数字或字符串，返回一个去重后的数组
     *
     * @param  {Array} arr 目标数组
     * @return {Array}     去重后的数组
     */
    var uniqArray = function(arr) {
        var newArr = []; //创建空数组
        for (var i in arr) { //遍历旧数组
            if (newArr.indexOf(arr[i]) == -1) { //如果新数组中不存在当前元素
                newArr.push(arr[i]); //新数组中加入当前元素
            }
        }
        return newArr;
    };

    /**
     * 简单 trim
     * @param  {String} str 目标字符串
     * @return {String}     去除头尾空白字符的字符串
     */
    var simpleTrim = function(str) {
        var i;
        var j;
        for (i = 0; i < str.length; i++) { //从头遍历字符串
            if (str.charAt(i) != " " && str.charAt(i) != "\t") { //当不为空的时候
                break; //跳出循环
            }
        }
        for (j = str.length - 1; j >= 0; j--) {
            if (str.charAt(j) != " " && str.charAt(j) != "\t") { //当不为空的时候
                break; //跳出循环
            }
        }
        return str.slice(i, j + 1); //返回子字符串
    };

    /**
     * trim
     *
     * 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
     *
     * @param  {String} str 目标字符串
     * @return {String}     去空白后的字符串
     */
    var trim = function(str) {
        if (str.length != -1) {
            return str.replace(/^\s+|\s+$/g, '');
            //匹配开头和结尾的空白字符，并全局匹配
        }
    };

    /**
     * 去除数组中的空元素
     * @param  {Array} arr 目标数组
     * @return {Array}     去空元素后的数组
     */
    var deleteBlank = function(arr) {
        var arr2 = [];
        for (i = 0; i < arr.length; i++) {
            if (arr[i].match(/\s+/) || arr[i] === "") {
                continue;
            } else {
                arr2.push(arr[i]);
            }
        }
        return arr2;
    };

    /**
     * 根据索引删除数组中的元素
     * @param  {Array} arr   数组
     * @param  {number} index 索引
     * @return {Array}       新的数组
     */
    var deleteInArray = function(arr, index) {
        if (isArray(arr) && index < arr.length) {
            return arr.slice(0, index).concat(arr.slice(index + 1));
        } else {
            console.error("not a arr or index error");
        }
    };

    /**
     * each
     *
     * 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
     *
     * @param  {Array}   arr 数组
     * @param  {Function} fn  要执行的方法
     */
    var each = function(arr, fn) {
        for (var i in arr) {
            fn(arr[i], i);
        }
    };

    /**
     * 获取一个对象里面第一层元素的数量，返回一个整数
     *
     * @param  {Object} obj 目标对象
     * @return {Number}     第一层元素数量
     */
    var getObjectLength = function(obj) {
        return Object.keys(obj).length;
    };

    /**
     * 判断是否为邮箱地址
     * @param  {String}  emailStr 邮箱地址
     * @return {Boolean}          是否是邮箱地址
     */
    var isEmail = function(emailStr) {
        var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
        return pattern.test(emailStr);
    };

    /**
     * 判断是否为手机号
     * @param  {String}  phone 手机号字符串
     * @return {Boolean}       是否是手机号
     */
    var isMobilePhone = function(phone) {
        var pattern = /^(\+\d{1,4})?\d{7,11}$/;
        return pattern.test(phone);
    };

    /**
     * 为element增加一个样式名为newClassName的新样式
     *
     * @param {Element} element      Dom 元素
     * @param {String} newClassName 样式类名称
     */
    var addClass = function(element, newClassName) {
        var oldClassName = element.className; //获取旧的样式类
        element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
    };

    /**
     * 移除element中的样式oldClassName
     * @param  {Element} element      Dom 元素
     * @param  {String} oldClassName 旧的样式类名
     */
    var removeClass = function(element, oldClassName) {
        var originClassName = element.className; //获取原先的样式类
        var pattern = new RegExp("\\b" + oldClassName + "\\b"); //使用构造函数构造动态的正则表达式
        element.className = trim(originClassName.replace(pattern, ''));
    };

    /**
     * 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
     * @param  {Element}  element     Dom 元素
     * @param  {Element}  siblingNode Dom 元素
     * @return {Boolean}             是否为同一级元素
     */
    var isSiblingNode = function(element, siblingNode) {
        return element.parentNode === siblingNode.parentNode;
    };

    /**
     * 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
     *
     * @param  {Element} element Dom 元素
     * @return {Object}         位置对象
     */
    var getPosition = function(element) {
        var pos = {};
        pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        return pos;
    };



    //---------------------------------------------------------
    // 实现一个简单的Query
    //多个选择器有点难到我了，看了一些资料觉得思路应该如下：
    //1.如果存在#，直接从#开始向后查
    //2.如果存在tag直接找到所有的tag然后向后查
    //3.样式类，属性，从后向前查，得到它所有的父节点名称，去筛选匹配
    //以上的做法有点太复杂，我还是做一个简单的正向匹配吧。
    /**
     * 简单 Query
     * @param  {String} selector 选择器名称
     * @return {Element}          Dom 元素
     */
    var $ = function(selector) {

        if (!selector) {
            return null;
        }

        if (selector == document) {
            return document;
        }

        selector = trim(selector);
        if (selector.indexOf(" ") !== -1) { //若存在空格
            var selectorArr = selector.split(/\s+/); //拆成数组

            var rootScope = myQuery(selectorArr[0]); //第一次的查找范围
            var i = null;
            var j = null;
            var result = [];
            //循环选择器中的每一个元素
            for (i = 1; i < selectorArr.length; i++) {
                for (j = 0; j < rootScope.length; j++) {
                    result.push(myQuery(selectorArr[i], rootScope[j]));
                }
                // rootScope = result;
                // 目前这个方法还有bug
            }
            return result[0][0];
        } else { //只有一个，直接查询
            return myQuery(selector, document)[0];
        }
    };

    /**
     * 针对一个内容查找结果 success
     * @param  {String} selector 选择器内容
     * @param  {Element} root    根节点元素
     * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
     */
    var myQuery = function(selector, root) {
        var signal = selector[0]; //
        var allChildren = null;
        var content = selector.substr(1);
        var currAttr = null;
        var result = [];
        root = root || document; //若没有给root，赋值document
        switch (signal) {
            case "#":
                result.push(document.getElementById(content));
                break;
            case ".":
                allChildren = root.getElementsByTagName("*");
                // var pattern0 = new RegExp("\\b" + content + "\\b");
                for (i = 0; i < allChildren.length; i++) {
                    currAttr = allChildren[i].getAttribute("class");
                    if (currAttr !== null) {
                        var currAttrsArr = currAttr.split(/\s+/);
                        // console.log(currAttr);
                        for (j = 0; j < currAttrsArr.length; j++) {
                            if (content === currAttrsArr[j]) {
                                result.push(allChildren[i]);
                                // console.log(result);
                            }
                        }
                    }
                }
                break;
            case "[": //属性选择
                if (content.search("=") == -1) { //只有属性，没有值
                    allChildren = root.getElementsByTagName("*");
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                            result.push(allChildren[i]);
                        }
                    }
                } else { //既有属性，又有值
                    allChildren = root.getElementsByTagName("*");
                    var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                    var cut = selector.match(pattern); //分离后的结果，为数组
                    var key = cut[1]; //键
                    var value = cut[2]; //值
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(key) == value) {
                            result.push(allChildren[i]);
                        }
                    }
                }
                break;
            default: //tag
                result = root.getElementsByTagName(selector);
                break;
        }
        return result;
    };

    /**
     * ==================事件=======================
     */
    // 给一个element绑定一个针对event事件的响应，响应函数为listener

    /**
     * 添加事件
     * @param {Element} element  Dom 元素
     * @param {String} event    事件名称
     * @param {Function} listener 执行的函数
     */
    var addEvent = function(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, listener);
        }
    };

    // 例如：

    // addEvent($(".second"), "click", function () {
    //     alert("clicksecond");
    // });

    // 移除element对象对于event事件发生时执行listener的响应
    /**
     * 移除事件
     * @param  {Element} element  Dom 元素
     * @param  {String} event    事件名称
     * @param  {Function} listener 事件
     */
    var removeEvent = function(element, event, listener) {
        if (element.removeEventListenr) {
            element.removeEventListenr(event, listener);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        }
    };

    // 实现对click事件的绑定
    /**
     * 添加点击事件
     * @param {Element} element  Dom 元素
     * @param {Function} listener 事件
     */
    var addClickEvent = function(element, listener) {
        addEvent(element, "click", listener);
    };

    // 实现对于按Enter键时的事件绑定
    /**
     * 添加 Enter 事件
     * @param {Element} element  Dom 元素
     * @param {Function} listener 事件
     */
    var addEnterEvent = function(element, listener) {
        addEvent(element, "keydown", function(event) {
            if (event.keyCode == 13) {
                listener();
            }
        });
    };

    /**
     * 事件代理
     * @param  {Element} element   Dom 元素
     * @param  {String} tag       标签名
     * @param  {String} eventName 事件名称
     * @param  {Function} listener  事件
     */
    var delegateEvent = function(element, tag, eventName, listener) {
        addEvent(element, eventName, function(e) {
            var event = e || window.event;
            var target = event.target || event.srcElement; //兼容 IE 与标准浏览器
            if (target && target.tagName.toLowerCase() == tag.toLowerCase()) {
                listener.call(target, event);
            }
        });
    };

    /**
     * 事件代理2
     *
     * 向上查找一次
     *
     * @param  {Element} element   Dom 元素
     * @param  {String} tag       标签名
     * @param  {String} eventName 事件名称
     * @param  {Function} listener  事件
     */
    var delegateEventBubbleOnce = function(element, tag, eventName, listener) {
        addEvent(element, eventName, function(e) {
            var event = e || window.event;
            var target = event.target || event.srcElement; //兼容 IE 与标准浏览器
            if (target && target.tagName.toLowerCase() == tag.toLowerCase()) {
                listener.call(target, event);
            } else if (target.parentNode && target.parentNode.tagName.toLowerCase() == tag.toLowerCase()) {

                // 排除点击到垃圾桶图标
                if (target.getAttribute("class") !== "fa fa-trash-o") {
                    listener.call(target.parentNode, event);
                }
            }
        });
    };

    /**
     * 事件代理3
     *
     * 点击垃圾桶图标
     *
     * @param  {Element} element   Dom 元素
     * @param  {String} tag       标签名
     * @param  {String} eventName 事件名称
     * @param  {String} className 样式类名称
     * @param  {Function} listener  事件
     */
    var delegateEventTrash = function(element, tag, eventName, className, listener) {
        addEvent(element, eventName, function(e) {
            var event = e || window.event;
            var target = event.target || event.srcElement; //兼容 IE 与标准浏览器
            if (target && target.tagName.toLowerCase() == tag.toLowerCase() && target.getAttribute("class") === className) {
                listener.call(target, event);
            }
        });
    };

    // 估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：

    // $.on = function(selector, event, listener) {
    //     addEvent($(selector), event, listener);
    // };
    // $.click = function(selector, listener) {
    //     addClickEvent($(selector), listener);
    // };
    // $.un = function(selector, event, listener) {
    //     removeEvent($(selector), event, listener);
    // };
    // $.delegate = function(selector, tag, event, listener) {
    //     delegateEvent($(selector), tag, event, listener);
    // };


    // ---------5 BOM-------

    // 判断是否为IE浏览器，返回-1或者版本号
    /**
     * 是否是 IE
     * @return {Boolean} 是否是 IE
     */
    var isIE = function() {
        var s = navigator.userAgent.toLowerCase();
        console.log(s);
        //ie10的信息：
        //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
        //ie11的信息：
        //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
        var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
        if (ie) {
            return ie[1];
        } else {
            return -1;
        }
    };

    // 设置cookie
    /**
     * 设置 cookie
     * @param {String} cookieName  名称
     * @param {String} cookieValue 值
     * @param {Number} expiredays  过期时间
     */
    var setCookie = function(cookieName, cookieValue, expiredays) {
        var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
        if (typeof expiredays === "number") {
            cookie += ";max-age=" + (expiredays * 60 * 60 * 24);
        }
        document.cookie = cookie;
    };

    // 获取cookie值
    /**
     * 获取 cookie
     * @param  {String} cookieName 名称
     * @return {Object}            cookie 对象
     */
    var getCookie = function(cookieName) {
        var cookie = {};
        var all = document.cookie;
        if (all === "") {
            return cookie;
        }
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var p = list[i].indexOf("=");
            var name = list[i].substr(0, p);
            var value = list[i].substr(p + 1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    };

    //-------------Ajax---------------
    // 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
    /**
     * 封装 Ajax
     * @param  {String} url     地址
     * @param  {Object} options 选项对象
     * @return {[type]}         [description]
     */
    var ajax = function(url, options) {

        var dataResult; //结果data

        // 处理data
        if (typeof(options.data) === 'object') {
            var str = '';
            for (var c in options.data) {
                str = str + c + '=' + options.data[c] + '&';
            }
            dataResult = str.substring(0, str.length - 1);
        }

        // 处理type
        options.type = options.type || 'GET';

        //获取XMLHttpRequest对象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        // 发送请求
        xhr.open(options.type, url);
        if (options.type == 'GET') {
            xhr.send(null);
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(dataResult);
        }

        // readyState
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (options.onsuccess) {
                        options.onsuccess(xhr.responseText, xhr.responseXML);
                    }
                } else {
                    if (options.onfail) {
                        options.onfail();
                    }
                }
            }
        };
    };

    // 使用示例：
    // ajax(
    //     'http://localhost:8080/server/ajaxtest', {
    //         data: {
    //             name: 'simon',
    //             password: '123456'
    //         },
    //         onsuccess: function(responseText, xhr) {
    //             console.log(responseText);
    //         }
    //     }
    // );　

    /**
     * 转码 XSS 防护
     * @param  {String} str 用户输入的字符串
     * @return {String}     转码后的字符串
     */
    var changeCode = function(str) {
        str = str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2f;");
        return str;
    };

    return {
        isArray: isArray,
        isFunction: isFunction,
        cloneObject: cloneObject,
        uniqArray: uniqArray,
        simpleTrim: simpleTrim,
        trim: trim,

        deleteBlank: deleteBlank,
        deleteInArray: deleteInArray,

        each: each,
        getObjectLength: getObjectLength,
        isEmail: isEmail,
        isMobilePhone: isMobilePhone,

        addClass: addClass,
        removeClass: removeClass,
        isSiblingNode: isSiblingNode,
        getPosition: getPosition,

        $: $,
        myQuery: myQuery,

        addEvent: addEvent,
        removeEvent: removeEvent,
        addClickEvent: addClickEvent,
        addEnterEvent: addEnterEvent,
        delegateEvent: delegateEvent,
        delegateEventBubbleOnce: delegateEventBubbleOnce,
        delegateEventTrash: delegateEventTrash,

        isIE: isIE,
        setCookie: setCookie,
        getCookie: getCookie,
        ajax: ajax,
        changeCode: changeCode
    };
});