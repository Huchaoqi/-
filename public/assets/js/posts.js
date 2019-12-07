 // 向服务器端发送请求 获取文件列表数据
 $.ajax({
     type:'get',
     url:'/posts',
     success: function(resp){
         console.log(resp);
         let html = template('postsTpl',resp);
         $('#postsBox').html(html);
         let page =  template('pageTpl', resp);
         $('#page').html(page);
     }
 })

 

  //分页
  function  changePage(page){
     // alert(page);
      $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success: function(resp){
            console.log(resp);
            let html = template('postsTpl',resp);
            $('#postsBox').html(html);
            let page =  template('pageTpl', resp);
            $('#page').html(page);
        }
    })
  }

  // 向服务器端发送请求 索要分类数据

  $.ajax({
      type:'get',
      url:'/categories',
      success: function(resp){
     console.log(resp);
     let html = template('categoryTpl',{data:resp});
     //console.log(html)
      // 分类的id筛选分类
      $('#categoryBox').html(html);
      }
  })

// 当用户进行文章筛选的时候
$("#filterForm").on('submit',function(){
     // 获取到管理员选择的过滤条件
      // alert(1)
     let  formData = $(this).serialize();
      // 向服务器端发送请求 根据条件索要文章列表数据
      $.ajax({
          type:'get',
          url:'/posts',
          data:formData,
          success: function(response){
                console.log(response);
              let html =template('postsTpl',response);

              $('#postsBox').html(html);
             // console.log(html)

              let page = template('pageTpl',response);
              $("#page").html(page);
          }

      })
    return false;
})
 
// 当删除按钮被点击的时候
$('#postsBox').on('click','.delete',function(){
     //弹出删除确认框 和管理员确认是否真的要进行删除操作
      if(confirm('真的要进行删除操作吗?')){
          // 获取到管理员要删除的文章的ID
           let id = $(this).attr('data-id');
            //测试确认删除 拿到要删除文章的ID
           //alert(id);
           // 向服务器端发送请求执行删除操作

           $.ajax({
               type:'delete',
               url:'/posts/'+id,
               success: function(){
                location.reload();
               }
                   
               
           })
      }

})