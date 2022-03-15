<script lang="ts">
  import { onMount } from 'svelte';
  import autoTextareaResize from '../functions/auto_textarea_resize';

  let headerVal: string;
  let contentVal: string;

  onMount(() => {
    autoTextareaResize(document.querySelectorAll('.create-content'));

    (document.querySelector('.create-header') as HTMLElement).focus();
  });

  function headerValHandler(event: Event): void {
    headerVal = (event.target as HTMLElement).textContent
  }

</script>

<main class="create-wrapper">

  <button class="common-btn" id="create_scilochku" type="button">Создать</button>

  <div class="inner-wrapper">

    <h1 class="create-header focus-elem pink" contenteditable="true" on:input={headerValHandler}> </h1>

    <hr />

    <textarea class="create-content focus-elem blue" bind:value={contentVal}></textarea>
  </div>
</main>

<style>
  .create-wrapper {
    width: 100%;
    height: 100%;
  }

  .inner-wrapper {
    width: 700px;
    margin: 0 auto;
    padding: 50px 50px;
  }

  hr {
    border: 2px solid var(--main-blue);
    background: var(--main-blue);
    border-radius: 5px;
    margin: 8px 0 16px;
  }

  .create-header {
    min-width: 150px;
    margin: 0;
    border: 2px solid var(--transparent-pink);
    border-radius: 5px;
    transition: all .3s;
    display: inline-block;
    padding: 8px;
  }

  .create-content {
    width: 100%;
    min-height: 150px;
    border: 2px solid var(--transparent-blue);
    border-radius: 5px;
    resize: none;
    transition: all .3s;
    overflow-y: hidden;
    padding: 8px;
  }

  #create_scilochku {
    cursor: pointer;
    position: fixed;
    right: 8px;
  }
</style>