


$(function(){
// 1.一进入页面,发送ajax请求,获取数据,渲染页面
var currentPage = 1; //当前页
var pageSize = 5;  //每页条数
render();


// 根据currentPage 和 pageSiz  请求对应的数据 ,进行渲染
function render(){
  $.ajax({
    type:"get",
    url:"/category/querySecondCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      // 根据模版引擎进行渲染
      var htmlStr = template("secondTpl",info);
      $("tbody").html(htmlStr);

      // 进行分页初始化
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3, // 版本号
        totalPages: Math.ceil( info.total / info.size ),
        currentPage: info.page,
        onPageClicked: function( a, b, c, page ) {
          // 更新当前页
          currentPage = page;
          // 重新渲染
          render();
        }
      })
    }
  })
 }
//  2.点击添加按钮,显示添加模态框
$("#addBtn").click(function(){
  // 显示添加模态框
  $("#addModal").modal("show");

  // 发送ajax请求, 获取下拉菜单的列表数据(全部的一级分类)
  // 通过分页获取一级分类的接口, 模拟获取全部数据的接口, page=1, pageSize: 100
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:1,
      pageSize:100
    },
    dataType:"json",
    success:function(info){
      console.log(info);
       // 根据模版引擎进行渲染
       var htmlStr = template("dropdownTpl",info);
       $(".dropdown-menu").html(htmlStr);
 
      
    }
  })
});

//3. 给下拉菜单的所有 a 添加点击事件, 通过事件委托注册
$('.dropdown-menu').on("click","a",function(){
  // 获取a的文本
  var txt = $(this).text();
  // 将文本设置给 按钮
  $("#dropdownText").text(txt);
  // 获取id,设置给准备好的input
  var id = $(this).data("id");
  $('[name="categoryId"]').val(id);
  $('[name="categoryId"]').trigger("input");

  // 手动将 name="categoryId" 的校验状态, 改成 VALID 校验成功
  // $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
});

// 4.进行文件上传初始化
$("#fileupload").fileupload({
  dataType:"json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  // 表示文件上传完成的回调函数
  done:function (e, data) {
    console.log(data);
    // 后台返回的结果
    var result = data.result;
    // 获取文件上传的地址
    var picUrl = result.picAddr;
    // 设置给img的src
    $('#imgBox img').attr("src",picUrl);
    // 将src路径,实时设置给input
    $('[name="brandLogo"]').val(picUrl);
    $('[name="brandLogo"]').trigger("input");


    // 将name="brandLogo"的5校验状态,改成成功
    // $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");


    
  }
});

// 5.配置表单检验
//使用表单校验插件
$('#form').bootstrapValidator({ 
 //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置  
 excluded: [],  
 //2. 指定校验时的图标显示，默认是bootstrap风格 
  feedbackIcons: {   
    valid: 'glyphicon glyphicon-ok',  
    invalid: 'glyphicon glyphicon-remove', 
    validating: 'glyphicon glyphicon-refresh'  
  },  
  //3. 指定校验字段  
  fields: {    
  //校验用户名，对应name表单的name属性    
  username: {      
    validators: {        
      //不能为空        
      notEmpty: {         
         message: '请选择一级分类'    
          },          
      }   
     }, 
     brandName: {
      validators: {
        notEmpty: {
          message: "请输入二级分类名称"
        }
      }
    },

    brandLogo: {
      validators: {
        notEmpty: {
          message: "请选择图片"
        }
      }
    }
    }
  });

  // 6.注册表单校验成功事件,阻止默认的表单提交,通过ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("form").serialize(),
      success:function(info){
        console.log(info);
        if(info.success){ 9
          // 添加成功时,需要关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染页面,渲染第一页
          currentPage = 1;
          render();

          // 需要重置内容 和 校验状态
          $('#form').data("bootstrapValidator").resetForm( true );
          // 由于按钮 和 图片不是表单元素,需要动手重置
          $('#dropdoownText').text("请选择一级分类");
          // 图片重置
          $("#imgBox img").attr("src","./images/none.png");
        }        
      }
    })
});







})