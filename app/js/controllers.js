// (function () {
//     'use strict';
//
//     angular.module('spreadShirtApp')

        // .controller('EmailViewCtrl', function (MailService, $stateParams, $timeout, $log) {
        //
        //     var viewCtrl = this;
        //
        //     MailService.getEmail($stateParams.id).then(mailsSuccess, mailsError);
        //
        //     viewCtrl.closeMsg = true;
        //     viewCtrl.email = {};
        //
        //     if ($stateParams.id) {
        //         viewCtrl.emailSelected = true;
        //     }
        //
        //     function mailsError(response) {
        //         $log.error('An error occurred when trying to fetch a email data.');
        //         $log.debug(response);
        //     }
        //
        //     function mailsSuccess(response) {
        //         $timeout(function(){
        //             viewCtrl.closeMsg = false;
        //         }, 20);
        //
        //         viewCtrl.email = response;
        //     }
        // });
// })();