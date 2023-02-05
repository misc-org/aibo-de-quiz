<script lang="ts">
  import { isLoading } from '$lib/model/store';
  import { onMount } from 'svelte';

  onMount(() => ($isLoading = false));
</script>

<main class="main">
  <h5>この画面で実装すること</h5>
  <div class="what-to-implement">
    <ol>
      <li>現在, aibo が連携されているかを表示する</li>
      <li>
        もし, 連携していない場合, “連携する” ボタンを作り, <br />
        そのボタンを押したら, Auth Request をするように作る
      </li>
      <li>
        もし, My Sony ID からのコールバックだった場合, バックエンドへ <br />
        Tokens Request を行い, 非同期で返ってきた <code>DeviceInfo[]</code> をlocalStorageに保存する
      </li>
      <li>複数飼っているときのために, セレクターを置く</li>
      <li>現在のスコアを表示する</li>
    </ol>
  </div>
</main>

<style lang="scss">
  @use '../common.scss';
</style>
