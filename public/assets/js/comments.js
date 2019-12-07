//向服务器端发送请求
// 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        let html = template('commentsTpl', response)
        // console.log(html)
        $('#commentsBox').html(html);
        let pageHTML = template('pageTpl', response)
        // console.log(pageHTML)
        $('#pageBox').html(pageHTML);
    }

})

// 实现分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response);
            let html = template('commentsTpl', response)
            // console.log(html)
            $('#commentsBox').html(html);
            let pageHTML = template('pageTpl', response)
            // console.log(pageHTML)
            $('#pageBox').html(pageHTML);
        }

    })
}

//当审核按钮被点击的时候
$('#commentsBox').on('click','.status', function () {
    // 获取当前评论的状态
    let status = $(this).attr('data-status');
    //获取当前要修改的评论的id
    // let id = $(this).attr('data-id');
    var id=$(this).attr('data-id');
    console.log(id)
    //向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/'+id,
        data: {
            state: status == 0 ? 1 : 0,
        },
        success: function(){
            location.reload();
        }

    })

})


// 点击删除按钮的时候

$('#commentsBox').on('click','.delete',function(){
  if(confirm('您确定要删除阿')){
      //获取管理员要删除的评论ID
      let id = $(this).attr('data-id');
      //console.log(id);
      //向服务器端发送请求 指向删除操作
      $.ajax({
            type:'delete',
            url:'/comments/'+id,
            success: function(){
                location.reload();
            }

      })
  }

})