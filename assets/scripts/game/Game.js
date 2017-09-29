import {
  messagePipeline
} from '../core/MessagePipeline';

const GameMain = cc.Class({
  extends: cc.Component,

  properties: {
  },

  statics: {
    instance: null,
  },
  
  // use this for initialization
  onLoad: function () {
    GameMain.instance = this;

    this.isReady = false;
    this.isGameStart = false;
    this.isGameFinish = false;
    this.readyTime = 2;
    this.finishTime = 2;

    this.roundCount = 0;

    this.roundStart();
  },

  // getWorldCenter() {
  //   let a = this.world.position
  // },
  gameFinish(isWin) {
    this.isGameFinish = true;
    let type = 'win';
    if (!isWin) {
      type = 'lose';
    }
    messagePipeline.sendMessage('onLabelShow', {
      type: type,
      time: -1
    });
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (!this.isReady) {
      this.isReady = true;
      messagePipeline.sendMessage('onLabelShow', {
        type: 'ready',
        time: -1
      });
      return;
    }
    if (!this.isGameStart) {
      this.readyTime -= dt;
      if (this.readyTime <= 0) {
        this.isGameStart = true;
        messagePipeline.sendMessage('onLabelShow', {
          type: 'fight',
          time: 1
        });
      }
      return;
    }
    if (this.isGameFinish) {
      this.finishTime -= dt;
      if (this.finishTime <= 0) {
        this.roundCount += 1;
        this.roundStart();
      }
    }
  },
  
  roundStart() {
    this.isReady = false;
    this.isGameStart = false;
    this.isGameFinish = false;
    this.readyTime = 2;
    this.finishTime = 2;
    messagePipeline.sendMessage('onRoundStart', this.roundCount);
  },
});

export default GameMain;