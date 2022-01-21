<script lang="ts">
    import Nav from '$lib/nav.svelte';
    import { _16point } from '$lib/helpers/_16point.js';
    import { onMount } from 'svelte';
    import { breaks, regions } from '$lib/helpers/breaks';
    import axios from 'axios';

    const endpoint = "http://localhost:8000/api/surf-sessions";
    const historical_data_endpoint = "http://localhost:8000/api/historical-data";

    // prevents user from getting conditions without inputting all parameters
    let isDisabled = true;
    $: isDisabled = !(surf_break_selected && region && date && time);

    // when true, conditions will display and user will be able to add session
    let has_got_conditions = false;

    // array of surf sessions that user has saved over time
    let surf_sessions = [];
    
    // data for when and where session happened; used to fetch conditions for that time and location
    let surf_break_selected: String;
    let region: String;
    let date: Date;
    let time: String;

    // updates when getPastConditions is called to reflect conditions at specific time and location that user requested
    let conditions = {
        swell_height: 0,
        swell_period: 0,
        swell_direction: '',
        wind_speed: 0,
        wind_direction: '',
        tide_height: 0
    };

    // description of surf session will be inputted by user
    let description: String = '';

    // populates on Mount with last 7 dates
    let last7: Date[] = [];

    let time_options: String[] = ["5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];

    onMount(async () => {
        updateSurfSessions();
        last7 = last7Days();
    })

    function last7Days () {
        var result: Date[] = [];
        for (var i=0; i<7; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push(d)
        }
        return(result);
    }

    async function updateSurfSessions() {
        const sessions = await axios.get(endpoint);
        surf_sessions = sessions.data.reverse();
    }


    async function addSurfSession(){
        const surf_session = {
            date: date.toDateString(),
            time: time,
            surf_spot: surf_break_selected,
            spot_region: region,
            swell_height: conditions.swell_height,
            swell_period: conditions.swell_period,
            swell_direction: conditions.swell_direction,
            wind_speed: conditions.wind_speed,
            wind_direction: conditions.wind_direction,
            tide_height: conditions.tide_height,
            session_description: description
        }

        const response = await axios.post(endpoint, surf_session);
        updateSurfSessions();

        has_got_conditions = false;
        date = undefined;
        time = ''
        surf_break_selected = ''
        region = ''
        conditions.swell_height= 0
        conditions.swell_period = 0
        conditions.swell_direction = ''
        conditions.wind_speed = 0
        conditions.wind_direction = ''
        conditions.tide_height = 0
        description = ''
    }

    async function deleteSurfSession(sessionID) {
        const response = await axios.delete(endpoint + "/" + sessionID)
        updateSurfSessions();
    }

    async function getPastConditions(date: Date, time: String) {
        const hour = time == "5:00 AM" || time == "5:30 AM" || time == "6:00 AM" || time == "6:30 AM" || time == "7:00 AM" || time == "7:30 AM" ? "600" 
        : time == "8:00 AM" || time == "8:30 AM" || time == "9:00 AM" || time == "9:30 AM" || time == "10:00 AM" || time == "10:30 AM" ? "900"
        : time == "11:00 AM" || time == "11:30 AM" || time == "12:00 PM" || time == "12:30 PM" || time == "1:00 PM" || time == "1:30 PM" ? "1200"
        : time == "2:00 PM" || time == "2:30 PM" || time == "3:00 PM" || time == "3:30 PM" || time == "4:00 PM" || time == "4:30 PM" ? "1500"
        : time == "5:00 PM" || time == "5:30 PM" || time == "6:00 PM" || time == "6:30 PM" || time == "7:00 PM" || time == "7:30 PM" ? "1800"
        : "2100"

        // converts Date object into string that fits requirement of the API
        const parsedDateString = `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
        
        // gets surf break object that matches user inputted name and region
        const surf_break_object = breaks.filter((br) => surf_break_selected == br.break_name && region == br.region)[0];

        const apiString = `${historical_data_endpoint}?lat=${surf_break_object.lat}&lng=${surf_break_object.lng}&date=${parsedDateString}`;
        const response = await axios.get(apiString);
        const weather_response_array_of_dates = response.data.data.weather;
        
        // .date refers to date property in weather response array, NOT local date var
        const conditions_at_day_requested = weather_response_array_of_dates.filter(dates => parsedDateString == dates.date)[0];
        const hourly_conditions_array = conditions_at_day_requested.hourly;
        const conditions_at_time_requested = hourly_conditions_array.filter((option) => option.time == hour)[0];

        has_got_conditions = true; 

        conditions.swell_height = +conditions_at_time_requested.swellHeight_ft,
        conditions.swell_period = +conditions_at_time_requested.swellPeriod_secs,
        conditions.swell_direction = conditions_at_time_requested.swellDir16Point,
        conditions.wind_speed = +conditions_at_time_requested.windspeedMiles,
        conditions.wind_direction = conditions_at_time_requested.winddir16Point,
        conditions.tide_height = +(conditions_at_time_requested.sigHeight_m * 3.281).toFixed(1)      
    }

    // surf_break_names dynamically updates based on chosen region, then displayed in dropdown menu
    let has_selected_region = false;
    let surf_break_names = []

    function handleRegionChange(selected) {
        surf_break_names = breaks.filter(surfBreak => surfBreak.region == selected).map(surfBreak => surfBreak.break_name); 
        has_selected_region = true
    }
</script>

<main>
    <Nav />
    <div class="container">
        <div class="log-new-session-container">
            <div class="log-session-header header">Log a Session</div>
            <div class="new-session-form">
                <div class="menus-container">
                    <select class="date-select" bind:value={date}>
                        <option value="" disabled selected>Select Date</option>
                        {#each last7 as date_option}
                            <option value={date_option}>{date_option.toDateString()}</option>
                        {/each}
                    </select>
                    <select class="time-select" bind:value={time}>
                        <option value="" disabled selected>Select Time</option>
                        {#each time_options as time_option}
                            <option value={time_option}>{time_option}</option>
                        {/each}
                    </select>
                    <select class="region-select" bind:value={region} on:change={() => handleRegionChange(region)}>
                        <option value="" disabled selected>Select Region</option>
                        {#each regions as region}
                            <option value="{region}">{region}</option>
                        {/each}
                    </select>
                    <select class="break-select" bind:value={surf_break_selected}>
                        <option value="" disabled selected>Select Break</option>
                        {#if has_selected_region}
                            {#each surf_break_names as break_option}
                                <option value="{break_option}">{break_option}</option>
                            {/each}
                        {/if}
                    </select>
                    <button type="button" class="get-conditions-btn" disabled = {isDisabled} on:click={() => {getPastConditions(date, time)}}>
                        Get Conditions
                    </button>
                </div>
                {#if has_got_conditions}
                    <div class="session-info-container">
                        <div class="session-info">
                            Swell: {conditions.swell_height} ft. @ {conditions.swell_period}s, {conditions.swell_direction}
                        </div>
                        <div class="session-info">
                            Wind: {conditions.wind_speed}kts {conditions.wind_direction}
                        </div>
                        <div class="session-info">
                            Tide Height: {conditions.tide_height} ft.
                        </div>
                        <div class="session-info">
                            Session Description    
                        </div>
                        <div class="session-info">
                            <input type="text" class="description-input" bind:value={description}>
                        </div>
                        <div>
                            <button class="add-session-btn" on:click={() => addSurfSession()}>
                            Add Session
                            </button>
                        </div>
                    </div>   
                {/if}
                </div>
            </div>
        <div class="my-sessions-container">
            <div class="my-sessions-header header">My Sessions</div>
            <div class="sessions-container">
                {#each surf_sessions as surf_session}
                    <div>{surf_session.session_description}</div>
                    <div>{surf_session.date}</div>
                    <div>{surf_session.time}</div>
                    <div>{surf_session.swell_height}</div>
                    <div>{surf_session.wind_direction}</div>
                    <div>{surf_session.tide_height}</div>

                    <button on:click={() => deleteSurfSession(surf_session._id)}>Delete</button>
                {/each}
            </div>
        </div>
    </div>
    
</main>

<style>
	
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
        background-color: #1f1f1f;
        transition: background-color 0.3s
    }

    main {
        display: flex;
        flex-direction: row;
    }

    .header {
        background-color: #313131;
        color: #f0f0f0;;
        font-size: 3em;
        padding: 0.5em 1em;
        margin-bottom: 0.5em;
        text-align: center;
    }

    .container {
        margin: 6em auto;
        display: flex;
        flex-direction: row;
    }

    .log-new-session-container, .my-sessions-container {
        margin: 0 6em;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .new-session-form {
        width: 600px;
    }

    .menus-container {
        background-color: #313131;
        padding: 1em;
        display: flex;
        flex-direction: column;
    }

    .menus-container select {
        display: grid;
        grid-template-columns: (1fr, 2);
        grid-template-rows: (1fr, 2);
    }

    select {
        font-size: 1.3em;
        max-width: 40%;
        margin-bottom: 0.5em;
        background-color: #1b1b1b;
        border: none;
        color: white;
        padding: 0.3em;
        border-radius: 5px;
        cursor: pointer;
    }

    select:defined {
        outline: none;
    }

    .session-info-container {
        background-color: #313131;
        padding: 1em;
        margin-top: 1em;
        color: white;
    }

    .session-info {
        margin-bottom: 0.5em;
    }

    .description-input {
        width: 90%;
        height: 40px;
    }

    .get-conditions-btn, .add-session-btn {
        background-color: rgb(102, 84, 206);
        font-family: sans-serif;
        font-size: 1em;
        color: white;
        max-width: 35%;
        padding: 0.5em;
        border-radius: 5px;
        border: none;
        outline: none;
    }
</style>