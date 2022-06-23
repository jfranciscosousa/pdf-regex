<!-- @hmr:keep-all -->
<script lang="ts">
  import Input from "./components/Input.svelte";
  import stringtoregex from "./lib/stringtoregex";
  import pdfStore from "./stores/pdfStore";

  let url: string;

  let regexString = "/test string/gi";
  let regex: RegExp;
  let regexError = false;

  $: {
    try {
      if (!regexString) regex = null;
      else regex = stringtoregex(regexString);

      regexError = false;

      console.log(regex);
    } catch (e) {
      regexError = true;
      regex = null;
    }
  }
</script>

{#if $pdfStore.document}
  <div class="parent h-screen">
    <div class="div1 border-black border-2 relative">
      <object
        data={url}
        type="application/pdf"
        class="w-full h-full"
        title="Original document"
      >
        <iframe src={url} class="w-full h-full" title="Original document">
          <p>This browser does not support PDF!</p>
        </iframe>
      </object>
    </div>
    <div class="div2 border-black border-2 highlight-zone">
      {@html $pdfStore.text.replace(regex, (string) => `<b>${string}</b>`)}
    </div>
    <div class="div3 border-black border-2">
      <textarea
        class="h-full w-full p-4 resize-none tracking-wide"
        class:text-red-600="{regexError}"
        bind:value={regexString}
      />
    </div>
  </div>
{:else if $pdfStore.loading}
  <p>Loading!</p>
{:else}
  <Input bind:url />
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

  .highlight-zone {
    :global(b) {
      @apply bg-blue-200;
    }
  }
</style>
