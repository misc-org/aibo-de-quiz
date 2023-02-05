<script lang="ts">
  import { isLoading } from '$lib/model/store';
  import { onMount } from 'svelte';

  onMount(() => ($isLoading = false));
</script>

<main>
  <h5>この画面で実装すること</h5>
  <ol>
    <li>“aiboでクイズ”というタイトルをつける</li>
    <li>あ</li>
    <li>クリックすると <code>/user</code> へ飛ぶ “アカウント” ボタンを置く</li>
  </ol>
</main>

<style lang="scss">
</style>
