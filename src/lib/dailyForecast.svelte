<script lang="ts">
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import {_16point} from "$lib/helpers/_16point"


	export let conditions;
	export let wwo_data;
	let tides_data;
	let tide_string_array = [];
	let only_3_tides = false;
	
	export let days_ahead;
	export let time_zone_offset;
	let hours_ahead = 0;
	let isOpen = false;

	let am_swell: String;
	let pm_swell: String;
	let am_wind: String;
	let pm_wind: String;
	let am_weather: String;
	let pm_weather: String;
	let six_am_swell: String;
	let nine_am_swell: String;
	let twelve_pm_swell: String;
	let three_pm_swell: String;
	let six_pm_swell: String;
	let six_am_wind: String;
	let nine_am_wind: String;
	let twelve_pm_wind: String;
	let three_pm_wind: String;
	let six_pm_wind: String;
	let six_am_weather: String;
	let nine_am_weather: String;
	let twelve_pm_weather: String;
	let three_pm_weather: String;
	let six_pm_weather: String;
	
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

		for(let i = 0; i < 4; ++i){
			if(tides_data[i]){
				const tide = tides_data[i]
				tide_string_array[i] = `${tide.tide_type == "LOW" ? "Low" : "High"} Tide: ${(tide.tideHeight_mt * 3.281).toFixed(1)} ft, ${tide.tideTime}`;
			}
			else{
				only_3_tides = true;
			}	
		}

		am_swell = `${conditions[9 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[9 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[9 + hours_ahead + time_zone_offset].wave_direction)}`;
		am_wind = `${conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[9 + hours_ahead + time_zone_offset].wind_direction)}`;
		pm_swell = `${conditions[14 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[14 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[14 + hours_ahead + time_zone_offset].wave_direction)}`;
		pm_wind = `${conditions[14 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[14 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[14 + hours_ahead + time_zone_offset].wind_direction)}`;

		six_am_swell = `${conditions[6 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[6 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[6 + hours_ahead + time_zone_offset].wave_direction)}`;
		nine_am_swell = `${conditions[9 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[9 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[9 + hours_ahead + time_zone_offset].wave_direction)}`;
		twelve_pm_swell = `${conditions[12 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[12 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[12 + hours_ahead + time_zone_offset].wave_direction)}`;
		three_pm_swell = `${conditions[15 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[15 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[15 + hours_ahead + time_zone_offset].wave_direction)}`;
		six_pm_swell = `${conditions[18 + hours_ahead + time_zone_offset].wave_height} ft. @ ${conditions[18 + hours_ahead + time_zone_offset].wave_period}s ${_16point(conditions[18 + hours_ahead + time_zone_offset].wave_direction)}`;

		six_am_wind = `${conditions[6 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[6 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[6 + hours_ahead + time_zone_offset].wind_direction)}`;
		nine_am_wind = `${conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[9 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[9 + hours_ahead + time_zone_offset].wind_direction)}`;
		twelve_pm_wind = `${conditions[12 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[12 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[12 + hours_ahead + time_zone_offset].wind_direction)}`;
		three_pm_wind = `${conditions[15 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[15 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[15 + hours_ahead + time_zone_offset].wind_direction)}`;
		six_pm_wind = `${conditions[18 + hours_ahead + time_zone_offset].wind_speed.toFixed(0)}${+conditions[18 + hours_ahead + time_zone_offset].wind_speed.toFixed(0) == 1 ? "kt" : "kts"} ${_16point(conditions[18 + hours_ahead + time_zone_offset].wind_direction)}`;
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
					<td>{am_swell}</td>
					<td>{am_wind}</td>
					<td>74 Degrees<br>Sunny</td>
				</tr>
				<tr>	
					<td>PM</td>
					<td>{pm_swell}</td>
					<td>{pm_wind}</td>
					<td>74 Degrees<br>Sunny</td>
				</tr>
			</table>
			
		</div>
		
		<div class="tides-container">
			<div class="tides-header">Tides</div>
			{#each tide_string_array as tide}
				<div class="tide">{tide}</div>	
			{/each}
			{#if only_3_tides}
				<div class="tide"><br></div>
			{/if}
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
					<td>{six_am_swell}</td>
					<td>{six_am_wind}</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>9:00 AM</td>
					<td>{nine_am_swell}</td>
					<td>{nine_am_wind}</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>12:00 PM</td>
					<td>{twelve_pm_swell}</td>
					<td>{twelve_pm_wind}</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>3:00 PM</td>
					<td>{three_pm_swell}</td>
					<td>{three_pm_wind}</td>
					<td>74 Degrees, Sunny</td>
				</tr>
				<tr>	
					<td>6:00 PM</td>
					<td>{six_pm_swell}</td>
					<td>{six_pm_wind}</td>
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
		font-size: 1em;
		font-family: Verdana;
		font-weight: normal;
	}

	.table {
		background-color: #2b2b2b;
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
		font-family: Georgia;
	}

	td {
		padding: 0.2em 0.3em;
	}


	.expand-button {
		margin: 1em auto;
		padding: 0.5em;
		background-color: #6e38cc;
        color: rgb(240, 234, 234);
		font-family: verdana;
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

	.tide {
		line-height: 1.3em;
	}

	.tides-header {
		padding: 0 0 0.5em 0;
		font-size: 1.2em;
		font-weight: bold;
	}
	
</style>