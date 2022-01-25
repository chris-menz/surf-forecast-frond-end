<svelte:head>surf report wave conditions swell wind surf session log</svelte:head>

<script>
    import Nav from "$lib/nav.svelte";
    import { fly, crossfade, fade, slide } from "svelte/transition";
</script>

<main>
    <Nav />

    <div class="page-container">
        <div>How to Read Surf Reports</div>
        <p></p>
        <div>How to Pick the Correct Surfboard</div>
        <p></p>
        <div>How to Pick a Surf Spot</div>
        <p></p>
    </div>
</main>

<style>
    .page-container {
        background-color: #121212;
    }
</style>