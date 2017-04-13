/* global window */

/**
* [axcom]
* Accessibility(ax) Compliance(com) extensions
*
* @param  {[Type]}  paramName paramDesc
* @return {[Type]} TBD
*/

// b/c we don't want to overwrite anything accidentally...
window.ea = window.ea || {};
window.ea.axcom = window.ea.axcom || {};

// Tip: our window.ea namespace gets passed in as an *argument* for @param ea
// Anything attached to the ea namespace will be public, everything else is private.
(function (axcom, $, _) {
  axcom.init = (function() {
    console.log('[axcom Init]');
    return axcom;
  }());
}(window.ea.axcom, window.jQuery, window._));
