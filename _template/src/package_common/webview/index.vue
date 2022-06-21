<template>
    <div class="web-view">
        <web-view :src="url"></web-view>
    </div>
</template>

<script>
    import Base64 from '../../common/js/base64';
    export default {
        data() {
            return {
                url: ''
            }
        },
        async onLoad(options) {
            let { code, url } = options;
            if(!url) {
                this.url = "https://www.baidu.com";
                return;
            }
            if(code === 'base64') {
                this.url = Base64.decode(url);
            } else {
                this.url = decodeURIComponent(url);
            }
        }
    }
</script>

<style lang="scss">
</style>
