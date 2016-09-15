function DesignSearchBoxController(ApiService, $log) {
    var $ctrl = this,
        LIKED = 1,
        DISLIKED = 2;

    $ctrl.shopId = "205909";
    $ctrl.rejectedId = "";
    $ctrl.designsCached = [];
    $ctrl.designs = [];
    $ctrl.votedDesigns = [];
    $ctrl.showSpinner = false;
    $ctrl.summary = {};

    /**
     * @ngdoc method
     * @name searchDesigns
     *
     * @description
     * Responsible for triggering the search service by the shop ID from the screen.
     *
     */
    $ctrl.searchDesigns = function(){
        $ctrl.showResults = false;
        $ctrl.designs.length = 0;
        $ctrl.designsCached.length = 0;
        if ($ctrl.shopId) {
            $ctrl.showSpinner = true;
            ApiService.getDesignByShopId($ctrl.shopId).then(handleSuccess, handleError);
        }
    };

    /**
     * @ngdoc method
     * @name getCurrencyById
     * @param {object} design of the currency of each design on the screen.
     *
     * @description
     * Responsible for making the request for the currency data based on a design id.
     *
     */
    $ctrl.getCurrencyById = function(design){
        if (design && design.price && design.price.currency && design.price.currency.id) {
            ApiService.getCurrencyById(design.price.currency.id, design.id).then(handleCurrencySuccess, handleCurrencyError);
        }
    };

    /**
     * @ngdoc method
     * @name getVote
     * @param {string} designId of the current design on the screen.
     *
     * @description
     * Responible for getting the users vote from the votedDesigns array.
     *
     */
    $ctrl.getVote = function(designId){
        var vote = 0;
        if ($ctrl.votedDesigns[designId]) {
            vote = $ctrl.votedDesigns[designId].vote;
        }
        return vote;
    };

    function handleSuccess(designResponse) {
        if (designResponse.length === 0) {
            $ctrl.rejectedId = $ctrl.shopId;
        } else {
            $ctrl.rejectedId =  "";
        }
        prepareForRendering(designResponse);
    }
    function handleError(errorResponse) {
        $ctrl.rejectedId = $ctrl.shopId;
        $ctrl.showSpinner = false;
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
        $ctrl.showSpinner = false;
    }
    function handleCurrencyError(errorResponse) {
        $log.debug(errorResponse);
        $ctrl.showSpinner = false;
    }
    function prepareForRendering(designResponse){
        designResponse.forEach(function(design){
            $ctrl.designsCached[design.id] = design;
            $ctrl.getCurrencyById(design);
        });
    }

    //Voting
    $ctrl.like = function(design) {
        var votedDesign = design;
        votedDesign.vote = LIKED;
        $ctrl.votedDesigns[design.id] = votedDesign;
    };
    $ctrl.dislike = function(design) {
        var votedDesign = design;
        votedDesign.vote = DISLIKED;
        $ctrl.votedDesigns[design.id] = votedDesign;
    };
    $ctrl.finishVoting = function(){
        $ctrl.showResults = true;
        $ctrl.summary.liked = 0;
        $ctrl.summary.disliked = 0;
        $ctrl.designs.length = 0;

        var votes = $ctrl.votedDesigns;
        $ctrl.summary.totalVotes = Object.keys(votes).length;
        for (var key in votes) {
            if (votes.hasOwnProperty(key) && votes[key].vote) {
                var design = votes[key];
                if (design.vote === LIKED) {
                    $ctrl.summary.liked += 1;
                } else {
                    $ctrl.summary.disliked += 1;
                }
            }
        }
    };
}

angular.module('spreadShirtApp').component('designSearchBox', {
    templateUrl: 'views/design_search_box.html',
    controller: DesignSearchBoxController,
    controllerAs: '$ctrl'
});