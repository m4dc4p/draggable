Ext.onReady(function() {
  Ext.create('Ext.container.Viewport', {
    layout: 'vbox',
    items: [{
      xtype: 'panel',
      title: 'Drop a Panel Here',
      layout: {
        type: 'vbox',
        stretch: 'align'
      },
      width: 300,
      height: 300,
      cls: 'x-dd-drop-ok',
      listeners: { render: initializeDropTarget }
    }, {
      xtype: 'panel',
      title: 'Drag This Panel',
      bodyCls: 'green-body',
      width: 300,
      height: 100,
      draggable: true
    }, {
      xtype: 'panel',
      title: 'Drag This Panel',
      bodyCls: 'blue-body',
      width: 300,
      height: 100,
      draggable: true
    }, {
      xtype: 'panel',
      title: 'Drag This Panel',
      bodyCls: 'red-body',
      width: 300,
      height: 100,
      draggable: true
    }]
  });
});

/**
Initialize the DropTarget object associated
with our panel. The 'cmp' argument will be
the panel (a Component object).
*/
function initializeDropTarget(cmp) {
  // Create the DropTarget object and assign it to the panel. Does not
  // have to be assigned to the panel but needs to be assigned to something,
  // or it will get garbage-collected too soon.
  cmp.dropTarget = Ext.create('Ext.dd.DropTarget', cmp.el);

  // Called once, when dragged item enters drop area.
  cmp.dropTarget.notifyEnter = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyEnter:" + source.id);
    return this.callParent(Array.prototype.slice.call(arguments));
  };

  // Called once, when dragged item leaves drop area.
  cmp.dropTarget.notifyOut = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyOut:" + source.id);
    return this.callParent(Array.prototype.slice.call(arguments));
  };

  // Called for each mouse movement as dragged item is over the drop area.
  cmp.dropTarget.notifyOver = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyOver:" + source.id);
    return this.callParent(Array.prototype.slice.call(arguments));
  };

  // Called once, when dragged item is dropped in the target area. Return false
  // to indicate an invalid drop. DO NOT MODIFY the UI in 
  // this function. Use afterDragDrop and the data object.
  cmp.dropTarget.notifyDrop = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyDrop:" + source.id);

    // The component that was dropped.
    var droppedCmp = Ext.getCmp(source.id);

    // We can't modify the component that was dropped in this
    // function. However, we can add an event handler on the component
    // that will be called shortly. 
    //
    // In the handler we clone the component (not strictly necessary, we could
    // do that here) and then remove our old component.  
    droppedCmp.dd.afterValidDrop = function() {
      cmp.add(droppedCmp.cloneConfig({
        draggable: false,
        title: "Can't Drag This Panel."
      }));

      droppedCmp.destroy();
    };

    return true;
  };
}