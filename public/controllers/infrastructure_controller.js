// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Infrastructure' controller
angular.module('dashboard').controller('InfrastructureController', ['$route', '$scope', '$http', '$routeParams', '$filter', '$location', '$sce', 'ITStandard', 'ITStandardByCat', 'AppTechMap', 'Application', 'bstSearchUtils',
    function ($route, $scope, $http, $routeParams, $filter, $location, $sce, ITStandard, ITStandardByCat, AppTechMap, Application, bstSearchUtils) {
        $scope.rootPath = '';
        $scope.bstData = [];
        $scope.$bstEl = null;
        $scope.bstFilter = {};
        $scope.tableFilterList = [];
        $scope.hasUsedSearchForm = false;
        $scope.noITStdCommentsMsg = "No Comments for this Standard";

		// Method for IT Standards table
        $scope.createITStandardTable = function () {
            $scope.$bstEl = $('#standtable');
            $scope.hasUsedSearchForm = false;
            $scope.rootPath = '/itstandards';

            var itstandards = [];
            var filteredstands = [];
			itstandards = ITStandard.query();
			var standcats = ITStandardByCat.query();
			standcats.$promise.then(function (populateData) {
				itstandards.$promise.then(function (populateData) {
                    $scope.bstData = [];
					$scope.itstandards = itstandards;
					var standcat = $routeParams.standardCat;
					var link = "";
					var refdoc = "";
					var description = "";
					var name = "";
					var type = "";
					var category = "";
					var status = "";
					var deploymenttype = "";
					var comments = "";
					var poc = "";
					var refdoc = "";
					var parentcat = "";
					var approvalExpDate = "";
					$.each(itstandards, function (key, val) {
						description = val.Description;
						name = val.Name;
						type = val.Type;
						category = val.Category;
						status = val.Status;
						deploymenttype = val.DeploymentType;
						comments = val.Comments || $scope.noITStdCommentsMsg;
						poc = val.POC;
						refdoc = val.ReferenceDocuments;
						link = "<a href=" + "'" + refdoc + "'" + " target='_blank'>" + refdoc + "</a>";
						approvalExpDate = val.ApprovalExpirationDate;
						if ($.isEmptyObject($routeParams) || typeof $routeParams.query !== 'undefined') {
							$scope.bstData.push({
								"Name" : name,
								"Description" : description,
								"Type" : type,
								"Category" : category,
								"Status" : status,
								"DeploymentType" : deploymenttype,
								"Comments" : comments,
								"POC" : poc,
								"ReferenceDocuments" : link,
                                Id: val.Id,
								"ApprovalExpirationDate": approvalExpDate
							});
						} else {
							if (val.Category == standcat) {
								$scope.bstData.push({
									"Name" : name,
									"Description" : description,
									"Type" : type,
									"Category" : category,
									"Status" : status,
									"DeploymentType" : deploymenttype,
									"Comments" : comments,
									"POC" : poc,
									"ReferenceDocuments" : link,
                                    Id: val.Id,
									"ApprovalExpirationDate": approvalExpDate
								});
							}
						}

					});
					// WHERE IS THIS USED BY THE CLIENT?? Was this an early
					// attempt to handle the "isEmptyObject" case above?
					// Perhaps it's used by the heatmap?
					if ($scope.bstData.length == 0) {
						$.each(standcats, function (key, val) {
							if (standcat == val.ParentCategory) {
								var standname = val.Name;
								var udescription = '';
								var uname = '';
								var utype = '';
								var ucategory = '';
								var ustatus = '';
								var udeploymenttype = '';
								var ucomments = '';
								var upoc = val.POC;
								var urefdoc = '';
								var ulink = '';
								$.each(itstandards, function (key, val) {
									if (standname === val.Name) {
										udescription = val.Description;
										uname = val.Name;
										utype = val.Type;
										ucategory = val.Category;
										ustatus = val.Status;
										udeploymenttype = val.DeploymentType;
										ucomments = val.Comments;
										upoc = val.POC;
										urefdoc = val.ReferenceDocuments;
										ulink = "<a href=" + "'" + refdoc + "'" + " target='_blank'>" + refdoc + "</a>";

									}

								});
							}
							$scope.bstData.push({
								"Name" : uname,
								"Description" : udescription,
								"Type" : utype,
								"Category" : ucategory,
								"Status" : ustatus,
								"DeploymentType" : udeploymenttype,
								"Comments" : ucomments,
								"POC" : upoc,
								"ReferenceDocuments" : ulink,
								"ApprovalExpirationDate" : val.ApprovalExpirationDate
							});
						});

					}

                    bstSearchUtils.checkFilterState($scope);
					$scope.bsTableConfig = {
						columns: [{
							field: 'Name',
							title: 'Standard Name',
							sortable: true
						}, {
							field: 'Description',
							title: 'Description',
							sortable: true
						},  {
							field: 'Category',
							title: 'Category',
							sortable: true
						}, {
							field: 'Status',
							title: 'Status',
							sortable: true
						}, {
							field: 'DeploymentType',
							title: 'Deployment Type',
							sortable: true,
							visible: false
						}, {
							field: 'Comments',
							title: 'Comments',
							sortable: true,
                            // class: 'col-rpt-varchar',
                            cellStyle: function (value, row, index, field) {
                                console.log(value.length);
                                return {
                                    classes: (value.length > 175)? 'col-rpt-wider' : 'col-rpt-wide',
                                };
                            }
						},  {
							field: 'POC',
							title: 'POC',
							sortable: true,
							visible: false
						}, {
							field: 'ReferenceDocuments',
							title: 'Reference Documents',
							sortable: true,
							visible: false
						}, {
							field: 'ApprovalExpirationDate',
							title: 'Approval Expiration Date',
							sortable: true,
							visible: false
						}],
						data: $scope.bstData
					};
                    bstSearchUtils.updateConfig($scope);
                    $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
                    bstSearchUtils.handleSearchState($scope);
				});
			});
        }

		// Method for handling click events on the IT Standards table
		$('#standtable').on('click-row.bs.table', function (e, row, $element) {
			// note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
				var standpath = row.Name
				standpath = standpath.replace(/\//g , "-%")
				$location.path('/itstandards/' + standpath);
				$route.reload();
			}
		});



		// Method for Gold Image table
        $scope.createGoldImageTable = function () {
            $scope.$bstEl = $('#goldtable');
            $scope.hasUsedSearchForm = false;
            $scope.rootPath = '/itstandards_goldimage';
			// Use the Organization 'query' method to send an appropriate GET request
            var stands = ITStandard.query();
            stands.$promise.then(function (populateData) {
                $scope.bstData = [];
                $.each(stands, function (key, val) {
                    if ([val.GoldImage] == "T") {
                        $scope.bstData.push({
							"Name" : val.Name,
							"Description" : val.Description,
							"Status" : val.Status,
							"GoldComment" : val.GoldImageComment
						});
                    }
                });
                bstSearchUtils.checkFilterState($scope);
                $scope.bsTableConfig = {
                    columns: [{
                        field: 'Name',
                        title: 'Name',
						sortable: true
                    }, {
                        field: 'Description',
                        title: 'Description',
						sortable: true
                    }, {
                        field: 'Status',
                        title: 'Status',
						sortable: true
                    }, {
                        field: 'GoldComment',
                        title: 'Details',
                    }],
                    data: $scope.bstData
                };
                bstSearchUtils.updateConfig($scope);
                $scope.$bstEl.bootstrapTable($scope.bsTableConfig);
                bstSearchUtils.handleSearchState($scope);
            });


		}

		// Method for handling click events on the IT Standards table
		$('#goldtable').on('click-row.bs.table', function (e, row, $element) {
			// note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
				var standpath = row.Name
				standpath = standpath.replace(/\//g , "-%")
				$location.path('/itstandards/' + standpath);
				$route.reload();
			}
		});

		// Method for retrieving a single IT Standard's detail
        $scope.createITStandDetail = function() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			});
            var stand = $routeParams.standpath;
			stand = stand.replace(/-%/g , "/");
            // Use the Application 'get' method to send an appropriate GET request
            var standards = ITStandard.query();
			var standid = '';
            standards.$promise.then(function (populateData) {
                $.each(standards, function (key, val) {
					if ([val.Name] == stand) {
						$scope.standId = val.Id;
						standid = val.Id;
						$scope.standName = val.Name;
						$scope.standDescription = val.Description;
						$scope.cat = val.Category;
						$scope.poc = val.POC;
						$scope.status = val.Status;
						$scope.type = val.Type;
						$scope.comments = val.Comments||$scope.noITStdCommentsMsg;
						$scope.approvalExpirationDate = val.ApprovalExpirationDate;
					}
				});
				var appmap = AppTechMap.query();
				var applist = [];
				appmap.$promise.then(function (populateData) {
					$.each(appmap, function (key, val) {
						if ([val.Techid] == $scope.standId) {
							applist.push(val.Appid);
						}
					});
					if (applist.length > 0){
						d3.select("#relapps").style("display", "block");
					}
				});
			});


        }

		// Method for retrieving a single IT Standard's related Applications
        $scope.getRelatedApps = function(standId) {
            // Use the Application 'get' method to send an appropriate GET request
            var appmap = AppTechMap.query();
            var applist = [];
            appmap.$promise.then(function (populateData) {
                $.each(appmap, function (key, val) {
                    if ([val.Techid] == standId) {
                        applist.push(val.Appid);
                    }
                });
                var apps = Application.query();
                apps.$promise.then(function (populateData) {
                    var techappnames = [];
                    for (var i = 0; i < apps.length; i++) {
                        var tmpappid = applist[i];
                        for (var ind = 0; ind < apps.length; ind++) {
                            var tmpstandid = apps[ind].Id;
                            if (tmpappid === tmpstandid) {
                                techappnames.push({"Name" : apps[ind].Name, "Description" : apps[ind].Description, "SSO" : apps[ind].SSO_Display_Name, "Status" : apps[ind].Status, "Id" : apps[ind].Id});
                            }
                            else {
                                continue
                            }
                        }
                    }
					$('#standrelapptable').bootstrapTable({
						columns: [{
							field: 'Name',
							title: 'Business Application Name',
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
						data: techappnames
					});
                });
            });
        }

		// Method for handling click events on the IT Standards app table
		$('#standrelapptable').on('click-row.bs.table', function (e, row, $element) {
			// note: this :has selector cannot be cached; done this way to get
            // around caching & DOM availabily issues
            if (!!$('.bootstrap-table:not(:has(.dropdown-toggle[aria-expanded="true"]))').length) {
				var apppath = row.Id
				apppath = apppath.replace(/\//g , "-%")
				$location.path('/applications/' + apppath);
				$route.reload();
			}
		});

		// Method for IT Standards Heatmap
        $scope.createStandardsTree = function () {
             // Use the IT Standard By Category 'query' method to send an appropriate GET request
            var stands = ITStandardByCat.query();
            stands.$promise.then(function (populateData) {
				$('#standardsbody').html('<svg id="standardschart" class="dashboard"></svg>');
                var count = [];
				var parent = 'IT Standard Catagories';
				var parentcats = [];
				var parentname = '';
				var uparentcats = [];
				var uchildcats = [];
				var childcats = [];
				var childname = '';
				var parentnum = 0;
				var parentstandnum = 0;
				$.each(stands, function (key, val) {
					parentname = val.ParentCategory;
					parentnum = stands.length;
					var childstandnum = 0;
					$.each(stands, function (key, val) {
						if (val.ParentCategory == parentname){
							childstandnum = childstandnum + 1;
							childcats.push({'name' : val.Category, 'value' : 25, 'standnum' : childstandnum})
						}

						parentstandnum = parentstandnum + childstandnum;
						childstandnum = 0;
					});

					var uchildcats = _.uniq(childcats, function(item, key, name) {
						return item.name;
					});
					if (parentname == ""){
						parentname = 'Unknown';
					}
					parentcats.push({'name' : parentname, 'children' : uchildcats, 'standnum' : parentstandnum});
					childcats = [];
					uchildcats = [];
					parentstandnum = 0;
				});
				var uparentcats = _.uniq(parentcats, function(item, key, name) {
					return item.name;
				});
				var root = {'name' : parent, 'children' : uparentcats, 'standnum' : parentnum};


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


				var svg = d3.select("#standchart").append("svg")
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
							var catpath = d.name;
							catpath = catpath.replace(/\//g , "-%")
							$location.path('/itstandards_ByCategory/' + catpath);
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
						.attr("class", "parent")
						.call(rect)
					    .append("title")

				//		.text(function(d) { return d.name + ' : ' + d.description; });
						.text(function(d) { return 'Right-click to view the IT Standards for ' + d.name + '. Left-click to view the lower level categories.'; });

					g.append("text")
						.attr("dy", ".75em")
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
					  t2.selectAll("text").call(text).style("fill-opacity", 1);
					  t1.selectAll("rect").call(rect);
					  t2.selectAll("rect").call(rect);

					  // Remove the old node when the transition is finished.
					  t1.remove().each("end", function() {
						svg.style("shape-rendering", "crispEdges");
						transitioning = false;
					  });
					}

					return g;
				  }

				  function text(text) {
					text.attr("x", function(d) { return x(d.x) + 6; })
						.attr("y", function(d) { return y(d.y) + 6; });
				  }

				  function rect(rect) {
					var colorScale = d3.scale.linear()
					.domain([0, 200])
					.range(["#CEE3F6", "#045FB4"]);

					rect.attr("x", function(d) { return x(d.x); })
						.attr("y", function(d) { return y(d.y); })
						.attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
						.attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
						.style("fill", function(d) { return colorScale(d.standnum); });
				  }

				  function name(d) {
					return d.parent
						? name(d.parent) + "." + d.name
						: d.name;
				  }


		//		});


			});
        }
    }
]);
