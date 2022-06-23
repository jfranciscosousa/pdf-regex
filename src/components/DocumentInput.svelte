<script lang="ts">
  import appStore from "../stores/appStore";

  let url = "";

  let fileInput: HTMLInputElement;

  function handleSubmit() {
    fileInput.click();
  }

  function handleChange() {
    url = URL.createObjectURL(fileInput.files[0]);

    appStore.loadDocument(url);
  }
</script>

<div class="h-screen w-screen flex justify-center items-center">
  <button on:click={handleSubmit} class="rounded bg-slate-600 text-white p-2">
    Upload PDF
  </button>

  <input
    type="file"
    bind:this={fileInput}
    class="hidden"
    aria-label="Upload PDF"
    accept="application/pdf"
    on:change={handleChange}
  />
</div>
