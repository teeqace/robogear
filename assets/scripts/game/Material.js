import {
  messagePipeline
} from '../core/MessagePipeline';
import Game from './Game'

cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad: function () {
    this.sprite = this.node.getComponent(cc.Sprite)
    this.id = '';
    this.description = '';
    this.exp = 0;
    this.weight = 0;

    this.isVacuumable = false;

    messagePipeline.on('onVacuum', this._onVacuum, this);
    messagePipeline.on('onVacuumEnd', this._onVacuumEnd, this);
    

    this.init({
    })
  },

  init(data) {
    this.id = ''
    this.description = '普通の地球人（男）'
    this.exp = 10
    this.weight = 100
  },
  
  _onVacuum() {
    if (!this.isVacuumable) {
      return;
    }
    this.node.stopAction(this.animUV)

    let vSpeed = this.weight / (20 * Game.instance.ufoLevel)
    let anim1 = cc.scaleTo(vSpeed, 1)
    let anim2 = cc.rotateTo(vSpeed, 720)
    let center = Game.instance.world.position.mul(-1)
    let anim3 = cc.moveTo(vSpeed, center.x, center.y)
    this.animV = cc.sequence(cc.spawn(anim1, anim2, anim3), cc.callFunc(()=>{

    }, this))
    this.node.runAction(this.animV)
  },
  
  _onVacuumEnd() {
    if (!this.isVacuumable) {
      return;
    }
    this.node.stopAction(this.animV)
    this.animUV = cc.spawn(cc.scaleTo(0.2, 0.2), cc.rotateTo(0.2, 0))
    this.node.runAction(this.animUV)


  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    let from = cc.p(0, 0);
    let to = this.node.parent.position.add(this.node.position);

    let distance = cc.pDistance(from, to);
    if (distance >= 500) {
      this.node.emit('disappear', this.node);
    } else if (distance <= this.node.width / 2) {
      this.isVacuumable = true;
    } else {
      this.isVacuumable = false;
    }
  },
});
