<script lang="ts">
  import { onMount } from 'svelte';
  import autoTextareaResize from '../functions/auto_textarea_resize';
  import alertCall from '../functions/alert_call';

  let headerVal: string = '';
  let contentVal: string = '';

  function headerValHandler(event: Event): void {
    headerVal = (event.target as HTMLElement).textContent
  }

  function isValid(): boolean {
    if (headerVal?.length > 200) {
      alertCall('Длина заголовка не должна превышать 200 символов.', undefined);
      return false;
    } else if (headerVal.length === 0) {
      alertCall('Сцылочке нужен заголовок', undefined);
      return false;
    } else if (contentVal.length > 5000) {
      alertCall('Длина основного текста не должна превышать 5000 символов.', undefined);
      return false;
    } else {
      return true;
    }
  }

  function createScilochka(): void {
    if (!isValid()) {
      return;
    }

    fetch('/api/create_scilochky', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        title: headerVal,
        content: contentVal
      })
    })
    .then((response) => {
      if (response.status === 404) {
        throw new Error('404');
      } else {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);

      if (json.success === 'true') {
        alertCall('Сцылочка создана.', true)
      } else {
        alertCall('Не удалось создать сцылочку.', false)
      }
    })
    .catch((err) => {
      alertCall(err.message, false);
      console.error(err);
    })
  }

  onMount(() => {
    autoTextareaResize(document.querySelectorAll('.create-content'));

    (document.querySelector('.create-header') as HTMLElement).focus();
  });

</script>

<main class="overall-wrapper">

  <button
    class="common-btn"
    id="create_scilochku"
    type="button"
    on:click={createScilochka}
  >
    Создать
  </button>

  <div class="inner-wrapper">

    <h1 class="create-header focus-elem pink" contenteditable="true" on:input={headerValHandler}> </h1>

    <hr />

    <textarea class="create-content focus-elem blue" bind:value={contentVal}></textarea>
  </div>
</main>

<style>
  .create-header {
    min-width: 150px;
    max-width: 100%;
    margin: 0;
    border: 2px solid var(--transparent-pink);
    border-radius: 5px;
    transition: all .3s;
    display: inline-block;
    padding: 8px;
  }

  .create-content {
    font-size: 1rem;
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
    top: 8px;
  }
</style>