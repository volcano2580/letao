

$(function(){
  // 进行表单校验配置
  //   校验要求:
  //   (1)用户名不能为空,长度为2-6位
  //   (2)密码名不能为空,长度为6-12位
 $('.#form').boostrapValidator({
  //  配置校验图标
  feedbackIcon:{
    valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
  },

  // 配置校验字段(需要先在 input 中配置name )
  fields:{
    username:{
      // 进行多个规则配置
      validators:{
        // 非空校验
        notEmpty:{
          message:"用户名不能为空"
        },
        // 长度校验
        stringLength:{
          min:2,
          max:6,
          message:"用户名长度必须是2-6位"
        },
        // 配置回调函数的提示信息
        callback: {
          message: "用户名不存在"
        }
      }
    },
    password: {
      validators: {
        notEmpty: {
          message: "密码不能为空"
        },
        stringLength: {
          min: 6,
          max: 12,
          message: "密码长度必须是6-12位"
        },
        // 配置回调函数的提示信息
        callback: {
          message: "密码错误"
        }
      }
    }

  }

 });
    // 2.表单校验需要在表单提交时,进行校验,需要submit按钮
    //   可以注册一个表单校验成功事件,表单校验成功之后,默认会提交
    //   可以在成功事件中,阻止默认的表单提交,通过ajax提交,就不会跳转了

    // 思路:
    //    1. 注册表单校验成功事件
    //    2. 在事件中,阻止默认的表单提交,通过ajax提交即可


    $('#form').on("success.form.bv",function(e){
      
    })










})