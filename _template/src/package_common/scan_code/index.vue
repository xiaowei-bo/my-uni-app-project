<template>
    <div>
        <textarea 
            class="url_text"
            name="scanUrl" 
            id="scanUrl" 
            cols="30" 
            rows="10" 
            v-model="scanUrl"
            placeholder="输入您想打开的链接">
        </textarea>
        <div class="btn_group clearfix">
            <div class="jump_btn fl" @click="toScanCode">扫描二维码</div>
            <div class="jump_btn fr" @click="toWebview('')">打开链接</div>
        </div>
        <div class="demo">
            <p>常用标签</p>
            <ul>
                <li 
                    class="circle"
                    @click="toWebview(item.url)"
                    v-for="(item, index) in urlList">
                    {{item.desc}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            scanUrl: '',
            urlList: [{
                desc: '百度',
                url: 'https://www.baidu.com'
            }]
        }
    },
    methods: {
        toScanCode() {
            const _this = this;
            uni.scanCode({
                success: function(res) {
                    _this.scanUrl = res.result;
                }
            });
        },
        toWebview(url) {
            const _url = url || this.scanUrl;
            this.$utils.openLinkH5(_url);
        }
    },
    mounted() {
        uni.setNavigationBarTitle({
            title: 'webview 测试'
        });
    }
}
</script>

<style lang="scss" scoped>
.url_text{
    display: block;
    margin: 100rpx auto;
    width: 700rpx;
    height: 300rpx;
    border: 5rpx solid #FF615B;
    border-radius: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
}
.btn_group{
    margin: 100rpx auto;
    width: 650rpx;
    .jump_btn{
        width: 300rpx;
        height: 80rpx;
        background-color: #FF615B;
        color: #fff;
        font-size: 32rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 80rpx;
    }
}
.demo{
    padding: 32rpx;
}
.circle{
    border-radius: 1000rpx;
    border: 2rpx solid #ff615b;
    color: #FF615B;
    background-color: #fff;
    display: inline-block;
    padding: 5rpx 15rpx;
    margin: 24rpx 24rpx 0 0;
}
</style>
