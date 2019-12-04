 // 封装获取表单数据转换成想要的对象类型

function serializeObj(form) {
    let arr = form.serializeArray();
    let obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
}
  // 绑定submit 事件
$('#userForm').on('submit',function(){
    let obj = serializeObj($(this));
    $.ajax({
         type:'post',
         url:'/users',
         data:obj,
         success: function(){

             location.reload();
         },
         error:function(){
             alert('用户添加失败')
         }
    })
    // 阻止表单默认行为
    return false;
})

  // 处理头像上传功能
  $('#avatar').on('change',function(){
      var formData = new FormData();
      formData.append('avatar',this.files[0])

      // 开始发送请求
      $.ajax({
          type:'post',
          url:'/upload',
          data:formData,
           //告诉$.ajax 方法不啊哟解析请求参数
          processData: false,
           //告诉$.ajax 方法不要设置请求参数的类型
          contentType:false,

          success:function(resp){
               console.log(resp)
              var url =resp[0].avatar;

              $('#preview').attr('src',url);
              $('#hiddenAvatar').val(url)

          }
      })

  });
  // 想服务器端发送请求 索要用户列表数据
  $.ajax({
      type:'get',
      url:'/users',
      success: function(resp){
          console.log(resp);
          var html =template('userTpl',{data:response});
          //将拼接好的字符串显示在页面

          $('#userBox').html(html);
      }
  });
 