<script lang="ts">
    import { breaks, regions } from '$lib/helpers/breaks';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();   

    let has_selected_region = false;
    let surf_break_names = []
    
    let region;
    let surf_break;

    let displayErrorMustSelect = false

    function handleRegionChange(selected) {
        surf_break_names = breaks.filter(surfBreak => surfBreak.region == selected).map(surfBreak => surfBreak.break_name).sort(); 
        has_selected_region = true
    }
</script>

<main>
    <div class="menu">
        <div class="header">
            Live Conditions<br>& 7-day Forecast
        </div>
        <select class="region-select" bind:value={region} on:change={() => handleRegionChange(region)}>
            <option value="" disabled selected>Select Region</option>
            {#each regions as region}
                <option value="{region}">{region}</option>
            {/each}
        </select>

        <select class="break-select" bind:value={surf_break}>
            <option value="" disabled selected>Select Surf Spot</option>
            {#if has_selected_region}
                {#each surf_break_names as break_option}
                    <option value="{break_option}">{break_option}</option>
                {/each}
            {/if}
        </select>

        <button type="button" on:click={() => {
            if(surf_break && region) {
                dispatch('breakChange', {surf_break, region});
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
</main>

<style>
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: sans-serif;
        margin: 0;
        padding: 0;
    }

    .menu {
        background-color: #2b2b2b;
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
		align-items: center;
        max-width: 30vw;
        min-height: 25vh;
	}

    .header {
        color: rgb(240, 234, 234);
        font-size: 2.5em;
        font-family: Georgia;
        text-align: center;
        padding-bottom: 0.5em;
        margin: 0;
    }
    
    .region-select, .break-select {
        background-color: #111111;
        font-family: Verdana, sans-serif;
        color: rgb(240, 234, 234);
        border: none;
        border-radius: 5px;
        width: 80%;
        text-align: center;
        margin-bottom: 0.5em;
        padding: 0.5em 1.2em;
        font-size: 1.5em;
        cursor: pointer;
        transition-duration: 300ms;
    }

    button {
        /* background-color: #6e38cc; */
        background-image: linear-gradient(to right bottom, #6a37c2, #49329e);
        color: rgb(240, 234, 234);
        padding: 0.5em 1em;
        min-height: 5vh;
        width: 70%;
        text-align: center;
        font-size: 1.5em;
        font-family: Verdana, sans-serif;
        border: none;
        border-radius: 5px;
        margin: 0.5em 0 0.5em 0;
        cursor: pointer;
        transition-duration: 300ms;
    }

    button:hover, .region-select:hover, .break-select:hover {
        outline: 1.5px solid white;
    }

    select:defined {
        border: none;
        outline: none;
    }

    .error {
        color: white;
    }
    
    @media (max-width: 1252px) {
        
        /* .menu {
            padding: 1.5em;
        } */

        .break-select, .region-select {
            font-size: 1.3em;
            width: 85%;
        }

        button {
            font-size: 1.3em;
        }
    }
    
    @media (max-width: 1100px) {
        .menu {
            max-width: 35vw;
            min-height: 22vh;
            padding: 1em;
        }

        .header {
            font-size: 2em;
        }
    }
    
    @media (max-width: 960px) {
        .header {
            font-size: 2em;
        }
    }

    @media (max-width: 900px) {
        .menu {
            max-width: 50vw;
        }

    }
    
    @media (max-width: 701px) {
        .menu {
            max-width: 60vw;
            min-height: 30vw;
        }

        .header {
            font-size: 2em;
        }

        .break-select, .region-select {
            font-size: 1.3em;
            font-family: Roboto;
            width: 90%;
        }

        button {
            width: 70%;
            font-size: 1.1em;
        }
    }

    @media (max-width: 500px) {
        .menu {
            max-width: 82vw;
        }
    }

    
    
</style>