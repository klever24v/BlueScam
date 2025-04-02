- # 📡 BlueScan
  
  BlueScan es una aplicación web que permite escanear dispositivos Bluetooth cercanos y, si es posible, obtener información sobre su nivel de batería. Está desarrollada con Node.js, Express y usa la Web Bluetooth API para la comunicación con los dispositivos.  
- ## 🚀 ¿Cómo funciona?
  collapsed:: true
	- Abre la aplicación en **Google Chrome** o cualquier navegador basado en Chromium (como Microsoft Edge). ⚠️ **No funciona en Firefox ni Safari**.
	- Presiona el botón **"Buscar Dispositivos"** para escanear dispositivos Bluetooth cercanos.
	- Si se encuentra un dispositivo, aparecerá en la lista.
	- Haz clic en un dispositivo para intentar conectarte y leer su nivel de batería (si es compatible).
- ## 🛠 Tecnologías utilizadas
  collapsed:: true
	- **Node.js** y **Express** → Servidor backend.
	- **EJS** → Para renderizar las vistas en el frontend.
	- **Web Bluetooth API** → Para la conexión y comunicación con dispositivos Bluetooth.
	- **Bootstrap** → Para darle estilo a la interfaz.
	- **Nodemon** → Para facilitar el desarrollo con recarga automática.
- ## 📌 Instalación y ejecución
  collapsed:: true
	- Clona el repositorio:
	    
	  ``  git clone https://github.com/klever24v/BlueScan.git  
	    cd BlueScan  
	  n  
	  ```
	- Instala las dependencias:
	  
	  ```
	  npm install  
	  ```
	- Inicia el servidor con Nodemon:
	  
	  ```
	  nodemon --legacy-watch src/index.js  
	  ```  
	- Abre **Google Chrome** y accede a:
	  👉 http://localhost:5000  
- ## 🔥 Notas Importantes
  collapsed:: true
	- ### Compatibilidad del Navegador
		- **Funciona solo en Google Chrome y otros navegadores basados en Chromium** (como Microsoft Edge).
		- **No es compatible con Firefox ni Safari**, ya que no soportan la Web Bluetooth API.
	- ### Permisos y restricciones
		- Es posible que el navegador te pida permisos para acceder al Bluetooth. ¡Asegúrate de aceptarlos!
		- Algunos dispositivos requieren estar previamente emparejados desde la configuración de Bluetooth del sistema operativo.
- ## 📚 Recursos adicionales
  collapsed:: true
	- [Documentación de la Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
	- [Documentación de Nodemon](https://www.npmjs.com/package/nodemon)
