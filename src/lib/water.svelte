<script>
	export let conditions;
	export let hour;
</script>

<main>
	<div>Water Temperature: {conditions[hour].water_temperature}</div>
</main>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
</style>