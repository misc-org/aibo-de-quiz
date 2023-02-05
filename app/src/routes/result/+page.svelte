<script lang="ts">
  import { isLoading } from '$lib/model/store';
  import { onMount } from 'svelte';

  onMount(() => ($isLoading = false));
</script>

<main class="main">
  <h5>この画面で実装すること</h5>
  <div class="what-to-implement">
    <ol>
      <li>連携が済んでいなかったら <code>/user</code> へ飛ばす</li>
      <li><code>quizResult</code> が空だったら (直接飛んだ) トップページへ戻す</li>
      <li><code>quizResult</code> で何を答えたかと, 正解率などを表示する</li>
      <li>スコアを算出する</li>
      <li>スコアをバックエンドへ送る</li>
      <li>スコアに応じて, aibo に振る舞いをさせる</li>
    </ol>
  </div>
</main>

<style lang="scss">
  @use '../common.scss';
</style>
