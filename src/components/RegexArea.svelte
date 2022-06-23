<script lang="ts">
  import appStore from "../stores/appStore";

  let regexString = "test string";
  let flagsString = "gi";

  $: {
    appStore.handleRegexChange(regexString, flagsString);
  }
</script>

<div class="p-4">
  <div>
    <label>
      Regex
      <input class="rounded border-black border-2 tracking-wide" bind:value={regexString} />
    </label>

    <label>
      Flags
      <input class="rounded border-black border-2 tracking-wide" bind:value={flagsString} />
    </label>
  </div>

  <div class="mt-2">
    {#if $appStore.regexError}
      Invalid regex!
    {:else}
      Generated regex: <b>{$appStore.regex}</b>
    {/if}
  </div>
</div>
