

$(function(){
    var currentPage =1;   //当前页
    var pageSize = 5;   //每页条数

    var currentId;   //当前正在修改的用户id
    var isDelete;   //需要修改的状态

    // 一进入页面,发送ajax请求,获取数据,进行页面动态渲染
    render();
  // 根据currentpage 和 pageSize 发送请求,渲染页面
  function render(){
    $.ajax({
      type:"get",
      url: "/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        // 生成  htmlStr ,将来进行渲染
        // 参数1: 模版id ,参数2: 数据对像
        // 在模版中,可以直接访问传进去对象的所有属性
  
        var htmlStr = template("tmp",info);
  
        $("tbody").html(htmlStr);

        // 进行页面初识化
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion:3,
          // 总页数
          totalPages:Math.ceil(info.total / info.size),
          // 当前页
          currentPage:info.page,
          // 点击事件
          onPageClicked:function(a,b,c,page){
            // 根据page,请求对应页的数据,进行渲染
            currentPage = page;
            // 调用render重新渲染
            render();
          }

        })
 
      }
    });

  }
  //  给启用禁用按钮,添加事件(通过事件委托)
  //  事件委托:$("父元素").on("事件名称","子元素",function(){.....})


  // 优点:1.可以给动态生成的元素,绑定事件
  //      2.可以进行批量注册事件,性能效率更高


  $(".lt_content tbody").on("click",".btn",function(){
    // 显示模态框
    $("#userModal").modal("show");
    // 获取用户id
    currentId = $(this).parent().data("id");
    // 获取更改的状态(根据按钮的类名判断)
    // 禁用按钮 ? 0:1
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  // 确认按钮被点击,发送ajax请求,改变用户状态
  $("#confirmBtn").click(function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          // 修改成功
          // 关闭模态框
          $("#userModal").modal("hide");
          // 页面重新渲染
          render();
        }
        
      }
    })
  })





  
})