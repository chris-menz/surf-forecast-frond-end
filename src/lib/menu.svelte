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
        surf_break_names = breaks.filter(surfBreak => surfBreak.region == selected).map(surfBreak => surfBreak.break_name); 
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
            <option value="" disabled selected>Select Break</option>
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
    }
    
    .menu {
		background-color: #313131;
        margin: 200px auto 0 auto;
        padding: 1em 0;
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
        text-align: center;
        padding-bottom: 0.5em;
        margin: 0;
    }
    
    .region-select, .break-select {
        background-color: rgb(28, 32, 32);
        color: rgb(240, 234, 234);
        border: none;
        /* outline: 1px solid rgb(114, 114, 114); */
        border-radius: 5px;
        min-height: 5vh;
        width: 75%;
        text-align: center;
        margin-bottom: 0.5em;
        padding: 0.5em;
        font-size: 1.5em;
        cursor: pointer;
    }

    button {
        background-color: rgb(100, 0, 172);
        color: white;
        padding: 0.5em;
        min-height: 5vh;
        width: 60%;
        text-align: center;
        font-size: 1.5em;
        border: none;
        border-radius: 5px;
        margin: 0.5em 0 0.5em 0;
        cursor: pointer;
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
    
    @media (max-width: 1100px) {
        .menu {
            max-width: 35vw;
            min-height: 22vh;
        }

        .header {
            font-size: 2em;
        }
    }
    
    @media (max-width: 960px) {
        .menu {
            margin-top: 125px;
            max-width: 60vw;
        }

        .header {
            font-size: 2em;
        }
    }
    
    @media (max-width: 700px) {
        .menu {
            max-width: 70vw;
        }

        .header {
            font-size: 1.5em;
        }

        .break-select, .region-select {
            font-size: 1em;
        }
    }

    
    
</style>