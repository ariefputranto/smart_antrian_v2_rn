global.url = 'http://localhost:3000'
global.url_ws = 'ws://localhost:3000'
if (Platform.OS !== 'ios') {
  global.url = 'http://192.168.1.3:3000'
	global.url_ws = 'ws://192.168.1.3:3000'
}

global.url_service_provider = url + '/public/uploads/'