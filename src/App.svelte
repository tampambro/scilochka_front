<script lang="ts">
	import { Router, Route } from 'svelte-navigator';

	//Components
	import Intro from './components/Intro.svelte';
	import Burger from './components/Burger.svelte';

</script>

<Burger />

<Router>
	<Route path="/">
		<Intro />
	</Route>
</Router>


<style>

</style>