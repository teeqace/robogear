import {
  messagePipeline
} from '../core/MessagePipeline';
import Character from './Character';
import GearObjects from '../core/GearObjects';
import SkillBase from '../skills/SkillBase';
import Player from './Player';
import Game from '../game/Game';

const ENEMY_DATA = [
  {
    imageIndex: 0,
    name: 'Boro',
    maxPower: 100,
    gearSpeed: -500,
    gearSpeedPinch: -1000, 
    pinchBorder: 0.25,
    affordAttackBorder: 0.75,
    affordAttackRate: 0.5,
    normalAttackRate: 0.08,
    pinchBorderPlayer: 0.3,
    actionDecideTime: 0.5
  },
  {
    imageIndex: 1,
    name: 'R-Bee',
    maxPower: 75,
    gearSpeed: -1000,
    gearSpeedPinch: -1500, 
    pinchBorder: 0.5,
    affordAttackBorder: 0.8,
    affordAttackRate: 0.8,
    normalAttackRate: 0.03,
    pinchBorderPlayer: 0.5,
    actionDecideTime: 0.4
  },
  {
    imageIndex: 2,
    name: 'Gigant',
    maxPower: 150,
    gearSpeed: -500,
    gearSpeedPinch: -3000, 
    pinchBorder: 0.2,
    affordAttackBorder: 0.5,
    affordAttackRate: 0.75,
    normalAttackRate: 0.00,
    pinchBorderPlayer: 0.3,
    actionDecideTime: 0.3
  }
]
const Enemy = cc.Class({
  extends: Character,

  properties: {
    robotImage: cc.Sprite,
    robotImages: {
      default: [],
      type: [cc.SpriteFrame]
    },
    robotName: cc.Label,
    gear: GearObjects,
    gearSpeed: -500,
    gearSpeedPinch: -1000, 
    skills: {
      default: [],
      type: [SkillBase]
    },
    pinchBorder: 0.25,
    affordAttackBorder: 0.75,
    affordAttackRate: 0.5,
    normalAttackRate: 0.05,
    pinchBorderPlayer: 0.3,
    actionDecideTime: 0.5
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    this._super();
    Enemy.instance = this;
    
    this.actionDecideTimer = this.actionDecideTime;
    this.actionName = 'power';

    messagePipeline.on('onRoundStart', this.init, this);

    this.createEnemy(0);
  },

  init(event) {
    let round = event.getUserData();
    this.createEnemy(round);
    this._super();
  },

  createEnemy(round) {
    let data = ENEMY_DATA[round % ENEMY_DATA.length];

    this.robotImage.spriteFrame = this.robotImages[data.imageIndex];
    this.robotName.string = `vs ${data.name}`;
    this.maxPower = data.maxPower;
    this.gearSpeed = data.gearSpeed;
    this.gearSpeedPinch = data.gearSpeedPinch;
    this.pinchBorder = data.pinchBorder;
    this.affordAttackBorder = data.affordAttackBorder;
    this.affordAttackRate = data.affordAttackRate;
    this.normalAttackRate = data.normalAttackRate;
    this.pinchBorderPlayer = data.pinchBorderPlayer;
    this.actionDecideTime = data.actionDecideTime;

    this.actionDecideTimer = this.actionDecideTime;
    this.actionName = 'power';
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    this._super(dt);
    if (!Game.instance.isGameStart) {
      return;
    }
    if (Game.instance.isGameFinish) {
      return;
    }

    this.gearSpeed -= dt * 2;
    this.gearSpeedPinch -= dt * 2;

    this.actionDecideTimer += dt;
    if (this.actionDecideTimer >= this.actionDecideTime) {
      this.actionDecideTimer = 0;
      this.actionName = this._actionDecide();
    }
    if (this.actionName === 'power') {
      if (this._isPinch()) {
        this.gear.rotateByScript(dt * this.gearSpeedPinch);
      } else {
        this.gear.rotateByScript(dt * this.gearSpeed);
      }
    } else if (this.actionName.indexOf('skill') >= 0) {
      let id = Number(this.actionName.slice(-1));
      this.skills[id].$runSkill();
      this.actionName = '';
    }
  },

  _actionDecide() {
    let actionName = 'power';
    
    let skills = this._getAvailableSkills();
    let isPinch = this._isPinch();
    let isAffordAttack = this._isAffordAttack();
    let isPlayerPinch = this._playerIsPinch();
    if (skills.length > 0) {
      if (isAffordAttack && Math.random() < this.affordAttackRate) {
        let decideId = skills[0];
        for (let i = 0; i < skills.length; i++) {
          if (i === 0) {
            decideId = skills[i];
          } else if (this.skills[skills[i]].damage > this.skills[decideId].damage) {
            decideId = skills[i];
          }
        }
        actionName = `skill${skills[decideId]}`;
        cc.log('afford');
      } else if (isPlayerPinch && !isPinch && Math.random() < this.affordAttackRate) {
        actionName = `skill${skills[Math.floor(Math.random() * skills.length)]}`;
        cc.log('afford-playerpinch');
      } else if (isPlayerPinch && isPinch && Math.random() < this.normalAttackRate) {
        actionName = `skill${skills[Math.floor(Math.random() * skills.length)]}`;
        cc.log('afford-bothpinch');
      } else if (!isPlayerPinch && !isPinch && Math.random() < this.normalAttackRate) {
        actionName = `skill${skills[Math.floor(Math.random() * skills.length)]}`;
        cc.log('normal');
      }
    }
    return actionName;
  },

  _getAvailableSkills() {
    let skillId = [];
    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].power < this._power) {
        skillId.push(i);
      }
    }
    return skillId;
  },

  _isPinch() {
    return (this._power / this.maxPower) < this.pinchBorder;
  },

  _isAffordAttack() {
    return (this._power / this.maxPower) >= this.affordAttackBorder;
  },

  _playerIsPinch() {
    return (Player.instance._power / Player.instance.maxPower) < this.pinchBorderPlayer;
  }
});

export default Enemy;
