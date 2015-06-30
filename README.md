# ToDo-WebApp

在任务三中，做了一个 PC 端的 ToDo 应用。任务四是将它优化，以适应移动端设备。

## ToDo WebApp Version

* [任务四要求](https://github.com/baidu-ife/ife/tree/master/task/task0004)
* [源代码](https://github.com/Gaohaoyang/ToDo-WebApp)
* [在线 demo](http://gaohaoyang.github.io/ToDo-WebApp/)
* 手机查看 ↓ 二维码 ↓
    
    ![todoWebApp](http://7q5cdt.com1.z0.glb.clouddn.com/task4-code-todoWebApp.png)
* [版本更新日志](https://github.com/Gaohaoyang/ToDo-WebApp/releases)
* [我的博客 HyG](http://gaohaoyang.github.io)

## Details

* **数据存储**

    以 JSON 模拟数据表的形式存储于 LocalStorage 中

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

* **使用 `Sass` 重构了 CSS 代码**
    
    使用分块、继承等方式，使得代码更加清晰明了。

* **响应式布局**
    
    针对手机端细节做了很多调整，更符合手机上的视觉交互习惯。

* **加入页面切换效果**
    
    使用 `translate3d()`，纯 CSS3 切换动画效果。

* **处理了 XSS 防护**
    
    对可能造成破坏的字符进行转码。

* **性能优化**
    
    使用 CDN 处理静态资源 fontAwesome，压缩静态资源等

* **模块化**
    
    使用 requireJS 模块化 JavaScript 代码。重构 JavaScript 代码。优化之前写的耦合性高的绑定事件，重新绑定事件，降低耦合性。期间根据具体需求重写了事件代理的代码。

* **前端工程化**
    
    使用 gulp，自动编译 Sass，压缩 CSS 和 JavaScript 代码。并且配置了自动流程。

