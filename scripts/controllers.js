'use strict';
angular.module('confusionApp')

        .controller('MenuController',['$scope', 'menuFactory',function($scope, menuFactory) {
           
            $scope.tab = 1;
            $scope.showDetails = false;
            $scope.filtText = '';
            $scope.showMenu = false;
            $scope.showPromotions = false;
            $scope.message = "Loading ...";
                menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });   //query() will return the particular arr from API $resource
        
            
                menuFactory.getPromotion().query(
                function(response) {
                    $scope.promotion = response;
                    $scope.showPromotions = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
             $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])
    
    .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])

       
    .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            $scope.feedback={};
            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                        $scope.invalidChannelSelection = true;
                        console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
        
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
//            menuFactory.getDish(parseInt($stateParams.id,10))
//            .then(
//                function(response){
//                    $scope.dish = response.data;
//                    $scope.showDish=true;
//                },
//                function(response) {
//                    $scope.message = "Error: "+response.status + " " + response.statusText;
//                }
//            );
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
            
            $scope.storeVal='';
            $scope.filtText="";
            $scope.checkString=function(recieveVal){
                if(recieveVal=="rating")
                    $scope.filtText="rating";
                else if(recieveVal=="date")
                    $scope.filtText="date";
                else if(recieveVal=="author")
                    $scope.filtText="author";
                else if(recieveVal=="rating")
                    $scope.filtText="-rating";
                else if(recieveVal=="-author")
                    $scope.filtText="-author";
                else if(recieveVal=="-date")
                    $scope.filtText="-date";
                else
                    $scope.filtText="";
            }
            
        }])
    
       .controller('IndexController',['$scope','menuFactory','corporateFactory',function($scope,menuFactory,corporateFactory){
       //    $scope.dish={};    removed since by using ng-resource module, inititally dish will be empty 
           $scope.showDish = false;
           $scope.showPromotion = false;
           $scope.showLeader = false;
           $scope.message="Loading ...";
           $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
           
           $scope.promotion = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.promotion = response;
                                $scope.showPromotion = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

           $scope.leader = corporateFactory.getLeaders().get({id:3})
                        .$promise.then(
                            function(response){
                                $scope.leader = response;
                                $scope.showLeader = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
           
           
//           $scope.promotion=menuFactory.getPromotion(0);
//           $scope.leader=corporateFactory.getLeader(3);
           
       }])
        
       

        .controller('AboutController',['$scope','corporateFactory',function($scope , corporateFactory){
            //$scope.leadership= corporateFactory.getLeaders();
            $scope.showLeaders=false;
            $scope.leadership=corporateFactory.getLeaders().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        }])

        .controller('DishCommentController', ['$scope', '$stateParams','menuFactory', function($scope,$stateParams,menuFactory){
            
            $scope.form1 = {name: null, rating: 5, text: null};
            var radioObj=[
                {id:"1"},
                {id:"2"},
                {id:"3"},
                {id:"4"},
                {id:"5"}
                
            ];
            $scope.radioObj=radioObj;
            
            var createdObj={
               rating:5,
               comment:"",
               author:"",
               date:""
            };
            $scope.createdObj=createdObj;
            
            $scope.getSelectedVal = function(value){
                $scope.createdObj.rating=value;
            }
           
            $scope.submitComment = function () {
                
                $scope.createdObj.author=$scope.form1.name;
                $scope.createdObj.rating=$scope.form1.rating;
                $scope.createdObj.comment=$scope.form1.text;
                $scope.createdObj.date=new Date().toISOString();
                $scope.dish.comments.push($scope.createdObj);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.createdObj = {rating:5,comment:"",author:"",date:""};
                $scope.form1 = {name: null, rating: 5, text: null};
                $scope.commentForm.$setPristine();
                
            }
            
        }])
    // implement the IndexController and About Controller here



;