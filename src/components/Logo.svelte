<script lang="ts">
  import { link } from 'svelte-navigator';
</script>

<a class="intro-wrapper" href="/about" use:link>
  <div class="animated-div">
    <p class="intro-text">SCILOCHKA</p>
    <div class="intro-text-underscore"></div>
  </div>
</a>

<style>
  .intro-wrapper {
    position: absolute;
    cursor: pointer;
		background: transparent;
		width: 300px;
		height: calc(2.5em + 6px);
    top: 8px;
    left: 50%;
    transform: translate( -50%, 0);
	}

  .animated-div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--main-color-separate);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .intro-text {
    letter-spacing: 1.5px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin: 3px 0;
    color: var(--text-in-separate);
    border-right: 2px solid transparent;
    font-size: 2em;
  }

  .intro-text-underscore {
    position: absolute;
    bottom: 4px;
    width: 100%;
    height: 3px;
    background-color: var(--main-blue);
  }

  @media (max-width: 545px) {
    .intro-wrapper {
      width: 100%;
      height: calc(2.5em + 12px);;
      top: 0;
      position: fixed;
    }
  }
</style>