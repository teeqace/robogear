cc.Class({
  extends: cc.Component,

  properties: {
    rotateObject: cc.Node,
    reverseObject: cc.Node,
    rotateRate: 1.0
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
    let location = event.getLocation()
    cc.log('_onTouchBegan')
    location = this.node.convertToNodeSpaceAR(location)
    this._nodeStartDeg = this.rotateObject.rotation;
    this._beforeDeg = this._getDeg(location);
    // cc.log(this._beforeDeg)

    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    this._touched = true
  },
  
  _onTouchMove(event) {
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
    this.rotateObject.rotation += deg * this.rotateRate;
    this.reverseObject.rotation = -this.rotateObject.rotation;
    // cc.log(location)
    this._beforeDeg =  thisDeg;
  },

  _getDeg(location) {
    let from = this.rotateObject.getPosition();
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