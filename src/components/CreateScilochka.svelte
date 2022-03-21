<script lang="ts">
  import { onMount } from 'svelte';
  import { useNavigate } from 'svelte-navigator';

  import autoTextareaResize from '../functions/auto_textarea_resize';
  import alertCall from '../functions/alert_call';

  import Logo from './Logo.svelte';

  const navigate = useNavigate();
  let headerVal: string = '';
  let contentVal: string = '';

  $: headerCounter = headerVal.length;
  $: contentCounter = contentVal.length;

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
        alertCall('Сцылочка создана.', true);

        navigate(`/scilochka/${json.scilochka_id}`)
      } else {
        alertCall('Не удалось создать сцылочку.', false);
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

  <Logo />

  <button
    class="common-btn"
    id="create_scilochku"
    type="button"
    on:click={createScilochka}
  >
    <span>Создать</span>

    <div class="svg-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"/>
      </svg>
    </div>
  </button>

  <div class="inner-wrapper">

    <h1 class="create-header focus-elem pink" contenteditable="true" on:input={headerValHandler}> </h1>
    <p class="character-counter header">{ headerCounter }/200</p>
    <hr />

    <textarea class="create-content focus-elem blue" bind:value={contentVal}></textarea>
    <p class="character-counter content">{ contentCounter }/5000</p>
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

  #create_scilochku span {
      display: inline;
    }

  #create_scilochku .svg-wrap {
    display: none;
  }

  .character-counter {
    font-size: .8rem;
  }

  .character-counter.header {
    margin-top: 2px;
    color: var(--pink);
  }

  .character-counter.content {
    color: var(--blue);
  }

  @media (max-width: 545px) {
    #create_scilochku span {
      display: none;
    }

    #create_scilochku .svg-wrap {
      display: flex;
    }

    #create_scilochku {
      background: transparent;
      border: none;
    }
  }
</style>