        (function () {
            // Retrieve remote BrowserWindow
            const {BrowserWindow} = require('electron').remote

            function init() {
            
            var window = BrowserWindow.getFocusedWindow();
            if(window.isMaximized()){
		document.getElementById("wm-window").classList.remove("framed");
		document.getElementById("wm-window-title").classList.remove("framed");
            }else{
		document.getElementById("wm-window").classList.add("framed");
		document.getElementById("wm-window-title").classList.add("framed");
		//var element = document.getElementById('wm-window');
                //element.classList.add('framed');
            }
            
                // Minimize task
                document.getElementById("minimize").addEventListener("click", (e) => {
                    var window = BrowserWindow.getFocusedWindow();
                    window.minimize();
                });

                // Maximize window
                document.getElementById("maximize").addEventListener("click", (e) => {
                    var window = BrowserWindow.getFocusedWindow();
                    if(window.isMaximized()){
                        window.unmaximize();
			document.getElementById("maximize").classList.remove("restore");
			document.getElementById("wm-window").classList.add("framed");
		        document.getElementById("wm-window-title").classList.add("framed");
                    }else{
                        window.maximize();
			document.getElementById("maximize").classList.add("restore");
			document.getElementById("wm-window").classList.remove("framed");
		        document.getElementById("wm-window-title").classList.remove("framed");
                    }
                });

                // Close app
                document.getElementById("close").addEventListener("click", (e) => {
                    var window = BrowserWindow.getFocusedWindow();
                    window.close();
                });
            };

            document.onreadystatechange =  () => {
                if (document.readyState == "complete") {
                    init();
                }
            };
        })();
