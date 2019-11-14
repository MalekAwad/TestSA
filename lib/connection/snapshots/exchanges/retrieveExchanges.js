const axios = require('axios');

module.exports = (() => {
	'use strict';

	/**
	 * Executes an HTTP request for exchange metadata.
	 *
	 * @function
	 * @returns {Promise<ExchangeMetadata[]>}
	 */
	function retrieveExchanges() {
		return Promise.resolve()
			.then(() => {
				const options = {
					url: `https://instruments-prod.aws.barchart.com/exchanges`,
					method: 'GET'
				};

				return Promise.resolve(axios(options))
					.then((response) => {
						const results = response.data || [ ];

						return results.map((result) => {
							const metadata = { };

							metadata.id = result.id;
							metadata.description = result.description;
							metadata.timezones = { };

							metadata.timezones.local = result.timezoneLocal || null;
							metadata.timezones.ddf = result.timezoneDdf || null;

							return metadata;
						});
					});
			});
	}

	/**
	 * Exchange metadata
	 *
	 * @typedef ExchangeMetadata
	 * @type {Object}
	 * @property {String} id
	 * @property {String} description
	 * @property {String} timezone
	 */

	return retrieveExchanges;
})();