<script>
import { onMount } from "svelte";


	export let wwo_data;
	export let hour;
	export let time_zone_offset;
	let water_temp;

	onMount(() => {
		hour = hour - time_zone_offset;
		if(hour < 0){hour += 24};
		let wwo_time = (hour < 5) ? "600" : (hour < 11) ? "900" : (hour < 14) ? "1200" : (hour < 17) ? "1500" : (hour < 21) ? "1800" : "2100"; 
		water_temp = wwo_data[0].hourly.filter(day => wwo_time = day.time)[0].waterTemp_F;
	})
</script>

<main>
	<div class="card">
		<div class="header">Water Temp.</div>
		<div class="temp">{water_temp}°f</div>
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

	.temp {
		font-size: 1.2em;
		padding: 0.2em;
	}
</style>