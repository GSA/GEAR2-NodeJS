'use strict';

angular.module('admin-detail', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin-detail/:id', {
      templateUrl: 'views/admin-detail/admin-detail.html',
      controller: 'AdminDetailCtrl'
    });
  }])
  .controller('AdminDetailCtrl', ['$scope', '$http', '$route', '$location',
    '$routeParams',
    function($scope, $http, $route, $location, $routeParams) {
      $http({
          method: 'GET',
          url: '/ua'
        })
        .success(function(d) {
          $http({
              method: 'GET',
              url: '/api/v0.1/fisma/' + $routeParams.id
            })
            .success(function(f) {
              $scope.user = d.user;
              $scope.rows = f.rows;
              var access = $('#edit-form').data('contrib');
              if (d.user && d.user.groups.search(access) < 0) {
                $('#edit-form')
                  .tooltip({
                    title: 'Access insufficient to edit',
                    placement: 'top',
                    trigger: 'click'
                  })
                  .find('.input').attr('disabled', 'disabled');

              }
            });
        });

      var $form = $('#edit-form');
      $form.on('submit', function(ev) {
        ev.preventDefault();
        var id = $('#f_id').val();
        var name = $('#f_name').val();
        var desc = $('#f_desc').val();
        $http({
            method: 'PUT',
            url: '/api/v0.1/fisma/' + $routeParams.id,
            data: {
              id: id,
              name: name,
              desc: desc
            }
          })
          .success(function(f) {
            alert("Saved. One record affected.");
            $('.cancel').val('Back');
          });
      });
      $('#delete-btn').on('click', function(ev) {
        ev.preventDefault();
        var id = $('#f_id').val();
        $http({
            method: 'DELETE',
            url: '/api/v0.1/fisma/' + $routeParams.id
          })
          .success(function(f) {
            alert("DELETED!\n\nRecord has been deleted.");
            $('#delete-btn')
              .removeClass('btn-danger')
              .addClass('btn-info')
              .val('Undo');

            $('.input').attr('disabled', 'disabled');
            $('.cancel').val('Back');
          });
      });

      $('.cancel').on('click', function(ev) {
        ev.preventDefault();
        $location.path('/admin');
        $route.reload();
      });
    }
  ]);
