import {
  messagePipeline
} from '../core/MessagePipeline';
  
cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad: function () {
    this._registerEvent()
  },
  
  onDestroy() {
    this._unregisterEvent()
  },

  _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
  },

  _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
  },
  
  _onTouchBegan(event) {
    messagePipeline.sendMessage('onVacuum', this);
  },

  _onTouchEnded(event) {
    messagePipeline.sendMessage('onVacuumEnd', this);
  },

  _onTouchCancel(event) {
    messagePipeline.sendMessage('onVacuumEnd', this);
  },
  
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {
  // },
});
