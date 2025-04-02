document.getElementById('scanButton').addEventListener('click', async () => {
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('errorMessage').textContent = '';
    
    try {
        console.log("Escaneando dispositivos Bluetooth...");

        // Solicita un dispositivo Bluetooth
        const dispositivo = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service'], // Servicio opcional
        });

        console.log(`Dispositivo encontrado: ${dispositivo.name || 'Desconocido'}`);

        // Agrega el dispositivo a la lista en la interfaz
        const listaDispositivos = document.getElementById('deviceList');
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.textContent = `Dispositivo encontrado: ${dispositivo.name || 'Desconocido'}`;
        
        // Evento para conectar al hacer clic en el dispositivo
        item.addEventListener('click', async () => {
            await conectarDispositivo(dispositivo);
        });

        listaDispositivos.appendChild(item);
        
    } catch (error) {
        console.error('Error al escanear dispositivos Bluetooth:', error);
        document.getElementById('errorMessage').textContent = 'Error al escanear dispositivos.';
    } finally {
        document.getElementById('loadingMessage').style.display = 'none';
    }
});

// Función para conectar a un dispositivo y leer la batería
async function conectarDispositivo(dispositivo) {
    try {
        console.log(`Conectando a: ${dispositivo.name || 'Desconocido'}`);
        const server = await dispositivo.gatt.connect(); // Conectar al dispositivo
        const service = await server.getPrimaryService('battery_service'); // Obtener el servicio de batería
        const characteristic = await service.getCharacteristic('battery_level'); // Obtener el nivel de batería
        
        // Leer el valor de la batería
        const value = await characteristic.readValue();
        let batteryLevel = value.getUint8(0);
        
        console.log(`Nivel de batería: ${batteryLevel}%`);

        // Mostrar información en la interfaz
        document.getElementById('deviceInfo').innerHTML = `<p><strong>${dispositivo.name || 'Desconocido'}</strong>: Batería al ${batteryLevel}%</p>`;
        
    } catch (error) {
        console.error('Error al conectar con el dispositivo:', error);
        document.getElementById('errorMessage').textContent = 'Error al conectar con el dispositivo.';
    }
}
