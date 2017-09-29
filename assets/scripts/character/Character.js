import {
  messagePipeline
} from '../core/MessagePipeline';
import Game from '../game/Game';

cc.Class({
  extends: cc.Component,

  properties: {
    powerGauge: cc.Sprite,
    missLabel: cc.Animation,
    destroyedAnimation: cc.Animation,
    maxPower: 100,
    gainPowerRate: 0.01,
    isPlayer: true
  },

  // use this for initialization
  onLoad: function () {
    this._power = this.maxPower * 0.5;
    this.powerGauge.fillRange = this._power / this.maxPower;
    this._buffs = [];
  },

  init() {
    if (this._power <= 0) {
      this._power = this.maxPower * 0.5;
      this.powerGauge.fillRange = this._power / this.maxPower;
      this._buffs = [];
    }

    this.destroyedAnimation.node.setScale(0);
    this.destroyedAnimation.stop();
  },

  gainPower(power) {
    if (Game.instance.isGameFinish) {
      return;
    }
    this._power = Math.min(this.maxPower, this._power + power * this.gainPowerRate);
    this.powerGauge.fillRange = this._power / this.maxPower;
    messagePipeline.sendMessage('onGainPower', {
      isPlayer: this.isPlayer,
      power: this._power
    });
  },

  losePower(power) {
    if (Game.instance.isGameFinish) {
      return;
    }
    this._power = Math.max(0, this._power - power);
    this.powerGauge.fillRange = this._power / this.maxPower;
    messagePipeline.sendMessage('onGainPower', {
      isPlayer: this.isPlayer,
      power: this._power
    });
  },

  damage(val) {
    if (Game.instance.isGameFinish) {
      return;
    }
    let shield = this.getShieldBuff();
    let damage = Math.max(0, val - shield);
    this._power = Math.max(0, this._power - damage);
    this.powerGauge.fillRange = this._power / this.maxPower;
    messagePipeline.sendMessage('onGainPower', {
      isPlayer: this.isPlayer,
      power: this._power
    });
    if (this._power <= 0) {
      this.destroyedAnimation.play();
      Game.instance.gameFinish(!this.isPlayer);
    }
  },

  missDisplay() {
    this.missLabel.play();
  },

  addBuff(data) {
    this._buffs.push(Object.assign({}, data));
  },

  getShieldBuff() {
    let shieldVal = 0;
    for (let i = 0; i < this._buffs.length; i++) {
      if (this._buffs[i].buffType === 'bfShield') {
        shieldVal += this._buffs[i].buffVal;
      }
    }
    return shieldVal;
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (Game.instance.isGameFinish) {
      return;
    }
    for (let i = 0; i < this._buffs.length; i++) {
      this._buffs[i].buffTime -= dt;
      if (this._buffs[i].buffTime <= 0) {
        this._buffs.splice(i, 1);
        i -= 1;
      }
    }
  },
});
