import {
  messagePipeline
} from '../core/MessagePipeline';
import Player from '../character/Player';
import Enemy from '../character/Enemy';
import Game from '../game/Game';

cc.Class({
  extends: cc.Component,

  properties: {
    power: 10,
    hitRate: 0.9,
    damage: 10,
    buffTime: 0,
    buffType: '',
    buffVal: 0,
    fromPlayer: true,
    btnMask: cc.Sprite,
    skillField: cc.Node,
    skillEffect: cc.Prefab
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onGainPower', this._onGainPower, this);
    this._skillAvailable = false;
  },

  _onGainPower(event) {
    let data = event.getUserData();
    if (data.isPlayer !== this.fromPlayer) {
      return;
    }
    let powerFillRange = (data.power - this.power) / this.power
    if (data.power - this.power === 0) {
      powerFillRange -= 0.05;
    }
    this.btnMask.fillRange = powerFillRange;
    if (powerFillRange >= 0) {
      this._skillAvailable = true;
    } else {
      this._skillAvailable = false;
    }
  },

  $runSkill() {
    if (!this._skillAvailable) {
      return;
    }
    if (!Game.instance.isGameStart) {
      return;
    }
    if (Game.instance.isGameFinish) {
      return;
    }
    let instance = cc.instantiate(this.skillEffect);

    instance.parent = this.skillField;
    if (this.fromPlayer) {
      instance.scaleX = 1;
    } else {
      instance.scaleX = -1;
    }
    instance.on('onCheckHit', this._onCheckHit, this);
    instance.getComponent('SkillEffect').init({
      animTime: this.buffTime
    });

    if (this.fromPlayer) {
      Player.instance.losePower(this.power);
      Player.instance.addBuff({
        buffTime: this.buffTime,
        buffType: this.buffType,
        buffVal: this.buffVal,
      });
    } else {
      Enemy.instance.losePower(this.power);
      Enemy.instance.addBuff({
        buffTime: this.buffTime,
        buffType: this.buffType,
        buffVal: this.buffVal,
      });
    }
  },

  _onCheckHit(event) {
    if (Math.random() >= this.hitRate) {
      event.detail._skillMiss();
      if (this.fromPlayer) {
        Enemy.instance.missDisplay();
      } else {
        Player.instance.missDisplay();
      }
    } else {
      if (this.fromPlayer) {
        Enemy.instance.damage(this.damage);
      } else {
        Player.instance.damage(this.damage);
      }
    }
  }
  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
