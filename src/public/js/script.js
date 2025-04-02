document.getElementById('scanButton').addEventListener('click', async () => {
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('errorMessage').textContent = '';
    try {
        const dispositivo = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service'],
        });

        const listaDispositivos = document.getElementById('deviceList');
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.textContent = `Dispositivo encontrado: ${dispositivo.name || 'Desconocido'}`;
        listaDispositivos.appendChild(item);
    } catch (error) {
        console.error('Error al escanear dispositivos Bluetooth:', error);
        document.getElementById('errorMessage').textContent = 'Error al escanear dispositivos.';
    } finally {
        document.getElementById('loadingMessage').style.display = 'none';
    }
});