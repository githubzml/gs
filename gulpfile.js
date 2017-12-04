var gulp = require("gulp");
var webserver = require("gulp-webserver");
var urlTool = require("url");
//压缩css
var cleanCss = require("gulp-clean-css");
//压缩js
var uglify = require("gulp-uglify");
//压缩html
var htmlmin = require("gulp-htmlmin");
var data = [{img:"images/nav_01.jpg",name:"百度",address:"北京市海淀区西北旺",work:"互联网",ss:"上市",people:100000,zw:"前端工程师"},{img:"images/nav_02.jpg",name:"百度",address:"北京市海淀区西北旺",work:"互联网",ss:"上市",people:100000,zw:"前端工程师"},{img:"images/nav_03.jpg",name:"北京未来科技",address:"北京市海昌平区沙河",work:"IT软件",ss:"未融资",people:"100-499",zw:"前端工程师"},{img:"images/nav_04.jpg",name:"最酷教育",address:"北京市海淀区五棵松",work:"互联网",ss:"A轮",people:100000,zw:"前端工程师"}];
var obj = {
	collapseWhitespace:true,
	minfyJS:true,
	minfyCSS:true
}
//使用mock数据 将数据传送到前端
gulp.task("mockServer",function(){
	gulp.src(".")
		.pipe(webserver({
			port:8080,
			middleware:function(req,res,next){
				//设置允许跨域请求
				res.setHeader("Access-Control-Allow-Origin","*");
				var method = req.method;
				var url = req.url;
				var urlObj = urlTool.parse(url);
				var pathname = urlObj.pathname;
				//判读请求方式
				if(method == "GET"){
					switch(pathname){
						case "/home":
						res.setHeader("content-type","application/json");
						res.write(JSON.stringify(data));
						res.end();
						break;
						default:
						break;
					}
				}
			}
		}))
})
//压缩css
gulp.task("cleanCss",function(){
	gulp.src("./public/css/*.css")
		.pipe(cleanCss())
		.pipe(gulp.dest("./mincss"))
})
//压缩js
gulp.task("uglify",function(){
	gulp.src(["./script/*.js","./controller/*.js"])
		.pipe(uglify())
		.pipe(gulp.dest("./minjs"))
})
//压缩html
gulp.task("htmlmin",function(){
	gulp.src("./*.html")
		.pipe(htmlmin(obj))
		.pipe(gulp.dest("./minhtml"))
})
gulp.task("default",["mockServer","cleanCss","uglify","htmlmin"])
