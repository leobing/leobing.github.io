<template>
    <!-- <Button type="primary" @click="modal6 = true">Display dialog box</Button> -->
    <Modal
        v-model="modal6"
        width="50"
        title="信息编辑"
        :scrollable='scroll'
        :loading="loading"
        @on-ok="asyncOK"
        @on-cancel="cancel">
        
        <slot name="content"></slot>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
        props:[
            'flag'
        ],
        data () {
            return {
                loading: true,
                scroll: true
            }
        },
        computed:{
            // 读取和设置
            modal6:{
                get:function(){
                    return this.flag;
                },
                set:function(val){
                    return val;
                }
            }
        },
        methods: {
            asyncOK(){
                this.$emit('ok');
            },
            cancel(){
                this.$emit('no');
            }
        }
    }
</script>
