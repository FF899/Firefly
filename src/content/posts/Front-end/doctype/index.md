---
title: 网页基本结构拆解
published: 2026-05-24
description: 声明，根元素，头部元素，主体元素解析
image: /assets/images/miao.png
tags:
  - html
category: 前端
draft: false
---
# 一个网页必定会有这四个部分：
1. **声明**：`<!DOCTYPE html>`
2. **根元素**：`<html>123</html>`
3. **头部元素**：`<head>123</head>`
4. **文档主体元素**：`<body></body>`

>[!tip] html注释语法：`<！--这是注释-->`（单行多行通用）

- 示例：
```html
<!DOCTYPE html>
<html lang=“zh-CN”>
	<head>
	<meta charset="UTF-8">
	<title>标题</title>
	</head>

	<body>
	<!-- 页面内容区域-->
	我是颠佬！
	</body>
</html>
```

---
# `<!DOCTYPE>` 声明

> [!info]- HTML 历史上出现过的部分声明
> 1. HTML4.01（3种）
> ```
>	#严格型（Strict）        → 只允许标准 HTML，不含废弃标签
>	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
>	"http://www.w3.org/TR/html4/strict.dtd">
>```
>```	
>	#过渡型（Transitional）   → 兼容旧标签（<font>、<center> 等）
>	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
>	"http://www.w3.org/TR/html4/loose.dtd">
>```
>```
>	#框架型（Frameset）       → 用 <frameset> 分割页面的老技术
>	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
>	"http://www.w3.org/TR/html4/frameset.dtd">
> ```
> 2. XHTML1.0（3种）
> 同样分 Strict / Transitional / Frameset，跟上面差不多但更严格（标签必须小写、必须闭合）
> ```
>	#Strict
>	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
>	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
>```
>```	
>	#Transitional
>	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
>	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
>```
>```
>	#Frameset
>	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
>	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
> ```
> 3. HTML5（1种）现在的唯一标准
> ```
> <!DOCTYPE html>
> ```

> [!info]- 以 `XHTML 1.0 Strict`  为例解释声明含义
 >
>	```html
>	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
>	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
>	```
>
> **第一层拆解：**
> - **DOCTYPE** — 文档类型声明
> - **html** — 根元素是 `<html>`
> - **PUBLIC** — DTD 是公开标准（非私人定义）
> - **-//W3C//DTD XHTML 1.0 Strict//EN** — 正式公共标识符（FPI，Formal Public Identifier）
> - **[http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd](http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)** — DTD 文件的 URL 地址
> 
> **FPI 再拆（`-//W3C//DTD XHTML 1.0 Strict//EN`）：**
> - **`-`** — 不是 ISO 或官方标准机构注册的（`+` 才代表已注册）
> - **W3C** — 制定者是 W3C
> - **DTD XHTML 1.0 Strict** — 文档类型定义（Document Type Definition），XHTML 1.0 严格版
> - **EN** — 语言为英语

目前就使用 `<!DOCTYPE html>` 就行

`<!DOCTYPE html>` 没有 DTD URL，没有 FPI。W3C 彻底简化了——因为 HTML5 不再基于 SGML（标准通用标记语言），不需要 DTD 来定义规则了。

参考：
- 菜鸟编程《HTML `<!DOCTYPE>` 声明》： https://www.runoob.com/tags/tag-doctype.html
- W3Cschool《HTML `<!DOCTYPE>` 声明》： https://www.w3school.com.cn/tags/tag_doctype.asp
- HTML `<!DOCTYPE>` 声明详解： https://www.cnblogs.com/zhengshihui/p/6868419.html

# 根元素 `html`
- 根元素 `html` 是整个文档的起点
```
DOCTYPE（不算元素，纯粹声明）
    ↓
<html>  ← 根元素（root element），整个文档树的根节点
    ├── <head>
    └── <body>
```

## 根元素属性
### 1. `lang` — 告诉浏览器这是什么语言
```html
<html lang="zh-CN">  <!-- 简体中文 -->
<html lang="en">      <!-- 英语 -->
<html lang="ja">      <!-- 日语 -->
```

作用不只是语义：
- 屏幕阅读器用 `lang` 判断读音规则
- 浏览器用 `lang` 选择正确的字体渲染（中日韩统一表意文字同一码点，中日韩字体不同）
- SEO 用 `lang` 判断页面语言

### 2. `dir` — 文字方向
```html
<html lang="ar" dir="rtl">  <!-- 阿拉伯语，从右到左 -->
<html lang="zh-CN" dir="ltr">  <!-- 从左到右（默认） -->
```

CSS 的 `direction: rtl` 从根元素继承，整个页面的布局、文本、盒模型都会自动翻转。

### 3. `xmlns` — XHTML 时代的残留
```html
<!-- XHTML 1.0 必须写 -->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<!-- HTML5 不需要写（写了也没害） -->
<html lang="en">
```

`xmlns`（XML Namespace，XML 命名空间）是 XHTML 的要求，告诉 XML 解析器这些标签属于 XHTML 命名空间。HTML5 的 HTML 解析器不需要它，但写了不影响渲染——很多旧模板还带着。

### HTML 4 → XHTML → HTML5 的变化
```
HTML 4.01:
<html lang="en">                    ← 只写 lang

XHTML 1.0:
<html xmlns="http://www.w3.org/1999/xhtml"
      xml:lang="en" lang="en">       ← 两个都写，双保险

HTML5:
<html lang="en">                    ← 回到简单，不要求 xmlns
```

> [!quote]- 已经废弃的 `manifest`
> 
> ```html
> <html manifest="app.appcache">
> ```
> 
> HTML5 早期引入的离线应用缓存（Application Cache）。因为各种 Bug 和反直觉的缓存行为，已经被 **Service Worker** 取代。现已废弃，见到就删。

### 关于根元素的常见误区

很多人以为 `<html>` 和 `<body>` 规则差不多，但有一些 CSS 属性在 `<html>` 上行为特殊：

| 属性 | 在 `<html>` 上 | 在 `<body>` 上 |
|------|:---:|:---:|
| `background` | 画布背景（覆盖整个视口） | 只在元素区域 |
| `overflow` | 通常作用于视口 | 作用于元素自身 |
| `width/height` | 视口尺寸 | 内容尺寸 |
```
┌─────────────────────────────┐
│        画布 (Canvas)         │  ← 无限的平面，浏览器窗口是它的"取景框"
│  ┌───────────────────────┐  │
│  │    <html> 根元素       │  │  ← 可以给它设背景
│  │  ┌─────────────────┐  │  │
│  │  │   <body>        │  │  │  ← 也可以给它设背景
│  │  │   内容...        │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

举例：你给 `<body>` 设 `background: red`，如果 `<html>` 没有背景，整个页面都会变红，因为浏览器会把 `<body>` 的背景向上提升到画布层。这是 CSS 规范里一个专门的历史兼容规则。
# `<head>` 标签

> **`<head>` = 元数据 + 资源声明 + 搜索引擎/社交平台指令**

它不显示任何东西，但决定了一个页面如何被浏览器解析（编码）、如何被搜索引擎理解（SEO）、如何被分享（OG）、加载哪些资源（link/script/style），以及在不同设备上怎么缩放（viewport）。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <!-- 元数据、资源链接、脚本、样式 都在这里 -->
    <!-- 这里的内容一个都不会直接显示在页面上 -->
  </head>
  <body>
    <!-- 这里才是用户看见的 -->
  </body>
</html>
```

- `<head>` 是 `<html>` 的第一个子元素（必须比 `<body>` 先出现）
- 内容不渲染到页面
- 专门存放 元数据（metadata）和 资源声明
## 四大类内容（按频率排）

### 🥇第一类：必定出现的

**1. `<title>` — 页面标题（必须唯一，必须有一个）**
```html
<title>我的博客 - 首页</title>
```

- 显示在浏览器标签页上
- 搜索引擎结果页的标题来源
- 收藏夹里的默认名称
- **一个页面只能有一个** `<title>`

**2. `<meta charset="UTF-8">` — 字符编码**
```html
<meta charset="UTF-8">
```

- 必须放在 `<head>` 的**最前面**（前 1024 字节内），否则浏览器可能用错误编码解析，出现乱码
- 历史遗留：HTML 4 时代写成 `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`

### 🥈 第二类：SEO（搜索引擎优化）与社交

**3. `<meta name="description">` — 页面描述**
```html
<meta name="description" content="我这篇文章讲的是CSS画布背景传播机制，从历史原因讲到实际应用">
```

搜索引擎结果页摘要文案的来源，影响点击率。

**4. `<meta name="viewport">` — 移动端视口控制（不做移动端也要理解）**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

| 参数                                | 作用                             |
| --------------------------------- | ------------------------------ |
| `width=device-width`              | 视口宽度 = 设备屏幕宽度（不然手机会把页面缩小成桌面宽度） |
| `initial-scale=1.0`               | 初始缩放比为 1                       |
| `maximum-scale` / `user-scalable` | 控制用户能否缩放（尽量别禁用，影响可访问性）         |

没这一行 = 移动端页面会变得很小，用户需要两只手指放大看。

**5. Open Graph（OG 标签）— 分享到社交平台时的预览**
```html
<meta property="og:title" content="文章标题">
<meta property="og:description" content="文章摘要">
<meta property="og:image" content="https://example.com/cover.jpg">
<meta property="og:url" content="https://example.com/article">
<meta property="og:type" content="article">
```

这就是发链接到微信/QQ/Twitter 时出现那个卡片预览的数据来源。没写的话，平台自己猜，效果就会很差。

### 🥉 第三类：资源引入

**6. `<link>` — 外链资源**
```html
<!-- CSS 样式表 -->
<link rel="stylesheet" href="style.css">

<!-- 网站图标（tab 上的小图标） -->
<link rel="icon" href="favicon.ico" type="image/x-icon">

<!-- 规范 URL，告诉搜索引擎哪个是主 URL -->
<link rel="canonical" href="https://example.com/page">

<!-- 预加载关键资源 -->
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- 预连接外部域名（加速） -->
<link rel="preconnect" href="https://api.example.com">
```

`<link>` 的 `rel` 属性决定了链接的"关系类型"。`stylesheet` 和 `icon` 是最老的用法，`preload` / `preconnect` / `dns-prefetch` 是性能优化的关键工具。

**7. `<style>` — 内嵌 CSS**
```html
<style>
  body { font-family: sans-serif; }
</style>
```

直接写在页面里，少量 CSS 可以这样干。多了就抽成 `.css` 文件。

**8. `<script>` — JavaScript**
```html
<!-- 传统写法：阻塞渲染 -->
<script src="app.js"></script>

<!-- 现代写法：异步加载，不阻塞 -->
<script src="app.js" defer></script>
<script src="analytics.js" async></script>
```

| 属性      | 行为                          |
| ------- | --------------------------- |
| 无       | 立即下载 + 执行，**阻塞 HTML 解析**    |
| `defer` | 异步下载，等 HTML 解析完再按顺序执行       |
| `async` | 异步下载，下载完立刻执行（不管 HTML 解析到哪了） |

放在 `<head>` 里用 `defer` 是现在主流做法，既不吃掉首屏速度，又不用把 `<script>` 塞到 `</body>` 前面。

### 🏅 第四类：功能性元数据

**9. `<base>` — 基准 URL**
```html
<base href="https://example.com/blog/">
```

页面中所有相对路径都以这个 URL 为基准。**一个页面最多一个** `<base>`，多了只有第一个生效。谨慎使用，这经常是调试噩梦。

**10. `<meta http-equiv>` — HTTP 头部模拟**
```html
<!-- 控制缓存 -->
<meta http-equiv="Cache-Control" content="no-cache">

<!-- 安全策略（旧方式，现在推荐用 HTTP 响应头） -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">

<!-- 兼容模式（强烈不建议用） -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

`http-equiv` 的意思是"这行 `<meta>` 等价于一个 HTTP 响应头"。但真正生效的 HTTP 头 **优先级高于** `<meta>` 模拟的版本。

**11. `<noscript>` — JS 禁用时的回退内容**
```html
<noscript>
  <link rel="stylesheet" href="no-js.css">
</noscript>
```

只在 JS 被禁用时生效，一般用来提示用户或者加载降级样式。

## 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- ① 编码，必须第一行 -->
  <meta charset="UTF-8">

  <!-- ② 移动端视口 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- ③ 标题 -->
  <title>CSS 背景传播机制 | 阿辽沙的前端笔记</title>

  <!-- ④ 描述（SEO） -->
  <meta name="description" content="深入理解 html 和 body 背景的传播机制">

  <!-- ⑤ OG 标签（社交分享） -->
  <meta property="og:title" content="CSS 背景传播机制">
  <meta property="og:description" content="深入理解 html 和 body 背景的传播机制">
  <meta property="og:image" content="https://example.com/cover.png">

  <!-- ⑥ 网站图标 -->
  <link rel="icon" href="/favicon.ico">

  <!-- ⑦ 外链 CSS -->
  <link rel="stylesheet" href="/css/main.css">

  <!-- ⑧ JS（defer：不阻塞渲染） -->
  <script src="/js/app.js" defer></script>
</head>
<body>
  <!-- 用户看见的内容 -->
</body>
</html>
```

## 坑

| 坑                           | 说明                             |
| --------------------------- | ------------------------------ |
| 忘写 `<title>`                | W3C 验证不通过，HTML5 规范要求必须有        |
| `<meta charset>` 位置太靠后      | 放前 1024 字节，不然浏览器可能猜错编码         |
| `<script>` 没 `defer` 放 head | 阻塞 HTML 解析，首屏白屏时间变长            |
| `<base>` 有副作用               | 所有 `#` 锚点链接都会变成去基准 URL，容易出 Bug |
| `<meta name="keywords">`    | 搜索引擎早就不用它了，写了也没用               |
# `<body>` 标签

> 没什么好讲的，

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <!-- 幕后工作：编码、标题、SEO、资源引入 -->
  </head>
  <body>
    <!-- 👁️ 从这里开始，所有内容都会被渲染到屏幕上 -->
  </body>
</html>
```

**基本规则：**
- 一个页面**有且只有一个** `<body>`
- `<body>` 是 `<html>` 的第二个子元素（在 `<head>` 之后）
- 所有可见内容——文字、图片、表单、视频——全在 `<body>` 下

| body标签的身份   | 说明                                       |
| ----------- | ---------------------------------------- |
| **HTML 元素** | DOM 树上的一个节点，有盒模型，可以设 CSS                 |
| **文档体的入口**  | 浏览器暴露 `document.body`，直接指向它，是 JS 操作的默认入口 |
