<script lang="ts">
  import { KitchenController } from '$lib/model/kitchen';
  import { isLoading } from '$lib/model/store';
  import Button, { Label } from '@smui/button';
  import { onMount } from 'svelte';

  onMount(() => ($isLoading = false));

  async function onButtonClicked() {
    new KitchenController().push({
      label: 'わあ  クリックされたのだ',
      dismissButton: false,
      onDismiss: () => null,
      onClosed: () => null,
      props: {
        timeoutMs: 4000
      }
    });
  }
</script>

<div class="wide_title">
  <div class="title">
    aibo <span>で</span> クイズ
  </div>
</div>

<main class="main">
  <h5>この画面で実装すること</h5>
  <div class="what-to-implement">
    <ol>
      <li>“aiboでクイズ”というタイトルをつける</li>
      <li>クリックすると <code>/quiz</code> へ飛ぶ “スタート” ボタンを置いて, 装飾する</li>
      <li>クリックすると <code>/user</code> へ飛ぶ “アカウント” ボタンを置いて, 装飾する</li>
    </ol>
  </div>
  <br />
  <br />

  <Button on:click={onButtonClicked} variant="raised">
    <Label>テストボタン</Label>
  </Button>
</main>

<style lang="scss">
  @use './common.scss';
  .title {
    padding: 20px;
    span {
      font-size: 30px;
    }
  }
</style>
