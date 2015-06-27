# ToDo-WebApp

在任务三中，做了一个 PC 端的 ToDo 应用。任务四是将它优化，以适应移动端设备。

## ToDo WebApp Version

* [任务四要求](https://github.com/baidu-ife/ife/tree/master/task/task0004)
* [源代码](https://github.com/Gaohaoyang/ToDo-WebApp)
* [在线 demo](http://gaohaoyang.github.io/ToDo-WebApp/)
* 手机查看 ↓ 二维码 ↓
    
    ![todoWebApp](http://7q5cdt.com1.z0.glb.clouddn.com/task4-code-todoWebApp.png)

## Details

* 对于数据，以 JSON 模拟数据表的形式存储于 LocalStorage 中

         使用数据库的思想，构建3张表。
         cateJson 分类
         childCateJson 子分类
         taskJson 任务
         
         分类表 cate
         ----------------------
         id* | name | child(FK)
         ----------------------
         
         子分类表 childCate
         --------------------------------
         id* | pid(FK) | name | child(FK)
         --------------------------------
         
         任务表 task
         ----------------------------------------------
         id* | pid(FK) | finish | name | date | content
         ----------------------------------------------

* 使用 Sass 重构了 CSS 代码

* 响应式布局，针对手机端细节做了很多调整

* 加入页面切换效果

* 处理了 XSS 防护

* 性能优化，使用 CDN 处理静态资源 fontAwesome，压缩静态资源等

* 使用 requireJS 模块化 JavaScript 代码。重构 JavaScript 代码

要加油了，还有一点处理没有做完！


