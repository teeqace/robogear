import {
  messagePipeline
} from '../core/MessagePipeline';
import Character from './Character';

const Player = cc.Class({
  extends: Character,

  properties: {
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    this._super();
    Player.instance = this;
    messagePipeline.on('onRoundStart', this.init, this);
  },


  init(event) {
    let round = event.getUserData();
    this._super();
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    this._super(dt);
  },
});

export default Player;
