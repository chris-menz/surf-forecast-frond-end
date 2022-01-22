<script>

</script>

<main>
    <div class="nav-container">
		<nav>
			<div class="logo">
				<a href="/">SwellStatus</a>
				
			</div>
			<ul class="nav-list">
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
		background-color: rgb(100, 0, 172);
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

	ul li a:link {
		color: white;
		background-color: transparent;
		text-decoration: none;
	}

	a {
		background-color: transparent;
		text-decoration: none;
	}


	a:visited {
		color: white;
		background-color: transparent;
		text-decoration: none;
	}

	.nav-list a:hover {
		outline: 1.5px solid white;
		border-radius: 5px;
		background-color: transparent;
		text-decoration: none;
		/* text-decoration: underline; */
	}
	
	.logo {
		color: rgb(235, 235, 235);
		font-size: 2.5em;
		position: absolute;
		top: 10px;
		left: 10px;
	}

	@media (max-width: 415px) {

		nav ul {
			display: none;
		}
	}
	
</style>