<script lang="ts">
  import appStore from "../stores/appStore";

  let div: HTMLDivElement;

  $: {
    if (div)
      div.innerHTML = $appStore.text.replace($appStore.regex, (string) => `<b>${string}</b>`);
  }
</script>

<div class="highlight-zone" bind:this={div}>
  {@html $appStore.text.replace($appStore.regex, (string) => `<b>${string}</b>`)}
</div>

<style lang="postcss">
  .highlight-zone {
    :global(b) {
      @apply bg-blue-200;
    }
  }
</style>
