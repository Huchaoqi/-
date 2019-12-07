 // 向服务器发送请求 获取文章的数量
 $.ajax({
     type:'get',
     url:'/posts/count',
     success:function(resp){
         console.log('resp=>',resp)
         $('#post').html('<strong>'+resp.postCount+'</strong>篇文章（<strong>'+resp.draftCount+'</strong>篇草稿）')

     }
 })

 // 获取分类的数量

 $.ajax({
     type:'get',
     url:'/categories/count',
     success:function(resp){
         $('#category').html('<strong>'+resp.categoryCount+'</strong>个分类')

     }
 })

 //获取品论数量
 $.ajax({
      type:'get',
      url:'/comments/count',
      success:function(resp){
          $('#comment').html('<strong>'+resp.commentCount+'</strong>条评论')
      }
 })