# 后台管理系统

vue3 + typescript + element-plus

## 安装

```
npm install
```

### 运行

```
// 开发环境
npm run serve
// 正式环境
npm run serve:prod
```

### 打包

```
// 打包正式环境
npm run build
// 打包测试环境
npm run build:dev
```

### 代码格式化

- vscode 安装 EditorConfig fro VS Code 插件
- vscode 安装 Eslint 插件
- vscode 安装 Prettier 插件

### UI

使用 Element-Plus 组件库 https://element-plus.gitee.io/zh-CN/

### 页面鉴权

- 每个路由的 meta 标签的 permissions 为访问当前路由所需的权限标识，为空或者空数组时，表示不需要权限访问
- 后端访问个人信息接口返回 permissions 字段，permissions 包含当前登录用户所拥有的所有页面访问权限标识
- 菜单鉴权（/src/components/PageAside/components/AsideMenuTree），鉴权方法 authMenus
- 页面鉴权（/src/components/ContentWrapper）,鉴权方法 authPerimission,当前用户有权限访问该页面时，访问页面内容，否则返回 403 组件

### 网络请求

使用 Axios 封装请求（/src/utils/request.ts），支持 async await 语法，接口文件统一放在 /src/services 下

### 路由

- 主路由入口文件（/src/router/index.ts）
- 不同后台有独立的路由文件，最终都要合并到主路由文件中
- 公共的页面都放在主路由文件下

### 样式

- scss 全局变量已经通过 webpack 引入(/src/styles/variable.scss)
- 通过 normal.css(/src/styles/normal.css)清除不同浏览器默认样式
- 全局样式 /src/styles/global.scss
- element 组件样式 /src/styles/element-ui.scss

### 全局组件

全局组件放在/src/components 目录下

### localStorage

统一放在/src/localStorage 目录下

### Utils

可复用的常量或方法统一放在/src/utils 目录下

- 常量 /src/utils/constants.ts
- 正则 /src/utils/patterns.ts
- 工具方法 /src/utils/tools.ts
