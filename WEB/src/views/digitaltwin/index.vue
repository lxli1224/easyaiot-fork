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

// 从 localStorage 获取认证凭据传递给数字孪生
function buildTwinUrl() {
  const base = 'http://101.43.19.180:5177?embed=1'
  const token = localStorage.getItem('ACCESS_TOKEN__')
  const tenantId = localStorage.getItem('TENANT_ID__') || '1'
  if (token) {
    return `${base}&api_token=${encodeURIComponent(token)}&tenant_id=${encodeURIComponent(tenantId)}`
  }
  return base
}

const twinUrl = ref(buildTwinUrl())

const onIframeLoad = () => {
  // 通信桥接：接收数字孪生页面发送的消息
  window.addEventListener('message', (event) => {
    // 可以在这里处理数字孪生传来的事件（如告警点击）
    if (event.data?.type === 'alert-click') {
      console.log('[EasyAIoT] 数字孪生告警:', event.data.payload)
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
