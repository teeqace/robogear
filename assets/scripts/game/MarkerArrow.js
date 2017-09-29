cc.Class({
  extends: cc.Component,

  properties: {
    scopeNode: cc.Node,
    targetNode: cc.Node
  },

  // use this for initialization
  onLoad: function () {

  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {


    let from = this.scopeNode.getPosition();
    let to = this.targetNode.parent.position.add(this.targetNode.position);

    let distance = cc.pDistance(from, to);
    if (distance <= 300) {
      this.node.opacity = 0
    } else {
      this.node.opacity = 255
    }

    let radAngle = cc.pToAngle(cc.pSub(to, from));
    let degAngle = -cc.radiansToDegrees(radAngle) + 90;

    this.node.rotation = degAngle;
  },
});
