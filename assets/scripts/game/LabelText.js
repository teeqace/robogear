import {
  messagePipeline
} from '../core/MessagePipeline';

const TEXT_READY = 'READY?';
const TEXT_FIGHT = 'FIGHT!';
const TEXT_WIN = 'YOU WIN!';
const TEXT_LOSE = 'YOU LOSE...';

cc.Class({
  extends: cc.Component,

  properties: {
    text: cc.Label
  },

  // use this for initialization
  onLoad: function () {
    messagePipeline.on('onLabelShow', this._onLabelShow, this);
    this.dispTime = 0;
    this.dispTimer = 0;
  },  

  _onLabelShow(event) {
    let data = event.getUserData();
    let type = data.type;

    this.dispTime = data.time;
    this.dispTimer = 0;
    if (type === 'ready') {
      this.text.string = TEXT_READY;
    } else if (type === 'fight') {
      this.text.string = TEXT_FIGHT;
    } else if (type === 'win') {
      this.text.string = TEXT_WIN;
    } else if (type === 'lose') {
      this.text.string = TEXT_LOSE;
    }
    this.node.scaleY = 1;
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    if (this.dispTime < 0) {
      return;
    }
    this.dispTimer += dt;
    if (this.dispTimer >= this.dispTime) {
      this.node.scaleY = 0;
      this.dispTime = -1;
    }
  },
});
