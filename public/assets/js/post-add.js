 // 向服务器发送请求 获取文字分类数据

$.ajax({
    url:'/categories',
    type:'get',
    success: function(resp){
        //console.log(resp);
      let html =  template('categoryTpl',{data:resp});
    //  console.log(html)
    $('#category').html(html);
    }
})

// 当管理员选择文件的时候触发事件
$('#feature').on('change',function(){
     //获取到管理员选择的文件
   let file = this.files[0];
    // 创建formData 对象 实现二进制文件上传
    let formData = new FormData();
    // 将文件追加到formData对象中

    formData.append('cover',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data: formData,

        //告诉AJAX方法 不要处理data属性对应的参数
        processData: false,
        // 告诉ajax 方法 不要设置参数类型
        contentType: false,
        success: function(resp){

            console.log(resp)
            $('#thumbnail').val(resp[0].cover)

        }
    })
})

$('#addForm').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data: formData,
        success: function(){

            location.href = '/admin/posts.html'
        }
    })
    return false;
})