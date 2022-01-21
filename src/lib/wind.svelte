<script>
    import { _16point } from '$lib/helpers/_16point'
	
	export let weather;

	let rootElement;
	$: rootElement && rootElement.style.setProperty('--deg', `${180 + weather.wind.deg}deg`);
</script>

<main>
    <div class="header">Wind</div>
    <div class="wind">{weather.wind.speed.toFixed(0)}{+weather.wind.speed.toFixed(0) == 1 ? "kt" : "kts"}
	{#if weather.wind.gust}
		<br>{weather.wind.gust.toFixed(0)}kts Gusts
	{/if}<br>{_16point(weather.wind.deg)} {weather.wind.deg}°</div>
	<!-- <div class="circle"></div> -->
	
	<span class="arrow" bind:this={rootElement}>&#10569;</span>
</main>

<style>
	:root{
		--deg: 0deg;
	}
	
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.header {
		font-size: 2em;
	}

	.wind {
		font-size: 1.2em;
		padding: 0.2em;
	}

	/* .circle {
		height: 50px;
		width: 50px;
		background: #bbb;
		border-radius: 50%;
		margin: auto;
	} */

	.arrow {
		transform: rotate(var(--deg));
		display: block;
		font-size: 4em;
		margin-top: -20px;
	}

</style>