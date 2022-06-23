<script lang="ts">
  import appStore from "../stores/appStore";
</script>

<div class="highlight-zone">
  {@html $appStore.text.replace(
    $appStore.regex,
    (string) => `<b>${string}</b>`
  )}
</div>

<style lang="postcss">
  .highlight-zone {
    :global(b) {
      @apply bg-blue-200;
    }
  }
</style>
