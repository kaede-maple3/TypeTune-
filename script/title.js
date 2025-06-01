let tScene, tBGLayer;

let titleText, titleFont;//ゲームタイトル
let startText, startFont, startRepID, startAlpID;//press space keyって書いておく

let tSceneTime;

let tBoRect, tBoTID;//ブラックアウト

function title() {
    tScene = new Fortis.Scene();
    Fortis.Game.setScene(tScene);
    tBGLayer = tScene.getBG();

    titleFont = new Fortis.Font("Anton", 100);
    titleText = new Fortis.Entity(new Fortis.TextShape(titleFont, "Type Tune Beta"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    titleText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 1 / 3);

    startFont = new Fortis.Font("Anton", 20);
    startText = new Fortis.Entity(new Fortis.TextShape(startFont, "Press space key to start."), new Fortis.ColorMaterial(new Fortis.Color("white")));
    startText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 2 / 3);
    startText.alpha = 0.8;
    startAlpID = Fortis.TransitionManager.add(startText, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
    Fortis.TransitionManager.start(startAlpID);
    startRepID = Fortis.Timer.add(1100, true, setStartRepTr);
    Fortis.Timer.start(startRepID);

    tBoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
    tBoRect.alpha = 0;

    tBGLayer.addEntities([titleText, startText, tBoRect]);
    tSceneSTime = performance.now();
}

function setStartRepTr() {
    if (startText.alpha == 0.1) {
        startAlpID = Fortis.TransitionManager.add(startText, "alpha", 1100, 0.1, 0.8, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    } else {
        startAlpID = Fortis.TransitionManager.add(startText, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    }
}

function tUpdate(delta) {
    if (performance.now() - tSceneSTime >= 1000 && tBoRect.alpha == 0) {//開始１秒は反応しない
        if (Fortis.InputKey["Space"]) {
            tBoTID = Fortis.TransitionManager.add(tBoRect, "alpha", 1000, 0, 1, Fortis.util.easing.inPower, 2);
            Fortis.TransitionManager.start(tBoTID);
        }
    }
    if (tBoRect.alpha == 1) {
        Fortis.Timer.remove(startRepID);
        nowScene = "select";
        selectReset();
    }
}