(function(){
    'use strict';
    var AppDependencies = ['ngAnimate'];

    angular
        .module('spreadShirtApp', AppDependencies)

        .config(AppConfiguration);

    function AppConfiguration($locationProvider, $sceProvider) {

        $sceProvider.enabled(false);

        var urlProperties = {enabled: true, requireBase: true};

        $locationProvider.html5Mode(urlProperties).hashPrefix('!');
    }
})();

