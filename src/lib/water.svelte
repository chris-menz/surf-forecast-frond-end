<script>
import { onMount } from "svelte";


	export let wwo_data;
	export let hour;
	export let time_zone_offset;
	let wwo_time;
	let local_hour;
	let water_temp;

	onMount(() => {
		local_hour = hour - time_zone_offset;
		if(local_hour < 0){local_hour += 24};
		wwo_time = (local_hour < 5) ? "600" : (local_hour < 11) ? "900" : (local_hour < 14) ? "1200" : (local_hour < 17) ? "1500" : (local_hour < 21) ? "1800" : "2100"; 
		water_temp = wwo_data[0].hourly.filter(day => wwo_time == day.time)[0].waterTemp_F;
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