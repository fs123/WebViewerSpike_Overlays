'use strict';

var OverlayBuilder = function(overlays) {

    var elementId = "";
    var text = "";
    var style = "note";
    var position = "UR";

    var positions = {
        tr: {
            top: -25,
            right: 5
        },
        br: {
            top: 25,
            right: 5
        }
    };

    return {
        forElement : function(elementId) {
            this.elementId = elementId;
            return this;
        },
        withText : function(text) {
            this.text = text;
            return this;
        },
        asNumber : function() {
            this.style = "number";
            return this;
        },
        asNote : function() {
            this.style = "note";
            return this;
        },
        asWarning : function() {
            this.style = "warning";
            return this;
        },
        onTopRight : function() {
            this.position = "tr";
            return this;
        },
        onBottomRight : function() {
            this.position = "br";
            return this;
        },

        createAndAddOverlay : function () {
            overlays.add(this.elementId, this.style, {
                position: positions[this.position],
                html: '<div>' + this.text + '</div>'
            });
        }
    };

};


function IvyOverlays(eventBus, overlays) {
/*
    function addNumber(elementId, number, options) {
        overlays.add(elementId, 'number', {
            position: {
                top: -25,
                right: 5
            },
            html: '<div>' + number + '</div>'
        });
    }

    eventBus.on('import.success', function(event){
        addNumber('SCAN_QR_CODE', 123);
    });
*/
    var getOverlays = function() {
        return overlays;
    };

    var createBuilder = function() {
        return new OverlayBuilder(overlays);
    };

    this.createOverlayBuilder = createBuilder;
}


IvyOverlays.$inject = [ 'eventBus', 'overlays'];

module.exports = IvyOverlays;