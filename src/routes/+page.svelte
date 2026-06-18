<script lang="ts">
  import axios from "axios";

  let url = "";
  let tags: string = "";
  let loading = false;
  let showToast = false;

  async function handleGenerate() {
    loading = true;
    try {
      const response = await axios.post("/api/scrape", { url });
      tags = await response.data.tags;

      if (tags?.length > 0) {
        navigator.clipboard.writeText(tags);
        showToast = true;
        setTimeout(() => {
          showToast = false;
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    loading = false;
  }
</script>

<title>Rule34 Tagger</title>
<main class="max-w-screen-lg mx-auto px-4 py-8">
  <form
    class="my-4 flex gap-2"
    on:submit={(e) => {
      e.preventDefault();
      handleGenerate();
    }}
  >
    <input
      type="text"
      bind:value={url}
      placeholder="Enter Rule34 post URL"
      class="flex-grow input"
    />
    <button
      type="submit"
      on:click={handleGenerate}
      disabled={loading}
      class="btn btn-accent"
    >
      {loading ? "Loading..." : "Generate"}
    </button>
  </form>

  <div>
    <div>
      <!-- Image preview will go here -->
    </div>
    <textarea
      bind:value={tags}
      readonly
      placeholder="Tags will appear here..."
      class="w-full textarea textarea-success"
      rows="5"
    ></textarea>
  </div>

  {#if showToast}
    <div class="toast">
      <div class="alert alert-success">
        <span>Copied!</span>
      </div>
    </div>
  {/if}
</main>
