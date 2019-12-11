/* eslint-disable */

/**
* Utils for section 508/accessibility compliance
*
* @param  {[Type]}  paramName paramDesc
* @return {[Type]} TBD
*/

// b/c we don't want to overwrite anything accidentally...
window.ea = window.ea || {};
window.ea.util508 = window.ea.util508 || {};

// Tip: our window.ea namespace gets passed in as an *argument* for @param ea
// Anything attached to the ea namespace will be public, everything else is private.
(function (util508, $, _) {

  // must be an anchor so we can match its hash to an element's ID
  function enableSkipNavLink() {
    $('.ea-skip-link').on('click', function (ev) {
      ev.preventDefault();
      var hash = ev.currentTarget.hash;
      $(hash).focus();
    });
  }

  util508.init = (function() {
    enableSkipNavLink();
    return util508;
  }());
}(window.ea.util508, window.jQuery, window._));
