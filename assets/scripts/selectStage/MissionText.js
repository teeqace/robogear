cc.Class({
  extends: cc.Component,

  properties: {
    text: cc.Label
  },

  // use this for initialization
  onLoad: function () {

  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    this.text.node.x -= dt * 100;
    if (this.text.node.x < -400 - this.text.node.width) {
      this.text.node.x = 0;
    }
  },
});
