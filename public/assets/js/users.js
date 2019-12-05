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
  $('#userForm').on('change','#avatar',function(){
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
          //console.log(resp);
          var html =template('userTpl',{data:resp});
          //将拼接好的字符串显示在页面

          $('#userBox').html(html);
      }
  });
 
   // 通过事件委托 的方式为编辑按钮添加点击事件

   $('#userBox').on('click','.edit',function(){
       //获取被点击用户的值
       let id = $(this).attr('data-id');
       // 根据id 获取用户的详细信息


       $.ajax({
           type:'get',
           url:'/users/' + id,
           success: function(resp){
               console.log(resp)
               let html =template('modifyTpl',resp);
               $('#modifyBox').html(html);

           }
       })
   });

    // 为修改表单的二天就表单提交事件

    $('#modifyBox').on('submit','#modifyForm',function(){
        let formData = $(this).serialize();
        let id = $(this).attr('data-id');
        console.log(id);
        
        //发送请求 修改用户的id值
        $.ajax({
            type:'put',
            url:'/users/'+id,
            data:formData,
            success: function(resp){
                location.reload()
            }
        })
        // 阻止表单的默认提交
         return false;

    });
     

     // d当删除按钮被点击的时候 
     $('#userBox').on('click','.delete',function(){
         // z再次确认要是否要删除
         if(confirm('确定是否删除?')){
             //获取到即将要删除的用户ID
             let id= $(this).attr('data-id');
             //想服务器发送请求 删除用户
             $.ajax({
                 type:'delete',
                 url:'/users/'+ id,
                 success: function(){
                     location.reload()
                 }
             })
         }
     })

     // 获取全选按钮

     let selectAll =$('#selectAll')
     // 获取批量删除按钮
     let deleteMany =$('#deleteMany');

     // 当全选 按钮状态发送改变时
    selectAll.on('change',function(){
        //获取到全选按钮当前的 状态
        let status = $(this).prop('checked');

        if(status){
            //显示批量删除按钮

            deleteMany.show();
        }else{
            //隐藏批量删除按钮
            deleteMany.hide();
        }
        //获取到所有用户并将用户和全选按钮保持一致
        $('#userBox').find('input').prop('checked',status);
    });
    //当用户前面的复选框状态发生改变时
    $('#userBox').on('change','userStatus',function(){
         // 获取所有用户  和过滤出选中的用户
         // 判断两者数量是否一致
         ///如果一致 就说明所有的用户都是选中的
         //否则就是有用户没有选中

         let  inputs = $('#userBox').find('input');
         if(inputs.length == inputs.filter(':checked').length){
             selectAll.prop('checked', true);
         }else{
             selectAll.prop('check',false)
         }
         // r如果选中的复选框数量大于0 说明有选中的复选框
         if(inputs.filter(':checked').length> 0){
             deleteMany.show();
         }else{
             deleteMany.hide();
         }
    });

    // 为批量删除按钮添加点击事件
    deleteMany.on('click',function(){
        let ids = [];
        // 获取选中的用户
        let checkedUser =$('#userBox').find('input').filter(':checked');
        // 循环复选框 从复选框元素的身上获取data -id 属性的值

        checkedUser.each(function(index,element){
            ids.push($(element).attr('data-id'));

        });
         if (confirm('确定要批量删除吗')){
             $.ajax({
                 type:'delete',
                 url:'/user' + ids.join('-'),
                 success: function(){
                     location.reload();
                 }
             })
         }
    })
