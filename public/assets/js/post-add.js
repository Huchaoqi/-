//  import { strict } from "assert";

// 向服务器发送请求 获取文章分类数据

$.ajax({
    url: '/categories',
    type: 'get',
    success: function (resp) {
        //console.log(resp);
        let html = template('categoryTpl', { data: resp });
        //  console.log(html)
        $('#category').html(html);
    }
})

// 当管理员选择文件的时候触发事件
$('#feature').on('change', function () {
    //获取到管理员选择的文件
    let file = this.files[0];
    // 创建formData 对象 实现二进制文件上传
    let formData = new FormData();
    // 将文件追加到formData对象中

    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,

        //告诉AJAX方法 不要处理data属性对应的参数
        processData: false,
        // 告诉ajax 方法 不要设置参数类型
        contentType: false,
        success: function (resp) {

            console.log(resp)
            $('#thumbnail').val(resp[0].cover)

        }
    })
});
// 添加文件表单提交的时候

$('#addForm').on('submit', function () {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            //文章添加成功跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    })
    //阻止表单默认行为

    return false;
});



//! 取文章的详情 
// 获取浏览器地址栏中的id 参数
let id = getUrlParams('id');
//当前管理员是在做修改文章操作
if (id != -1) {
    //根据id 获取详情信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (resp) {

            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    resp.categories = categories;
                    // console.log(resp);
                    let html = template('modifyTpl', resp)
                    $('#parentBox').html(html);
                    console.log(html)
                }
            })


        }
    })
}


// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&');

    // 循环数据
    for (let i = 0; i < paramsAry.length; i++) {
        let tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];

        }
    }
    return -1;
}

//修改表单后 发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function () {
    // alert(1)

    // 获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    // 获取文章修改的id值
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html';
        }
    })

    // 阻止表单默认
    return false;
})



