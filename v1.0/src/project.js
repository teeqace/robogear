require=function e(t,i,n){function s(a,c){if(!i[a]){if(!t[a]){var r="function"==typeof require&&require;if(!c&&r)return r(a,!0);if(o)return o(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var u=i[a]={exports:{}};t[a][0].call(u.exports,function(e){var i=t[a][1][e];return s(i||e)},u,u.exports,e,t,i,n)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)s(n[a]);return s}({ButtonStart:[function(e,t,i){"use strict";cc._RF.push(t,"74babKxBvlOAZP8MSDh+TrR","ButtonStart"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},$press:function(){cc.director.loadScene("scenes/Game.fire",function(){})}}),cc._RF.pop()},{}],ButtonVacuum:[function(e,t,i){"use strict";cc._RF.push(t,"db969XFhSJEZ5ON7DGL2rOe","ButtonVacuum");var n=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._registerEvent()},onDestroy:function(){this._unregisterEvent()},_registerEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this)},_unregisterEvent:function(){this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this)},_onTouchBegan:function(e){n.messagePipeline.sendMessage("onVacuum",this)},_onTouchEnded:function(e){n.messagePipeline.sendMessage("onVacuumEnd",this)},_onTouchCancel:function(e){n.messagePipeline.sendMessage("onVacuumEnd",this)}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],Character:[function(e,t,i){"use strict";cc._RF.push(t,"204acBxyYxEl4DLFWA5bpJL","Character");var n=e("../core/MessagePipeline"),s=function(e){return e&&e.__esModule?e:{default:e}}(e("../game/Game"));cc.Class({extends:cc.Component,properties:{powerGauge:cc.Sprite,missLabel:cc.Animation,destroyedAnimation:cc.Animation,maxPower:100,gainPowerRate:.01,isPlayer:!0},onLoad:function(){this._power=.5*this.maxPower,this.powerGauge.fillRange=this._power/this.maxPower,this._buffs=[]},init:function(){this._power<=0&&(this._power=.5*this.maxPower,this.powerGauge.fillRange=this._power/this.maxPower,this._buffs=[]),this.destroyedAnimation.node.setScale(0),this.destroyedAnimation.stop()},gainPower:function(e){s.default.instance.isGameFinish||(this._power=Math.min(this.maxPower,this._power+e*this.gainPowerRate),this.powerGauge.fillRange=this._power/this.maxPower,n.messagePipeline.sendMessage("onGainPower",{isPlayer:this.isPlayer,power:this._power}))},losePower:function(e){s.default.instance.isGameFinish||(this._power=Math.max(0,this._power-e),this.powerGauge.fillRange=this._power/this.maxPower,n.messagePipeline.sendMessage("onGainPower",{isPlayer:this.isPlayer,power:this._power}))},damage:function(e){if(!s.default.instance.isGameFinish){var t=this.getShieldBuff(),i=Math.max(0,e-t);this._power=Math.max(0,this._power-i),this.powerGauge.fillRange=this._power/this.maxPower,n.messagePipeline.sendMessage("onGainPower",{isPlayer:this.isPlayer,power:this._power}),this._power<=0&&(this.destroyedAnimation.play(),s.default.instance.gameFinish(!this.isPlayer))}},missDisplay:function(){this.missLabel.play()},addBuff:function(e){this._buffs.push(Object.assign({},e))},getShieldBuff:function(){for(var e=0,t=0;t<this._buffs.length;t++)"bfShield"===this._buffs[t].buffType&&(e+=this._buffs[t].buffVal);return e},update:function(e){if(!s.default.instance.isGameFinish)for(var t=0;t<this._buffs.length;t++)this._buffs[t].buffTime-=e,this._buffs[t].buffTime<=0&&(this._buffs.splice(t,1),t-=1)}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","../game/Game":"Game"}],Enemy:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"a06f4SfEVtLUpBiS2xrtiVB","Enemy"),Object.defineProperty(i,"__esModule",{value:!0});var s=e("../core/MessagePipeline"),o=n(e("./Character")),a=n(e("../core/GearObjects")),c=n(e("../skills/SkillBase")),r=n(e("./Player")),h=n(e("../game/Game")),u=[{imageIndex:0,name:"Boro",maxPower:100,gearSpeed:-500,gearSpeedPinch:-1e3,pinchBorder:.25,affordAttackBorder:.75,affordAttackRate:.5,normalAttackRate:.08,pinchBorderPlayer:.3,actionDecideTime:.5},{imageIndex:1,name:"R-Bee",maxPower:75,gearSpeed:-1e3,gearSpeedPinch:-1500,pinchBorder:.5,affordAttackBorder:.8,affordAttackRate:.8,normalAttackRate:.03,pinchBorderPlayer:.5,actionDecideTime:.4},{imageIndex:2,name:"Gigant",maxPower:150,gearSpeed:-500,gearSpeedPinch:-3e3,pinchBorder:.2,affordAttackBorder:.5,affordAttackRate:.75,normalAttackRate:0,pinchBorderPlayer:.3,actionDecideTime:.3}],d=cc.Class({extends:o.default,properties:{robotImage:cc.Sprite,robotImages:{default:[],type:[cc.SpriteFrame]},robotName:cc.Label,gear:a.default,gearSpeed:-500,gearSpeedPinch:-1e3,skills:{default:[],type:[c.default]},pinchBorder:.25,affordAttackBorder:.75,affordAttackRate:.5,normalAttackRate:.05,pinchBorderPlayer:.3,actionDecideTime:.5},statics:{instance:null},onLoad:function(){this._super(),d.instance=this,this.actionDecideTimer=this.actionDecideTime,this.actionName="power",s.messagePipeline.on("onRoundStart",this.init,this),this.createEnemy(0)},init:function(e){var t=e.getUserData();this.createEnemy(t),this._super()},createEnemy:function(e){var t=u[e%u.length];this.robotImage.spriteFrame=this.robotImages[t.imageIndex],this.robotName.string="vs "+t.name,this.maxPower=t.maxPower,this.gearSpeed=t.gearSpeed,this.gearSpeedPinch=t.gearSpeedPinch,this.pinchBorder=t.pinchBorder,this.affordAttackBorder=t.affordAttackBorder,this.affordAttackRate=t.affordAttackRate,this.normalAttackRate=t.normalAttackRate,this.pinchBorderPlayer=t.pinchBorderPlayer,this.actionDecideTime=t.actionDecideTime,this.actionDecideTimer=this.actionDecideTime,this.actionName="power"},update:function(e){if(this._super(e),h.default.instance.isGameStart&&!h.default.instance.isGameFinish)if(this.gearSpeed-=2*e,this.gearSpeedPinch-=2*e,this.actionDecideTimer+=e,this.actionDecideTimer>=this.actionDecideTime&&(this.actionDecideTimer=0,this.actionName=this._actionDecide()),"power"===this.actionName)this._isPinch()?this.gear.rotateByScript(e*this.gearSpeedPinch):this.gear.rotateByScript(e*this.gearSpeed);else if(this.actionName.indexOf("skill")>=0){var t=Number(this.actionName.slice(-1));this.skills[t].$runSkill(),this.actionName=""}},_actionDecide:function(){var e="power",t=this._getAvailableSkills(),i=this._isPinch(),n=this._isAffordAttack(),s=this._playerIsPinch();if(t.length>0)if(n&&Math.random()<this.affordAttackRate){for(var o=t[0],a=0;a<t.length;a++)0===a?o=t[a]:this.skills[t[a]].damage>this.skills[o].damage&&(o=t[a]);e="skill"+t[o],cc.log("afford")}else s&&!i&&Math.random()<this.affordAttackRate?(e="skill"+t[Math.floor(Math.random()*t.length)],cc.log("afford-playerpinch")):s&&i&&Math.random()<this.normalAttackRate?(e="skill"+t[Math.floor(Math.random()*t.length)],cc.log("afford-bothpinch")):!s&&!i&&Math.random()<this.normalAttackRate&&(e="skill"+t[Math.floor(Math.random()*t.length)],cc.log("normal"));return e},_getAvailableSkills:function(){for(var e=[],t=0;t<this.skills.length;t++)this.skills[t].power<this._power&&e.push(t);return e},_isPinch:function(){return this._power/this.maxPower<this.pinchBorder},_isAffordAttack:function(){return this._power/this.maxPower>=this.affordAttackBorder},_playerIsPinch:function(){return r.default.instance._power/r.default.instance.maxPower<this.pinchBorderPlayer}});i.default=d,t.exports=i.default,cc._RF.pop()},{"../core/GearObjects":"GearObjects","../core/MessagePipeline":"MessagePipeline","../game/Game":"Game","../skills/SkillBase":"SkillBase","./Character":"Character","./Player":"Player"}],Game:[function(e,t,i){"use strict";cc._RF.push(t,"bdf5cN9EeZI260oEuN51dJc","Game"),Object.defineProperty(i,"__esModule",{value:!0});var n=e("../core/MessagePipeline"),s=cc.Class({extends:cc.Component,properties:{},statics:{instance:null},onLoad:function(){s.instance=this,this.isReady=!1,this.isGameStart=!1,this.isGameFinish=!1,this.readyTime=2,this.finishTime=2,this.roundCount=0,this.roundStart()},gameFinish:function(e){this.isGameFinish=!0;var t="win";e||(t="lose"),n.messagePipeline.sendMessage("onLabelShow",{type:t,time:-1})},update:function(e){return this.isReady?this.isGameStart?void(this.isGameFinish&&(this.finishTime-=e,this.finishTime<=0&&(this.roundCount+=1,this.roundStart()))):(this.readyTime-=e,void(this.readyTime<=0&&(this.isGameStart=!0,n.messagePipeline.sendMessage("onLabelShow",{type:"fight",time:1})))):(this.isReady=!0,void n.messagePipeline.sendMessage("onLabelShow",{type:"ready",time:-1}))},roundStart:function(){this.isReady=!1,this.isGameStart=!1,this.isGameFinish=!1,this.readyTime=2,this.finishTime=2,n.messagePipeline.sendMessage("onRoundStart",this.roundCount)}});i.default=s,t.exports=i.default,cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],GearObjects:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"ebbbaGZgelHMo+XOSruDJ7R","GearObjects");var s=n(e("../character/Player")),o=n(e("../character/Enemy")),a=n(e("../game/Game"));cc.Class({extends:cc.Component,properties:{mainRotateObject:cc.Node,rotateObjects:{default:[],type:[cc.Node]},reverseObjects:{default:[],type:[cc.Node]},rotateRate:1,isPlayer:!0},onLoad:function(){this._touched=!1,this._beforeDeg=0,this._nodeStartDeg=0,this._registerEvent()},onDestroy:function(){this._unregisterEvent()},_registerEvent:function(){this.isPlayer&&(this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this))},_unregisterEvent:function(){this.isPlayer&&(this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this))},_onTouchBegan:function(e){if(a.default.instance.isGameStart&&!a.default.instance.isGameFinish){var t=e.getLocation();cc.log("_onTouchBegan"),t=this.node.convertToNodeSpaceAR(t),this._nodeStartDeg=this.mainRotateObject.rotation,this._beforeDeg=this._getDeg(t),this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this),this._touched=!0}},_onTouchMove:function(e){if(a.default.instance.isGameStart&&!a.default.instance.isGameFinish){var t=e.getLocation();t=this.node.convertToNodeSpaceAR(t);e.getDelta();var i=this._getDeg(t),n=i-this._beforeDeg;Math.abs(n)>180&&(n>0?n-=360:n+=360),this._rotateToPower(n),this._beforeDeg=i}},rotateByScript:function(e){this._beforeDeg=0,this._rotateToPower(e)},_rotateToPower:function(e){this.mainRotateObject.rotation+=e*this.rotateRate,this.rotateObjects.forEach(function(t){t.rotation+=e*this.rotateRate/t.getScale()},this),this.reverseObjects.forEach(function(t){t.rotation-=e*this.rotateRate/t.getScale()},this),this.isPlayer?s.default.instance.gainPower(Math.abs(e)):o.default.instance.gainPower(Math.abs(e))},_getDeg:function(e){var t=this.mainRotateObject.getPosition(),i=cc.p(e.x,e.y),n=cc.pToAngle(cc.pSub(i,t));return-cc.radiansToDegrees(n)},_onTouchEnded:function(e){this._finishTouch(e)},_onTouchCancel:function(e){this._finishTouch(e)},_finishTouch:function(e){if(this._touched){this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this),this._touched=!1;e.getLocation()}}}),cc._RF.pop()},{"../character/Enemy":"Enemy","../character/Player":"Player","../game/Game":"Game"}],GotMaterialList:[function(e,t,i){"use strict";cc._RF.push(t,"cb105H7X2RFeoTz9j5oCMsn","GotMaterialList"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}],GotMaterial:[function(e,t,i){"use strict";cc._RF.push(t,"91910k6pYxDVq2+gQQuGYgw","GotMaterial"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}],LabelText:[function(e,t,i){"use strict";cc._RF.push(t,"410beILZ/lK8YmwGa+Dh3cR","LabelText");var n=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{text:cc.Label},onLoad:function(){n.messagePipeline.on("onLabelShow",this._onLabelShow,this),this.dispTime=0,this.dispTimer=0},_onLabelShow:function(e){var t=e.getUserData(),i=t.type;this.dispTime=t.time,this.dispTimer=0,"ready"===i?this.text.string="READY?":"fight"===i?this.text.string="FIGHT!":"win"===i?this.text.string="YOU WIN!":"lose"===i&&(this.text.string="YOU LOSE..."),this.node.scaleY=1},update:function(e){this.dispTime<0||(this.dispTimer+=e,this.dispTimer>=this.dispTime&&(this.node.scaleY=0,this.dispTime=-1))}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],MarkerArrow:[function(e,t,i){"use strict";cc._RF.push(t,"0c05ecmjCxB4Jt6xNC5KGx4","MarkerArrow"),cc.Class({extends:cc.Component,properties:{scopeNode:cc.Node,targetNode:cc.Node},onLoad:function(){},update:function(e){var t=this.scopeNode.getPosition(),i=this.targetNode.parent.position.add(this.targetNode.position),n=cc.pDistance(t,i);this.node.opacity=n<=300?0:255;var s=cc.pToAngle(cc.pSub(i,t)),o=90-cc.radiansToDegrees(s);this.node.rotation=o}}),cc._RF.pop()},{}],MaterialPool:[function(e,t,i){"use strict";cc._RF.push(t,"b1291PVyOpMDpIngrunmCBo","MaterialPool"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}],Material:[function(e,t,i){"use strict";cc._RF.push(t,"73585DObzxJXINgcgQBnLLz","Material");var n=e("../core/MessagePipeline"),s=function(e){return e&&e.__esModule?e:{default:e}}(e("./Game"));cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.sprite=this.node.getComponent(cc.Sprite),this.id="",this.description="",this.exp=0,this.weight=0,this.isVacuumable=!1,n.messagePipeline.on("onVacuum",this._onVacuum,this),n.messagePipeline.on("onVacuumEnd",this._onVacuumEnd,this),this.init({})},init:function(e){this.id="",this.description="普通の地球人（男）",this.exp=10,this.weight=100},_onVacuum:function(){if(this.isVacuumable){this.node.stopAction(this.animUV);var e=this.weight/(20*s.default.instance.ufoLevel),t=cc.scaleTo(e,1),i=cc.rotateTo(e,720),n=s.default.instance.world.position.mul(-1),o=cc.moveTo(e,n.x,n.y);this.animV=cc.sequence(cc.spawn(t,i,o),cc.callFunc(function(){},this)),this.node.runAction(this.animV)}},_onVacuumEnd:function(){this.isVacuumable&&(this.node.stopAction(this.animV),this.animUV=cc.spawn(cc.scaleTo(.2,.2),cc.rotateTo(.2,0)),this.node.runAction(this.animUV))},update:function(e){var t=cc.p(0,0),i=this.node.parent.position.add(this.node.position),n=cc.pDistance(t,i);n>=500?this.node.emit("disappear",this.node):n<=this.node.width/2?this.isVacuumable=!0:this.isVacuumable=!1}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Game":"Game"}],MessagePipeline:[function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"a403d1CiuFB6KXOGeffFZNs","MessagePipeline"),Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),c=function(e){function t(){return n(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,cc.EventTarget),a(t,[{key:"sendMessage",value:function(e,t){this.emit(e,t)}}]),t}();i.messagePipeline=new c;cc._RF.pop()},{}],MissionText:[function(e,t,i){"use strict";cc._RF.push(t,"5cb4dyJzXZGdKqynrLk1zRd","MissionText"),cc.Class({extends:cc.Component,properties:{text:cc.Label},onLoad:function(){},update:function(e){this.text.node.x-=100*e,this.text.node.x<-400-this.text.node.width&&(this.text.node.x=0)}}),cc._RF.pop()},{}],Mochi:[function(e,t,i){"use strict";cc._RF.push(t,"c8b96VRd6FDm5LsyllTzY43","Mochi"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.targetX=this.node.position.x},update:function(e){var t=this.targetX-this.node.x;this.node.x+=t*(2*e)},setTarget:function(e){this.targetX=e}}),cc._RF.pop()},{}],PhysicsEnabler:[function(e,t,i){"use strict";cc._RF.push(t,"420548310dOsKvFZwkEqH9v","PhysicsEnabler"),cc.Class({extends:cc.Component,properties:{enabledDebugDraw:!0,enabledDrawBoundingBox:!0},onLoad:function(){cc.director.getPhysicsManager().enabled=!0;var e=cc.director.getCollisionManager();e.enabled=this.enabled,e.enabledDebugDraw=this.enabledDebugDraw,e.enabledDrawBoundingBox=this.enabledDrawBoundingBox}}),cc._RF.pop()},{}],Player:[function(e,t,i){"use strict";cc._RF.push(t,"44d5dWs5wVKybWWAFFhwSfO","Player"),Object.defineProperty(i,"__esModule",{value:!0});var n=e("../core/MessagePipeline"),s=function(e){return e&&e.__esModule?e:{default:e}}(e("./Character")),o=cc.Class({extends:s.default,properties:{},statics:{instance:null},onLoad:function(){this._super(),o.instance=this,n.messagePipeline.on("onRoundStart",this.init,this)},init:function(e){e.getUserData();this._super()},update:function(e){this._super(e)}});i.default=o,t.exports=i.default,cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline","./Character":"Character"}],RotateObject:[function(e,t,i){"use strict";cc._RF.push(t,"67565+b2vJOh4FxDLq6A+1l","RotateObject"),cc.Class({extends:cc.Component,properties:{rotateObject:cc.Node,reverseObject:cc.Node,rotateRate:1},onLoad:function(){this._touched=!1,this._beforeDeg=0,this._nodeStartDeg=0,this._registerEvent()},onDestroy:function(){this._unregisterEvent()},_registerEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this)},_unregisterEvent:function(){this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this)},_onTouchBegan:function(e){var t=e.getLocation();cc.log("_onTouchBegan"),t=this.node.convertToNodeSpaceAR(t),this._nodeStartDeg=this.rotateObject.rotation,this._beforeDeg=this._getDeg(t),this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this),this._touched=!0},_onTouchMove:function(e){var t=e.getLocation();t=this.node.convertToNodeSpaceAR(t);e.getDelta();var i=this._getDeg(t),n=i-this._beforeDeg;Math.abs(n)>180&&(n>0?n-=360:n+=360),this.rotateObject.rotation+=n*this.rotateRate,this.reverseObject.rotation=-this.rotateObject.rotation,this._beforeDeg=i},_getDeg:function(e){var t=this.rotateObject.getPosition(),i=cc.p(e.x,e.y),n=cc.pToAngle(cc.pSub(i,t));return-cc.radiansToDegrees(n)},_onTouchEnded:function(e){this._finishTouch(e)},_onTouchCancel:function(e){this._finishTouch(e)},_finishTouch:function(e){if(this._touched){this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this),this._touched=!1;e.getLocation()}}}),cc._RF.pop()},{}],ScreenFollow:[function(e,t,i){"use strict";cc._RF.push(t,"4761duPH9FEhaolDa6f9vAJ","ScreenFollow"),cc.Class({extends:cc.Component,properties:{innerWidth:640,innerHeight:700,target:{default:null,type:cc.Node}},onLoad:function(){this.right=this.node.width/4,this.left=-this.node.width/4,this.baseY=this.node.y,this.top=this.baseY-this.node.height/4,this.bottom=this.baseY},update:function(e){var t=-this.target.x;t=Math.max(Math.min(t,this.right),this.left),this.node.x=t;var i=-this.target.y;i=Math.max(Math.min(i,this.bottom),this.top),this.node.y=i}}),cc._RF.pop()},{}],SkillBase:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"345feiWEAZPYZIBZcVsBs7Z","SkillBase");var s=e("../core/MessagePipeline"),o=n(e("../character/Player")),a=n(e("../character/Enemy")),c=n(e("../game/Game"));cc.Class({extends:cc.Component,properties:{power:10,hitRate:.9,damage:10,buffTime:0,buffType:"",buffVal:0,fromPlayer:!0,btnMask:cc.Sprite,skillField:cc.Node,skillEffect:cc.Prefab},onLoad:function(){s.messagePipeline.on("onGainPower",this._onGainPower,this),this._skillAvailable=!1},_onGainPower:function(e){var t=e.getUserData();if(t.isPlayer===this.fromPlayer){var i=(t.power-this.power)/this.power;t.power-this.power==0&&(i-=.05),this.btnMask.fillRange=i,this._skillAvailable=i>=0}},$runSkill:function(){if(this._skillAvailable&&c.default.instance.isGameStart&&!c.default.instance.isGameFinish){var e=cc.instantiate(this.skillEffect);e.parent=this.skillField,this.fromPlayer?e.scaleX=1:e.scaleX=-1,e.on("onCheckHit",this._onCheckHit,this),e.getComponent("SkillEffect").init({animTime:this.buffTime}),this.fromPlayer?(o.default.instance.losePower(this.power),o.default.instance.addBuff({buffTime:this.buffTime,buffType:this.buffType,buffVal:this.buffVal})):(a.default.instance.losePower(this.power),a.default.instance.addBuff({buffTime:this.buffTime,buffType:this.buffType,buffVal:this.buffVal}))}},_onCheckHit:function(e){Math.random()>=this.hitRate?(e.detail._skillMiss(),this.fromPlayer?a.default.instance.missDisplay():o.default.instance.missDisplay()):this.fromPlayer?a.default.instance.damage(this.damage):o.default.instance.damage(this.damage)}}),cc._RF.pop()},{"../character/Enemy":"Enemy","../character/Player":"Player","../core/MessagePipeline":"MessagePipeline","../game/Game":"Game"}],SkillEffect:[function(e,t,i){"use strict";cc._RF.push(t,"580368HkeVM+rNqMsfa1ieC","SkillEffect");var n=e("../core/MessagePipeline");cc.Class({extends:cc.Component,properties:{},onLoad:function(){},init:function(e){this._data=Object.assign({},e),this._anim=this.node.getComponent(cc.Animation),this._anim.on("finished",this._afterAnim,this),this._anim.play(),this._buffTime=e.animTime,this._timerStart=!1,this._buffTime>0&&(this._timerStart=!0)},_checkHit:function(){this.node.emit("onCheckHit",this)},_skillMiss:function(){this._anim.stop(),this._anim.off("finished",this._afterAnim,this),this.node.destroy()},_afterAnim:function(){n.messagePipeline.sendMessage("battle:damage",this._data),this._anim.off("finished",this._afterAnim,this),this.node.destroy()},update:function(e){this._timerStart&&(this._buffTime-=e,this._buffTime<=0&&this.node.destroy())}}),cc._RF.pop()},{"../core/MessagePipeline":"MessagePipeline"}],StageDescription:[function(e,t,i){"use strict";cc._RF.push(t,"4a19diUeqZPwr+C+O3OoxZs","StageDescription");var n={tokyo:{name:"TOKYO",text:"地球という星にある日本という国の首都で、たくさんの地球人と建物が手に入りそう。\n植物、動物は少なめ。"},ny:{name:"NY",text:"最先端の街で、TOKYOよりさらにいろんな種類の地球人がウヨウヨ。\nレアな人類もみつかりやすいかも？"},jurassic:{name:"JURASSIC",text:"ジュラ紀にタイムスリップ！巨大な恐竜はなかなか吸い込むのが難しいぞ！\n今は絶滅した生き物や、植物をたくさんゲット！"},ocean:{name:"OCEAN",text:"お魚がいっぱい！\n深海にはレアなキャラクターがたくさんいるかも！？\nさらに昔沈んだ船にはお宝も・・・"},moon:{name:"MOON",text:"きれいなお月さま。\n宇宙人や鉱物がたくさん入手できる。\n珍しい植物が見つかるかも・・・？"},giant:{name:"GIANT",text:"スペース巨人に飲み込まれたUFO！\n胃の中のものを吸い込んで弱らせた隙に逃げ出すんだ！\n時々変なものも飲み込んでるみたい。"}};cc.Class({extends:cc.Component,properties:{stageName:cc.Label,stageText:cc.Label},onLoad:function(){this.stageId="tokyo"},$stageSelect:function(e,t){""!==t&&n[t]&&(this.stageName.string=n[t].name,this.stageText.string=n[t].text,this.stageId=t)}}),cc._RF.pop()},{}]},{},["Mochi","Character","Enemy","Player","GearObjects","MessagePipeline","PhysicsEnabler","RotateObject","ScreenFollow","ButtonVacuum","Game","GotMaterial","GotMaterialList","LabelText","MarkerArrow","Material","MaterialPool","ButtonStart","MissionText","StageDescription","SkillBase","SkillEffect"]);