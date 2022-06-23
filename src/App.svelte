<!-- @hmr:keep-all -->
<script lang="ts">
  import DocumentArea from "./components/DocumentArea.svelte";
  import DocumentInput from "./components/DocumentInput.svelte";
  import HighlightArea from "./components/HighlightArea.svelte";
  import RegexArea from "./components/RegexArea.svelte";
  import appStore from "./stores/appStore";
</script>

{#if $appStore.document}
  <div class="parent h-screen">
    <div class="div1 border-black border-2">
      <DocumentArea />
    </div>
    <div class="div2 border-black border-2">
      <HighlightArea />
    </div>
    <div class="div3 border-black border-2">
      <RegexArea />
    </div>
  </div>
{:else if $appStore.loading}
  <p>Loading!</p>
{:else}
  <DocumentInput />
{/if}

<style lang="postcss">
  .parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 80% 20%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .div1 {
    grid-area: 1 / 1 / 2 / 2;
    overflow: auto;

    @media screen(md) {
      display: none;
    }

    * :global(canvas) {
      margin: 0 auto;
    }
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    overflow: auto;

    @media screen(md) {
      grid-area: 1 / 1 / 2 / 3;
    }
  }
  .div3 {
    grid-area: 2 / 1 / 3 / 3;
    overflow: hidden;
  }
</style>
