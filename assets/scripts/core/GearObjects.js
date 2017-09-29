import Player from '../character/Player';
import Enemy from '../character/Enemy';
import Game from '../game/Game';

cc.Class({
  extends: cc.Component,

  properties: {
    mainRotateObject: cc.Node,
    rotateObjects: {
      default: [],
      type: [cc.Node]
    },
    reverseObjects: {
      default: [],
      type: [cc.Node]
    },
    rotateRate: 1.0,
    isPlayer: true
  },
  
  // use this for initialization
  onLoad() {
    this._touched = false
    this._beforeDeg = 0
    this._nodeStartDeg = 0
    this._registerEvent()
  },

  onDestroy() {
    this._unregisterEvent()
  },

  _registerEvent() {
    if (!this.isPlayer) {
      return;
    }
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
  },

  _unregisterEvent() {
    if (!this.isPlayer) {
      return;
    }
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this)
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this)
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this)
  },

  _onTouchBegan(event) {
    if (!Game.instance.isGameStart) {
      return;
    }
    if (Game.instance.isGameFinish) {
      return;
    }
    let location = event.getLocation()
    cc.log('_onTouchBegan')
    location = this.node.convertToNodeSpaceAR(location)
    this._nodeStartDeg = this.mainRotateObject.rotation;
    this._beforeDeg = this._getDeg(location);
    // cc.log(this._beforeDeg)

    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    this._touched = true
  },
  
  _onTouchMove(event) {
    if (!Game.instance.isGameStart) {
      return;
    }
    if (Game.instance.isGameFinish) {
      return;
    }
    let location = event.getLocation()
    location = this.node.convertToNodeSpaceAR(location)
    let delta = event.getDelta()

    let thisDeg = this._getDeg(location);
    let deg =  thisDeg - this._beforeDeg;
    if (Math.abs(deg) > 180) {
      if (deg > 0) {
        deg -= 360;
      } else {
        deg += 360;
      }
    }
    this._rotateToPower(deg);
    this._beforeDeg =  thisDeg;
  },

  rotateByScript(deg) {
    this._beforeDeg = 0;
    this._rotateToPower(deg);
  },

  _rotateToPower(deg) {
    this.mainRotateObject.rotation += deg * this.rotateRate;
    this.rotateObjects.forEach(function(element) {
      element.rotation += deg * this.rotateRate / element.getScale()
    }, this);
    this.reverseObjects.forEach(function(element) {
      element.rotation -= deg * this.rotateRate / element.getScale()
    }, this);
    // cc.log(location)

    if (this.isPlayer) {
      Player.instance.gainPower(Math.abs(deg));
    } else {
      Enemy.instance.gainPower(Math.abs(deg));
    }
  },

  _getDeg(location) {
    let from = this.mainRotateObject.getPosition();
    let to = cc.p(location.x, location.y)

    let radAngle = cc.pToAngle(cc.pSub(to, from));
    let degAngle = -cc.radiansToDegrees(radAngle);

    return degAngle;
  },

  _onTouchEnded(event) {
    this._finishTouch(event)
  },

  _onTouchCancel(event) {
    this._finishTouch(event)
  },

  _finishTouch(event) {
    if (!this._touched) {
      return
    }
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    this._touched = false

    let location = event.getLocation()

  }

});