<script>

</script>

<main>
    <div class="nav-container">
		<nav>
			<div class="logo">
				WaveReport
			</div>
			<a href="/" class="toggle-button">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</a>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/surf-reports">Surf Reports</a></li>
				<li><a href="/log-session">Sessions</a></li>
				<li><a href="/new-to-surfing">New to Surfing?</a></li>
			</ul>
		</nav>
	</div>
</main>

<style>
    *, *::before, *::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.nav-container {
		font-family: sans-serif;
		text-align: center;
		position: fixed;
		background-color: turquoise;
		width: 100vw;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	nav {
		position: absolute;
		text-align: left;
		top: 100%;
		left: 0;
		background-color: rgb(102, 84, 206);
		width: 100vw;
	}

	nav:after {
		content: '';
		clear: both;
		display: table;
	}

	nav ul {
		float: right;
		list-style: none;
		margin-right: 40px;
		position: relative;
	}

	nav ul li {
		float: left;
		/* display: inline-block; */
		margin: 0 5px;
	}

	nav ul li a {
		line-height: 70px;
		font-size: 18px;
		padding: 8px 15px;
	}

	nav ul ul {
		position: absolute;
		opacity: 0;
		visibility: hidden;
	}

	nav ul ul li {
		position: relative;
		margin: 0;
		max-width: 200px;
		float: none; 
		display: list-item;
		background-color: rgba(84, 198, 206, 0.822);
		padding: 0;
	}

	nav ul ul li a {
		line-height: 50px;
	}

	ul li ul li a:link {
		color: white;
		background-color: transparent;
		text-decoration: none;
	}
	
	ul li ul li a:visited {
		color: white;
		background-color: transparent;
		text-decoration: none;
	}

	ul li ul li a:hover {
		color: purple;
		background-color: transparent;
		text-decoration: underline;
	}


	ul li a:link {
		color: white;
		background-color: transparent;
		text-decoration: none;
	}

	a:visited {
		color: white;
		background-color: transparent;
		text-decoration: none;
	}

	a:hover {
		color: rgb(167, 167, 167);
		background-color: transparent;
		text-decoration: underline;
	}

	.toggle-button {
		position: absolute;
		top: .75rem;
		right: 1rem;
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 21px;
	}

	.toggle-button .bar {
		height: 3px;
		width: 100%;
		background-color: white;
		border-radius: 10px;
	}

	.logo {
		color: rgb(235, 235, 235);
		font-size: 2.5em;
		position: absolute;
		top: 10px;
		left: 10px;
	}

	@media (max-width: 415px) {
		.toggle-button {
			display: flex;
		}

		nav ul {
			display: none;
		}
	}
	
</style>