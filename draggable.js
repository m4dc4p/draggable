Ext.onReady(function() {
  Ext.create('Ext.container.Viewport', {
    layout: 'vbox',
    items: [{
      xtype: 'panel',
      title: 'Drop a Panel Here',
      listeners: { render: initializeDropTarget },
      cls: 'x-dd-drop-ok',
      layout: {
        type: 'vbox',
        stretch: 'align'
      },
      width: 300,
      height: 300
    }, {
      xtype: 'panel',
      title: 'Drag This Panel',
      draggable: true,
      bodyCls: 'green-body',
      width: 300,
      height: 100
    }, {
      xtype: 'panel',
      title: 'Drag This Panel',
      draggable: true,
      bodyCls: 'blue-body',
      width: 300,
      height: 100
    }, {
      xtype: 'panel',
      title: 'Drag This Panel',
      draggable: true,
      bodyCls: 'red-body',
      width: 300,
      height: 100
    }]
  });
});

/**
Initialize the DropTarget object associated
with our panel. The 'cmp' argument will be
the panel (a Component object).
*/
function initializeDropTarget(targetPanel) {
  // Create the DropTarget object and assign it to the panel. Does not
  // have to be assigned to the panel but needs to be assigned to something,
  // or it will get garbage-collected too soon.
  targetPanel.dropTarget = Ext.create('Ext.dd.DropTarget', targetPanel.el);

  // Called once, when dragged item is dropped in the target area. Return false
  // to indicate an invalid drop. DO NOT MODIFY the UI in 
  // this function. Use afterDragDrop and the data object.
  targetPanel.dropTarget.notifyDrop = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyDrop:" + source.id);

    // The component that was dropped.
    var droppedPanel = Ext.getCmp(source.id);

    // We can't modify the component that was dropped in this
    // function. However, we can add an event handler on the component
    // that will be called shortly. 
    //
    // In the handler we clone the component (not strictly necessary, we could
    // do that here) and then remove our old component.  
    droppedPanel.dd.afterValidDrop = function() {
      targetPanel.add(droppedPanel.cloneConfig({
        draggable: false,
        title: "Can't Drag This Panel."
      }));

      droppedPanel.destroy();
    };

    return true;
  };

  // Called once, when dragged item enters drop area.
  targetPanel.dropTarget.notifyEnter = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyEnter:" + source.id);

    return this.callParent(Array.prototype.slice.call(arguments));
  };

  // Called once, when dragged item leaves drop area.
  targetPanel.dropTarget.notifyOut = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyOut:" + source.id);

    return this.callParent(Array.prototype.slice.call(arguments));
  };

  // Called for each mouse movement as dragged item is over the drop area.
  targetPanel.dropTarget.notifyOver = function(source, evt, data) {
    if(typeof console != "undefined")
      console.log("notifyOver:" + source.id);

    return this.callParent(Array.prototype.slice.call(arguments));
  };

}