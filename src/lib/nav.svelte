<script>
	let open = false;
</script>

<main>
	<nav class="nav-container">
		<div class="logo">
			<a href="/">SwellStatus</a>	
		</div>
		<div href="" class="toggle-button" on:click={()=> open = !open} >
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</div>
		<ul class="nav-list">
			<li><a href="/surf-reports">Surf Reports</a></li>
			<li><a href="/log-session">Sessions</a></li>
			<li><a href="/new-to-surfing">New to Surfing?</a></li>
		</ul>
		<ul class="burger-nav-list" style="display: {open ? "flex" : "none"}">
			<li><a href="/surf-reports">Surf Reports</a></li>
			<li><a href="/log-session">Sessions</a></li>
			<li><a href="/new-to-surfing">New to Surfing?</a></li>
		</ul>
	</nav>
</main>

<style>
    *, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.nav-container {
		font-family: sans-serif;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: #6e38cc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	

	.nav-list {
		list-style: none;
		position: relative;
		display: flex;
		margin-right: 10px;
	}


	nav ul li a {
		font-size: 1.2em;
		padding: 1rem;
		display: block;
	}



	a {
		background-color: transparent;
		text-decoration: none;
	}

	.toggle-button {
		position: absolute;
		top: 1em;
		right: 1em;
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 40px;
		height: 28px;
		cursor: pointer;
	}

	.bar {
		background-color: white;
		border-radius: 10px;
		width: 100%;
		height: 3px;
	}


	.nav-list a, .nav-list a:visited, .burger-nav-list a, .burger-nav-list a:visited {
		color: white;
		background-color: transparent;
		text-decoration: none;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}

	a:active {
		color: grey;
	}


	.nav-list a:hover, .burger-nav-list a:hover {
		/* outline: 1.5px solid white; */
		/* border-radius: 5px; */
		background-color: rgb(71, 0, 138);
		text-decoration: none;
	}
	
	.logo{
		font-size: 2.5em;
		font-family: Georgia;
		margin: 00.5rem;
	}

	.logo a, .logo a:visited {
		color: rgb(235, 235, 235);
	}

	.burger-nav-list {
		display: none;
		list-style: none;
	}
	@media (max-width: 700px) {

		.toggle-button {
			display: flex;
		}

		.nav-list {
			display: none;
		}

		.nav-container {
			flex-direction: column;
			align-items: flex-start;
		}

		.burger-nav-list {
			flex-direction: column;
			width: 100%;
			list-style: none;
		}

		.nav-list li {
			text-align: center;
		}

	}
	
</style>