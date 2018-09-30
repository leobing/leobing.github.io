<template>
    <div style="width:500px;margin:0 auto;">
        <Input v-model="formValidate.txt" placeholder="Enter your name"></Input>
        <Tag v-for="item in formValidate.count" :key="item" :name="item" closable @on-close="handleClose2">
            {{ item }}
        </Tag>
        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate:{
                    
                }
            }
        },
        methods: {
            handleAdd () {
                this.formValidate.count.push(this.formValidate.txt);
            },
            handleClose2 (event, name) {
                const index = this.formValidate.count.indexOf(name);
                this.formValidate.count.splice(index, 1);
            }
        }
    }
</script>
