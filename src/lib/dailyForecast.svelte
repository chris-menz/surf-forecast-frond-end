<script>
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import {_16point} from "$lib/helpers/_16point"
import Tide from "./tide.svelte";

	export let conditions;
	export let wwo_data;
	let tides_data;
	
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

		for(let i = 0; i < 7; ++i) {
			const tide_date = new Date(wwo_data[i].date);
			if(tide_date.getDay() == 0) {
				tides_data = wwo_data[6].tides[0].tide_data;
			}
			
			if(tide_date.getDay() == index - 1){
				tides_data = wwo_data[i].tides[0].tide_data;
			}
		}

		console.log(tides_data)
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
					<td>{conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}kts<br>{_16point(conditions[9 + hours_ahead + time_zone_offset].wind_direction)}</td>
					<td>74 Degrees<br>Sunny</td>
				</tr>
				<tr>	
					<td>PM</td>
					<td>{conditions[13 + hours_ahead + time_zone_offset].wave_height} ft. @ {conditions[13 + hours_ahead + time_zone_offset].wave_period}s<br>{_16point(conditions[13 + hours_ahead + time_zone_offset].wave_direction)}</td>
					<td>{conditions[13 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}kts<br>{_16point(conditions[13 + hours_ahead + time_zone_offset].wind_direction)}</td>
					<td>74 Degrees<br>Sunny</td>
				</tr>
			</table>
			
		</div>

		<button class="expand-button" on:click={toggle} aria-expanded={isOpen}>
			+
		</button>
	</div>
	{#if isOpen}
		<div class="tides">
				{tides_data}
		</div>
		
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



	.table {
		margin: 1em 0;
		background-color: #313131;
		padding: 0.5em;
	}

	.small-table {
		height: 232px;
		width: 260px;
	}
	
	.small-table table{
		border-top: 2px solid grey;
		/* border-bottom: 2px solid grey; */
	}

	.forecast-data {
		display: flex;
		flex-direction: row;
	}

	table {
		margin: auto;
		padding: 0.5em 0;
	}

	.date {
		padding-bottom: 0.5em;
		font-size: 1.5em;
	}

	td {
		padding: 0.5em;
	}

	.expand-button {
		margin: 1em 0;
		padding: 0.5em;
	}

	.tides {
		background-color: #313131;
		margin-top: 4em;
	}
	
</style>