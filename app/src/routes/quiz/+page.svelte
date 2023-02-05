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
      <li>問題に応じてaiboが振る舞いをするようにデータを書き換える</li>
      <li>このページの同じ階層の <code>quiz.ts</code> から問題文と回答群を 1 つずつ表示させる</li>
      <li>現在何問目かをユーザーへ伝える</li>
      <li>振る舞い中は次の問題へ遷移しないようにする</li>
      <li>結果を svelte の store を使って保存しておく (quizResult)</li>
      <li>問題を全て解き終えたら結果を表示するために <code>/result</code> へ遷移する</li>
    </ol>
  </div>
</main>

<style lang="scss">
  @use '../common.scss';
</style>
