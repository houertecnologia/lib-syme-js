import Syme from './index.js';

(async () => {

	const messager = new Syme('http://localhost:8080/message', 'KVx6RU5Lc1w9VGVzdGU9Ki50aCJNJzcK', 'exchange-syme', 'Houer Syme').toggleDebug();

	try {
	
		const output = await messager.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", '#', null, "User", "warning", null, {"test": true});

		console.log(output.status, output.statusText, output.data, JSON.stringify(output.headers));

	} catch (e) {

		console.log(e);

	}

})();
