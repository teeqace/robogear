cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad: function () {
  },

  $press() {
    cc.director.loadScene('scenes/Game.fire', () => {
    });
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
