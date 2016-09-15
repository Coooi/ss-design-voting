(function(){
    'use strict';
    var AppDependencies = [
        'ui.router',
        'ngAnimate'
    ];

    angular
        .module('spreadShirtApp', AppDependencies)

        .config(AppConfiguration);

    function AppConfiguration($locationProvider, $sceProvider) {

        $sceProvider.enabled(false);

        var urlProperties = {enabled: true, requireBase: true};

        $locationProvider.html5Mode(urlProperties).hashPrefix('!');
    }
})();

