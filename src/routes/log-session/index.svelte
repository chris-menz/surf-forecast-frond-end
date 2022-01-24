<script lang="ts">
    import Nav from '$lib/nav.svelte';
    import { _16point } from '$lib/helpers/_16point.js';
    import { onMount } from 'svelte';
    import { breaks, regions } from '$lib/helpers/breaks';
    import axios from 'axios'

    const endpoint = import.meta.env.VITE_API_URL + "/api/surf-sessions";
    const historical_data_endpoint = import.meta.env.VITE_API_URL + "/api/historical-data";

    // prevents user from getting conditions without inputting all parameters
    let isDisabled = true;
    $: isDisabled = !(surf_break_selected && region && date && time);

    let displayErrorBtnDisabled = false;

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
                    <div class="select-container">
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
                    
                        <button type="button" class="get-conditions-btn" on:click={() => {
                            if(isDisabled){
                                displayErrorBtnDisabled = true;
                                console.log(displayErrorBtnDisabled);
                            }
                            else {
                                getPastConditions(date, time);
                                displayErrorBtnDisabled = false;
                            }   
                        }}>
                            Get Conditions
                        </button>
                    
                        {#if displayErrorBtnDisabled}
                            <div class="btn-disabled-error">Must select all options to get conditions</div>
                        {/if}
                    </div>
                    
                    {#if has_got_conditions}
                        <div class="session-info-container">
                            <div class="session-info swell">
                                Swell: {conditions.swell_height} ft. @ {conditions.swell_period}s, {conditions.swell_direction}
                            </div>
                            <div class="session-info wind">
                                Wind: {conditions.wind_speed}kts {conditions.wind_direction}
                            </div>
                            <div class="session-info tide">
                                Tide Height: {conditions.tide_height} ft.
                            </div>
                            <div class="session-info description-input-wrapper">
                                <textarea type="text" class="description-input" placeholder="Add a description" cols="30" rows="10" bind:value={description}></textarea>
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
                    <div class="surf-session-container">
                        <div class="session-location">{surf_session.surf_spot}, {surf_session.spot_region}</div>
                        <div class="session-date">{surf_session.time}, {surf_session.date}</div>
                        <div>Swell: {surf_session.swell_height} ft. @ {surf_session.swell_period}s, {surf_session.swell_direction}</div>
                        <div>Wind: {surf_session.wind_speed} {surf_session.wind_speed == 1 ? "kt" : "kts"}, {surf_session.wind_direction}</div>
                        <div>Tide: {surf_session.tide_height} ft.</div>
                        <div class="session-description">{surf_session.session_description}</div>
                        <button on:click={() => deleteSurfSession(surf_session._id)} class="delete-btn">Delete</button>
                    </div>  
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
        background-color: #161616;
    }


    .header {
        background-color: #313131;
        font-size: 2.5em;
        font-family: Georgia;
        padding: 0.5em;
        margin: 0 0 0.5em 0;
        color: #f0f0f0;;
        text-align: center;
    }

    .container {
        margin: 6em 0 0 0;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .log-new-session-container, .my-sessions-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .select-container {
        background-color: #313131;
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        padding: 1em 0 1em 1em;
    }

    select {
        font-size: 1.3em;
        max-width: 90%;
        margin: 0 0 0.5em 0;
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

    button:hover, select:hover {
        outline: 1.5px solid white;
    }

    .session-info-container {
        background-color: #313131;
        padding: 0.5em 1em 1em 1em;
        margin-top: 1em;
        color: white;
    }

    .session-info {
        margin-bottom: 0.5em;
        font-size: 1.5em;
    }

    .description-input {
        width: 100%;
        padding: 0.4em;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 0.7em;
        resize: none;
    }

    .get-conditions-btn, .add-session-btn {
        background-color: #6e38cc;
        text-align: center;
        font-family: Verdana;
        font-size: 1em;
        color: black;
        max-width: 75%;
        padding: 0.5em;
        border-radius: 5px;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .btn-disabled-error {
        color: red;
        padding-top: 5px;
    }

    .sessions-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 1500px;
        overflow-x: scroll;
    }
    .surf-session-container {
        background-color: #313131;
        color: #f0f0f0;
        padding: 0.5em 1em;
        width: 30vw;
        line-height: 1.5em;
        margin-bottom: 1em;
    }

   .session-location, .session-date {
       font-family: Georgia;
       line-height: 1.3em;
       font-size: 1.3em;
   }

   .session-date {
       margin-bottom: 0.3em;
   }

   .session-description {
       margin: 0.5em 0;
       padding: 0.5em;
       background-color: #1b1b1b;
   }

    .delete-btn {
        background-color: #6e38cc;
        color: black;
        font-family: Verdana;
        margin: 0.4em 0;
        padding: 0.5em;
        border-radius: 5px;
        border: none;
        outline: none;
        cursor: pointer;
    }


    @media (max-width: 1000px) {
        .container {
            flex-direction: column;
            margin: 6em auto;
        }

        .my-sessions-container {
            margin-top: 1.5em;
        }
    }

    @media (max-width: 700px) {
        .header {
            max-width: 80vw;
        }
        
        .select-container {
            width: 80vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1em 0;
        }

        select {
            text-align: center;
            width: 65%;
        }

        .session-info {
            font-size: 1em;
        }

        .get-conditions-btn, .add-session-btn {
            font-size: 1em;
            max-width: 70%;
            padding: 0.5em;
        }


        .surf-session-container {
            width: 80vw;
        }
    }

</style>