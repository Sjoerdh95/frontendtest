<script>
  import { createEventDispatcher } from 'svelte';
  
  export let title = '';
  export let initialValue = 0;

  let value = initialValue;
  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function save() {
    dispatch('save', { value });
  }
</script>

<div class="backdrop" on:click={close}>
  <div class="modal" on:click|stopPropagation>
    <h3>Configure {title}</h3>
    
    <div class="input-group">
      <label for="config-value">Set Value:</label>
      <input 
        id="config-value" 
        type="number" 
        bind:value 
        placeholder="Enter value..."
      />
    </div>

    <div class="actions">
      <button class="btn-cancel" on:click={close}>Cancel</button>
      <button class="btn-save" on:click={save}>Save</button>
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background-color: #18181b;
    border: 1px solid #27272a;
    padding: 24px;
    border-radius: 4px;
    width: 320px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    color: #f1f5f9;
  }

  h3 { margin-top: 0; margin-bottom: 20px; font-weight: 600; }
  
  .input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  
  input { background: #09090b; border: 1px solid #3f3f46; padding: 10px; border-radius: 2px; color: white; font-size: 1rem; }
  input:focus { outline: 2px solid #52525b; border-color: transparent; }

  .actions { display: flex; justify-content: flex-end; gap: 12px; }
  
  button { padding: 8px 16px; border-radius: 2px; border: none; cursor: pointer; font-weight: 600; transition: all 0.2s; }
  .btn-cancel { background: transparent; color: #94a3b8; }
  .btn-cancel:hover { color: #f1f5f9; background: rgba(255,255,255,0.05); }
  .btn-save { background: #3f3f46; color: white; }
  .btn-save:hover { background: #27272a; }
</style>