<script>
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import {_16point} from "$lib/helpers/_16point"


	export let conditions;
	export let wwo_data;
	let tides_data;
	let tide_string_array = [];
	
	export let days_ahead;
	export let time_zone_offset;
	let hours_ahead = 0;
	let isOpen = false;
	
	const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const toggle = () => isOpen = !isOpen

	const d = new Date();
	let day = weekday[d.getUTCDay()];

	let index = 0;

	onMount(() => {
		
		for(let i = 0; i < 7; ++i){
			if(day == weekday[i]) {index = i;} 
		}
		
		index += +days_ahead;
		
		if(index > 6){index -= 7;}

		hours_ahead = days_ahead * 24;

		tides_data = wwo_data[days_ahead].tides[0].tide_data;

		for(let i = 0; i < tides_data.length; ++i){
			const tide = tides_data[i]
			tide_string_array[i] = `${tide.tide_type == "LOW" ? "Low" : "High"} Tide: ${(tide.tideHeight_mt * 3.281).toFixed(1)} ft, ${tide.tideTime}`;
		}
	})
	

</script>
<main>
	
	<div class="small-table table">
		<div class="date">
			{weekday[index]}
		</div>
		
		<div class="forecast-data">
			<table>
				<tr>
					<th></th>
					<th>Swell</th>
					<th>Wind</th>
					<th>Weather</th>
				</tr>
				<tr>	
					<td>AM</td>
					<td>{conditions[9 + hours_ahead + time_zone_offset].wave_height} ft. @ {conditions[9 + hours_ahead + time_zone_offset].wave_period}s<br>{_16point(conditions[9 + hours_ahead + time_zone_offset].wave_direction)}</td>
					<td>{conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}{+conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"}<br>{_16point(conditions[9 + hours_ahead + time_zone_offset].wind_direction)}</td>
					<td>74 Degrees<br>Sunny</td>
				</tr>
				<tr>	
					<td>PM</td>
					<td>{conditions[13 + hours_ahead + time_zone_offset].wave_height} ft. @ {conditions[13 + hours_ahead + time_zone_offset].wave_period}s<br>{_16point(conditions[13 + hours_ahead + time_zone_offset].wave_direction)}</td>
					<td>{conditions[13 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}{+conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"}<br>{_16point(conditions[13 + hours_ahead + time_zone_offset].wind_direction)}</td>
					<td>74 Degrees<br>Sunny</td>
				</tr>
			</table>
			
		</div>
		
		<div class="tides-container">
			<div class="tides-header">Tides</div>
			{#each tide_string_array as tide}
				<div class="tide">{tide}</div>
			{/each}
		</div>
		
		<button class="expand-button" on:click={toggle} aria-expanded={isOpen}>
			More Details
		</button>
		
	</div>
	{#if isOpen}
		
		<div class="expanded-table table">
			
			<table transition:slide>
				<tr>
					<th></th>
					<th>Swell</th>
					<th>Wind</th>
					<th>Weather</th>
				</tr>
				<tr>	
					<td>6:00 AM</td>
					<td>3 ft. @ 13s WNW</td>
					<td>12 kts ENE</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>9:00 AM</td>
					<td>3 ft. @ 13s WNW</td>
					<td>12 kts ENE</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>12:00 PM</td>
					<td>3 ft. @ 13s WNW</td>
					<td>12 kts ENE</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>3:00 PM</td>
					<td>3 ft. @ 13s WNW</td>
					<td>12 kts ENE</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>6:00 PM</td>
					<td>3 ft. @ 13s WNW</td>
					<td>12 kts ENE</td>
					<td>74 Degrees, Sunny</td>
				</tr>
			</table>
		</div>
	{/if}
	
</main>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		text-align: center;
	}

	th {
		font-size: 1.2em;
	}

	.table {
		background-color: #313131;
	}

	.small-table {
		width: 260px;
	}
	
	.small-table table{
		border-top: 2px solid grey;
	}

	.forecast-data {
		display: flex;
		flex-direction: row;
	}

	table {
		margin: auto;
		padding: 0.5em;
	}

	.date {
		padding: 0.5em 0;
		font-size: 1.5em;
	}

	td {
		padding: 0.2em 0.4em;
	}

	.expand-button {
		margin: 1em auto;
		padding: 0.5em;
		background-color: rgb(100, 0, 172);
        color: white;
		width: 60%;
		text-align: center;
        font-size: 1em;
        border: none;
        border-radius: 5px;
		cursor: pointer;
	}

	.expand-button:hover {
		outline: 1.5px solid white;
	}

	.tides-container {
		background-color: #313131;
	}

	.tide {
		line-height: 1.3em;
	}

	.tides-header {
		padding: 0 0 0.5em 0;
		font-size: 1.2em;
		font-weight: bold;
	}
	
</style>