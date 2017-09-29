import {
  messagePipeline
} from '../core/MessagePipeline';

cc.Class({
  extends: cc.Component,

  properties: {
      // foo: {
      //    default: null,      // The default value will be used only when the component attaching
      //                           to a node for the first time
      //    url: cc.Texture2D,  // optional, default is typeof default
      //    serializable: true, // optional, default is true
      //    visible: true,      // optional, default is true
      //    displayName: 'Foo', // optional
      //    readonly: false,    // optional, default is false
      // },
      // ...
  },

  // use this for initialization
  onLoad: function () {
  },

  init(data) {
    this._data = Object.assign({}, data);
    this._anim = this.node.getComponent(cc.Animation);
    this._anim.on('finished', this._afterAnim, this);
    this._anim.play();

    this._buffTime = data.animTime;
    this._timerStart = false;
    if (this._buffTime > 0) {
      this._timerStart = true;
    }
  },

  _checkHit() {
    this.node.emit('onCheckHit', this);
  },

  _skillMiss() {
    this._anim.stop();
    this._anim.off('finished', this._afterAnim, this);
    this.node.destroy();
  },

  _afterAnim() {
    messagePipeline.sendMessage('battle:damage', this._data);
    this._anim.off('finished', this._afterAnim, this);
    this.node.destroy();
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (!this._timerStart) {
      return;
    }
    this._buffTime -= dt;
    if (this._buffTime <= 0) {
      this.node.destroy();
    }
  },
});
