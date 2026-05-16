document.addEventListener('DOMContentLoaded', () => {
    // ── Splash ─────────────────────────────────────────────
    const splash = document.getElementById('loadingSplash');
    const hideSplash = () => {
        if (splash && !splash.classList.contains('fade-out')) {
            splash.classList.add('fade-out');
        }
    };
    setTimeout(hideSplash, 2500);

    // ── Element Refs ────────────────────────────────────────
    const btnLaunch          = document.getElementById('btnLaunch');
    const btnKill            = document.getElementById('btnKill');
    const btnSettings        = document.getElementById('btnSettings');
    const btnMinimize        = document.getElementById('btnMinimize');
    const btnMaximize        = document.getElementById('btnMaximize');
    const btnClose           = document.getElementById('btnClose');
    const settingsModal      = document.getElementById('settingsModal');
    const closeSettings      = document.getElementById('closeSettings');
    const btnBrowse          = document.getElementById('btnBrowse');
    const btnSaveSettings    = document.getElementById('btnSaveSettings');
    const btnResetSettings   = document.getElementById('btnResetSettings');
    const customDllPath      = document.getElementById('customDllPath');
    const versionText        = document.getElementById('versionText');
    const statusDot          = document.getElementById('statusDot');
    const progressContainer  = document.getElementById('progressContainer');
    const progressFill       = document.getElementById('progressFill');
    const progressText       = document.getElementById('progressText');
    const statusMessage      = document.getElementById('statusMessage');
    const launcherVersion    = document.getElementById('launcherVersion');

    // Kill confirm
    const killConfirmModal   = document.getElementById('killConfirmModal');
    const btnConfirmKill     = document.getElementById('btnConfirmKill');
    const btnCancelKill      = document.getElementById('btnCancelKill');

    // Game detected popup
    const gameDetectedModal  = document.getElementById('gameDetectedModal');
    const btnInjectAnyways   = document.getElementById('btnInjectAnyways');
    const btnRestartAndInject = document.getElementById('btnRestartAndInject');
    
    const newVersionTag      = document.getElementById('newVersionTag');
    
    // Update checker refs
    const btnExpandUpdates   = document.getElementById('btnExpandUpdates');
    const updateCheckerField = document.getElementById('updateCheckerField');
    const checkMaraUpdate    = document.getElementById('checkMaraUpdate');
    const checkDllUpdate     = document.getElementById('checkDllUpdate');
    const languageSelect     = document.getElementById('languageSelect');

    // ── Internationalization (i18n) ─────────────────────────
    const translations = {
        es: {
            nav_dashboard: "PANEL",
            nav_settings: "AJUSTES",
            btn_enter: "ENTRAR",
            btn_enter_sub: "ASCIENDE A AMATAYAKUL",
            btn_kill: "MATAR",
            btn_kill_sub: "TERMINAR MINECRAFT",
            settings_title: "Ajustes",
            settings_language: "Idioma",
            settings_payload: "Carga Inyectada",
            settings_browse: "Examinar",
            settings_payload_info: "Seleccione una DLL personalizada para inyectar en Minecraft.",
            settings_update_checker: "Comprobador de Actualizaciones",
            settings_check_mara: "Verificar Mara Injector",
            settings_check_dll: "Verificar Amatayakul DLL",
            settings_update_info: "Alternar actualizaciones automáticas para componentes principales.",
            settings_save: "Guardar Cambios",
            settings_reset: "Restablecer por Defecto",
            kill_title: "Confirmar Cierre",
            kill_desc: "¿Estás seguro? Cerrar el proceso del juego puede causar <strong>pérdida de progreso</strong>.",
            kill_confirm: "Cerrar Juego",
            kill_cancel: "Cancelar",
            detected_title: "Juego Detectado",
            detected_desc: "Proceso del juego detectado y listo para inyectar. Pero recomendamos iniciar el juego a través del lanzador.",
            detected_restart: "↺ Reiniciar e inyectar",
            detected_recommended: "Recomendado",
            detected_inject_anyways: "Inyectar de todos modos"
        },
        en: {
            nav_dashboard: "DASHBOARD",
            nav_settings: "SETTINGS",
            btn_enter: "ENTER",
            btn_enter_sub: "ASCEND TO AMATAYAKUL",
            btn_kill: "KILL",
            btn_kill_sub: "TERMINATE MINECRAFT",
            settings_title: "Settings",
            settings_language: "Language",
            settings_payload: "Injected Payload",
            settings_browse: "Browse",
            settings_payload_info: "Select a custom DLL to inject into Minecraft.",
            settings_update_checker: "Update Checker",
            settings_check_mara: "Check for Mara Injector",
            settings_check_dll: "Check for Amatayakul DLL",
            settings_update_info: "Toggle automatic updates for core components.",
            settings_save: "Save Changes",
            settings_reset: "Reset to Default",
            kill_title: "Confirm Kill",
            kill_desc: "Are you sure? Killing the game process can cause <strong>progress loss</strong>.",
            kill_confirm: "Kill Game",
            kill_cancel: "Cancel",
            detected_title: "Game Detected",
            detected_desc: "Game process detected and ready to inject. But we recommend you to launch the game via the launcher.",
            detected_restart: "↺ Restart and inject",
            detected_recommended: "Recommended",
            detected_inject_anyways: "Inject anyways"
        },
        pt: {
            nav_dashboard: "PAINEL",
            nav_settings: "CONFIGURAÇÕES",
            btn_enter: "ENTRAR",
            btn_enter_sub: "ASCENDA AO AMATAYAKUL",
            btn_kill: "MATAR",
            btn_kill_sub: "TERMINAR MINECRAFT",
            settings_title: "Configurações",
            settings_language: "Idioma",
            settings_payload: "Carga Injetada",
            settings_browse: "Procurar",
            settings_payload_info: "Selecione uma DLL personalizada para injetar no Minecraft.",
            settings_update_checker: "Verificador de Atualizações",
            settings_check_mara: "Verificar Mara Injector",
            settings_check_dll: "Verificar Amatayakul DLL",
            settings_update_info: "Alternar atualizações automáticas para componentes principais.",
            settings_save: "Salvar Alterações",
            settings_reset: "Restaurar Padrões",
            kill_title: "Confirmar Encerramento",
            kill_desc: "Tem certeza? Encerrar o processo do jogo pode causar <strong>perda de progresso</strong>.",
            kill_confirm: "Encerrar Jogo",
            kill_cancel: "Cancelar",
            detected_title: "Jogo Detectado",
            detected_desc: "Processo do jogo detectado e pronto para injetar. Mas recomendamos iniciar o jogo através do iniciador.",
            detected_restart: "↺ Reiniciar e injetar",
            detected_recommended: "Recomendado",
            detected_inject_anyways: "Injetar mesmo assim"
        }
    };

    function setLanguage(lang) {
        if (!translations[lang]) lang = 'es';
        const dict = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.tagName.toLowerCase() === 'p' && dict[key].includes('<')) {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });
        if (languageSelect) {
            const selectedContent = languageSelect.querySelector('.select-content');
            const itemsList = languageSelect.querySelector('.select-items');
            
            // Sync UI state
            const targetItem = Array.from(itemsList.children).find(el => el.getAttribute('data-value') === lang);
            if (targetItem && selectedContent) {
                selectedContent.innerHTML = targetItem.innerHTML;
            }
        }
        localStorage.setItem('amatayakul_language', lang);
    }

    const savedLang = localStorage.getItem('amatayakul_language') || 'es';
    setLanguage(savedLang);

    // Custom select interaction
    if (languageSelect) {
        const selected = languageSelect.querySelector('.select-selected');
        const itemsList = languageSelect.querySelector('.select-items');

        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelect.classList.toggle('active');
            itemsList.classList.toggle('select-hide');
        });

        Array.from(itemsList.children).forEach(item => {
            item.addEventListener('click', (e) => {
                const lang = item.getAttribute('data-value');
                setLanguage(lang);
                languageSelect.classList.remove('active');
                itemsList.classList.add('select-hide');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageSelect.classList.remove('active');
            itemsList.classList.add('select-hide');
        });
    }

    // ── State ───────────────────────────────────────────────
    const REQUIRED_VERSION = '0.1510.0.0';
    let isValidVersion  = false;
    let isLaunching     = false;
    let isInjected      = false;   // true once we've successfully injected this session

    // ── Helpers ─────────────────────────────────────────────
    function showStatus(message, type = 'info') {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
    }

    function updateProgress(percent, text) {
        progressContainer.style.display = 'block';
        progressFill.style.width = `${percent}%`;
        progressText.textContent = text;
    }

    function hideProgress() {
        progressContainer.style.display = 'none';
    }

    /** Switch UI to "Running" (injected) mode */
    function setInjectedMode() {
        isInjected = true;
        btnLaunch.style.display = 'none';
        btnKill.style.display   = 'flex';
        showStatus('Running!', 'success');
        statusDot.className = 'status-dot running';
    }

    /** Switch UI back to "Ready" mode */
    function setReadyMode() {
        isInjected = false;
        btnLaunch.style.display = 'flex';
        btnKill.style.display   = 'none';
        if (isValidVersion) {
            showStatus('Ready to launch', 'success');
            statusDot.className = 'status-dot valid';
            btnLaunch.disabled  = false;
        }
    }

    // ── Version Check ────────────────────────────────────────
    async function checkMinecraftVersion() {
        try {
            const version = await window.go.main.App.GetMinecraftVersion();
            if (!version) {
                versionText.textContent = 'Minecraft UWP not found';
                statusDot.className = 'status-dot invalid';
                isValidVersion = false;
                btnLaunch.disabled = true;
                showStatus('Minecraft UWP is not installed', 'error');
                return false;
            }
            if (version.includes(REQUIRED_VERSION)) {
                versionText.textContent = 'Minecraft 0.15.10 - Ready';
                statusDot.className = 'status-dot valid';
                isValidVersion = true;
                btnLaunch.disabled = false;
                showStatus('Ready to launch', 'success');
                return true;
            } else {
                versionText.textContent = `Minecraft ${version} - Unsupported version!`;
                statusDot.className = 'status-dot invalid';
                isValidVersion = false;
                btnLaunch.disabled = true;
                showStatus(`Required version: ${REQUIRED_VERSION}`, 'error');
                return false;
            }
        } catch (e) {
            console.error('Init Error:', e);
            versionText.textContent = 'Minecraft not detected (Bridge Error)';
            statusDot.className = 'status-dot invalid';
            return false;
        }
    }

    // ── Injection ────────────────────────────────────────────
    async function performInject(skipLaunch = false) {
        if (isLaunching) return;
        isLaunching = true;
        btnLaunch.disabled = true;

        try {
            updateProgress(40, 'Preparing Injection...');
            showStatus('Injecting DLL into Minecraft...', 'info');

            const dllValue = customDllPath ? customDllPath.value.trim() : '';
            const result = await window.go.main.App.PerformInjection(
                dllValue, 
                skipLaunch, 
                checkMaraUpdate.checked, 
                checkDllUpdate.checked
            );

            if (result.success) {
                updateProgress(100, 'Injection complete!');
                await new Promise(resolve => setTimeout(resolve, 1500));
                hideProgress();
                setInjectedMode();
                // Tell Go to set RPC to in-game
                window.go.main.App.SetRPCIngame();
            } else {
                throw new Error(result.error || 'Injection failed');
            }
        } catch (error) {
            showStatus(`Error: ${error.message}`, 'error');
            hideProgress();
            btnLaunch.disabled = !isValidVersion;
        } finally {
            isLaunching = false;
        }
    }

    // ── Launch Button ────────────────────────────────────────
    btnLaunch.addEventListener('click', async () => {
        if (isLaunching || !isValidVersion) return;

        // Check if game is already running
        const running = await window.go.main.App.IsMinecraftRunning();
        if (running && !isInjected) {
            // Show "game detected" popup
            openModal(gameDetectedModal);
        } else {
            await performInject(false);
        }
    });

    // ── Kill Button ──────────────────────────────────────────
    btnKill.addEventListener('click', () => {
        openModal(killConfirmModal);
    });

    btnConfirmKill.addEventListener('click', async () => {
        closeModal(killConfirmModal);
        const result = await window.go.main.App.KillMinecraft();
        if (!result.success) {
            showStatus('Failed to kill Minecraft: ' + result.error, 'error');
        }
        // setReadyMode will be called naturally by the process watcher event
    });

    btnCancelKill.addEventListener('click', () => closeModal(killConfirmModal));

    // ── Game-Detected Popup ──────────────────────────────────
    btnInjectAnyways.addEventListener('click', async () => {
        closeModal(gameDetectedModal);
        await performInject(true /* skipLaunch */);
    });

    btnRestartAndInject.addEventListener('click', async () => {
        closeModal(gameDetectedModal);
        if (isLaunching) return;
        isLaunching = true;
        btnLaunch.disabled = true;

        try {
            updateProgress(20, 'Killing existing process...');
            showStatus('Restarting Minecraft...', 'info');
            await window.go.main.App.KillMinecraft();
            await new Promise(resolve => setTimeout(resolve, 1500));
            updateProgress(50, 'Relaunching Minecraft...');
            isLaunching = false;
            await performInject(false /* launch fresh */);
        } catch (e) {
            showStatus(`Error: ${e.message}`, 'error');
            hideProgress();
            isLaunching = false;
            btnLaunch.disabled = !isValidVersion;
        }
    });

    // ── Process Watcher (events from Go) ─────────────────────
    // Go emits "minecraft:running" every second
    window.runtime.EventsOn('minecraft:running', (running) => {
        if (running) {
            if (!isInjected) {
                // Process is running but we haven't injected yet — keep launch available
            }
            // If we ARE injected, keep kill button visible (already set by setInjectedMode)
        } else {
            // Process gone
            if (isInjected) {
                setReadyMode();
                window.go.main.App.SetRPCLauncher();
            }
        }
    });

    // ── Update Logic ─────────────────────────────────────────
    window.runtime.EventsOn('update:available', (version) => {
        if (newVersionTag) newVersionTag.textContent = `v${version}`;
        openModal(updateModal);
    });

    if (btnUpdateNow) {
        btnUpdateNow.addEventListener('click', () => {
            closeModal(updateModal);
            showStatus('Update feature coming soon...', 'info');
            // We will trigger updater.exe here later
        });
    }

    if (btnUpdateLater) {
        btnUpdateLater.addEventListener('click', () => {
            closeModal(updateModal);
        });
    }

    // ── Modal Helpers ────────────────────────────────────────
    function openModal(el) { el.classList.add('active'); }
    function closeModal(el) { el.classList.remove('active'); }

    // Settings
    function openSettings() { openModal(settingsModal); }
    function closeSettingsModal() { closeModal(settingsModal); }

    btnSettings.addEventListener('click', openSettings);
    if (closeSettings) closeSettings.addEventListener('click', closeSettingsModal);
    if (settingsModal) settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettingsModal();
    });

    // Expansion logic
    if (btnExpandUpdates) {
        btnExpandUpdates.addEventListener('click', () => {
            updateCheckerField.classList.toggle('field--open');
        });
    }

    // ── Window Controls ──────────────────────────────────────
    if (btnMinimize) btnMinimize.addEventListener('click', () => window.runtime.WindowMinimize());
    if (btnMaximize) btnMaximize.addEventListener('click', () => {
        window.runtime.WindowIsMaximised().then(isMax => {
            if (isMax) window.runtime.WindowUnmaximise();
            else window.runtime.WindowMaximise();
        });
    });
    if (btnClose) btnClose.addEventListener('click', () => window.runtime.Quit());

    // ── Settings Persistence ─────────────────────────────────
    const savedDll = localStorage.getItem('amatayakul_custom_dll');
    if (savedDll) customDllPath.value = savedDll;

    if (btnBrowse) {
        btnBrowse.addEventListener('click', async () => {
            try {
                const fp = await window.go.main.App.SelectDLL();
                if (fp) customDllPath.value = fp;
            } catch (e) {
                console.error('Failed to select DLL:', e);
            }
        });
    }

    if (btnSaveSettings) {
        btnSaveSettings.addEventListener('click', () => {
            const val = customDllPath.value.trim();
            if (val) localStorage.setItem('amatayakul_custom_dll', val);
            else localStorage.removeItem('amatayakul_custom_dll');
            
            localStorage.setItem('amatayakul_check_mara', checkMaraUpdate.checked);
            localStorage.setItem('amatayakul_check_dll', checkDllUpdate.checked);
            
            closeSettingsModal();
        });
    }

    if (btnResetSettings) {
        btnResetSettings.addEventListener('click', () => {
            customDllPath.value = '';
            checkMaraUpdate.checked = true;
            checkDllUpdate.checked = true;
            localStorage.removeItem('amatayakul_custom_dll');
            localStorage.setItem('amatayakul_check_mara', 'true');
            localStorage.setItem('amatayakul_check_dll', 'true');
        });
    }

    // Load extra settings
    const savedMaraCheck = localStorage.getItem('amatayakul_check_mara');
    if (savedMaraCheck !== null && checkMaraUpdate) checkMaraUpdate.checked = savedMaraCheck === 'true';
    
    const savedDllCheck = localStorage.getItem('amatayakul_check_dll');
    if (savedDllCheck !== null && checkDllUpdate) checkDllUpdate.checked = savedDllCheck === 'true';

    // ── Cinematic Flicker ────────────────────────────────────
    setInterval(() => {
        if (Math.random() > 0.96) {
            document.body.classList.add('flicker');
            setTimeout(() => document.body.classList.remove('flicker'), 120);
        }
    }, 2000);

    // ── Boot ─────────────────────────────────────────────────
    async function boot() {
        try {
            const ver = await window.go.main.App.GetAppVersion();
            if (launcherVersion) launcherVersion.textContent = `v${ver}`;
        } catch (e) {
            console.error('Failed to get app version:', e);
        }
        setTimeout(checkMinecraftVersion, 500);
    }

    boot();
});
