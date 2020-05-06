/* eslint-disable */

// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('BusinessController', ['$route',
  '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', '$window',
  // insert new here
  'OrganizationsSrc', 'CapabilitiesSrc', 'CapabilitiesSSOSrc', 'CapApplicationsSrc',
  'CapAppCountsSrc', 'OrgAppsSrc', 'InterfacesSrc',
  // resume legacy
  'BusFunction', 'OrgAppMap', 'OrgGoalMap', 'OrgSysMap', 'System',
  'Application', 'Interface', 'FuncAppMap', 'Goal', 'TIME',
  'bstSearchUtils', 'Utils',
  function($route, $scope, $http, $routeParams, $filter, $location, $sce, $window,
    // insert new here
    OrganizationsSrc, CapabilitiesSrc, CapabilitiesSSOSrc, CapApplicationsSrc, CapAppCountsSrc,
    OrgAppsSrc, InterfacesSrc,
    // resume legacy
    BusFunction, OrgAppMap, OrgGoalMap, OrgSysMap, System, Application,
    Interface, FuncAppMap, Goal, TIME, bstSearchUtils, Utils) {

    $scope.rootPath = '';
    $scope.bstData = [];
    $scope.$bstEl = null;
    $scope.bstFilter = {};
    $scope.tableFilterList = [];
    $scope.hasUsedSearchForm = false;

    // Method for Organizations table
    $scope.createOrgTable = function() {

      $scope.$bstEl = $('#orgtable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/organizations';

      var organs = [];
      var organizations = OrganizationsSrc.query();
      organizations.$promise.then(function(populateData) {
        $scope.bstData = [];
        $.each(organizations, function(key, val) {
          if ([val.Name] != "External" && [val.Name] !=
            "FAS Enterprise") {
            var description = val.Description;
            if ([val.Link] != "") {
              var name = "<a href=\"" + val.Link +
                "\" target=\"_blank\">" + val.Name + "</a>";
            } else {
              var name =  val.Name;
            }
            var displayName = val.DisplayName;
            var parent = val.Parent;
            var id = val.Id;
            $scope.bstData.push({
              "DisplayName": displayName,
              "Name": name,
              "Description": description,
              "Parent": parent,
              Id: id
            });
          }
        });
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
            field: 'Parent',
            title: 'Parent',
            sortable: true
          }, {
            field: 'DisplayName',
            title: 'Short Name',
            sortable: true
          }, {
            field: 'Name',
            title: 'Organization Name',
            sortable: true
          }, {
            field: 'Description',
            title: 'Description',
            sortable: true
          }],
          data: $scope.bstData
        };
        bstSearchUtils.updateConfig($scope);
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
        bstSearchUtils.handleSearchState($scope);
      });
    }

    // Method to handle click events on the Organizations table
    $('#orgtable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        //   var orgpath =  row.Id;
        //      orgpath = orgpath.replace(/\//g , "-%")
        $location.path('/organizations/' + row.Id);
        $route.reload();
      }
    });

    // Method for retrieving a single organization's details
    $scope.createOrgDetail = function() {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      });
      var organization = OrganizationsSrc.query({
        id: $routeParams.id
      });
      var application = OrgAppsSrc.query({
        id: $routeParams.id
      });

      organization.$promise.then(function() {
        $.each(organization, function(key, org) {
          if (org.Id == $routeParams.id) {
            $scope.orgId = org.Id;
            $scope.orgName = org.Name;
            $scope.orgDescription = org.Description;
            $scope.orgParent = org.Parent;

            application.$promise.then(function() {
              var re = /^.*? -/;
              var re2 = /\(\w?\)/;
              if (re2.test(org.Name)) {
                var tempname = re.exec(org.Name);
                var interfaces = InterfacesSrc.query({
                  owner: tempname[0]
                });
                $scope.tempname = tempname;
              } else {
                var interfaces = InterfacesSrc.query({
                  owner: org.Name
                });
                $scope.tempname = org.Name;
              }

              interfaces.$promise.then(function() {
                $.each(application, function(i, app) {
                  // if (app.Owner == org.Name)
                  //   {//org.DisplayName
                  $.each(interfaces, function(i,
                    iface) {
                    if (iface.AppID1 == app.Id ||
                      iface.AppID2 == app.Id) {
                      d3.select("#interfaces-tab")
                        .style("display",
                          "block");
                    }
                  });
                  // };
                });
              });
            });
          };
        });
      });
    };


    // Method for retrieving a single organization's related goals
    /* $scope.getRelatedGoals = function(orgId) {
    // Use the Application 'get' method to send an appropriate GET request
    var goalmap = OrgGoalMap.query();
    var goallist = [];
    goalmap.$promise.then(function (populateData) {
      $.each(goalmap, function (key, val) {
        if ([val.Orgid] == orgId) {
          goallist.push(val.Goalid);
        }
      });
      var goal = Goal.query();
      goal.$promise.then(function (populateData) {
        var orggoalnames = [];
        for (var i = 0; i < goal.length; i++) {
          var tmpgoalsid = goallist[i];
          for (var ind = 0; ind < goal.length; ind++) {
            var tmpgoalid = goal[ind].Id;
            if (tmpgoalsid === tmpgoalid) {
              orggoalnames.push({"Name" : goal[ind].Name, "Description" : goal[ind].Description, "SupportedGoal" : goal[ind].ParentGoal});
            }
            else {
              continue
            }
          }
        }

        $('#orggoaltable').bootstrapTable({
          columns: [{
            field: 'Name',
            title: 'Name',
            sortable: true
          }, {
            field: 'Description',
            title: 'Description',
            sortable: true
          }, {
            field: 'SupportedGoal',
            title: 'Supported Goal',
            sortable: true,
          }],
          data: orggoalnames
        });
      });
    });
  }
*/
    // Method for retrieving a single organization's related Applications
    $scope.getRelatedSys = function(orgId) {
      // Use the Application 'get' method to send an appropriate GET request
      var appmap = OrgAppsSrc.query({
        id: orgId
      }) //OrgAppMap.query();
      var applist = [];
      //   appmap.$promise.then(function (populateData) {
      // $.each(appmap, function (key, val) {
      // if ([val.Orgid] == orgId) {
      // applist.push(val.Appid);
      // }
      // });
      // var app = Application.query();

      appmap.$promise.then(function(populateData) {
        // var orgappnames = [];
        // for (var i = 0; i < app.length; i++) {
        // var tmpappsid = applist[i];
        // for (var ind = 0; ind < app.length; ind++) {
        // var tmpappid = app[ind].Id;
        // if (tmpappsid === tmpappid
        // && app[ind].Type.toLowerCase() !== 'website') {
        // orgappnames.push({"Name" : app[ind].Name, "Description" : app[ind].Description, "Id" : app[ind].Id});
        // }
        // else {
        // continue
        // }
        // }
        // }

        $('#orgapptable').bootstrapTable({
          columns: [{
              field: 'Name',
              title: 'Application Name',
              sortable: true
            },
            {
              field: 'Alias',
              title: 'Alias',
              sortable: true,
              visible: false
            },
            {
              field: 'Description',
              title: 'Description',
              sortable: true,
              // visible: false
            },
            {
              field: 'SSOShort',
              title: 'SSO',
              sortable: true,
              visible: false
            },
            {
              field: 'SSO',
              title: 'SSO (Long)',
              sortable: true,
              visible: false
            },
            {
              field: 'Owner',
              title: 'Two Letter Org (Long)',
              sortable: true,
              visible: false
            },
            {
              field: 'OwnerShort',
              title: 'Two Letter Org (Short)',
              sortable: true
            },
            {
              field: 'BusPOC',
              title: 'Business POC',
              sortable: true,
              visible: false
            },
            {
              field: 'TechPOC',
              title: 'Technical POC',
              sortable: true,
              visible: false
            },
            {
              field: 'ParentSystem',
              title: 'Parent System',
              sortable: true,
              visible: false
            },
            {
              field: 'RegionClassification',
              title: 'Region Classification',
              sortable: true,
              visible: false
            },
            {
              field: 'IsRevenueGenerator',
              title: 'Revenue Generator',
              sortable: true,
              visible: false
            },
            {
              field: 'HostingProvider',
              title: 'Hosting Provider',
              sortable: true,
              visible: false
            },
            {
              field: 'Cloud',
              title: 'Cloud',
              sortable: true,
              visible: false
            },
            {
              field: 'TechnologyPlatform',
              title: 'Platform',
              sortable: true,
              visible: false
            },
            {
              field: 'FY14',
              title: 'FY14',
              visible: false
            },
            {
              field: 'FY15',
              title: 'FY15',
              visible: false
            },
            {
              field: 'FY16',
              title: 'FY16',
              visible: false
            },
            {
              field: 'FY17',
              title: 'FY17',
              visible: false
            },
            {
              field: 'FY18',
              title: 'FY18',
              visible: false
            },
            {
              field: 'FY19',
              title: 'FY19',
              visible: false
            },
            {
              field: 'FY20',
              title: 'FY20',
              visible: false
            },
            {
              field: 'FY21',
              title: 'FY21',
              visible: false
            },
            {
              field: 'Notes',
              title: 'Notes',
              visible: false

            },
            {
              field: 'Status',
              title: 'Status',
              sortable: true,
              visible: false
            },
            {
              field: 'ProdYear',
              title: 'Production Year',
              sortable: true,
              visible: false
            },
            {
              field: 'FISMASystem',
              title: 'FISMA System',
              sortable: true,
              visible: false
            },
            {
              field: 'HelpDesk',
              title: 'Help Desk',
              sortable: true,
              visible: false
            },
            // {
            // field: 'Id',
            // title: 'Id',
            // sortable: true,
            // visible: false
            // },
            {
              field: 'Investment',
              title: 'Investment',
              sortable: true,
              visible: false

            },
            {
              field: 'OMBUID',
              title: 'Application ID',
              sortable: true,
              visible: false
            }

            // {
            // field: 'Id',
            // title: 'Id',
            // sortable: true,
            // visible: false
            // }
          ],
          data: appmap //orgappnames
        });
      });
      //  });
    }

    // Method to handle click events on the Organizational application table
    $('#orgapptable').on('click-row.bs.table', function(e, row, $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        var apppath = row.Id
        //        apppath = apppath.replace(/\//g , "-%")
        $location.path('/applications/' + apppath);
        $route.reload();
      }
    });

    // Method for Business Functions Table
    $scope.createFuncTable = function() {
      $scope.$bstEl = $('#capabilitytable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/capabilities';

      var capabilities = CapabilitiesSrc.query();
      capabilities.$promise.then(function(populateData) {
        $scope.bstData = [];
        $scope.bstData = capabilities;
        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
              field: 'ReferenceNum',
              title: 'Ref Id',
              sortable: true
            }, {
              field: 'Name',
              title: 'Function Name',
              sortable: true
            }, {
              field: 'Description',
              title: 'Description',
              sortable: true
            }, {
              field: 'Parent',
              title: 'Parent',
              sortable: true
            }
            // , {
            // field: 'Id',
            // title: 'Id',
            // sortable: true,
            // visible: false
            // }
          ],
          data: $scope.bstData
        };
        bstSearchUtils.updateConfig($scope);
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
        bstSearchUtils.handleSearchState($scope);
      });
    }

    $('#capabilitytable').on('click-row.bs.table', function(e, row,
      $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        $location.path('/capabilities/' + row.Id);
        $route.reload();
      }
    });


    // Method for Business Functions by SSO Table
    $scope.createFuncSSOTable = function() {
      $scope.$bstEl = $('#capabilityssotable');
      $scope.hasUsedSearchForm = false;
      $scope.rootPath = '/capabilities_by_sso';

      var capSSOs = CapabilitiesSSOSrc.query();

      capSSOs.$promise.then(function(populateData) {
        // Grab everything if no routeParams
        if ($.isEmptyObject($routeParams)) {
          $scope.bstData = capSSOs;
        } else {
          // Grab capabilities that include SSO
          $.each(capSSOs, function(key, val) {
            if (String(val.Organization).includes($routeParams.name)) {
              $scope.bstData.push({
                "ReferenceNum": val.ReferenceNum,
                "Name": val.Name,
                "Description": val.Description,
                "ParentCap": val.ParentCap,
                "Organization": val.Organization
              });
            }
          });
        }

        bstSearchUtils.checkFilterState($scope);
        $scope.bsTableConfig = {
          columns: [{
              field: 'ReferenceNum',
              title: 'Ref Id',
              sortable: true
            }, {
              field: 'Name',
              title: 'Function Name',
              sortable: true
            }, {
              field: 'Description',
              title: 'Description',
              sortable: true
            }, {
              field: 'ParentCap',
              title: 'Parent',
              sortable: true
            }, {
              field: 'Organization',
              title: 'SSO',
              sortable: true
            }
          ],
          data: $scope.bstData
        };
        bstSearchUtils.updateConfig($scope);
        $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
        bstSearchUtils.handleSearchState($scope);
      });
    }

    $('#capabilityssotable').on('click-row.bs.table', function(e, row,
      $element) {
      // note: this :has selector cannot be cached; done this way to get
      // around caching & DOM availabily issues
      if (!!$(
          '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
        ).length) {
        $location.path('/capabilities/' + row.Id);
        $route.reload();
      }
    });


    $scope.removePag = function() {
      $(".report").attr("data-pagination", false);
    }

    // Method for creating the Org Chart view
    $scope.createOrgChart = function() {
      var orgs = OrganizationsSrc.query();
      var parentorg = 'Office of the Administrator (A)';
      var orgTree = {};

      orgs.$promise.then(function(populateData) {
        // set root node
        $.each(orgs, function(i, org) {
          if (org.Name == parentorg) {
            orgTree = {
              name: org.Name,
              identity: org.Id,
              displayName: org.DisplayName,
              description: org.Description,
              link: org.Link,
              children: []
            };
          }
        });
        // set first-level children
        $.each(orgs, function(i, org) {
          if (org.Parent == orgTree.name) {
            orgTree.children.push({
              name: org.Name,
              identity: org.Id,
              displayName: org.DisplayName,
              parent: org.Parent,
              description: org.Description,
              link: org.Link,
              children: []
            });
          }
        });
        // set second-level children
        $.each(orgTree.children, function(i, firstLevelOrg) {
          $.each(orgs, function(i, org) {
            if (org.Parent == firstLevelOrg.name) {
              firstLevelOrg.children.push({
                name: org.Name,
                identity: org.Id,
                displayName: org.DisplayName,
                parent: org.Parent,
                description: org.Description,
                link: org.Link,
                children: []
              });
            }
          });
        });
        // set third-level children
        $.each(orgTree.children, function(i, firstLevelOrg) {
          $.each(firstLevelOrg.children, function(i,
            secondLevelOrg) {
            $.each(orgs, function(i, org) {
              if (org.Parent == secondLevelOrg.name) {
                secondLevelOrg.children.push({
                  name: org.Name,
                  identity: org.Id,
                  displayName: org.DisplayName,
                  parent: org.Parent,
                  description: org.Description,
                  link: org.Link,
                  children: []
                });
              }
            });
          });
        });
        // set fourth-level children
        $.each(orgTree.children, function(i, firstLevelOrg) {
          $.each(firstLevelOrg.children, function(i,
            secondLevelOrg) {
            $.each(secondLevelOrg.children, function(i,
              thirdLevelOrg) {
              $.each(orgs, function(i, org) {
                if (org.Parent == thirdLevelOrg.name) {
                  thirdLevelOrg.children.push({
                    name: org.Name,
                    identity: org.Id,
                    displayName: org.DisplayName,
                    parent: org.Parent,
                    description: org.Description,
                    link: org.Link,
                    children: false
                  });
                }
              });
            });
          });
        });

        var m = [20, 120, 20, 120],
          w = 1280 - m[1] - m[3],
          h = 1000 - m[0] - m[2],
          i = 0,
          root;

        var tree = d3.layout.tree()
          .size([h, w])
          .sort(function(a, b) {
            return a.displayName.toLowerCase().localeCompare(b
              .displayName.toLowerCase());
          });

        var diagonal = d3.svg.diagonal()
          .projection(function(d) {
            return [d.y, d.x];
          });

        var vis = d3.select("#orgchart").append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
          .attr("id", "org")
          .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");




        root = orgTree;
        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
          if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
          }
        }
        /*		function showDetail(d){
        var	showDet = d3.select("orgdet");
        showDet.on("mouseover", function(d){
        d3.select("#orgdetail").style("display", "none");
      });
    }  */
        // Initialize the display to show a few nodes.
        root.children.forEach(toggleAll);
        //	toggle(root.children[1]);
        //	toggle(root.children[1].children[2]);
        //	toggle(root.children[9]);
        //	toggle(root.children[9].children[0]);

        update(root);


        function update(source) {
          var duration = d3.event && d3.event.altKey ? 5000 : 500;
          // Compute the new tree layout.
          var nodes = tree.nodes(root).reverse();
          // Normalize for fixed-depth.
          nodes.forEach(function(d) {
            d.y = d.depth * 180;
          });
          // Update the nodes…
          var node = vis.selectAll("g.node")
            .data(nodes, function(d) {
              return d.id || (d.id = ++i);
            });

          // Enter any new nodes at the parent's previous position.
          var nodeEnter = node.enter().append("svg:g")

            .attr("class", "node")


            .attr("transform", function(d) {
              return "translate(" + source.y0 + "," + source.x0 +
                ")";
            })


            .on("click", function(d) {
              toggle(d);
              update(d);
            })

            .on("mouseover", function(d) {
              d3.select("#orgdetail").style("display", "block");
              d3.select("#orgdetailheader").text = "";
              d3.select("#orgdetailbody").text = "";
              $scope.selectedapp = d.identity;
              var b = d3.select("#orgdetailbody")
                .text("");
              var a = d3.select("#orgname")
                .text("");
              var info2 = b.append('text')
                .classed('info2', true)
                .text(d.description);
              var a = d3.select("#orgname");

              if (d.link != null) {
                var info = a.append('a')
                  .classed('info', true)
                  .text(d.name)
                  .attr("href", d.link)
                  .attr("target", "_blank");
              } else {
                var info = a.append('span')
                  .classed('info', true)
                  .text(d.name);
              }

            });

          /*	    .on("mouseout", function() {
      d3.select("#orgdetailbody").select('text.info2').remove();
      d3.select("#orgdetailheader").select('text.info').remove();
      d3.select("#orgdetail").style("display", "none");
    });	    */


          nodeEnter.append("svg:circle")
            .attr("r", 1e-6)

            .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
            });


          nodeEnter.append("svg:text")
            .attr("x", function(d) {
              return d.children || d._children ? -10 : 10;
            })
            .attr("dy", function(d) {
              return d.children || d._children ? "-0.8em" :
                "0.35em";
            })
            .attr("id", function(d) {
              return "textnode-" + d.identity;
            })
            .attr("text-anchor", function(d) {
              return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
              return d.displayName;
            })
            .style("fill-opacity", 1e-6);

          nodeEnter.select('text').attr('x', function(d) {
            var centerPoint = this.getBBox().width / 2,
              offset = d.children || d._children ? centerPoint :
              10;
            return offset;
          });

          // Transition nodes to their new position.
          var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
              return "translate(" + d.y + "," + d.x + ")";
            });

          nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
            });

          nodeUpdate.select("text")
            .style("fill-opacity", 1);

          // Transition exiting nodes to the parent's new position.
          var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
              return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

          nodeExit.select("circle")
            .attr("r", 1e-6);

          nodeExit.select("text")
            .style("fill-opacity", 1e-6);

          // Update the links…
          var link = vis.selectAll("path.link")
            .data(tree.links(nodes), function(d) {
              return d.target.id;
            });

          // Enter any new links at the parent's previous position.
          link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
              var o = {
                x: source.x0,
                y: source.y0
              };
              return diagonal({
                source: o,
                target: o
              });
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);

          // Transition links to their new position.
          link.transition()
            .duration(duration)
            .attr("d", diagonal);

          // Transition exiting nodes to the parent's new position.
          link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
              var o = {
                x: source.x,
                y: source.y
              };
              return diagonal({
                source: o,
                target: o
              });
            })
            .remove();

          // Stash the old positions for transition.
          nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
          var orgdetail = d3.select('#orgdet');
          var orgclose = d3.select('#orgclose');

          orgdetail.on("click", function() {
            var orgpath = $scope.selectedapp;
            //    orgpath = orgpath.replace(/\//g , "-%")
            $location.path('/organizations/' + orgpath);
            $scope.$apply();
          });

          orgclose.on("click", function(d) {
            d3.select("#orgdetail").style("display", "none");
          });


        }

        // Toggle children.
        function toggle(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        }
      });
    }



    // Method for creating the Business Capability Graph View
    $scope.createCapabilityTree = function() {
      var caps = CapabilitiesSrc.query();
      var parentcap = 'Manage GSA';
      var capTree = {};

      caps.$promise.then(function(populateData) {
        // set root node
        $.each(caps, function(i, cap) {
          if (cap.Name == parentcap) {
            capTree = {
              identity: cap.Id,
              name: cap.Name,
              description: cap.Description,
              referenceNum: cap.ReferenceNum,
              children: []
            };
          }
        });
        // set first-level children
        $.each(caps, function(i, cap) {
          if (cap.Parent == capTree.name) {
            capTree.children.push({
              identity: cap.Id,
              name: cap.Name,
              description: cap.Description,
              referenceNum: cap.ReferenceNum,
              parent: cap.Parent,
              children: []
            });
          }
        });
        // set second-level children
        $.each(capTree.children, function(i, firstLevelCap) {
          $.each(caps, function(i, cap) {
            if (cap.Parent == firstLevelCap.name) {
              firstLevelCap.children.push({
                identity: cap.Id,
                name: cap.Name,
                description: cap.Description,
                referenceNum: cap.ReferenceNum,
                parent: cap.Parent,
                children: []
              });
            }
          });
        });
        // set third-level children
        $.each(capTree.children, function(i, firstLevelCap) {
          $.each(firstLevelCap.children, function(i,
            secondLevelCap) {
            $.each(caps, function(i, cap) {
              if (cap.Parent == secondLevelCap.name) {
                secondLevelCap.children.push({
                  identity: cap.Id,
                  name: cap.Name,
                  description: cap.Description,
                  referenceNum: cap.ReferenceNum,
                  parent: cap.Parent,
                  children: []
                });
              }
            });
          });
        });
        // set fourth-level children
        $.each(capTree.children, function(i, firstLevelCap) {
          $.each(firstLevelCap.children, function(i,
            secondLevelCap) {
            $.each(secondLevelCap.children, function(i,
              thirdLevelCap) {
              $.each(caps, function(i, cap) {
                if (cap.Parent == thirdLevelCap.name) {
                  thirdLevelCap.children.push({
                    identity: cap.ID,
                    name: cap.Name,
                    description: cap.Description,
                    referenceNum: cap.ReferenceNum,
                    parent: cap.Parent,
                    children: []
                  });
                }
              });
            });
          });
        });
        // set fifth-level children
        $.each(capTree.children, function(i, firstLevelCap) {
          $.each(firstLevelCap.children, function(i,
            secondLevelCap) {
            $.each(secondLevelCap.children, function(i,
              thirdLevelCap) {
              $.each(thirdLevelCap.children, function(i,
                fourthLevelCap) {
                $.each(caps, function(i, cap) {
                  if (cap.Parent == fourthLevelCap.name) {
                    fourthLevelCap.children.push({
                      identity: cap.ID,
                      name: cap.Name,
                      description: cap.Description,
                      referenceNum: cap.ReferenceNum,
                      parent: cap.Parent,
                      children: false
                    });
                  }
                });
              });
            });
          });
        });

        var m = [20, 120, 20, 120],
          w = 1280 - m[1] - m[3],
          h = 1000 - m[0] - m[2],
          i = 0,
          root;

        var tree = d3.layout.tree()
          .size([h, w])
          .sort(function(a, b) {
            return a.referenceNum.localeCompare(b.referenceNum);
          });

        var diagonal = d3.svg.diagonal()
          .projection(function(d) {
            return [d.y, d.x];
          });

        var vis = d3.select("#buschart").append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
          .attr("id", "org")
          .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        root = capTree;
        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
          if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
          }
        }

        // Initialize the display to show a few nodes.
        root.children.forEach(toggleAll);

        update(root);

        function update(source) {
          var duration = d3.event && d3.event.altKey ? 5000 : 500;
          // Compute the new tree layout.
          var nodes = tree.nodes(root).reverse();
          // Normalize for fixed-depth.
          nodes.forEach(function(d) {
            d.y = d.depth * 180;
          });
          // Update the nodes…
          var node = vis.selectAll("g.node")
            .data(nodes, function(d) {
              return d.id || (d.id = ++i);
            });

          // Enter any new nodes at the parent's previous position.
          var nodeEnter = node.enter().append("svg:g")

            .attr("class", "node")

            .attr("transform", function(d) {
              return "translate(" + source.y0 + "," + source.x0 +
                ")";
            })

            .on("click", function(d) {
              toggle(d);
              update(d);
            })

            .on("mouseover", function(d) {
              d3.select("#funcdetail").style("display", "block");
              d3.select("#funcdetailheader").text = "";
              d3.select("#funcdetailbody").text = "";
              $scope.selectedcap = d.identity;
              var b = d3.select("#funcdetailbody")
                .text("");
              var a = d3.select("#funcname")
                .text("");
              var info2 = b.append('text')
                .classed('info2', true)
                .text(d.description);
              var a = d3.select("#funcname");

              var info = a.append('span')
                .classed('info', true)
                .text(d.name + " (" + d.referenceNum + ")");
            });

          nodeEnter.append("svg:circle")
            .attr("r", 1e-6)

            .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
            });

          nodeEnter.append("svg:text")
            .attr("x", function(d) {
              return d.children || d._children ? -10 : 10;
            })
            .attr("dy", function(d) {
              return d.children || d._children ? "-0.8em" :
                "0.35em";
            })
            .attr("id", function(d) {
              return "textnode-" + d.identity;
            })
            .attr("text-anchor", function(d) {
              return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
              return d.name;
            })
            .style("fill-opacity", 1e-6);

          nodeEnter.select('text').attr('x', function(d) {
            var centerPoint = this.getBBox().width / 2,
              offset = d.children || d._children ? centerPoint :
              10;
            return offset;
          });

          // Transition nodes to their new position.
          var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
              return "translate(" + d.y + "," + d.x + ")";
            });

          nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function(d) {
              return d._children ? "lightsteelblue" : "#fff";
            });

          nodeUpdate.select("text")
            .style("fill-opacity", 1);

          // Transition exiting nodes to the parent's new position.
          var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
              return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

          nodeExit.select("circle")
            .attr("r", 1e-6);

          nodeExit.select("text")
            .style("fill-opacity", 1e-6);

          // Update the links…
          var link = vis.selectAll("path.link")
            .data(tree.links(nodes), function(d) {
              return d.target.id;
            });

          // Enter any new links at the parent's previous position.
          link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
              var o = {
                x: source.x0,
                y: source.y0
              };
              return diagonal({
                source: o,
                target: o
              });
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);

          // Transition links to their new position.
          link.transition()
            .duration(duration)
            .attr("d", diagonal);

          // Transition exiting nodes to the parent's new position.
          link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
              var o = {
                x: source.x,
                y: source.y
              };
              return diagonal({
                source: o,
                target: o
              });
            })
            .remove();

          // Stash the old positions for transition.
          nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
          var capdetail = d3.select('#funcdet');
          var capclose = d3.select('#funcclose');

          capdetail.on("click", function() {
            var cappath = '/#!/capabilities/' + $scope.selectedcap;
            $window.open(cappath, "_blank");
          });

          capclose.on("click", function(d) {
            d3.select("#funcdetail").style("display", "none");
          });


        }

        // Toggle children.
        function toggle(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        }
      });
    }

    // Method for creating the Capability Tree view
    // $scope.createCapabilityTree = function() {
    //   var capApps = CapAppCountsSrc.query();
    //   capApps.$promise.then(function() {
    //     // TODO: make this function shareable--it adds _.tree() feature to underscore.js
    //     (function() {
    //       var attrEq = function(key, value, input) {
    //           return input[key] && input[key] == value;
    //         },
    //
    //         arrayToTree = function(data, rootId, pkName, fkName) {
    //           pkName = pkName || 'id';
    //           fkName = fkName || 'parent_id';
    //           rootId = rootId || (_.first(data) || {})[pkName] || 0;
    //
    //           var output = _.clone(_.find(data, _.partial(attrEq,
    //               pkName, rootId))),
    //             childnodes = _.filter(data, _.partial(attrEq,
    //               fkName, rootId));
    //
    //           output.children = _.map(childnodes, function(child) {
    //             return arrayToTree(data, child[pkName], pkName,
    //               fkName);
    //           });
    //
    //           return output;
    //         };
    //
    //       _.mixin({
    //         tree: arrayToTree
    //       });
    //
    //     }).call(this);
    //
    //     var rootNode = {
    //       Id: 277,
    //       Name: 'Manage GSA',
    //       Parent: null,
    //       AppCount: 0,
    //       RefNum: null,
    //       ParRefNum: null,
    //     }
    //     capApps.unshift(rootNode);
    //
    //     capApps = _.map(capApps, function(c) {
    //       return {
    //         id: Number(c.Id),
    //         name: c.Name,
    //         pname: c.Parent,
    //         appnum: Number(c.AppCount)
    //       }
    //     });
    //
    //     var root = _.tree(capApps, 'Manage GSA', 'name', 'pname');
    //
    //     var margin = {
    //         top: 20,
    //         right: 0,
    //         bottom: 0,
    //         left: 0
    //       },
    //       width = $('#buschart').width(),
    //       height = $('#stage').height() - $('#businessheader')
    //       .height() - parseInt($('#stage').css('padding-top')) * 2,
    //       formatNumber = d3.format(",d"),
    //       transitioning;
    //
    //     var x = d3.scale.linear()
    //       .domain([0, width])
    //       .range([0, width]);
    //
    //     var y = d3.scale.linear()
    //       .domain([0, height])
    //       .range([0, height]);
    //
    //     var treemap = d3.layout.treemap()
    //       .children(function(d, depth) {
    //         return depth ? null : d._children;
    //       })
    //       .sort(function(a, b) {
    //         return a.value - b.value;
    //       })
    //       .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
    //       .round(false);
    //
    //
    //     var svg = d3.select("#buschart").append("svg")
    //       .attr("id", "capability-tree")
    //       .attr("width", width + margin.left + margin.right)
    //       .attr("height", height + margin.bottom + margin.top)
    //       .style("margin-left", -margin.left + "px")
    //       .style("margin.right", -margin.right + "px")
    //       .append("g")
    //       .attr("transform", "translate(" + margin.left + "," + margin
    //         .top + ")")
    //       .style("shape-rendering", "crispEdges");
    //
    //     var grandparent = svg.append("g")
    //       .attr("class", "grandparent");
    //
    //     grandparent.append("rect")
    //       .attr("y", -margin.top)
    //       .attr("width", width)
    //       .attr("height", margin.top);
    //
    //     grandparent.append("text")
    //       .attr("x", 6)
    //       .attr("y", 6 - margin.top)
    //       .attr("dy", ".75em");
    //
    //
    //     initialize(root);
    //     accumulate(root);
    //     layout(root);
    //     display(root);
    //
    //     function initialize(root) {
    //       root.x = root.y = 0;
    //       root.dx = width;
    //       root.dy = height;
    //       root.depth = 0;
    //     }
    //
    //     // Aggregate the values for internal nodes. This is normally done by the
    //     // treemap layout, but not here because of our custom implementation.
    //     // We also take a snapshot of the original children (_children) to avoid
    //     // the children being overwritten when when layout is computed.
    //     function accumulate(d) {
    //       if (!d.children.length) {
    //         d.value = 25;
    //         delete d.children;
    //       }
    //       return (d._children = d.children) ?
    //         d.value = d.children.reduce(function(p, v) {
    //           return p + accumulate(v);
    //         }, 0) :
    //         d.value;
    //     }
    //
    //     // Compute the treemap layout recursively such that each group of siblings
    //     // uses the same size (1×1) rather than the dimensions of the parent cell.
    //     // This optimizes the layout for the current zoom state. Note that a wrapper
    //     // object is created for the parent node for each group of siblings so that
    //     // the parent’s dimensions are not discarded as we recurse. Since each group
    //     // of sibling was laid out in 1×1, we must rescale to fit using absolute
    //     // coordinates. This lets us use a viewport to zoom.
    //     function layout(d) {
    //       if (d._children) {
    //         treemap.nodes({
    //           _children: d._children
    //         });
    //         d._children.forEach(function(c) {
    //           c.x = d.x + c.x * d.dx;
    //           c.y = d.y + c.y * d.dy;
    //           c.dx *= d.dx;
    //           c.dy *= d.dy;
    //           c.parent = d;
    //           layout(c);
    //         });
    //       }
    //     }
    //
    //     function display(d) {
    //       grandparent
    //         .datum(d.parent)
    //         .on("click", transition)
    //         .select("text")
    //         .text(name(d));
    //
    //       var g1 = svg.insert("g", ".grandparent")
    //         .datum(d)
    //         .attr("class", "depth");
    //
    //       var g = g1.selectAll("g")
    //         .data(d._children)
    //         .enter().append("g")
    //         .on("contextmenu", function(d) {
    //           $location.path('/capabilities/' + d.id);
    //           $scope.$apply();
    //         });
    //
    //
    //       g.filter(function(d) {
    //           return d._children;
    //         })
    //         .classed("children", true)
    //         .on("click", transition);
    //
    //       g.selectAll(".child")
    //         .data(function(d) {
    //           return d._children || [d];
    //         })
    //         .enter().append("rect")
    //         .attr("class", "child")
    //         .call(rect);
    //
    //
    //       g.append("rect")
    //         .attr("class", "parent ea-tree-node-rect")
    //         .call(rect)
    //         .append("title")
    //
    //         //		.text(function(d) { return d.name + ' : ' + d.description; });
    //         .text(function(d) {
    //           return 'Right-click to view the details for ' + d
    //             .name +
    //             '. Left-click to view the lower level capabilities.';
    //         });
    //
    //       g.append("text")
    //         .attr("dy", ".75em")
    //         .attr("id", function(d) {
    //           return 'org-' + d.id;
    //         })
    //         .attr('class', 'ea-tree-node-label')
    //         .text(function(d) {
    //           return d.name;
    //         })
    //         .call(text);
    //
    //       function transition(d) {
    //         if (transitioning || !d) return;
    //         transitioning = true;
    //
    //         var g2 = display(d),
    //           t1 = g1.transition().duration(750),
    //           t2 = g2.transition().duration(750);
    //
    //         // Update the domain only after entering new elements.
    //         x.domain([d.x, d.x + d.dx]);
    //         y.domain([d.y, d.y + d.dy]);
    //
    //         // Enable anti-aliasing during the transition.
    //         svg.style("shape-rendering", null);
    //
    //         // Draw child nodes on top of parent nodes.
    //         svg.selectAll(".depth").sort(function(a, b) {
    //           return a.depth - b.depth;
    //         });
    //
    //         // Fade-in entering text.
    //         g2.selectAll("text").style("fill-opacity", 0);
    //
    //         // Transition to the new view.
    //         t1.selectAll("text").call(text).style("fill-opacity", 0);
    //         t1.selectAll("rect").call(rect);
    //         t2.selectAll("rect").call(rect);
    //
    //         // Remove the old node when the transition is finished.
    //         t1.remove().each("end", function(d) {
    //           svg.style("shape-rendering", "crispEdges");
    //           transitioning = false;
    //         });
    //
    //         // WORD WRAP: Called at the end of the text (t2)
    //         // transitions.
    //         t2.each("end", function(d, i) {
    //           $('.ea-tree-node-label').each(function(el, i) {
    //             $(this).animate({
    //               'fill-opacity': 1
    //             }, 750);
    //           });
    //           d3.select(this).selectAll('.ea-tree-node-label')
    //             .call(text)
    //             .each(function() {
    //               try {
    //                 Utils.wrapSVGText(this,
    //                   Math.floor($(this).prev(
    //                       '.ea-tree-node-rect')[0].getBBox()
    //                     .width - 12));
    //               } catch (e) {
    //                 console.warn('EXCEPTION: ', e);
    //               }
    //             });
    //         });
    //       }
    //
    //       // LATE-ADDITION to select "General Government" capability
    //       // by default. The faux tree structure of the data does not
    //       // allow us to do this correctly so let's script a click in
    //       // the UI for now.
    //       // TODO This should use the d3 event API instead. Fire the
    //       // event here, and define a listener with this logic elsewhere.
    //       try {
    //         var genGovRect = $('#org-190').prev('rect.parent')[0];
    //         var evt = document.createEvent("MouseEvents");
    //         evt.initMouseEvent("click", true, true, window, 0, 0, 0,
    //           0, 0, false, false, false, false, 0, null);
    //         genGovRect.dispatchEvent(evt);
    //       } catch (e) {}
    //
    //       return g;
    //     }
    //
    //     function text(text) {
    //       text.attr("x", function(d) {
    //           return x(d.x) + 6;
    //         })
    //         .attr("y", function(d) {
    //           return y(d.y) + 6;
    //         });
    //     }
    //
    //     function rect(rect) {
    //       var colorScale = d3.scale.linear()
    //         .domain([0, 300])
    //         .range(["#CEE3F6", "#045FB4"]);
    //
    //       rect.attr("x", function(d) {
    //           return x(d.x);
    //         })
    //         .attr("y", function(d) {
    //           return y(d.y);
    //         })
    //         .attr("width", function(d) {
    //           return x(d.x + d.dx) - x(d.x);
    //         })
    //         .attr("height", function(d) {
    //           return y(d.y + d.dy) - y(d.y);
    //         })
    //         .style("fill", function(d) {
    //           return colorScale(d.appnum);
    //         });
    //     }
    //
    //     function name(d) {
    //       return d.parent ?
    //         name(d.parent) + "." + d.name :
    //         d.name;
    //     }
    //   });
    // }


    // Method for retrieving a single Business Function's details
    $scope.createFuncDetail = function() {
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      });
      // Sending 2 GET requests: BusFunction & TIME, then combining the
      // data using Underscore methods
      var capabilities = CapabilitiesSrc.query({
        id: $routeParams.id
      });
      var applications = CapApplicationsSrc.query({
        id: $routeParams.id
      });
      //    var timeResource = TIME.query();

      capabilities.$promise
        .then(function() {
          this.render();
        }.bind(this))
        .catch(function(e) {
          throw (e)
        });
      //    timeResource.$promise
      //    .then(function () { this.render(); }.bind(this))
      //    .catch(function (e) {
      //      throw (e)
      //    });

      this.render = function() {
        // Wait until both queries are resolved before proceding
        // Per MLD: This render() is unnecessary. No need to wait for all $resources to be resolved.
        if (capabilities
          .$resolved
        ) { //timeResource.$resolved && capabilities.$resolved) {
          $scope.capability = capabilities[0];
          applications.$promise.then(function() {
            if (applications.length > 0) {
              d3.select("#relappstab").style("display", "block");

              // LEGACY: adds TIME data to related Apps. Perhaps a new way is needed?
              // For each related app obj, combine (FY##) properties
              // from timeResource data, matching on app id.
              // _.each($scope.relapps, function (appObj, i) {
              //   var match = _.find(timeResource, function (timeObj) {
              //     return timeObj.AppId === appObj.Id;
              //   });
              //   // Only extend if there's a match. The BS Table
              //   // plugin will handle the missing props.
              //   // Duplicate props will be overritten.
              //   if (typeof match === 'object') {
              //     // omit Angular-internal props (begin with $)
              //     var re = /^\$/;
              //     match = _.omit(match, function (val, key) {
              //       return re.test(key);
              //     });
              //     _.extend(appObj, match);
              //   }
              // });
              //Populate Related Apps Table
              $('#funcappstable').bootstrapTable({
                columns: [{
                    field: 'SSO',
                    title: 'SSO',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'SSOShort',
                    title: 'SSO (Short)',
                    sortable: true,
                    visible: false

                  },
                  {
                    field: 'OwnerShort',
                    title: 'Two Letter Org (Short)',
                    sortable: true,
                  },
                  {
                    field: 'Owner',
                    title: 'Two Letter Org (Long)',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'Name',
                    title: 'Business Application Name',
                    sortable: true
                  },
                  {
                    field: 'Alias',
                    title: 'Alias',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'Description',
                    title: 'Description',
                    sortable: true,
                    visible: false
                  },

                  {
                    field: 'ParentSystem',
                    title: 'Parent System',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'Status',
                    title: 'Status',
                    sortable: true
                  },
                  {
                    field: 'ProdYear',
                    title: 'Production Year',
                    sortable: true,
                    visible: false
                  },

                  {
                    field: 'FY14',
                    title: 'FY14',
                    visible: false
                  },
                  {
                    field: 'FY15',
                    title: 'FY15',
                    visible: false
                  },
                  {
                    field: 'FY16',
                    title: 'FY16',
                    visible: false
                  },
                  {
                    field: 'FY17',
                    title: 'FY17',
                    visible: false
                  },
                  {
                    field: 'FY18',
                    title: 'FY18'
                  },
                  {
                    field: 'FY19',
                    title: 'FY19'
                  },
                  {
                    field: 'FY20',
                    title: 'FY20'
                  },
                  {
                    field: 'FY21',
                    title: 'FY21'
                  },
                  {
                    field: 'Notes',
                    title: 'Notes',
                    visible: false

                  },
                  {
                    field: 'BusPOC',
                    title: 'Business POC',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'TechPOC',
                    title: 'Technical POC',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'RegionClassification',
                    title: 'Region Classification',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'IsRevenueGenerator',
                    title: 'Revenue Generator',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'HostingProvider',
                    title: 'Hosting Provider',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'Cloud',
                    title: 'Cloud',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'TechnologyPlatform',
                    title: 'Platform',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'FISMASystem',
                    title: 'FISMA System',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'HelpDesk',
                    title: 'Help Desk',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'Investment',
                    title: 'Related Investments',
                    sortable: true,
                    visible: false
                  },
                  {
                    field: 'OMBUID',
                    title: 'Application ID',
                    sortable: true,
                    visible: false
                  }
                ],
                data: applications
              });
              // Method to handle click events on the Capability Applications table
              $('#funcappstable').on('click-row.bs.table', function(
                e, row, $element) {
                // note: this :has selector cannot be cached; done this way to get
                // around caching & DOM availabily issues
                if (!!$(
                    '.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))'
                  ).length) {
                  $location.path('/applications/' + row.Id);
                  $route.reload();
                }
              });
            }
          });
        }
      }
    }

    // Method for creating word cloud on app home page
    $scope.createDashCloud = function() {
      var fill = d3.scale.category20();

      d3.layout.cloud().size([400, 240])
        .words([
          "Financial", "Acquisition", "Building", "Security",
          "Logistics", "Fleet", "Workforce"
        ].map(function(d) {
          return {
            text: d,
            size: 15 + Math.random() * 35
          };
        }))
        .rotate(function() {
          return ~~(Math.random() * 2) * 45;
        })
        .font("Impact")
        .fontSize(function(d) {
          return d.size;
        })
        .on("end", draw)

        .start();

      function click(d) {
        $location.path('/capability_model/');
        $scope.$apply();
      }



      function draw(words) {
        d3.select("#capbody").append("svg")
          .attr("width", 400)
          .attr("height", 240)
          .attr("class", "dashcloud")
          .attr("style", "cursor:pointer;")
          .on("click", click)
          .append("g")
          .attr("transform", "translate(200,120)")



          .selectAll("text")
          .data(words)
          .enter().append("text")

          .style("font-size", function(d) {
            return d.size + "px";
          })
          .style("font-family", "Impact")
          .style("fill", function(d, i) {
            return fill(i);
          })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate +
              ")";
          })
          .text(function(d) {
            return d.text;
          });
      }
    }
  }
]);
