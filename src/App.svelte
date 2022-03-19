<script lang="ts">
	import { Router, Route } from 'svelte-navigator';

	//Components
	import Intro from './components/Intro.svelte';
	import Burger from './components/Burger.svelte';
	import SideMenu from './components/SideMenu.svelte';
	import CreateScilochka from './components/CreateScilochka.svelte';
	import Scilochka from './components/Scilochka.svelte';
	import Alert from './components/Alert.svelte';
	import Archive from './components/Archive.svelte';
import About from './components/About.svelte';
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

		<Route path="/scilochka/:id" let:params>
			<Scilochka id={+params.id} />
		</Route>

		<Route path="/archive">
			<Archive />
		</Route>

		<Route path="/about">
			<About />
		</Route>
	</Router>

	<Alert />

<style>

</style>