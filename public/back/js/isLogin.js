

// 需求:如果当前用户是为登录的,拦截登录页
// 前后分离,前端不知道当前用户是否登录,但是后台知道
// 需要发送ajax请求询问后台,当前用户的登录状态

$.ajax({
  type:"get",
  url:"/employee/checkRootLogin",
  dataType:"json",
  success:function(info){
    console.log(info);
    if(info.sucess){
      // 用户一已登录
      console.log("用户已登录, 继续访问");
      
    }
    if(info.error === 400){
      // 未登录
      location.href = "login.html";
    }
    
  }
})
