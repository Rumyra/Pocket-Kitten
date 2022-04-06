// TODO: you will implement this!
const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow;app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
const fs = require('fs');
const path = require('path');
const jQuery = require('jquery');
const username = require('username');
var sudo = require('sudo-prompt');
var DecompressZip = require('decompress-zip');

let mainWindow = null

app.on('ready', () => {
  console.log('The application is ready.')

  mainWindow = new BrowserWindow({icon: 'icon.png', frame: false})

  mainWindow.loadURL('file://' + path.join(__dirname, 'framlr.html'))

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
