(function (angular) {


    'use strict';


    angular
        .module('todoApp')
        .directive('todoPaginatedList', [todoPaginatedList])
        .directive('pagination', [pagination]);


    /**
     * Directive definition function of 'todoPaginatedList'.
     */
    function todoPaginatedList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/templates/todo.list.paginated.html',
            scope: {},
            controller: ['$scope', '$http', controller],
        };


        function controller($scope, $http) {

            $scope.todos = [];
            
            $http.get('api/Todo/Todos').then(response => $scope.todos = response.data);
        }


        return directive;
    }



    /**
     * Directive definition function of 'pagination' directive.
     */
    function pagination() {
        return { 
            restrict: 'E',
            templateUrl: 'app/templates/pagination.html',
            scope: {
                currentPage: '=',
                offset: '=',
                pageLimit: '=',
                pageLimits: '=',
                total: '=',
                onUpdate: '&'
            },
            bindToController: true,
            controller: controller,
            controllerAs: 'pagination',
        };
    }

    function controller() {

        var self = this;

        self.currentPage = self.currentPage || 0;
        self.pageLimit = self.pageLimit || self.pageLimits[0];



        //Function to set items per page
        self.setItemsPerPages = function (max) {

            self.pageLimit = max >= self.total ? self.total : max;
            self.currentPage = 0;
            self.offset = 0;

            callback();
        };



        //Function to set current page based on input value
        self.gotoPage = function (pageNumber) {

            self.currentPage = pageNumber;
            self.offset = self.currentPage * self.pageLimit;

            callback();
        };



        //Function to navigate to first page
        self.gotoFirstPage = function () {

            self.currentPage = 0;
            self.offset = self.currentPage * self.pageLimit;

            callback();
        };



        //Function to navigate to last page
        self.gotoLastPage = function () {

            var lastPageNumber = self.getTotalPages() - 1;

            self.currentPage = lastPageNumber;
            self.offset = self.currentPage * self.pageLimit;

            callback();
        };



        //Function to navigate to next page
        self.gotoNextPage = function () {

            self.currentPage += 1;
            self.offset = self.currentPage * self.pageLimit;

            callback();
        };



        //Function to navigate to previous page
        self.gotoPreviousPage = function () {

            self.currentPage -= 1;
            self.offset = self.currentPage * self.pageLimit;

            callback();
        };



        //Function calculate total number of pages
        self.getTotalPages = function () {

            var numberOfPages = 0;

            if (self.pageLimit == 'all') { numberOfPages = 1 }
            else { numberOfPages = Math.ceil(self.total / self.pageLimit) }

            return numberOfPages;
        };



        //Function to verify if the current page is the last page
        self.isCurrentPageLimit = function (value) { return self.pageLimit == value; };

        //Update pagination
        function callback() { if (self.onUpdate) self.onUpdate(); };
    }

})(angular);

