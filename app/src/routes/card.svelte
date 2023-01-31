<script lang="ts">
	import { isLoading } from '$lib/model/store';
	import Card, { Content, PrimaryAction } from '@smui/card';
	import { onMount } from 'svelte';

	type CoffeeType = {
		title: string;
		description: string;
		ingredients: string[];
		image: string;
		id: number;
	};

	async function getCoffeeData() {
		const res = await fetch('https://api.sampleapis.com/coffee/hot');
		const coffees = (await res.json()) as CoffeeType[];

		$isLoading = false;

		if (res.ok) {
			return coffees;
		} else {
			throw new Error(await res.text());
		}
	}

	onMount(() => {
		if (!$isLoading) {
			$isLoading = false;
		}
	});
</script>

<body>
	{#await getCoffeeData()}
		<p class="loading">loading...</p>
	{:then coffees}
		<div class="card-container">
			{#each coffees as coffee, i}
				<Card>
					<div style="padding: 1rem;">
						<h2 class="mdc-typography--headline6" style="margin: 0;">{coffee.title}</h2>
						<h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;">
							{coffee.ingredients.join(', ')}
						</h3>
					</div>
					<PrimaryAction>
						<img src={coffee.image} alt={coffee.title} />
						<Content class="mdc-typography--body2">
							{coffee.description}
						</Content>
					</PrimaryAction>
				</Card>
			{/each}
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</body>

<style lang="scss">
	body {
		padding: 20px 0;
	}

	.loading {
		width: 100%;
		text-align: center;
		padding: 20px;
	}

	.card-container {
		display: grid;

		gap: 20px;

		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		@media screen and (max-width: 400px) {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		img {
			margin: 0 auto;
			height: 200px;
			width: 100%;
			object-fit: cover;
		}
	}
</style>
