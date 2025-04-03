let dispositivosEncontrados = new Map(); // Almacena los dispositivos detectados

// Verifica las opciones necesarias para Web Bluetooth en el navegador
async function verificarCompatibilidad() {
    const bluetoothSupported = navigator.bluetooth;
    const bluetoothSupportedCheckbox = document.getElementById('bluetoothSupported');
    const permissionsCheckedCheckbox = document.getElementById('permissionsChecked');
    const chromeExperimentalEnabledCheckbox = document.getElementById('chromeExperimentalEnabled');
    const chromeBluetoothEnabledCheckbox = document.getElementById('chromeBluetoothEnabled');
    const bluetoothFlagsMessage = document.getElementById('bluetoothFlagsMessage');

    let allFlagsEnabled = true;

    // Verifica si la API Web Bluetooth está disponible
    if (!bluetoothSupported) {
        manejarError('Tu navegador no soporta la API Web Bluetooth.', new Error('No compatible'));
        bluetoothSupportedCheckbox.checked = false;
        allFlagsEnabled = false;
    } else {
        bluetoothSupportedCheckbox.checked = true;
    }

    // Verificación para los permisos de Bluetooth
    try {
        await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']
        });
        permissionsCheckedCheckbox.checked = true;
    } catch (error) {
        permissionsCheckedCheckbox.checked = false;
    }

    // Verifica si las flags de Chrome están habilitadas
    chromeExperimentalEnabledCheckbox.checked = isFlagEnabled('enable-experimental-web-platform-features');
    chromeBluetoothEnabledCheckbox.checked = isFlagEnabled('enable-web-bluetooth');

    if (!allFlagsEnabled) {
        bluetoothFlagsMessage.style.display = 'block';
    } else {
        bluetoothFlagsMessage.style.display = 'none';
    }

    return allFlagsEnabled;
}

// Función para verificar si una Chrome Flag está habilitada
function isFlagEnabled(flag) {
    // No hay una forma directa de comprobar si una flag está habilitada, pero podemos intentar abrir el dispositivo
    // Si el flag no está habilitado, debería fallar.
    try {
        navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        });
        return true;
    } catch (error) {
        return false;
    }
}

// Función para mostrar un mensaje sobre Chrome Flags
function abrirChromeFlags(flag) {
    alert(`Por razones de seguridad, debes copiar y pegar manualmente esta URL en la barra de direcciones:\nchrome://flags/#${flag}`);
}

// Captura el botón de escaneo y agrega un evento al hacer clic
document.getElementById('scanButton').addEventListener('click', async () => {
    if (!(await verificarCompatibilidad())) {
        return;
    }

    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('errorMessage').textContent = '';

    try {
        const dispositivo = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service'],
        });

        if (dispositivo) {
            dispositivosEncontrados.set(dispositivo.id, dispositivo);
            agregarDispositivoALista(dispositivo);
        }
    } catch (error) {
        manejarError('Error al escanear dispositivos Bluetooth', error);
    } finally {
        document.getElementById('loadingMessage').style.display = 'none';
    }
});

// Función para manejar errores y mostrarlos en la interfaz
function manejarError(mensaje, error) {
    console.error(mensaje, error);
    document.getElementById('errorMessage').innerHTML += `<p>${mensaje}: ${error.message}</p>`;
}

// Función para agregar dispositivos a la lista
function agregarDispositivoALista(dispositivo) {
    const listaDispositivos = document.getElementById('deviceList');
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.innerHTML = `
        <span>${dispositivo.name || 'Desconocido'}</span>
        <button class='btn btn-success btn-sm ml-2' onclick='conectarDispositivo("${dispositivo.id}")'>Conectar</button>
        <button class='btn btn-danger btn-sm ml-2' onclick='desconectarDispositivo("${dispositivo.id}")'>Desconectar</button>
    `;
    listaDispositivos.appendChild(item);
}
