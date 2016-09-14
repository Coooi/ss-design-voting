(function(){
    'use strict';
    var AppDependencies = [
        'ui.router'
    ];

    angular
        .module('spreadShirtApp', AppDependencies)

        .config(AppConfiguration);

    function AppConfiguration($locationProvider, $sceProvider, $stateProvider, $httpProvider) {

        $sceProvider.enabled(false);

        var urlProperties = {enabled: true, requireBase: true};

        $locationProvider.html5Mode(urlProperties).hashPrefix('!');
        

        // $stateProvider.state('email-view', emailViewState);
    }
})();

