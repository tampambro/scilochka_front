<script lang="ts">
	import { Router, Route } from 'svelte-navigator';

	//Components
	import Intro from './components/Intro.svelte';
	import Burger from './components/Burger.svelte';
	import SideMenu from './components/SideMenu.svelte';
	import CreateScilochka from './components/CreateScilochka.svelte';
	//-------

</script>

	<Burger />

	<Router>
		<SideMenu />

		<Route path="/">
			<Intro />
		</Route>

		<Route path="/create">
			<CreateScilochka />
		</Route>
	</Router>

<style>

</style>