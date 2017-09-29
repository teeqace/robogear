const STAGE_INFO = {
  tokyo: {
    name: 'TOKYO',
    text: '地球という星にある日本という国の首都で、たくさんの地球人と建物が手に入りそう。\n植物、動物は少なめ。'
  },
  ny: {
    name: 'NY',
    text: '最先端の街で、TOKYOよりさらにいろんな種類の地球人がウヨウヨ。\nレアな人類もみつかりやすいかも？'
  },
  jurassic: {
    name: 'JURASSIC',
    text: 'ジュラ紀にタイムスリップ！巨大な恐竜はなかなか吸い込むのが難しいぞ！\n今は絶滅した生き物や、植物をたくさんゲット！'
  },
  ocean: {
    name: 'OCEAN',
    text: 'お魚がいっぱい！\n深海にはレアなキャラクターがたくさんいるかも！？\nさらに昔沈んだ船にはお宝も・・・'
  },
  moon: {
    name: 'MOON',
    text: 'きれいなお月さま。\n宇宙人や鉱物がたくさん入手できる。\n珍しい植物が見つかるかも・・・？'
  },
  giant: {
    name: 'GIANT',
    text: 'スペース巨人に飲み込まれたUFO！\n胃の中のものを吸い込んで弱らせた隙に逃げ出すんだ！\n時々変なものも飲み込んでるみたい。'
  },
}
cc.Class({
  extends: cc.Component,

  properties: {
    stageName: cc.Label,
    stageText: cc.Label
  },

  // use this for initialization
  onLoad: function () {
    this.stageId = 'tokyo';
  },

  $stageSelect(event, customEventData) {
    if (customEventData !== '' && STAGE_INFO[customEventData]) {
      this.stageName.string = STAGE_INFO[customEventData].name;
      this.stageText.string = STAGE_INFO[customEventData].text;
      this.stageId = customEventData;
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
