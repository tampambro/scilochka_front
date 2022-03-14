<script lang="ts">

</script>

<main class=intro-main>
  <div class="intro-wrapper">
    <div class="animated-div">
      <p class="intro-text">SCILOCHKA</p>
      <div class="intro-text-underscore"></div>
    </div>
  </div>
</main>


<style>
  .intro-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .intro-wrapper {
    cursor: pointer;
		background: transparent;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 300px;
		height: calc(2.5em + 6px);
	}

	.animated-div {
    display: flex;
    justify-content: center;
    align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		background: var(--main-color-separate);
		width: 6px;
		box-sizing: border-box;
    animation:
      appearance-phase-1 1s cubic-bezier(.18,.55,.48,.91) 1s 1 normal both,
      appearance-phase-2 1s  cubic-bezier(.18,.55,.48,.91) 2s 1 normal both;
    -webkit-animation:
      appearance-phase-1 1s cubic-bezier(.18,.55,.48,.91) 1s 1 normal both,
      appearance-phase-2 1s  cubic-bezier(.18,.55,.48,.91) 2s 1 normal both;
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
  animation:
    typewriter .8s steps(9) 3s 1 normal both,
    blinkTextCursor 1s steps(9) 2s 4 normal;
  -webkit-animation:
    typewriter .8s steps(9) 3s 1 normal both,
    blinkTextCursor 1s steps(9) 2s 4 normal;
}

.intro-text-underscore {
  position: absolute;
  bottom: 4px;
  width: 100%;
  height: 3px;
  opacity: 0;
  background-color: var(--main-blue);
  animation: underscore 2s linear 6s 1 normal forwards;
  -webkit-animation: underscore 2s linear 6s 1 normal forwards;
}

@keyframes appearance-phase-1 {
  from {
    height: 0;
  }

  to {
    height: 100%;
  }
}

@keyframes appearance-phase-2 {
  from {
    width: 6px;
  }

  to {
    width: 100%
  }
}

@keyframes typewriter {
  from {
    width: 0;
  }

  to {
    width: 190px;
  }
}

@keyframes blinkTextCursor {
  from {
    border-right-color: var(--text-in-separate);
  }

  to {
    border-right-color: transparent;
  }
}

@keyframes underscore {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>