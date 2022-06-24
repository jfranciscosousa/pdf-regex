<script lang="ts">
  import appStore from "~/stores/appStore";
</script>

<div class="highlight-zone">
  {@html $appStore.highlightedText}
</div>

<style lang="postcss">
  .highlight-zone {
    :global(b) {
      @apply bg-blue-200;
    }
  }
</style>
