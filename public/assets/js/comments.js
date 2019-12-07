 //向服务器端发送请求
 // 获取评论列表数据
  $.ajax({
    type:'get',
    url:'/comments',
    success: function(response){
        console.log(response);
      let html =template('commentsTpl',response)
       // console.log(html)
       $('#commentsBox').html(html);
    }

  })



  // 当审核