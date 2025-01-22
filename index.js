/**
 * Syme - Lib JS
 */

/**
 * External Dependencies
 */
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

class SymeMessage {

	constructor (id, message, speak, broker, publishedby, application, level, severity, payload, routingkey, contenttype) {

		this.id = id || uuidv4();
		this.message = message || 'Undefined Syme Message';
		this.speak = speak || false;
		this.broker = broker || 'exchange-error';
		this.publishedat = new Date().toISOString();
		this.publishedby = publishedby || 'Undefined Syme Publisher';
		this.application = application || 'Syme JS Lib';
		this.level = level || 'info';
		this.severity = severity || 'Feature';
		this.routingkey = routingkey || '#';
		this.contenttype = contenttype || 'text/plain';

		if (payload instanceof Object) {

			this.payload = JSON.stringify(payload);

		} else {

			this.payload = payload || null;

		}

		return this;

	}

}

class Syme {

	#url;
	#apikey;
	#broker;
	#application;
	#debug;

	/**
	 * 
	 */
	constructor (url, apikey, broker, application) {

		this.setUrl(url);
		this.setApiKey(apikey);
		this.setBroker(broker);
		this.setApplication(application);

		this.debug = false;

		return this;

	}

	/**
	 * Private Method
	 */
	async #fetch (message) {

		if ((!message) || (!(message instanceof SymeMessage))) {

			throw new Error('Message is required! And must be an instance of SymeMessage');

		} else if (this.debug === true) {

			console.log(JSON.stringify(message));

		}

		try {

			return await axios({
				url: this.url,
				method: 'POST',
				timeout: 5000,
				data: JSON.stringify(message),
				headers: {
					'Content-Type': 'application/json',
					'X-Syme-ApiKey': this.apikey
				}
			});

		} catch (fetchError) {

			throw fetchError;

		}

	}

	/**
	 * 
	 */
	setUrl (url) {

		if (!url) {

			throw new Error('Syme URL must be a valid URL!');

		} else {

			this.url = url;

		}

		return this;

	}

	/**
	 * 
	 */
	setApiKey (apikey) {

		if (!apikey) {

			throw new Error('Syme API Key must be a defined!');

		} else {

			this.apikey = apikey;

		}

		return this;

	}

	/**
	 * 
	 */
	setBroker (broker) {

		if (!broker) {

			throw new Error('Syme Broker must be defined!');

		} else {

			this.broker = broker;

		}

		return this;

	}

	/**
	 * 
	 */
	setApplication (application) {

		if (!application) {

			throw new Error('Syme Application must be defined!');

		} else {

			this.application = application;

		}

		return this;

	}

	/**
	 * 
	 */
	toggleDebug () {

		this.debug = !this.debug; 

		return this;

	}

	/**
	 * 
	 */
	async send (message, speak, routingkey, contenttype, publishedby, level, severity, payload) {

		if ((!message) || (message === "")) {

			throw new Error('To send a message with Syme, message must be defined!');

		}

		const input = new SymeMessage(null, message, speak, this.broker, publishedby, this.application, level, severity, payload, routingkey, contenttype);

		try {

			return await this.#fetch(input);

		} catch (fetchError) {

			throw fetchError;

		}

	}

	/**
	 * 
	 */
	async sendError (message, routingkey, contenttype, publishedby, payload) {

		if ((!message) || (message === "")) {

			throw new Error('To send a message error with Syme, message must be defined!');

		}

		const input = new SymeMessage(null, message, true, this.broker, publishedby, this.application, "error", "Minor", payload, routingkey, contenttype);

		try {

			return await this.#fetch(input);

		} catch (fetchError) {

			throw fetchError;

		}

	}

	/**
	 * 
	 */
	async sendEmergency (message, routingkey, contenttype, publishedby, payload) {

		if ((!message) || (message === "")) {

			throw new Error('To send a message emergency with Syme, message must be defined!');

		}

		const input = new SymeMessage(null, message, true, this.broker, publishedby, this.application, "emerg", "Block", payload, routingkey, contenttype);

		try {

			return await this.#fetch(input);

		} catch (fetchError) {

			throw fetchError;

		}

	}

}

export default Syme;
