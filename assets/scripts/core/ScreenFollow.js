cc.Class({
  extends: cc.Component,

  properties: {
    innerWidth: 640,
    innerHeight: 700,
    target: {
      default: null,
      type: cc.Node
    }
  },

  // use this for initialization
  onLoad: function () {
    this.right = this.node.width / 4;
    this.left = -this.node.width / 4;

    this.baseY = this.node.y;
    this.top = this.baseY - this.node.height / 4;
    this.bottom = this.baseY;
  },

  update(dt) {
    let x = -this.target.x;
    x = Math.max(Math.min(x, this.right), this.left);
    this.node.x = x;
    
    let y = -this.target.y;
    y = Math.max(Math.min(y, this.bottom), this.top);
    this.node.y = y;
  }
});
