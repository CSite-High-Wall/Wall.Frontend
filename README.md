## Wall.Frontend
> 工地高墙前端仓库

### 部分实现说明
项目 UI 库采用 [arco-design](https://arco.design/vue/component/link)  
瀑布流控件采用 [vue3-waterfall](https://github.com/seymoe/vue3-waterfall)

匿名的表白只能屏蔽单个表白  
屏蔽的表白即使单独通过 URL 也无法访问（在有登录的状态下） 

### 前端路由

详见 [index.ts](https://github.com/CSite-High-Wall/Wall.Frontend/blob/main/src/router/index.ts)

### 前端界面
适应手机端界面，在大部分合理页面尺寸下保持正常布局  
对大部分数据列表做了空数据状态时的 UI ，对部分加载缓慢的数据做了加载动画  
**静态编译生成了过大的 js 文件，使得在第一次没有缓存的情况下，加载速度较慢，约为 12 秒**

### 部署
将项目编译到静态文件 `npm run build` ，后上传服务器，在服务器部署 nginx 反代实现
