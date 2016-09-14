(function () {
    'use strict';

    angular.module('spreadShirtApp')

        .service('ApiService', function ($http, $q) {
            var designResults = [],
                baseURL = "http://api.spreadshirt.net/api/v1",
                shopsEndPoint = "/shops/",
                designsEndPoint = "/designs",
                currenciesEndPoint= "/currencies/",
                queryParams = "?mediaType=json",
                loadedPrices = [];

            //Services
            return {
                getDesignById: getDesignById,
                getCurrencyById: getCurrencyById
            };

            function getDesignById(id) {

                var q = $q.defer(),
                    url = baseURL + shopsEndPoint + id + designsEndPoint + queryParams;

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

            function getCurrencyById(id, designId) {

                var q = $q.defer(),
                    url = baseURL + currenciesEndPoint + id  + queryParams,
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