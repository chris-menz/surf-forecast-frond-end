<script>
	import { onMount } from 'svelte'
	
	export let wwo_data;
	let curr_tide_data;
	$: curr_tide_data = wwo_data[0].tides[0];
	let tide_string_array = [];

	onMount(() => {
		for(let i = 0; i < curr_tide_data.tide_data.length; ++i){
			const tide = curr_tide_data.tide_data[i]
			tide_string_array[i] = `${tide.tide_type == "LOW" ? "Low" : "High"} Tide: ${(tide.tideHeight_mt * 3.281).toFixed(2)} ft, ${tide.tideTime}`;
		}
	})

	
</script>

<main>
    <div class="header">Tides</div>
	<div class="tides">
		{#each tide_string_array as tide}
			<div class="tide">{tide}</div>
		{/each}
	</div>
	
</main>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.header {
		font-size: 2em;
	}

	.tides {
		font-size: 1em;
		padding: 0.2em;
	}

	.tide {
		padding: 0.1em;
	}
</style>