<script>
	export let conditions;
	export let hour;
</script>

<main>
    <div>Wave Height: {conditions[hour].swell_height + 1}</div>
</main>

<style>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
</style>