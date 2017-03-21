/* eslint-disable */

﻿// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'business' controller
angular.module('dashboard').controller('BusinessController', ['$route','$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'OrganizationsSrc', 'Organization', 'OrgSvc', 'BusFunction', 'OrgAppMap', 'OrgGoalMap', 'OrgSysMap', 'System', 'Application', 'Interface', 'FuncAppMap', 'Goal', 'TIME', 'bstSearchUtils', 'Utils',
    function ($route,$scope, $http, $routeParams, $filter, $location, $sce, OrganizationsSrc, Organization,OrgSvc, BusFunction, OrgAppMap, OrgGoalMap, OrgSysMap, System, Application, Interface, FuncAppMap, Goal, TIME, bstSearchUtils, Utils) {
        $scope.rootPath = '';
        $scope.bstData = [];
        $scope.$bstEl = null;
        $scope.bstFilter = {};
        $scope.tableFilterList = [];
        $scope.hasUsedSearchForm = false;

		// Method for Organizations table
        $scope.createOrgTable = function () {

            $scope.$bstEl = $('#orgtable');
            $scope.hasUsedSearchForm = false;
            $scope.rootPath = '/organizations';

			var organs = [];
            var organizations = OrganizationsSrc.query();
            organizations.$promise.then(function (populateData) {
                $scope.bstData = [];
				$.each(organizations, function (key, val) {
                    if ([val.Name] != "External" && [val.Name] != "FAS Enterprise") {
                        var description = val.Description;
                        var name = val.Name;
						var parent = val.Parent;
						var id = val.Id;
						$scope.bstData.push({"Name" : name, "Description" : description, "Parent" : parent, Id: id});
                    }
                });
                bstSearchUtils.checkFilterState($scope);
                $scope.bsTableConfig = {
                    columns: [{
                        field: 'Name',
                        title: 'Organization Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'Parent',
                        title: 'Parent',
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
		$('#orgtable').on('click-row.bs.table', function (e, row, $element) {
            // note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
    			var orgpath = row.Name
    			orgpath = orgpath.replace(/\//g , "-%")
    			$location.path('/organization/' + orgpath);
				$route.reload();
            }
		});

		// Method for retrieving a single organization's details
        $scope.createOrgDetail = function() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			});
            var org = $routeParams.organizationName;
			org = org.replace(/-%/g , "/");
            // Use the ps 'get' method to send an appropriate GET request
            var organization = OrganizationsSrc.query();
			var application = Application.query();
			var interfaces = Interface.query();
			var orgname = '';
			var appid = '';
            organization.$promise.then(function (populateData) {
                $.each(organization, function (key, val) {
                    if ([val.Name] == org) {
                        $scope.orgId = val.Id;
                        $scope.orgName = val.Name;
						orgname = val.Name;
                        $scope.orgDescription = val.Description;
						$scope.orgParent = val.Parent;
                    }
                });
				application.$promise.then(function (populateData) {
					interfaces.$promise.then(function (populateData) {
						$.each(application, function (key, val) {
							if ([val.Owner] == orgname) {
								appid = val.Id;
								$.each(interfaces, function (key, val) {
									if (val.Appid == appid || val.RefAppid == appid) {
										d3.select("#interfacetab").style("display", "block");
									}
								});
							};
						});
					});
				});
			});
        }


				// Method for retrieving a single organization's related goals
        $scope.getRelatedGoals = function(orgId) {
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











		// Method for retrieving a single organization's related Systems
        $scope.getRelatedSys = function(orgId) {
			// Use the Application 'get' method to send an appropriate GET request
            var appmap = OrgAppMap.query();
            var applist = [];
            appmap.$promise.then(function (populateData) {
                $.each(appmap, function (key, val) {
                    if ([val.Orgid] == orgId) {
                        applist.push(val.Appid);
                    }
                });
                var app = Application.query();
                app.$promise.then(function (populateData) {
                    var orgappnames = [];
                    for (var i = 0; i < app.length; i++) {
                        var tmpappsid = applist[i];
                        for (var ind = 0; ind < app.length; ind++) {
                            var tmpappid = app[ind].Id;
                            if (tmpappsid === tmpappid
                                && app[ind].Type.toLowerCase() !== 'website') {
                                orgappnames.push({"Name" : app[ind].Name, "Description" : app[ind].Description, "Id" : app[ind].Id});
                            }
                            else {
                                continue
                            }
                        }
                    }

					 $('#orgapptable').bootstrapTable({
						columns: [{
							field: 'Name',
							title: 'Application Name',
							sortable: true
						}, {
							field: 'Description',
							title: 'Description',
							sortable: true
						}, {
							field: 'Id',
							title: 'Id',
							sortable: true,
							visible: false
						}],
						data: orgappnames
					});
                });
            });
        }

		// Method to handle click events on the Organizational application table
		$('#orgapptable').on('click-row.bs.table', function (e, row, $element) {
            // note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
    			var apppath = row.Id
    			apppath = apppath.replace(/\//g , "-%")
    			$location.path('/applications/' + apppath);
				$route.reload();
            }
		});

		// Method for Business Functions Table
        $scope.createFuncTable = function () {
            $scope.$bstEl = $('#capabilitytable');
            $scope.hasUsedSearchForm = false;
            $scope.rootPath = '/capabilities';

            var funcs = BusFunction.query();
            funcs.$promise.then(function (populateData) {
                $scope.bstData = [];
                $scope.bstData = funcs;
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
                    }, {
                        field: 'Id',
                        title: 'Id',
						sortable: true,
						visible: false
                    }],
                    data: $scope.bstData
                };
                bstSearchUtils.updateConfig($scope);
                $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
                bstSearchUtils.handleSearchState($scope);
            });
        }

		$('#capabilitytable').on('click-row.bs.table', function (e, row, $element) {
            // note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
    			var cappath = row.Id
    			cappath = cappath.replace(/\//g , "-%")
    			$location.path('/capability/' + cappath);
				$route.reload();
            }
		});


		$scope.removePag = function(){
			$(".report").attr("data-pagination", false);
		}

		// Method for creating the Org Chart view
		$scope.createOrgChart = function () {
            var orgs = OrganizationsSrc.query();
            var parentorg = 'Office of the Administrator (A)';
            var orgTree = {};

			orgs.$promise.then(function (populateData) {
                // set root node
                $.each(orgs, function (i, org) {
                    if (org.Name == parentorg) {
                        orgTree = {
                            name: org.Name,
                            identity: org.Id,
                            displayName: org.DisplayName,
                            description: org.Description,
                            children: []
                        };
					}
                });
                // set first-level children
				$.each(orgs, function (i, org) {
                    if (org.Parent == orgTree.name) {
						orgTree.children.push({
                            name: org.Name,
                            identity: org.Id,
                            displayName: org.DisplayName,
                            parent: org.Parent,
                            description: org.Description,
                            children: []
                        });
					}
				});
                // set second-level children
                $.each(orgTree.children, function (i, firstLevelOrg) {
                    $.each(orgs, function (i, org) {
                        if (org.Parent == firstLevelOrg.name) {
    						firstLevelOrg.children.push({
                                name: org.Name,
                                identity: org.Id,
                                displayName: org.DisplayName,
                                parent: org.Parent,
                                description: org.Description,
                                children: []
                            });
    					}
                    });
                });
                // set third-level children
                $.each(orgTree.children, function (i, firstLevelOrg) {
                    $.each(firstLevelOrg.children, function (i, secondLevelOrg) {
                        $.each(orgs, function (i, org) {
                            if (org.Parent == secondLevelOrg.name) {
        						secondLevelOrg.children.push({
                                    name: org.Name,
                                    identity: org.Identity,
                                    displayName: org.DisplayName,
                                    parent: org.Parent,
                                    description: org.Description,
                                    children: false
                                });
        					}
                        });
                    });
                });

				var m = [20, 120, 20, 120],
				w = 1280 - m[1] - m[3],
				h = 700 - m[0] - m[2],
				i = 0,
				root;

				var tree = d3.layout.tree()
					.size([h, w]);

				var diagonal = d3.svg.diagonal()
					.projection(function(d) { return [d.y, d.x]; });

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
					nodes.forEach(function(d) { d.y = d.depth * 180; });
					// Update the nodes…
					var node = vis.selectAll("g.node")
						.data(nodes, function(d) { return d.id || (d.id = ++i); });

					// Enter any new nodes at the parent's previous position.
					var nodeEnter = node.enter().append("svg:g")

						.attr("class", "node")


						.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })


						.on("click", function(d) { toggle(d); update(d); })

						.on("mouseover", function(d){
							d3.select("#orgdetail").style("display", "block");
							d3.select("#orgdetailheader").text = "";
							d3.select("#orgdetailbody").text = "";
							$scope.selectedapp = d.name;
							var b = d3.select("#orgdetailbody")
								.text("");
							var a = d3.select("#orgname")
								.text("");
							var info2 = b.append('text')
								.classed('info2', true)
								.text(d.description);
							var a = d3.select("#orgname");
							var info = a.append('text')
								.classed('info', true)
								.text(d.name);

						});

				/*	    .on("mouseout", function() {
							d3.select("#orgdetailbody").select('text.info2').remove();
							d3.select("#orgdetailheader").select('text.info').remove();
							d3.select("#orgdetail").style("display", "none");
					    });	    */


					nodeEnter.append("svg:circle")
						.attr("r", 1e-6)

						.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });


					nodeEnter.append("svg:text")
						.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
						.attr("dy", function (d) {
                            return d.children || d._children ? "-0.8em" : "0.35em";
                        })
                        .attr("id", function (d) {
                            return "textnode-" + d.identity;
                        })
						.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
						.text(function(d) { return d.displayName; })
						.style("fill-opacity", 1e-6);

                    nodeEnter.select('text').attr('x', function (d) {
                        var centerPoint = this.getBBox().width / 2,
                            offset = d.children || d._children ? centerPoint : 10;
                        return offset;
                    });

					// Transition nodes to their new position.
					var nodeUpdate = node.transition()
						.duration(duration)
						.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

					nodeUpdate.select("circle")
						.attr("r", 4.5)
						.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

					nodeUpdate.select("text")
						.style("fill-opacity", 1);

					// Transition exiting nodes to the parent's new position.
					var nodeExit = node.exit().transition()
						.duration(duration)
						.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
						.remove();

					nodeExit.select("circle")
						.attr("r", 1e-6);

					nodeExit.select("text")
						.style("fill-opacity", 1e-6);

					// Update the links…
					var link = vis.selectAll("path.link")
						.data(tree.links(nodes), function(d) { return d.target.id; });

					// Enter any new links at the parent's previous position.
					link.enter().insert("svg:path", "g")
						.attr("class", "link")
						.attr("d", function(d) {
							var o = {x: source.x0, y: source.y0};
							return diagonal({source: o, target: o});
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
							var o = {x: source.x, y: source.y};
							return diagonal({source: o, target: o});
						})
						.remove();

					// Stash the old positions for transition.
					nodes.forEach(function(d) {
						d.x0 = d.x;
						d.y0 = d.y;
					});
					var orgdetail = d3.select('#orgdet');
					var orgclose = d3.select('#orgclose');

					orgdetail.on("click", function(){
						var orgpath = $scope.selectedapp;
						orgpath = orgpath.replace(/\//g , "-%")
						$location.path('/organization/' + orgpath);
						$scope.$apply();
					});

					orgclose.on("click", function(d){
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


		// Method for creating the Capability Tree view
		$scope.createCapabilityTree = function () {
			var funcs = BusFunction.query();
            var parentfunction = '';
			var parentdesc = '';
			var parentid = '';
			var parentappnum = '';
			var parentapparray = [];
            var l1 = [];
			var l1apparray = [];
			var l1name = '';
			var l1desc = '';
			var l1id = '';
			var l1appnum = '';
			var l2 = [];
			var l2apparray = [];
			var l2name = '';
			var l2desc = '';
			var l2id = '';
			var l2appnum = '';
			var l2size = 25;
			var l3 = [];
			var l3apparray = [];
			var l3name = '';
			var l3desc = '';
			var l3id = '';
			var l3appnum = '';
			var l3size = 25;
			var l4 = [];
			var l4apparray = [];
			var l4name = '';
			var l4desc = '';
			var l4id = '';
			var l4appnum = '';
			var l4size = 25;
			var l5 = [];
			var l5apparray = [];
			var l5name = '';
			var l5id = '';
			var l5appnum = '';
			var l5size = 25;
            funcs.$promise.then(function (populateData) {
				var appmap = FuncAppMap.query();
				appmap.$promise.then(function (populateData) {
				//Get the name of the Parent Function and assign it to the 'parentfunction' variable
                $.each(funcs, function (key, val) {
                    if ([val.Parent] == "") {
                        parentfunction = val.Name;
						parentdesc = val.Description;
						parentid = val.Id
						$.each(appmap, function (key, val){
							if ([val.Funcid] == l1id) {
								parentapparray.push({'appid' : val.Appid});
							}
						});
						parentappnum = parentapparray.length;
                    }
                });

				//Populate 'l2' array by finding the children of the 'parentfunction'
                $.each(funcs, function (key, val) {
                    if ([val.Parent] == parentfunction) {
                        l1name =  val.Name;
						l1desc = val.Description;
						l1id = val.Id;
						$.each(appmap, function (key, val){
							if ([val.Funcid] == l1id) {
								l1apparray.push({'appid' : val.Appid});
							}
						});
						l1appnum = l1apparray.length;
						l1apparray = [];
                        $.each(funcs, function (key, val){
                            if ([val.Parent] == l1name) {
								l2name = val.Name;
								l2desc = val.Description;
								l2id = val.Id;
								$.each(appmap, function (key, val){
									if ([val.Funcid] == l2id) {
										l2apparray.push({'appid' : val.Appid});
									}
								});
								l2appnum = l2apparray.length;
								l2apparray = [];
								$.each(funcs, function (key, val){
									if ([val.Parent] == l2name) {
										l3name = val.Name;
										l3desc = val.Description;
										l3id = val.Id;
										$.each(appmap, function (key, val){
											if ([val.Funcid] == l3id) {
												l3apparray.push({'appid' : val.Appid});
											}
										});
										l3appnum = l3apparray.length;
										l3apparray = [];
										$.each(funcs, function (key, val){
											if ([val.Parent] == l3name) {
												l4name = val.Name;
												l4desc = val.Description;
												l4id = val.Id;
												$.each(appmap, function (key, val){
													if ([val.Funcid] == l4id) {
														l4apparray.push({'appid' : val.Appid});
													}
												});
												l4appnum = l4apparray.length;
												l4apparray = [];
												$.each(funcs, function (key, val){
													if ([val.Parent] == l4name) {
														l5name = val.Name;
														$.each(appmap, function (key, val){
															if ([val.Funcid] == val.Id) {
																l5apparray.push({'appid' : val.Appid});
															}
														});
														l5appnum = l5apparray.length;
														l5apparray = [];
														l5.push({'name' : l5name, 'id' : l5id, 'value' : 25, 'description' : val.Description, 'appnum' : l5appnum});
													}
												});
												if (l5.length == 0){
													l4.push({'name' : l4name, 'id' : l4id, 'value' : 25, 'description' : l4desc, 'appnum' : l4appnum});
												}
												else{
													l4.push({'name' : l4name, 'id' : l4id, 'children' : l5, 'description' : l4desc, 'appnum' : l4appnum});
												}
												l5 = [];
											}
										});
										if (l4.length == 0){
											l3.push({'name' : l3name, 'id' : l3id, 'value' : 25, 'description' : l3desc, 'appnum' : l3appnum});
										}
										else{
											l3.push({'name' : l3name, 'id' : l3id, 'children' : l4, 'description' : l3desc, 'appnum' : l3appnum});
										}
										l4 = [];
									}
								});
								if (l3.length == 0){
									l2.push({'name' : l2name, 'id' : l2id, 'value' : 25, 'description' : l2desc, 'appnum' : l2appnum});
								}
								else{
									l2.push({'name' : l2name, 'id' : l2id, 'children' : l3, 'description' : l2desc, 'appnum' : l2appnum});
								}
								l3 = [];
							}
						});
						if (l2.length == 0){
							l1.push({'name' : l1name, 'id' : l1id, 'value' : 25, 'description' : l1desc, 'appnum' : l1appnum});
						}
						else{
							l1.push({'name' : l1name, 'id' : l1id, 'children' : l2, 'description' : l1desc, 'appnum' : l1appnum});
						}
						l2 = [];
					}
				});
				var root = {'name' : parentfunction, 'id' : parentid, 'children' : l1, 'description' : parentdesc, 'appnum' : parentappnum};

				//Begin the logic for creating the capability model

				var margin = {top: 20, right: 0, bottom: 0, left: 0},
					width = 960,
					height = 600 - margin.top - margin.bottom,
					formatNumber = d3.format(",d"),
					transitioning;

				var x = d3.scale.linear()
					.domain([0, width])
					.range([0, width]);

				var y = d3.scale.linear()
					.domain([0, height])
					.range([0, height]);

				var treemap = d3.layout.treemap()
					.children(function(d, depth) { return depth ? null : d._children; })
					.sort(function(a, b) { return a.value - b.value; })
					.ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
					.round(false);


				var svg = d3.select("#buschart").append("svg")
                    .attr("id", "capability-tree")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.bottom + margin.top)
					.style("margin-left", -margin.left + "px")
					.style("margin.right", -margin.right + "px")
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.style("shape-rendering", "crispEdges");

				var grandparent = svg.append("g")
					.attr("class", "grandparent");

				grandparent.append("rect")
					.attr("y", -margin.top)
					.attr("width", width)
					.attr("height", margin.top);

				grandparent.append("text")
					.attr("x", 6)
					.attr("y", 6 - margin.top)
					.attr("dy", ".75em");


				  initialize(root);
				  accumulate(root);
				  layout(root);
				  display(root);

				  function initialize(root) {
					root.x = root.y = 0;
					root.dx = width;
					root.dy = height;
					root.depth = 0;
				  }

				  // Aggregate the values for internal nodes. This is normally done by the
				  // treemap layout, but not here because of our custom implementation.
				  // We also take a snapshot of the original children (_children) to avoid
				  // the children being overwritten when when layout is computed.
				  function accumulate(d) {
					return (d._children = d.children)
						? d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
						: d.value;
				  }

				  // Compute the treemap layout recursively such that each group of siblings
				  // uses the same size (1×1) rather than the dimensions of the parent cell.
				  // This optimizes the layout for the current zoom state. Note that a wrapper
				  // object is created for the parent node for each group of siblings so that
				  // the parent’s dimensions are not discarded as we recurse. Since each group
				  // of sibling was laid out in 1×1, we must rescale to fit using absolute
				  // coordinates. This lets us use a viewport to zoom.
				  function layout(d) {
					if (d._children) {
					  treemap.nodes({_children: d._children});
					  d._children.forEach(function(c) {
						c.x = d.x + c.x * d.dx;
						c.y = d.y + c.y * d.dy;
						c.dx *= d.dx;
						c.dy *= d.dy;
						c.parent = d;
						layout(c);
					  });
					}
				  }




				  function display(d) {
					grandparent
						.datum(d.parent)
						.on("click", transition)
						.select("text")
						.text(name(d));

					var g1 = svg.insert("g", ".grandparent")
						.datum(d)
						.attr("class", "depth");

					var g = g1.selectAll("g")
						.data(d._children)
					    .enter().append("g")
                    .on("contextmenu", function(d){
                    	var funcpath = d.id;
                    	funcpath = funcpath.replace(/\//g , "-%")
                    	$location.path('/capability/' + funcpath);
                    	$scope.$apply();
                    });


					g.filter(function(d) { return d._children; })
						.classed("children", true)
						.on("click", transition);

					g.selectAll(".child")
						.data(function(d) { return d._children || [d]; })
					    .enter().append("rect")
						.attr("class", "child")
						.call(rect);


					g.append("rect")
						.attr("class", "parent ea-tree-node-rect")
						.call(rect)
					    .append("title")

				//		.text(function(d) { return d.name + ' : ' + d.description; });
						.text(function(d) { return 'Right-click to view the details for ' + d.name + '. Left-click to view the lower level capabilities.'; });

					g.append("text")
						.attr("dy", ".75em")
                        .attr("id", function(d) { return 'org-' + d.id; })
                        .attr('class','ea-tree-node-label')
						.text(function(d) { return d.name; })
						.call(text);

					function transition(d) {
					  if (transitioning || !d) return;
					  transitioning = true;

					  var g2 = display(d),
						  t1 = g1.transition().duration(750),
						  t2 = g2.transition().duration(750);

					  // Update the domain only after entering new elements.
					  x.domain([d.x, d.x + d.dx]);
					  y.domain([d.y, d.y + d.dy]);

					  // Enable anti-aliasing during the transition.
					  svg.style("shape-rendering", null);

					  // Draw child nodes on top of parent nodes.
					  svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

					  // Fade-in entering text.
					  g2.selectAll("text").style("fill-opacity", 0);

					  // Transition to the new view.
					  t1.selectAll("text").call(text).style("fill-opacity", 0);
					  t1.selectAll("rect").call(rect);
					  t2.selectAll("rect").call(rect);

					  // Remove the old node when the transition is finished.
					  t1.remove().each("end", function(d) {
						svg.style("shape-rendering", "crispEdges");
						transitioning = false;
					  });

                      // WORD WRAP: Called at the end of the text (t2)
                      // transitions.
                      t2.each("end", function (d, i) {
                            $('.ea-tree-node-label').each(function (el, i) {
                                $(this).animate({
                                    'fill-opacity': 1
                                }, 750);
                             });
                            d3.select(this).selectAll('.ea-tree-node-label')
                                .call(text)
                                .each(function () {
                                    try {
                                        Utils.wrapSVGText(this,
                                            Math.floor($(this).prev('.ea-tree-node-rect')[0].getBBox().width-12));
                                    } catch (e) {
                                        console.warn('EXCEPTION: ', e);
                                    }
                                });
                        });
					}

                    // LATE-ADDITION to select "General Government" capability
                    // by default. The faux tree structure of the data does not
                    // allow us to do this correctly so let's script a click in
                    // the UI for now.
                    // TODO This should use the d3 event API instead. Fire the
                    // event here, and define a listener with this logic elsewhere.
                    try {
                        var genGovRect = $('#org-17170').prev('rect.parent')[0];
                        var evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        genGovRect.dispatchEvent(evt);
                    } catch(e) {}

					return g;
				  }

				  function text(text) {
					text.attr("x", function(d) { return x(d.x) + 6; })
						.attr("y", function(d) { return y(d.y) + 6; });
				  }

				  function rect(rect) {
					var colorScale = d3.scale.linear()
					.domain([0, 300])
					.range(["#CEE3F6", "#045FB4"]);

					rect.attr("x", function(d) { return x(d.x); })
						.attr("y", function(d) { return y(d.y); })
						.attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
						.attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
						.style("fill", function(d) { return colorScale(d.appnum); });
				  }

				  function name(d) {
					return d.parent
						? name(d.parent) + "." + d.name
						: d.name;
				  }
				});
			});
		}


		// Method for retrieving a single Business Function's details
        $scope.createFuncDetail = function() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			});
            var func = $routeParams.capabilityId;
			func = func.replace(/-%/g , "/");
            // Sending 2 GET requests: BusFunction & TIME, then combining the
            // data using Underscore methods
			var busFunctionResource = BusFunction.query({ id: func });
			var timeResource = TIME.query();
			var funcid = '';

            busFunctionResource.$promise
                .then(function () { this.render(); }.bind(this))
                .catch(function (e) {
                    throw (e)
                });
			timeResource.$promise
                .then(function () { this.render(); }.bind(this))
                .catch(function (e) {
                    throw (e)
                });

			this.render = function () {
			    // Wait until both queries are resolved before proceding
			    if (timeResource.$resolved && busFunctionResource.$resolved) {

			        $.each(busFunctionResource, function (key, val) {
			            if (val.Id == func) {
			                $scope.funcId = val.Id;
			                funcid = val.Id;
			                $scope.funcName = val.Name;
			                $scope.funcDescription = val.Description;
			                $scope.funcRefNum = val.ReferenceNum;
			                $scope.relapps = _.filter(val.CapApps, function (obj) {
			                    return obj.Status.toLowerCase() !== 'retired';
                            });
			            }
			        });

			        if ($scope.relapps.length > 0) {
			            d3.select("#relappstab").style("display", "block");

			            // For each related app obj, combine (FY##) properties
			            // from timeResource data, matching on app id.
			            _.each($scope.relapps, function (appObj, i) {
                            var match = _.find(timeResource, function (timeObj) {
			                    return timeObj.AppId === appObj.Id;
                            });
			                // Only extend if there's a match. The BS Table
			                // plugin will handle the missing props.
                            // Duplicate props will be overritten.
                            if (typeof match === 'object') {
                                // omit Angular-internal props (begin with $)
                                var re = /^\$/;
                                match = _.omit(match, function (val, key) {
                                    return re.test(key);
                                });
                                _.extend(appObj, match);
                            }
                        });
			        }

			        //Populate Related Capabilities Table
			        $('#funcappstable').bootstrapTable({
			            columns: [{
			                field: 'Owner',
			                title: '2 Letter Office',
			                sortable: true,
			            }, {
			                field: 'Name',
			                title: 'Business Application Name',
			                sortable: true
			            }, {
			                field: 'System',
			                title: 'Parent System',
			                sortable: true,
			                visible: false
			            }, {
			                field: 'Status',
			                title: 'Status',
			                sortable: true
			            }, {
			                field: 'FY14',
			                title: 'FY14',
			                visible: false
			            }, {
			                field: 'FY15',
			                title: 'FY15',
			                visible: false
			            }, {
			                field: 'FY16',
			                title: 'FY16',
			                visible: false
			            }, {
			                field: 'FY17',
			                title: 'FY17'
			            }, {
			                field: 'FY18',
			                title: 'FY18'
			            }, {
			                field: 'FY19',
			                title: 'FY19'
			            }, {
			                field: 'FY20',
			                title: 'FY20'
			            }, {
			                field: 'Id',
			                title: 'Id',
			                visible: false
			            }, {
			                field: 'Notes',
			                title: 'Notes',
			                visible: false

			            }],
			            data: $scope.relapps
			        });
			    }
			}

        }

		// Method for creating word cloud on app home page
        $scope.createDashCloud = function() {
			  var fill = d3.scale.category20();

			  d3.layout.cloud().size([400, 240])
				  .words([
					"Financial", "Acquisition", "Building", "Security", "Logistics", "Fleet", "Workforce"].map(function(d) {
					return {text: d, size: 15 + Math.random() * 35};
				  }))
				  .rotate(function() { return ~~(Math.random() * 2) * 45; })
				  .font("Impact")
				  .fontSize(function(d) { return d.size; })
				  .on("end", draw)

				  .start();

			   function click(d)  {
					$location.path('/capability_model/' );
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

					.style("font-size", function(d) { return d.size + "px"; })
					.style("font-family", "Impact")
					.style("fill", function(d, i) { return fill(i); })
					.attr("text-anchor", "middle")
					.attr("transform", function(d) {
					  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					})
					.text(function(d) { return d.text; });
			  }

        }


		// Method for retrieving a single Business Function's related Applications
        $scope.getRelatedApps = function (funcId) {
            // Use the FuncAppMap 'get' method to send an appropriate GET request
            var funcmap = FuncAppMap.query();
            var applist = [];
			var funcappnames = [];
			var funcapps = [];
            funcmap.$promise.then(function (populateData) {
                $.each(funcmap, function (key, val) {
                    if ([val.Funcid] == funcId) {
                        applist.push(val.Appid);
                    }
                });

				var app = Application.query();
				app.$promise.then(function (populateData) {
					for (var i = 0; i < app.length; i++) {
						var tmpappid = applist[i];
						for (var ind = 0; ind < app.length; ind++) {
							var tmpappsid = app[ind].Id;
							if (tmpappid === tmpappsid) {
								funcappnames.push({ "SSO" : app[ind].SSO_Display_Name, "Name" : app[ind].Name, "Description" : app[ind].Description, "Status" : app[ind].Status, "Id" : app[ind].Id});
							}
							else {
								continue
							}
						}
					}
					$scope.appnumber = funcappnames.length;
					funcapps = funcappnames;
					$('#funcappstable').bootstrapTable({
						columns: [{
							field: 'Name',
							title: 'Application Name',
							sortable: true
						}, {
							field: 'Description',
							title: 'Description',
							sortable: true
						}, {
							field: 'SSO',
							title: 'SSO',
							sortable: true
						}, {
							field: 'Status',
							title: 'Status',
							sortable: true
						}, {
							field: 'Id',
							title: 'Id',
							sortable: true,
							visible: false
						}],
						data: funcapps
					});
				});
            });
        }
		// Method to handle click events on the Capability Applications table
		$('#funcappstable').on('click-row.bs.table', function (e, row, $element) {
            // note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
    			var apppath = row.Id
    			apppath = apppath.replace(/\//g , "-%")
    			$location.path('/applications/' + apppath);
				$route.reload();
            }
		});
	}
]);
