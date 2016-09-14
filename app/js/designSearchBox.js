function DesignSearchBoxController($scope, $element, $attrs, ApiService, $state, $log) {
    var $ctrl = this,
        LIKED = 1,
        DISLIKED = 2;

    $ctrl.designId = "205909";
    $ctrl.rejectedId = "";
    $ctrl.designsCached = [];
    $ctrl.designs = [];
    $ctrl.votedDesigns = [];


    // $state.go('email-view');

    $ctrl.searchDesigns = function(){
        $ctrl.designs = [];
        $ctrl.designsCached = [];
        if ($ctrl.designId) {
            ApiService.getDesignById($ctrl.designId).then(handleSuccess, handleError);
        }
    };

    $ctrl.getCurrencyById = function(design){
        if (design && design.price && design.price.currency && design.price.currency.id) {
            ApiService.getCurrencyById(design.price.currency.id, design.id).then(handleCurrencySuccess, handleCurrencyError);
        }
    };

    function handleSuccess(designResponse) {
        if (designResponse.length === 0) {
            $ctrl.rejectedId = $ctrl.designId;
        } else {
            $ctrl.rejectedId =  "";
        }
        prepareForRender(designResponse);
    }
    function handleError(errorResponse) {
        $ctrl.rejectedId = $ctrl.designId;
        $log.error('An error occurred when trying to fetch designs data.');
        $log.debug(errorResponse);
    }
    function handleCurrencySuccess(currencyResponse) {
        var design = $ctrl.designsCached[currencyResponse.designId],
            symbol = "$";

        if (currencyResponse.currency && currencyResponse.currency.symbol) {
            symbol = currencyResponse.currency.symbol;
        }
        design.symbol = symbol;
        $ctrl.designs.push(design);
    }
    function handleCurrencyError(errorResponse) {
        $log.debug(errorResponse);
    }
    function prepareForRender(designResponse){

        designResponse.forEach(function(design){
            $ctrl.designsCached[design.id] = design;
            $ctrl.getCurrencyById(design);
        });
        // var objB = _.pick(objA, ['car', 'age']);
    }

    //Voting
    $ctrl.like = function(design) {
        var votedDesign = design;
        votedDesign.vote = LIKED;
        $ctrl.votedDesigns[design.id] = votedDesign;
        $log.debug($ctrl.votedDesigns);
    };
    $ctrl.dislike = function(design) {
        var votedDesign = design;
        votedDesign.vote = DISLIKED;
        $ctrl.votedDesigns[design.id] = votedDesign;
        $log.debug($ctrl.votedDesigns);
    };
}

angular.module('spreadShirtApp').component('designSearchBox', {
    templateUrl: 'views/design_search_box.html',
    controller: DesignSearchBoxController,
    controllerAs: '$ctrl'
});