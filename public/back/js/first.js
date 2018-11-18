
$(function(){
  var currentPage = 1; //当前页
  var pageSize = 5;  //每条页数
  // 1.一进入页面,发送ajax请求,获取数据,进行渲染
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);


        // 结合模版引擎渲染
        var htmlStr = template("firstTpl",info);
        $('tbody').html(htmlStr);


        // 分页初识化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          //当前页
          currentPage:info.page,
          //总页数
          totalPages:Math.ceil(info.total / info.size),
          //为按钮绑定点击事件
          onPageClicked:function(a,b,c,page){
            // 更新当前页
           currentPage = page;
          //  重新渲染
          render();

          }
        });
        
      }

    })
  };

  // 2.点击添加按钮,显示添加模态框

  $("#addBtn").click(function(){
    // 显示添加模态框
    $("#addModal").modal("show");
  });



  // 3.表单校验功能
 //使用表单校验插件
$("#form").bootstrapValidator({

  //指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',//校验成功
    invalid: 'glyphicon glyphicon-remove', //校验失败
    validating: 'glyphicon glyphicon-refresh'//检验中
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    categoryName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请输入一级分类'
        }
       
      }
    }
  }

});

// 4. 注册表单校验成功事件,阻止默认的提交,通过ajax提交
$("#form").on("success.form.bv",function(e){
  e.preventDefault();

  // 通过ajax提交
  $.ajax({
    type:"post",
    url:"/category/addTopCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success){
        // 添加成功
        // 关闭模态框
        $('#addModal').modal("hide");
        // 重新渲染第一页
        currentPage = 1;
        render();

        // 重置表单的内容和状态
        // resetForm(true)  表示内容和状态都重置
        // resetForm()    表示只重置状态

        $("#form").data("bootstrapValidator").resetForm(true);
      }
    }
  })
})


})