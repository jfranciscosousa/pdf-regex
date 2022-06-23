<!-- @hmr:keep-all -->
<script lang="ts">
  import Input from "./components/Input.svelte";
  import { loadPDFJS } from "./lib/pdfutils";
  import pdfStore from "./stores/pdfStore";

  let url: string;
  let pdfContainer: HTMLDivElement;
  let regexString: string;
  let regex = new RegExp("", "g");

  $: {
    if ($pdfStore.document && pdfContainer) {
      loadPDFJS($pdfStore.document, pdfContainer);
    }
  }

  $: {
    try {
      regex = new RegExp(regexString, "g");

      console.log(regex);
    } catch (e) {}
  }
</script>

{#if $pdfStore.document}
  <div class="parent h-screen">
    <div class="div1 border-black border-2">
      <div class="h-full w-full" bind:this={pdfContainer} />
    </div>
    <div class="div2 border-black border-2">
      {@html $pdfStore.text.replace(
        regex,
        (string) => `<b class="bg-blue-200">${string}</b>`
      )}
    </div>
    <div class="div3 border-black border-2">
      <textarea
        class="h-full w-full p-4 resize-none"
        bind:value={regexString}
      />
    </div>
  </div>
{:else if $pdfStore.loading}
  <p>Loading!</p>
{:else}
  <Input bind:url />
{/if}

<style>
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
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    overflow: auto;
  }
  .div3 {
    grid-area: 2 / 1 / 3 / 3;
    overflow: hidden;
  }
</style>
