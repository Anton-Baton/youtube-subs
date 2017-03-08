// TODO: enchance

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(`HTTP Error ${response.statusText}`);
	error.status = response.statusText;
	error.response = response;
	console.log(error); // eslint-disable-line no-console
	throw error;
};

const callApi = ({method, url, body}) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		// 'Access-Control-Allow-Origin': '*'
	});
	// TODO: check other options: mode=cors and etc.
	// TODO: fix include and cors when move to the same origin via nginx
	return fetch('http://localhost:8000'+url, {method, body: JSON.stringify(body), headers, credentials:'include', mode:'cors'})
    .then(checkStatus)
    .then(response => response.json())
    .then(response => response.data);
};

export const get = (url) => callApi({method: 'GET', url});

export const post = (url, body) => callApi({method: 'POST', url, body});
