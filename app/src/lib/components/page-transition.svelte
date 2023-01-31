<script lang="ts">
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";
    import { Style } from "$lib/model/inline-style";
	import type { PageData } from "../../routes/$types";

    export let data: PageData;
    let animations = false;

    const xAxis = false;

    onMount(
        () =>
            (animations = !window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches),
    );
</script>

<div style={new Style({ overflowY: "hidden" }).toString()}>
    {#key data}
        {#if animations}
            {#if xAxis}
                <div
                    in:fly={{ x: -5, duration: 250, delay: 300 }}
                    out:fly={{ x: 5, duration: 250 }}
                >
                    <slot />
                </div>
            {:else}
                <div
                    in:fly={{ y: -5, duration: 250, delay: 300 }}
                    out:fly={{ y: 5, duration: 250 }}
                >
                    <slot />
                </div>
            {/if}
        {:else}
            <slot />
        {/if}
    {/key}
</div>
