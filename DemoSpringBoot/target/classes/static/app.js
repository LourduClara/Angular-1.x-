  var mainApp = angular.module("mainApp", ['ui.bootstrap']);  
          mainApp.directive('ngConfirmClick', [
             function(){
                 return {
                     link: function (scope, element, attr) {
                         var msg = attr.ngConfirmClick || "Are you sure?";
                         var clickAction = attr.confirmedClick;
                         element.bind('click',function (event) {
                             if ( window.confirm(msg) ) {
                                 scope.$eval(clickAction)
                             }
                         });
                     }
                 };
         }]) ;
         

        
         mainApp.controller('studentController', function($rootScope,$scope,$uibModal,$http) { 
         success();  
         $scope.viewby = 10;
         $scope.totalItems = 3;//$scope.values.length;
         $scope.currentPage = 4;
         $scope.itemsPerPage = $scope.viewby;
         $scope.maxSize = 5; //Number of pager buttons to show

         $scope.setPage = function (pageNo) {
           $scope.currentPage = pageNo;
         };

         $scope.pageChanged = function() {
           console.log('Page changed to: ' + $scope.currentPage);
         };

       $scope.setItemsPerPage = function(num) {
    	   console.log(num);
         $scope.itemsPerPage = num;
         $scope.currentPage = 1; //reset to first page
       }
        	$scope.sortColumn='firstName';
        	$scope.reverseSort=false;
        	$scope.sortData=function(column){
        	    
        		$scope.reverseSort=($scope.sortColumn==column) ? !$scope.reverseSort :$scope.reverseSort;
        		$scope.sortColmn=column;
        		
        	}
        	$scope.getSortClass=function(column){
        		if($scope.sortColumn==column){
        			return $scope.reverseSort ? 'down':'up';
        			}
        		return '';
        	}
        	 
        
        	// $rootScope.values = [{id:1,firstName:'Lourdu',lastName:'clara',email:'claraJeno@gmail.com',ph:'9693873030',bday:'21/05/1995',company:'Newt Global'},{id:2,firstName:'Mary',lastName:'Priyanga',email:'claraJeno@gmail.com',ph:'9693873030',bday:'21/05/1995',company:'Newt Global'}];

                $scope.add= function(){
                	
               	 var modalInstance = $uibModal.open({
        				 templateUrl:'addModal.html',
        				 controller: 'AddCtrl', 
        				 controllerAs: '$ctrl',
        				         			     
        					 });
                 modalInstance.result.then(function (res) {
                	 console.log(res);
                    // $ctrl.selected = selectedItem;
                     success();
                   
                   });
                
                	//$scope.values.push({firstName:$scope.firstName});
                  //  $scope.values.push({firstName:$scope.firstName,lastName:$scope.lastname,email:$scope.email,ph:$scope.ph,bday:$scope.bday,company:$scope.company});

    	        }; 
    	        
    	        
            $scope.submit = function(){  
                $scope.values.push({firstName:$scope.firstName ,done:false});
         
            }; 
            var $ctrl = this;
            $scope.remove= function ($index) {
            	
            	var id=$index+1;
            	$http({
            	    method : 'DELETE',
            	    url : 'http://localhost:9090/all/delete/' + id
            	}).then( success, error );
            		};
            		
            		$scope.edit = function(item){
            			 $ctrl.items =item;
            			 var modalInstance = $uibModal.open({
            				 templateUrl:'editModal.html',
            				 controller: 'ModalInstanceCtrl',
            				 controllerAs: '$ctrl',
            		     resolve: {
            			        items: function () {
            			          return $ctrl.items;
            			        }
            			      }
            			 
            			 });
            			    modalInstance.result.then(function (selectedItem) {
                           	 console.log(selectedItem);
                                $ctrl.selected = selectedItem;
                               
                                $http({
                                  method : "PUT",
                                  url : "http://localhost:9090/all/edit",
                                  data : angular.toJson( $ctrl.selected),
                                  headers : {
                                      'Content-Type' : 'application/json'
                                  }
                              }).then( success, error );
                               
                                
            			    },function(){
            			    	success();
            			    	console.log('ins');
            			    
            			    });
            		}	
            		 function success() {
           			  $http({
           	                 method : 'GET',
           	                 url : 'http://localhost:9090/all/user'
           	             }).then(function successCallback(response) {
           	                 $scope.values = response.data;
           	                 $rootScope.val=$scope.values;
           	                 console.log($scope.values);
           	                 console.log($rootScope.val);
           	                 return $rootScope.val;
           	          	 }, function errorCallback(response) {
           	                 console.log(response.statusText);
           	             });
                    }
             
                    function error(response) {
                        console.log(response.statusText);
                    }	  
                    
                   // $scope.data=$scope.values;
                   
        });
         
         mainApp.controller('ModalInstanceCtrl',  function ($uibModalInstance,$http,$rootScope, $scope,items) {
        	
        	 
        	 var $ctrl = this;
        	  $ctrl.items = items;
        	// console.log(items.firstName);
        	 function success(){
        		 $http({
                     method : 'GET',
                     url : 'http://localhost:9090/all/user'
                 }).then(function successCallback(response) {
                     $scope.values = response.data;
                    // alert('refresh');
                 }, function errorCallback(response) {
                     console.log(response.statusText);
                 });
        	 }
        	 
        	 $ctrl.cancel = function () {
        		// $route.reload();
        		    $uibModalInstance.dismiss('cancel');
        		  };
        		  $ctrl.ok = function (items) {
        			 
        			    $uibModalInstance.close($ctrl.items);
        			    return items;
        			    
                       };
                
         });
         mainApp.controller('AddCtrl',  function ($http,$uibModalInstance,$rootScope,$scope) {
        	 var $ctrl = this;
        	 $ctrl.addCancel = function () {
     		    $uibModalInstance.dismiss('cancel');
     		  };
     		 $scope.reloadRoute = function() {
     			 alert('re');
     			$window.location.reload();
     			   //$route.reload();
     			}
     		 $ctrl.addData = function () {
     			   $uibModalInstance.close($ctrl.items);
     			  $scope.addForm.firstName =$scope.firstName;
                $scope.addForm.lastName = $scope.lastName;
                 $scope.addForm.email = $scope.email;
                 $scope.addForm.ph = $scope.ph;
                 $scope.addForm.company = $scope.company;
                 function success(response) {
                	 console.log(response);
                return response.data;
          		
                   }
            
                   function error(response) {
                       console.log(response.statusText);
                   }
                
                   $http({
                       method : "POST",
                       url : "http://localhost:9090/all/add",
                       data : angular.toJson($scope.addForm),
                       headers : {
                           'Content-Type' : 'application/json'
                       }
                   }).then( success, error );
               };
        
                   	  });
         
    