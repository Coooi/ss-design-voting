(function () {
    'use strict';

    angular.module('spreadShirtApp')

        .service('ApiService', function ($http, $q) {
            var designResults = [],
                loadedPrices = [],
                BASE_URL = "http://api.spreadshirt.net/api/v1",
                SHOP_ENDPOINT = "/shops/",
                DESIGNS_ENDPOINT = "/designs",
                CURRENCIES_ENDPOINT= "/currencies/",
                QUERY_PARAM = "?mediaType=json";
                

            //Services
            return {
                getDesignByShopId: getDesignByShopId,
                getCurrencyById: getCurrencyById
            };

            /**
             * @ngdoc method
             * @name getDesignByShopId
             * @param {object} shop id captured from the interface.
             *
             * @description
             * Responsible for making the request for all the designs available from the shop id parameter.
             *
             */
            function getDesignByShopId(id) {

                var q = $q.defer(),
                    url = BASE_URL + SHOP_ENDPOINT + id + DESIGNS_ENDPOINT + QUERY_PARAM;

                $http({
                    method: 'GET',
                    url: url
                }).then(function (response) {
                    if (response.data && response.data.designs) {
                        designResults = response.data.designs;
                        q.resolve(designResults);
                    } else {
                        designResults = response.data;
                        q.reject(designResults);
                    }
                });

                return q.promise;
            }

            /**
             * @ngdoc method
             * @name getCurrencyById
             * @param {string} id of the currency of each design on the screen.
             * @param {object} designId corresponding the design the following currency to be looked up.
             *
             * @description
             * Responsible for making the request for the currency data based on a currency id.
             *
             */
            function getCurrencyById(id, designId) {

                var q = $q.defer(),
                    url = BASE_URL + CURRENCIES_ENDPOINT + id  + QUERY_PARAM,
                    currencyResponse = {};

                currencyResponse.designId = designId;

                if (loadedPrices.length > 0 && loadedPrices[id]) {
                    currencyResponse.currency = loadedPrices[id];
                    q.resolve(currencyResponse);
                } else {
                    $http({
                        method: 'GET',
                        url: url
                    }).then(function (response) {
                        if (response.data) {
                            if (loadedPrices.length > 0 && loadedPrices[id]) {
                                currencyResponse.currency = loadedPrices[id];
                            } else {
                                loadedPrices[id] = response.data;
                                currencyResponse.currency = loadedPrices[id];
                            }
                            q.resolve(currencyResponse);

                        } else {
                            currencyResponse.errorMsg = "No currency was found.";
                            q.reject(currencyResponse);
                        }
                    });
                }

                return q.promise;
            }

        });
})();