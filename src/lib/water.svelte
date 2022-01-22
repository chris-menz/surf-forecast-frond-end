<script>
	export let conditions;
	export let hour;
</script>

<main>
	<div class="card">
		<div class="header">Water Temp.</div>
		<div class="temp">{conditions[hour].water_temperature}</div>
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

	.temp {
		font-size: 1.2em;
		padding: 0.2em;
	}
</style>