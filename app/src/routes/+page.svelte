<script lang="ts">
	import Card from './card.svelte';
</script>

<div class="wide_title">
	<p>A svelte project template with<br />sveltekit & Svelte Material UI</p>
</div>

<main>
	<Card />
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
</style>
