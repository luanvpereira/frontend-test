let _ = require('lodash')

const ieAjaxVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'];

const createXMLHttp = () => {
	let xmlHttp;

	if (typeof XMLHttpRequest !== undefined) {
		xmlHttp = new XMLHttpRequest;
	} else if (window.ActiveXObject) {

		for (let i = 0, max = ieAjaxVersions.length; i < max; i+1) {
			try {
				xmlHttp = new ActiveXObject(ieAjaxVersions[i]);
				break;
			} catch (e) {}
		}
	}

	return xmlHttp;
}

module.exports = (options) => {
	let currentRequest = createXMLHttp();

	options = _.merge({
		url: '',
		method: 'get',
		success: () => {},
		fail: () => {}
	}, options)

	currentRequest.onreadystatechange = () => {
		if(currentRequest.readyState === 4) {
			if(currentRequest.status === 200) {
				options.success(currentRequest.responseText, currentRequest)
			} else {
				options.fail(currentRequest)
			}
		}
	}

	currentRequest.open(options.method, options.url, true);
	currentRequest.send(null);
};