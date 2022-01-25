<svelte:head>surf report wave conditions swell wind surf session log</svelte:head>

<script lang="ts">
    import Nav from "$lib/nav.svelte";
    import axios from "axios"
	import { breaks, regions }  from "$lib/helpers/breaks.js"
	import { conditionsParser } from "$lib/helpers/conditionsParser.js"
	import DailyForecast from "$lib/dailyForecast.svelte"
	import Swell from "$lib/swell.svelte"
	import Tide from "$lib/tide.svelte"
	import Wind from "$lib/wind.svelte"
	import Water from "$lib/water.svelte"
	import Waves from "$lib/waves.svelte"
	import Weather from "$lib/weather.svelte"
	import Menu from "$lib/menu.svelte";
	import { fly, crossfade, fade, slide } from "svelte/transition";
	
	const endpoint = import.meta.env.VITE_HEROKUAPI + '/api'

	// api responses
	let conditions: Object[];
	let weather: Object;
    let wwo_data: Object[];

	// state vars
	let is_searching = false;
	let has_searched = false;
	let has_selected_region = false;
	let displayErrorMustSelect = false;

	// hour takes on current hour of day, and is passed into conditions array to get live conditions at the current hour
	let hour: number;
	let time_zone_offset: number;

	type SurfSpot = {
        break_name: String;
        location: String;
        region: String;
        lat: String;
        lng: String;
    }
    
    let surf_break_object: SurfSpot;

    let region: String;
    let surf_break_name: String;
	let surf_break_names: String[];

	async function handleBreakChange() {
		has_searched = false;
		is_searching = true;
		surf_break_object = breaks.filter((br) => surf_break_name == br.break_name && region == br.region)[0];
		
		const lat = surf_break_object.lat;
		const lng = surf_break_object.lng;
		const latlngString = `?lat=${lat}&lng=${lng}`;

		const conditions_response = await axios.get(`${endpoint}/conditions${latlngString}`);
		conditions = conditionsParser(conditions_response);
		
		const weather_response = await axios.get(`${endpoint}/weather${latlngString}`);
		weather = weather_response.data;

		const tides_response = await axios.get(`${endpoint}/tides${latlngString}`);
		wwo_data = tides_response.data.data.weather;

		time_zone_offset = +lng > -100 ? 5 : 8;
		
		const d = new Date();
		hour = d.getUTCHours();
		has_searched = true;
		is_searching = false;
		
		has_selected_region = true;
		surf_break_names = breaks.filter(surfBreak => surfBreak.region == region).map(surfBreak => surfBreak.break_name).sort();
	}
</script>

<main>
    <Nav />
    {#if !has_searched && !is_searching}
		<div class="menu-container" in:fly="{{ duration: 200 }}">
			<Menu on:breakChange={e => {region = e.detail.region; surf_break_name = e.detail.surf_break; handleBreakChange()}}/>
		</div>
	{/if}

	{#if is_searching}
		<div class="loading" >Loading Surf Data...</div>
	{/if}

	{#if has_searched}
		<div class="conditions-container" in:fly="{{ duration: 250 }}">

			<div class="conditions-header">
				<div class="break-name">
					{surf_break_object.break_name}
				</div>
				<div class="break-location">
					{surf_break_object.location}
				</div>
				<div class="header-menu">

                    <select class="region-select-header" bind:value={region} on:change={() => {surf_break_names = breaks.filter(surfBreak => surfBreak.region == region).map(surfBreak => surfBreak.break_name).sort(); has_selected_region = true; surf_break_name = undefined}}>
						<option value="" disabled selected>Select Region</option>
						{#each regions as region_option}
							<option value="{region_option}">{region_option}</option>
						{/each}
					</select>
					
                    <select class="break-select-header" bind:value={surf_break_name}>
						<option value="" disabled selected>Select a Break</option>
						{#if has_selected_region}
							{#each surf_break_names as break_option}
								<option value="{break_option}">{break_option}</option>
							{/each}
						{/if}
					</select>

					<button type="button" class="search-button" on:click={() => {
						if(surf_break_name && region) {
							handleBreakChange();
							displayErrorMustSelect = false;
						}
						else{
							displayErrorMustSelect = true
						}     
					}}>
						Get Conditions
					</button>
			
					{#if displayErrorMustSelect}
						<div class="error">Must select break to search</div>
					{/if}
				</div>
			</div>
	
			<div class="live-conditions-container">
				<div class="live-conditions-header">Live Conditions</div>
					{#if !is_searching}
						<div class="live-conditions">
							<div class="grid-item swell">
								<Swell {conditions} {hour}/>
							</div>
							<div class="grid-item wind">
								<Wind {weather}/>
							</div>
							<div class="grid-item tide">
								<Tide {wwo_data} />
							</div>
							<div class="grid-item wave-height">
								<Waves {conditions} {hour}/>
							</div>
							<div class="grid-item weather">
								<Weather {weather} />
							</div>
							<div class="grid-item water-temp">
								<Water {wwo_data} {hour} {time_zone_offset}/>
							</div>
						</div>
					{/if}
			</div>

			<div class="forecast">
				<div class="forecast-header">Forecast</div>
					{#if !is_searching}
						<div class="forecast-comps-container">
							<DailyForecast days_ahead=0 {conditions} {time_zone_offset} {wwo_data}/>
							<span class="divider"></span>
							<DailyForecast days_ahead=1 {conditions} {time_zone_offset} {wwo_data}/>
							<span class="divider"></span>
							<DailyForecast days_ahead=2 {conditions} {time_zone_offset} {wwo_data}/>
							<span class="divider"></span>
							<DailyForecast days_ahead=3 {conditions} {time_zone_offset} {wwo_data}/>
							<span class="divider"></span>
							<DailyForecast days_ahead=4 {conditions} {time_zone_offset} {wwo_data}/>
							<span class="divider"></span>
							<DailyForecast days_ahead=5 {conditions} {time_zone_offset} {wwo_data}/>
							<span class="divider"></span>
							<DailyForecast days_ahead=6 {conditions} {time_zone_offset} {wwo_data}/>
						</div>
					{/if}
				</div>

		</div>
	{/if}
</main>

<style>
	
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
        background-color: #161616;
        transition: background-color 0.3s
    }


	/* conditions styles */

    .conditions-container {
		margin-top: 4em;
		margin-left: 1em;
        position: relative;
		color: #f0f0f0;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}
	
	.live-conditions {
		background-color: #2b2b2b;
		display: grid;
		grid-template-columns: repeat(3, 14em);
		grid-template-rows: repeat(2, 11em);
	}

	.grid-item {
		text-align: center;
		padding: 1rem;
	}

	/* header styles */
	
	.conditions-header {
		min-width: 250px;
		max-width: 300px;
		margin-right: 1em;
		position: relative;
		background-color: #2b2b2b;
		margin-bottom: 15px;
	}

	.break-name {
		font-size: 3em;
		font-family: Georgia;
		padding: 0.5rem 1rem;
		font-family: Montserrat;
	}

	.break-location {
		font-size: 1.5em;
		padding: 0rem 1rem 0.5rem 1rem;
	}

	.header-menu {
		position: relative;
		display: flex;
		width: 80%;
		margin: auto;
		padding-bottom: 1em;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.region-select-header, .break-select-header {
        background-color: #111111;
        color: rgb(240, 234, 234);
        width: 100%;
        padding: 6px;
        font-size: 1.5em;
        text-align: center;
		margin-top: 0.5em;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition-duration: 300ms;
    }

	.break-select-header {
		margin-bottom: 1em;
	}

	.search-button {
        background-color: #6e38cc;
        color: rgb(240, 234, 234);
        padding: 0.5em;
        min-height: 5vh;
        width: 75%;
        text-align: center;
        font-size: 1.5em;
		font-family: verdana;
        border: none;
        border-radius: 5px;
        margin: 0 0 0.5em 0;
        cursor: pointer;
		transition-duration: 300ms;
    }

	.search-button:hover, .region-select-header:hover, .break-select-header:hover {
        outline: 1.5px solid white;
    }

	.error {
        color: white;
    }

	select:defined {
        border: none;
        outline: none;
    }

	/* forecast styles */
	
	.forecast {
        position: relative;
		margin: 0 1em;
    }

	.forecast-header, .live-conditions-header {
		font-size: 2.5em;
		font-family: Georgia;
		text-align: center;
		background-color: #2b2b2b;
		padding: 0.5em;
		margin-bottom: 0.4em;
	}

	.forecast-comps-container {
		display: flex;
		flex-direction: row;
		max-width: 23vw;
		overflow-y: scroll;
	}

	.divider {
		border-left: 2px solid grey;
		height: 399px;
	}

	.loading {
		font-size: 2em;
		color: white;
		text-align: center;
		margin: 8em auto;
	}

	@media (max-width: 500px) {
		.conditions-container {
			max-width: 90vw;
			margin: 3em auto 0 auto;
			flex-direction: column;
		}


		.live-conditions {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, 11em);
			margin-bottom: 1em;
		}

		.conditions-header {
			width: 90vw;
			margin: auto;
			padding-top: 0.5em;
			margin-bottom: 1em;
		}
		
		.break-name {
			text-align: center;
		}

		.break-location {
			text-align: center;
		}

		
		.header-menu {
			position: relative;
			justify-content: center;
			align-items: center;
			margin: auto;
			width: 70%;
			top: 0;
			right: 0;
			padding-bottom: 1em;
		}



		.forecast {
			margin: auto;
		}

		.forecast-comps-container {
			margin: auto;
			max-width: 90vw;
			margin-bottom: 1em;
		}
	}

	@media (max-width: 1280px) {
		.live-conditions {
			grid-template-columns: repeat(3, 12em);
			grid-template-rows: repeat(2, 13em);
		}
	}

	@media (max-width: 1150px) {
		.live-conditions {
			grid-template-columns: repeat(3, 11em);
			grid-template-rows: repeat(2, 13em);
		}
	}


	@media (max-width: 1040px) {
		.live-conditions {
			grid-template-columns: repeat(3, 9em);
			grid-template-rows: repeat(2, 13em);
		}
	}

	@media (max-width: 978px) {
		.live-conditions {
			grid-template-columns: repeat(2, 10em);
			grid-template-rows: repeat(3, 13em);
		}
	}

	@media (max-width: 800px) {

		.conditions-container {
			max-width: 90vw;
			margin: 3em auto 0 auto;
			flex-direction: column;
		}


		.break-name {
			text-align: center;
		}

		.break-location {
			text-align: center;
		}
		.live-conditions {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(2, 13em);
			margin-bottom: 1em;
			width: 90vw;
			margin: 0;
		}

		.conditions-container {
			flex-direction: column;
		}

		.forecast {
			margin: 1em 0;
		}


		.forecast-comps-container {
			max-width: 90vw;
			margin-bottom: 1em;
		}

		.conditions-header {
			width: 90vw;
			margin: auto;
			padding-top: 0.5em;
			margin-bottom: 1em;
		}
		
	}

	@media (max-width: 450px) {
		.live-conditions {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, 1fr);
		}
	}
</style>