angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', function($http) {
		return {
			get : function() {
				return $http.get('/angular/todos');
			},
			create : function(todoData) {
				return $http.post('/angular/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/angular/todos/' + id);
			}
		}
	});