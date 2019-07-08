// only add update server if it's not being run from cli
if (require.main !== module) {
  require('update-electron-app')({
    logger: require('electron-log')
  });
}

const url = require('url');
const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const { app, BrowserWindow } = require('electron');

const debug = /--debug/.test(process.argv[2]);

let mainWindow = null;

function initialize() {
  makeSingleInstance();

  function createWindow() {
    const windowOptions = {
      width: 1080,
      height: 840,
      minWidth: 680,
      minHeight: 500,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    };

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
    }

    mainWindow = new BrowserWindow(windowOptions);
    const electronUrl = debug
      ? process.env.ELECTRON_START_URL
      : url.format({
          pathname: path.join(__dirname, '../build/index.html'),
          protocol: 'file:',
          slashes: true
        });

    mainWindow.loadURL(electronUrl);

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
      // eslint-disable-next-line node/no-unpublished-require
      require('devtron').install();
    }

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

  app.on('ready', () => {
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Require each JS file in the main-process dir

initialize();
