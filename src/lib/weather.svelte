<script>
import { onMount } from "svelte";


	export let weather;
	onMount(() => {
		console.log(weather)
	})
</script>

<main>
    <div class="card">
		<div class="header">Weather</div>
		<!-- <div class="weather"></div> -->
		<div class="temp">{weather.main.temp}°f</div>
	</div>
</main>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.card {
		max-width: 250px;
	}

	.header {
		font-size: 2em;
	}

	.temp, .weather {
		font-size: 1.2em;
		padding: 0.2em;
	}
</style>