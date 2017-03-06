var d3 = window.d3;

d3.selection.prototype.trigger = function( event ) {
    var e = document.createEvent('Event');
    e.initEvent( event, true, true);
    this.each( function( d ) {
        this.dispatchEvent( e );
    });
   return this;
};
