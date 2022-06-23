<script lang="ts">
  import appStore from "../stores/appStore";

  let regexString = "/test string/gi";

  $: {
    appStore.handleRegexChange(regexString);
  }
</script>

<textarea
  class="h-full w-full p-4 resize-none tracking-wide"
  class:text-red-600={$appStore.regexError}
  bind:value={regexString}
/>
