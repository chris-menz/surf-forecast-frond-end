<script>
	import Nav from "$lib/nav.svelte";
</script>

<main>
	<Nav />
	<h1>Hello</h1>
</main>

<style>
	
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background-color: #1f1f1f;
        transition: background-color 0.3s
    }

	h1 {
		font-size: 10em;
	}
</style>