

# GenshinDownload

GenshinDownload and Description

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/MakotoArai-CN/Makoto-Genshin-Wish-Analysis-Prod/">
<!--     <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
    <H1>主程序</H1>
  </a>

  <h3 align="center">Official extension for Makoto Genshin Wish Analisses Prod</h3>
  <p align="center">
    Official extension for Makoto Genshin Wish Analisses Prod
    <br />
    <a href="https://blog.ciy.cool/archives/110/"><strong>探索本项目的文档 »</strong></a>
  </p>

</p>


 本篇README.md面向开发者及普通使用者
 
## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [使用到的框架](#使用到的框架)
- [贡献者](#贡献者)
  - [如何参与开源项目](#如何参与开源项目)
- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

请前往我的[博客](https://blog.ciy.cool)查看具体详情



###### 开发前的配置要求

1. 光年模板V5
2. NodeJs
3. Express
4. PUG
5. MongoDB
6. VScode以及相关插件

###### **安装步骤**

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo

```sh
git clone https://github.com/shaojintian/Best_README_template.git
```

### 文件目录说明
eg:

```
filetree 
├── ARCHITECTURE.md
├── LICENSE.txt
├── README.md
├── /account/
├── /bbs/
├── /docs/
│  ├── /rules/
│  │  ├── backend.txt
│  │  └── frontend.txt
├── manage.py
├── /oa/
├── /static/
├── /templates/
├── useless.md
└── /util/

```




## 扩展支持

扩展自由度相对比较高，几乎是半独立的框架，但是运行需要依托祈愿统计系统。

1. 支持本框架自带的光年模板的所有公共模板，也就是光年模板V5的所有框架你都可以引入使用。您有自己的目录需要，请自行注册使用。
2. 支持独立的模板导入，可以完全脱离光年模板进行开发设计，你的静态资源必须放在`扩展名/static`下，否则不会生效。

## 开发

1. 从Github或者Gitee拉取仓库

```shell
git clone https://gitee.com/MakotoArai-CN/Makoto-Genshin-Wish-Analysis-Prod.git
# or
git clone https://github.com/MakotoArai-CN/Makoto-Genshin-Wish-Analysis-Prod.git
```

2. 找到项目并拖入VScode或者用VScode打开

- 打开plugins文件夹，新建你的扩展名（英文），然后新建index.js入口文件：结构如下

```js
module.exports = {
    author: "author",
    version: "0.0.1",
    description: "description",
    icon: "mdi-panorama-sphere",
    pathname: "pathname",
    name: "name",
    subnav: [{
            name: "菜单",
            href: "/pathname/router"
        },
        {
            name: "菜单",
            href: "/pathname/routers"
        }
    ],
    router: require('./routes/index')
};
```

- 新建views文件夹，这是扩展的文件视图，例如`views/route.pug`,`views/routes.pug`,结构如下：

```pug
extends ../layout
block content
    your views code……

```

 - extends 为导入主程序的header部分，block content之后写静态页面即可。
 - 独立样式或者js文件的引入，格式如下：

```js
"pathname/js/Jquery.js"
```

------

- 新建routes文件夹，文件夹内为index.js,结构如下：

```js

// plugins/pathname/routes/index.js
const express = require('express');
const router = express.Router();

router.get('/router', function(req, res, next) {
  res.render('pathname/router', { title: '菜单' });
});

router.get('/routers', function(req, res, next) {
  res.render('pathname/routers', { title: '菜单' });
});


// 404 错误处理
router.all('*', function(req, res, next) {   
    res.status(404).sendFile(path.join(__dirname, '../../../public/404.html'));
});

module.exports = router;
```

 - 逻辑处理可以在router内加入，处理完毕需要使用router返回视图以及数据。如果逻辑处理需求很大，可以新建控制器文件夹`controller`，存放你的逻辑处理，例如：`routeController.js`
 - 在路由最后需要导出路由，否则入口文件无法引用。
 - 至此，扩展程序基本构建完毕。

------



#### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

### 作者

[MakotoArai ](https://blog.ciy.cool) 

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了AGPL-3.0 授权许可，详情请参阅 [LICENSE](https://github.com/MakotoArai-CN/GenshinDownload/blob/master/LICENSE)

### 鸣谢

- [NodeJs](https://nodejs.cn/)
- [Express](https://expressjs.com/)
- [光年模板](http://www.bixiaguangnian.com/)


