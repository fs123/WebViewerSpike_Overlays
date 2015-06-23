'use strict';

var Viewer = require('../../node_modules/bpmn-js/lib/Viewer');

function IvyViewer(options) {
    Viewer.call(this, options);
}

IvyViewer.prototype = Object.create(Viewer.prototype);

module.exports = IvyViewer;

IvyViewer.prototype._ivyModules = [
    require('../feature/IvyOverlays')
];

IvyViewer.prototype._modules = [].concat(
    IvyViewer.prototype._modules,
    IvyViewer.prototype._ivyModules);