<script lang="ts">
  import appStore from "~/stores/appStore";
</script>

<object
  data={$appStore.url}
  type="application/pdf"
  class="w-full h-full"
  title="Original document"
>
  <iframe src={$appStore.url} class="w-full h-full" title="Original document">
    <p>This browser does not support PDF!</p>
  </iframe>
</object>
