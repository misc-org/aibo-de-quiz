<script lang="ts">
	import type TopAppBarComponentDev from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton, { Icon } from '@smui/icon-button';
	import { AppContent } from '@smui/drawer';
	import { currentPath, isLandscape, isLoading } from '$lib/model/store';
	import { onMount } from 'svelte';
	import PageTransition from '$lib/components/page-transition.svelte';
	import LinearProgress from '@smui/linear-progress';
	import Splash from '$lib/components/splash.svelte';
	import { isLandscapeDetect, PathId, runTransition } from '$lib/model/constants';
	import type { PageData } from './$types';
	import Button, { Label } from '@smui/button';
	import BackToTop from '$lib/components/back-to-top.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let topAppBar: TopAppBarComponentDev;
	let hasAppMounted = false;

	onMount(async () => {
		currentPath.set(new URL(location.href).pathname);
		hasAppMounted = true;
		updateSize();

		// callback windows width event
		window.addEventListener('resize', updateSize);
	});

	function updateSize(): void {
		$isLandscape = isLandscapeDetect();
		let path = new URL(location.href).pathname;
		if (path === '/') return;
	}
</script>

<div style={`cursor: ${$isLoading ? 'progress' : 'normal'};`}>
	{#if hasAppMounted}
		<TopAppBar bind:this={topAppBar} variant="fixed">
			<Row>
				<Section>
					<IconButton class="material-icons-outlined" on:click={() => runTransition(PathId.HOME)}>
						collections_bookmark
					</IconButton>
					<Title style="cursor: pointer;" on:click={() => runTransition(PathId.HOME)}
						><strong>tpl-svelte</strong></Title
					>
				</Section>
				<Section align="end" toolbar>
					<Button on:click={() => goto('https://github.com/wappon-28-dev/tpl-svelte')}>
						<Icon class="material-icons">launch</Icon>
						<Label>source</Label>
					</Button>
				</Section>
			</Row>

			<div class="progress-mobile">
				{#if $isLoading}
					<LinearProgress class="progress-bar-mobile" indeterminate />
				{/if}
			</div>
		</TopAppBar>

		<AutoAdjust {topAppBar}>
			<AppContent class="app-content">
				<PageTransition {data}>
					<slot />
				</PageTransition>
			</AppContent>
		</AutoAdjust>
	{:else}
		<Splash />
	{/if}

	<BackToTop />
</div>

<style lang="scss">
	:global(.app-content) {
		overflow-y: visible;
		height: 100%;
		width: 100%;
	}

	:global(
			.mdc-circular-progress__determinate-circle,
			.mdc-circular-progress__indeterminate-circle-graphic
		) {
		stroke: var(--m3-on-primary);
	}
	:global(.app-content) {
		overflow-y: visible;
		overflow-x: hidden;
	}
	.progress-mobile {
		margin-top: -5.5px;
		min-height: 4px;
	}
</style>
