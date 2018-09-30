<template>
    <div>
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon> -->
                    <Icon type="ios-trash-outline" size="large" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="/users/upload"
            name='profile'
            style="display:block;width:100%;" v-if="visible">
            <div style="width: 100%;height:200px;line-height: 200px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        props:[
            'uploadList'
        ],
        data () {
            return {
                defaultList: [
                    
                ],
                imgName: '',
                visible: true //控制上传控件的上传与卸载
            }
        },
        mounted () {
            // this.uploadList = this.$refs.upload.fileList;
        },
        methods: {
            handleRemove (file) {
                // console.log(file.name);
                axios.post('/users/removefile',{
                    url:file.url
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        // 删除成功
                        console.log('删除成功');
                        this.visible = true;
                        // 文件在服务器被删除成功后，将被删除文件的信息发给父组件，以删除页面元素
                        this.$emit('remove', file);
                    }
                });

            },
            handleSuccess (res, file) {
                file.url = res.result.url;
                file.name = res.result.name;
                this.visible = false;
                // 文件上传存储成功后，将上传文件的信息push到上传列表中，发给父组件，以备存储数据库
                this.uploadList.push(file);
                this.$emit('uploadSuc', this.uploadList);
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: file.name + ' 文件格式不对, 请选择jpg或png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: file.name + ' 太大,文件不能超过2M.'
                });
            },
            handleBeforeUpload () {
                // 控制上传图片数量
                const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多可以上传1张图片。'
                    });
                }
                return check;
            }
        }
    }
</script>
<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        max-height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        /* margin: 0 2px; */
        line-height:200px;
    }
</style>

