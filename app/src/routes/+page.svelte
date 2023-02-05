<script lang="ts">
  import { FailedCatchHandler } from '$lib/model/error/handler';
  import { KitchenController } from '$lib/model/kitchen';
  import { actionAPIs } from '$lib/model/service/api';
  import { AiboActionAPI } from '$lib/model/service/helper/action';
  import { isLoading } from '$lib/model/store';
  import Button, { Label } from '@smui/button';
  import { onMount } from 'svelte';

  onMount(() => ($isLoading = false));

  async function onButtonClicked(pre: any) {
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

<main>
  <h5>この画面で実装すること</h5>
  <ol>
    <li>“aiboでクイズ”というタイトルをつける</li>
    <li>クリックすると <code>/quiz</code> へ飛ぶ “スタート” ボタンを置いて, デザインする</li>
    <li>クリックすると <code>/user</code> へ飛ぶ “アカウント” ボタンを置いて, デザインする</li>
  </ol>

  <Button on:click={onButtonClicked} variant="raised">
    <Label>テストボタン</Label>
  </Button>
</main>

<style lang="scss">
  main {
    padding: 0 100px;
    max-width: 1400px;
    margin: 0 auto;

    @media screen and (max-width: 860px) {
      padding: 0 20px;
    }
  }

  .title {
    padding: 20px;
    span {
      font-size: 30px;
    }
  }
</style>
