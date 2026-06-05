<template>
  <div class="digital-twin-embed">
    <iframe
      ref="iframeRef"
      :src="twinUrl"
      frameborder="0"
      class="twin-iframe"
      allow="fullscreen; camera; microphone"
      @load="onIframeLoad"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'DigitalTwinEmbed'
})

const iframeRef = ref<HTMLIFrameElement | null>(null)

// 深度集成：同域部署，共享 localStorage，无需 URL 传参
// 数字孪生页面直接读取 EasyAIoT 的 ACCESS_TOKEN__ 和 TENANT_ID__
function buildTwinUrl() {
  return '/twin/?embed=1'
}

const twinUrl = ref(buildTwinUrl())

const onIframeLoad = () => {
  // 通信桥接：接收数字孪生页面发送的消息（深度集成：同域通信）
  window.addEventListener('message', (event) => {
    const { type, payload } = event.data || {}
    switch (type) {
      case 'alert-click':
        console.log('[EasyAIoT] 数字孪生告警:', payload)
        break
      case 'device-click':
        console.log('[EasyAIoT] 数字孪生设备:', payload)
        break
      case 'camera-click':
        console.log('[EasyAIoT] 数字孪生摄像头:', payload)
        break
    }
  })
}

const resizeIframe = () => {
  if (iframeRef.value) {
    iframeRef.value.style.height = '100%'
    iframeRef.value.style.width = '100%'
  }
}

onMounted(() => {
  resizeIframe()
  window.addEventListener('resize', resizeIframe)
})
</script>

<style lang="less" scoped>
.digital-twin-embed {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0f2249;

  .twin-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
}
</style>
