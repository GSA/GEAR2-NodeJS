/* eslint-disable */

// NOTE: This module is NOT for GEAR v2 consideration and written for the
//       3rd party Bootstrap Tables plugin and its 4th party extensions.
//       Ideally, we'll replace Bootstrap Tables with something that suits our
//       needs better, such as Data-Tables. Bootstrap Tables is better suited
//       to casual, non-professional use where things like bugs and incomplete
//       features aren't that big of a deal.

dashboard.factory('bstSearchUtils', function($routeParams, $location) {
  var QUICKSEARCH_PARAM = 'all',
    COLUMN_SELECTION_PARAM = 'cols',
    LOADING_MSG_TIMEOUT = 3000,
    LOADING_WATCHER_POLL_RATE = 300,
    currentScope = null;

  // Process the querystring and pre-processes the dataset json if needed
  var checkFilterState = function(scope) {
    currentScope = scope;
    // Handle existing search--state stored in route's :query param
    if ($routeParams.query) {

      var qFilter = deserializeQuery($routeParams.query);

      // because column selection is either part of the querystring (for
      // quicksearch) or determined by the keys in the k/v pairs used in
      // the querystring
      if (qFilter.hasOwnProperty(COLUMN_SELECTION_PARAM)) {
        scope.bstActiveFields = qFilter[COLUMN_SELECTION_PARAM].split(',');
        delete qFilter[COLUMN_SELECTION_PARAM];
      } else {
        scope.bstActiveFields = _.keys(qFilter);
      }

      // on scope for public access
      scope.bstFilter = qFilter;

      // [ADVANCED-SPECIFIC]
      // because the 3rd party, advanced search does not provide a way to
      // trigger it's search on load, we are pre-filtering the data
      // ourselves, before Bootstrap Table is initialized
      if (!scope.bstFilter.hasOwnProperty(QUICKSEARCH_PARAM)) {
        // use _.filter() on the dataset(i.e. rows) while using for...in to
        // check each of the fields(i.e. cols)
        var filteredItems = _.filter(scope.bstData, function(item) {
          var isMatching = false;
          for (var p in scope.bstFilter) {
            if (typeof item[p] !== 'undefined' && item[p]) {
              isMatching = item[p].toString().toLowerCase()
                .indexOf(scope.bstFilter[p].toLowerCase()) >= 0;

              if (!isMatching) {
                break;
              }
            }
          }
          return isMatching;
        });
      }
      // stores a foundset of Id numbers so it can work reliably with the
      // Bootstrap Table filterBy method
      scope.tableFilterList = _.pluck(filteredItems, 'Id');
    }
  };

  var updateConfig = function(scope) {
    var cfg = scope.bsTableConfig,
      activeFields = scope.bstActiveFields;

    // because the user can choose what columns are visible
    _.map(cfg.columns, function(item) {
      // allow asterisk as an easy "show all"
      if (!activeFields) {
        return;
      } else if (activeFields === '*') {
        item.visible = true;
      } else {
        item.visible = _.contains(activeFields, item.field);
      }
    });

    // [QUICK-SPECIFIC]
    if ($routeParams.query &&
      scope.bstFilter.hasOwnProperty(QUICKSEARCH_PARAM)) {

      // let's use the built-in searchText feature for existing search
      // (even though it flashes all rows before it applies the filter)
      if (!!scope.bstFilter[QUICKSEARCH_PARAM]) {
        _.extend(scope.bsTableConfig, {
          searchText: scope.bstFilter[QUICKSEARCH_PARAM]
        })
      }
    }
  }

  var handleSearchState = function(scope) {
    // [ADVANCED-SPECIFIC]
    // Apply filter here!
    if ($routeParams.query &&
      !scope.bstFilter.hasOwnProperty(QUICKSEARCH_PARAM)) {
      scope.$bstEl.bootstrapTable('filterBy', {
        Id: scope.tableFilterList
      });
    }

    setEvents(scope);
  }

  // COLLECT ALL EVENT HANDLERS HERE. Think of it as an "events" config.
  var setEvents = function(scope) {
    // Questions around 'as-submit' handler below...
    // Why trigger on window and not the form? Can we fix?
    // --because form doesn't exist at this point in code
    // Why custom 'as-submit' event and not existing 'search.bs.table'?
    // --because the extension with advanced search doesn't fire the
    //   desired bst search event. Seems to be a bug.
    //
    // [ADVANCED-SPECIFIC]
    $(window).on('as-submit', function(event) {
      updateAdvancedSearch(scope, $('#advancedSearch').serialize());
    });

    // [QUICK-SPECIFIC]
    scope.$bstEl.on('search.bs.table', function(event) {
      if (scope.bstFilter.hasOwnProperty(QUICKSEARCH_PARAM)) {
        updateQuicksearch(scope);
      }
    });

    // Hand off filter control from URL to UI when user interacts with
    // any of the search controls
    $('.bootstrap-table .form-control, #advancedSearch input[type="text"]')
      .on('focus', function() {
        $(this).on('keyup', function(event) {
          // on first use, clear any filters
          if (!scope.hasUsedSearchForm) {
            scope.hasUsedSearchForm = true;
            if ($routeParams.query) {
              scope.$bstEl.bootstrapTable('filterBy', null);
            }
          } else {
            if ($(event.currentTarget).hasClass('form-control')) {
              scope.bstFilter[QUICKSEARCH_PARAM] =
                event.currentTarget.value
            }
          }
        })
      });

    // TOOLBAR EXTENSIONS
    $('div[title="Columns"]')
      .on('hide.bs.dropdown', function(event) {
        // last-minute and it's not the clearest logic, but we need to
        // determine when advsearch is active
        if (scope.bstFilter.hasOwnProperty(QUICKSEARCH_PARAM)) {
          updateQuicksearch(scope);
        } else {
          if ($routeParams.hasOwnProperty('query')) {
            updateAdvancedSearch(scope);
          } else {
            updateQuicksearch(scope);
          }
        }
      });
    // .find('input[type="checkbox"]')
    //     .on('click', function (event) {
    //         var field = $(this).data('field');
    //
    //         $('#' + field).remove();
    //     });
  }

  // [QUICK-SPECIFIC]
  var getSearchPath = function(newQuery) {
    var path = $location.path();
    var routeRe = new RegExp('^\/\.*\/find\/');
    var route = routeRe.exec(path);

    if (route) {
      // everything after '/find/' in the route is a query string so...
      var query = path.substr(route[0].length);
      path = path.replace(query, newQuery);
    } else {
      path = path + '/find/' + (newQuery || '');
    }
    return path;
  }
  // [BOTH]
  var getSelectedColumns = function(scope) {
    var cfg = scope.$bstEl.bootstrapTable('getOptions'),
      columns = [];

    _.each(cfg.columns, function(item, i) {
      if (item.visible) {
        columns.push(item.field);
      }
    });
    return columns;
  }
  // [BOTH]
  var getSerializedQuery = function(scope) {
    var filterObj = scope.bstFilter,
      columns = getSelectedColumns(scope),
      queryString = "";

    // fresh filterObj in case we're coming from an advanced search
    var newFilterObj = {};

    if (filterObj.hasOwnProperty(QUICKSEARCH_PARAM)) {
      newFilterObj[QUICKSEARCH_PARAM] = filterObj[QUICKSEARCH_PARAM];

      var s = serializeObject(newFilterObj);
      queryString = s + '&' + COLUMN_SELECTION_PARAM + '=' +
        columns.toString();
    } else {
      // late-stage need to catch columns when search has yet to be used
      if ($routeParams.hasOwnProperty('query')) {
        queryString = serializeObject(filterObj);
      } else {
        queryString = QUICKSEARCH_PARAM + '=&' + COLUMN_SELECTION_PARAM +
          '=' + columns.toString();
      }
    }
    return queryString;
  };

  // [QUICK-SPECIFIC]
  var updateQuicksearch = function(scope) {
    var serializedQuery = getSerializedQuery(scope),
      path = getSearchPath(serializedQuery);

    saveSearchState(path);
  }
  var updateAdvancedSearch = function(scope, qs) {

    // in case space (' ') is already encoded as + from the adv srch form...
    if (qs) {
      qs = qs.replace(/\+/g, ' ');
    }

    var serializedQuery = qs || null,
      selected = getSelectedColumns(scope);

    // can also be used to update the selected columns only
    if (!serializedQuery) {
      // if removed
      for (var p in scope.bstFilter) {
        if (!_.contains(selected, p)) {
          delete scope.bstFilter[p];
        }
      }
      // if added, they won't have a value at this point so...
      var others = _.difference(selected, _.keys(scope.bstFilter));
      _.each(others, function(other) {
        scope.bstFilter[other] = '';
      });

      serializedQuery = getSerializedQuery(scope);
    }

    saveSearchState(getSearchPath(serializedQuery));
  };

  /**
   * @param path {String} hashbang with state information
   * @param [replace] {Boolean} pass `true` for pushState vs replaceState
   */
  var saveSearchState = function(path, push) {
    push = push || false;
    $location.saveState(path, push);
    currentScope.$apply();
  }

  var serializeObject = function(obj) {
    var o = obj,
      k = _.keys(o),
      s = '';

    for (var i = 0; i < k.length; i++) {
      // expecting value to be URI-encoded here
      s += k[i] + '=' + o[k[i]];
      if (i < k.length - 1) {
        s += '&';
      }
    }
    return s;
  };
  var deserializeQuery = function(qs) {
    var splitQuery = qs.split('&'),
      obj = {};

    for (var i = 0; i < splitQuery.length; i++) {
      var kv = splitQuery[i].split('=');
      obj[kv[0]] = decodeURIComponent(kv[1]);
    }

    return obj;
  };

  return {
    checkFilterState: checkFilterState,
    updateConfig: updateConfig,
    handleSearchState: handleSearchState,
    updateQuicksearch: updateQuicksearch
  }
});
