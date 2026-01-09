<script>
  import Modal from './Modal.svelte';
  import { fade } from 'svelte/transition';

  let isRunning = false;

  // Configuration state for the backend
  let config = {
    pumps: 0,
    sluices: 0,
    buffer: 0,
    discharge: 0
  };

  // Modal state
  let activeModal = null; // e.g., { key: 'pumps', title: 'Pumps' }
  let graphUrl = null;
  let isLoading = false;

  function openModal(key, title) {
    activeModal = { key, title };
  }

  function closeModal() {
    activeModal = null;
  }

  function handleSave(event) {
    const { value } = event.detail;
    config[activeModal.key] = value;
    closeModal();
  }

  async function toggleRun() {
    isRunning = !isRunning;
    
    if (isRunning) {
      isLoading = true;
      graphUrl = null;
      console.log('Sending configuration to backend:', config);
      
      // Mock backend delay and response
      setTimeout(() => {
        if (isRunning) {
          graphUrl = 'https://placehold.co/800x400/27272a/a1a1aa?text=Simulation+Graph+Result';
          isLoading = false;
        }
      }, 1500);
    }
  }
</script>

<div class="dashboard-container">
  <div class="top-panel">
    <!-- Future Output Panel -->
    <div class="output-panel">
      <div class="panel-title">Live Output</div>
      <div class="output-content">
        {#if graphUrl}
          <img src={graphUrl} alt="Simulation Result" class="result-graph" transition:fade />
        {/if}
      </div>
    </div>

    <!-- Right Side: Controls -->
    <div class="controls">
      <button class="control-btn blue" on:click={() => openModal('pumps', 'Pumps')}>Pumps</button>
      <button class="control-btn blue" on:click={() => openModal('sluices', 'Sluices')}>Sluices</button>
      <button class="control-btn blue" on:click={() => openModal('buffer', 'Buffer')}>Buffer</button>
      <button class="control-btn blue" on:click={() => openModal('discharge', 'Incoming Discharge')}>Incoming<br>Discharge</button>
      <button class="control-btn green" on:click={toggleRun}>
        {isRunning ? 'Stop' : 'Run'}
      </button>
    </div>
  </div>

    <div class="schematic-wrapper">
    <div class="schematic">
      <!-- Sea Section -->
      <div class="sea-section">
        <span class="label-large">Sea</span>
        
        <!-- Qout Arrow -->
        <div class="arrow-container qout" class:running={isRunning}>
          <span class="arrow-label">Qout</span>
          <svg viewBox="0 0 24 24" class="arrow-icon">
            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </div>
      </div>

      <!-- Interface (Pumps/Sluices) -->
      <div class="interface-bar">
        <span class="vertical-text">Pumps and sluices</span>
      </div>

      <!-- Land Section -->
      <div class="land-section">
        <!-- Reservoir -->
        <div class="reservoir">
          <span class="label-large">Reservoir</span>
        </div>

        <!-- Incoming Channel -->
        <div class="channel"></div>

        <!-- Qin Arrow -->
        <div class="arrow-container qin" class:running={isRunning}>
          <span class="arrow-label">Qin</span>
          <svg viewBox="0 0 24 24" class="arrow-icon">
            <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </div>
      </div>
    </div>
    </div>
</div>

{#if activeModal}
<div transition:fade={{ duration: 150 }}>
  <Modal 
    title={activeModal.title} 
    initialValue={config[activeModal.key]} 
    on:close={closeModal} 
    on:save={handleSave} 
  />
</div>
{/if}

{#if isLoading}
  <div class="loading-overlay" transition:fade>
    <div class="spinner"></div>
    <div class="loading-text">Generating Simulation...</div>
  </div>
{/if}

<style>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    background-color: #09090b;
    color: #f1f5f9;
  }

  .top-panel {
    flex: 1;
    display: flex;
    gap: 20px;
  }

  .output-panel {
    flex: 3;
    background: #18181b;
    border-radius: 4px;
    border: 1px solid #27272a;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .output-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .result-graph {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
    border: 1px solid #3f3f46;
  }

  .panel-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #a1a1aa;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
  }

  .status-text {
    color: #71717a;
    font-style: italic;
  }

  /* Schematic Styles */
  .schematic-wrapper {
    flex: 1;
    background-color: #18181b;
    padding: 20px;
    border-radius: 4px;
    display: flex;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    border: 1px solid #27272a;
  }

  .schematic {
    display: flex;
    width: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #3f3f46;
  }

  .sea-section {
    flex: 35;
    background: linear-gradient(135deg, #3f3f46 0%, #52525b 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
    color: white;
  }

  .land-section {
    flex: 65;
    background-color: #27272a;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .interface-bar {
    width: 40px;
    background-color: #3f3f46;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .vertical-text {
    transform: rotate(-90deg);
    white-space: nowrap;
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .reservoir {
    width: 45%;
    height: 60%;
    background-color: #52525b;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    color: white;
    margin-left: 30px;
    z-index: 5;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
    border-radius: 2px;
  }

  .channel {
    top: 55%;
    flex-grow: 1;
    height: 25%;
    background-color: #52525b;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
    position: absolute;
    right: 0;
    z-index: 1;
  }

  .label-large {
    font-size: 1.8rem;
    font-weight: 600;
    opacity: 0.9;
    margin-top: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  /* Arrows */
  .arrow-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #e0f2fe;
    z-index: 20;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }

  .qout {
    right: 10px;
    top: 35%;
  }

  .qin {
    right: 12%;
    top: 35%;
  }

  .arrow-icon {
    width: 60px;
    height: 60px;
    transition: filter 0.3s ease;
  }

  .arrow-container.running .arrow-icon {
    animation: pulse-glow 2s infinite ease-in-out;
    color: #e4e4e7; /* zinc-200 */
  }

  .arrow-label {
    font-size: 1.4rem;
    color: #f1f5f9;
    font-weight: 600;
    margin-bottom: -12px;
  }

  /* Controls Styles */
  .controls {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 220px;
    justify-content: center;
  }

  .control-btn {
    height: 60px;
    border: none;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
    border: 1px solid #27272a;
  }

  .control-btn:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.4);
  }

  .control-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .blue {
    background: linear-gradient(135deg, #3f3f46 0%, #27272a 100%);
  }

  .green {
    background: linear-gradient(135deg, #15803d 0%, #14532d 100%);
  }

  @keyframes pulse-glow {
    0%, 100% {
      filter: drop-shadow(0 0 2px #a1a1aa);
    }
    50% {
      filter: drop-shadow(0 0 8px #a1a1aa);
    }
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(9, 9, 11, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    color: #f1f5f9;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #27272a;
    border-top-color: #f1f5f9;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  .loading-text {
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>