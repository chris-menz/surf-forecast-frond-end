<script>
	import { _16point } from '$lib/helpers/_16point'
	
	export let conditions;
	export let hour;
	let height;
	$: height = conditions[hour].wave_height
	let period;
	$: period = conditions[hour].wave_period
	let direction;
	direction = conditions[hour].wave_direction

	let rootElement;
	$: rootElement && rootElement.style.setProperty('--deg', `${180 + +direction}deg`);
</script>

<main>
	<div class="card">
		<div class="header">Swell</div>
		<div class="swell">{height} ft. @ {period}s<br>{_16point(+direction)} {direction}°</div>
		<span class="arrow" bind:this={rootElement}>&#10569;</span>
	</div>
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

	.card {
		max-width: 250px;
	}

	.header {
		font-size: 2em;
		font-family: Georgia;
	}

	.swell {
		font-size: 1.2em;
		padding: 0.2em;
	}

	.arrow {
		transform: rotate(var(--deg));
		display: block;
		font-size: 4em;
		margin-top: -20px;
	}
</style>