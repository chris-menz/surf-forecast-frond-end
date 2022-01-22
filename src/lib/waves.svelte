<script>
	export let conditions;
	export let hour;
</script>

<main>
    <div class="card">
		<div class="header">Wave Height</div>
		<div class="wave">Predicted: {+((+conditions[hour].wave_height).toFixed(0))}-{+((+conditions[hour].wave_height).toFixed(0)) + 1} ft.</div>
	</div>	
</main>

<style>
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
	}

	.wave {
		font-size: 1.2em;
		padding: 0.2em;
	}
</style>