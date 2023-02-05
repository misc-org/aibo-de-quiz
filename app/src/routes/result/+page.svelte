<script lang="ts">
  import { isLoading } from '$lib/model/store';
  import { onMount } from 'svelte';

  onMount(() => ($isLoading = false));
</script>

<style lang="scss">
</style>
