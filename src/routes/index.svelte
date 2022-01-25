<script>
	import Nav from "$lib/nav.svelte";
	import { onMount } from 'svelte';
	let x = import.meta.env.VITE_HEROKUAPI;
</script>

<main>
	<Nav />
	<div>{x}</div>
</main>

<style>
	
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		/* background-color: #1f1f1f; */
		background-color: #121212;
    }

	div {
		font-size: 10em;
	}
</style>