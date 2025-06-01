let sScene, sBGLayer;

let sTuneTText, sTuneTFont, sTuneTBG;//曲セレクトの文字

//曲セレクト

let sTuneBG;//曲セレクトの背景
let nowSTIndex;//現在選択されている曲のインデックス
let tuneNText, tuneNTFont;//nowSTIndex/曲数みたいに表示させて、現在何曲目を表示しているかを表す
let tuneCText, tuneCTFont;//曲のクレジットのテキスト
let tuneBPMText, tuneBPMTFont;//曲のBPMのテキスト
let tuneTText, tuneTTFont;//曲の時間のテキスト
let tuneNSText, tuneNSTFont, tuneNSCollider, tuneNSCG, tuneNSRect, mAndTN;//曲のノーマルモードのスコアのテキスト
let tuneHSText, tuneHSTFont, tuneHSCollider, tuneHSCG, tuneHSRect, mAndTH;//曲のハードモードのスコアのテキスト
let nowSDifficulty;//現在選択されている難易度(0がnormal、1がhard)
let tuneNScore, tuneHScore, tuneSFont;//曲のハイスコア
let dSelectArrow;//難易度選択の矢印

//曲セレクトのボタン
let bTuneSB, bTuneSBCG, bTuneSBCC;//曲セレクトを一個前にするボタン
let nTuneSB, nTuneSBCG, nTuneSBCC;//曲セレクトを一個後ろにするボタン
//CGはcolliderGroup、CCはCircleCollider
let arrowLOrRFP;//→か←が始めて押された?言い方が正しいかわからない
let mouseCG, mouseCC, mouseCR;//マウスの当たり判定
let mAndBBID;//マウスとbTuneSBの当たり判定のID
let mAndNBID;//マウスとnTuneSBの当たり判定のID

//選曲確認
let nowConfirming;
let cfmTuneLayer;//レイヤー
let tuneDRect;//背景
let tuneDText, tuneDTFont;
let tuneDBRect, tuneDBCG, tuneDBCR, mAndTDB;//決定
let tuneDButtonText;
let tuneDCRect, tuneDCCG, tuneDCCR, mAndTCB;//キャンセル
let tuneDCancelText;
let tuneDBTFont;//ボタンの文字のフォント
let SpacePushing;//スペースキーを押し続けているか

let sLoRect, sLoID, sLOSTime;//暗転明け。明点でいいの？
let tuneSelected;//曲が選択された

function selectReset() {
    sScene = new Fortis.Scene();
    Fortis.Game.setScene(sScene);

    sBGLayer = sScene.getBG();

    {
        //y座標はキャンバスサイズの1/25を基準とする
        sTuneTBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y / 20, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, 0)), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
        sTuneTBG.alpha = 0.4;
        sTuneTBG.pos.y = Fortis.Game.canvasCfg.size.y / 25;

        nowSTIndex = 0;//現在選択されている曲のインデックス
        nowSDifficulty = 0;//現在選択されている難易度
        tuneSelected = false;//選曲されて、スタートする

        sTuneTFont = new Fortis.Font("Kaisei Opti", 18);
        sTuneTText = new Fortis.Entity(new Fortis.TextShape(sTuneTFont, "セレクト："), new Fortis.ColorMaterial(new Fortis.Color("white")));
        sTuneTText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 11, Fortis.Game.canvasCfg.size.y / 25);

        sTuneBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 7 / 10, Fortis.Game.canvasCfg.size.y * 4 / 5, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y * 2 / 5)), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
        sTuneBG.alpha = 0.4;
        sTuneBG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 2 / 25);

        //曲データを表示させるやつら
        {
            tuneNTFont = new Fortis.Font("Kaisei Opti", 36);
            tuneNText = new Fortis.Entity(new Fortis.TextShape(tuneNTFont, "曲名!!"), new Fortis.ColorMaterial(new Fortis.Color("white")));
            tuneNText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 4 / 25);

            tuneCTFont = new Fortis.Font("Yusei Magic", 15);
            tuneCText = new Fortis.Entity(new Fortis.TextShape(tuneCTFont, "クレジット"), new Fortis.ColorMaterial(new Fortis.Color("white")));
            tuneCText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 6 / 25);

            tuneBPMTFont = new Fortis.Font("Yusei Magic", 15);
            tuneBPMText = new Fortis.Entity(new Fortis.TextShape(tuneBPMTFont, "BPM"), new Fortis.ColorMaterial(new Fortis.Color("white")));
            tuneBPMText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 8, Fortis.Game.canvasCfg.size.y * 3 / 10);

            tuneTTFont = new Fortis.Font("Yusei Magic", 15);
            tuneTText = new Fortis.Entity(new Fortis.TextShape(tuneTTFont, "再生時間"), new Fortis.ColorMaterial(new Fortis.Color("white")));
            tuneTText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 5 / 8, Fortis.Game.canvasCfg.size.y * 3 / 10);

            tuneNSRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 13 / 20, Fortis.Game.canvasCfg.size.y / 8), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
            tuneNSRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);
            tuneNSTFont = new Fortis.Font("Noto Serif", 28);
            tuneNSText = new Fortis.Entity(new Fortis.TextShape(tuneNSTFont, "NORMAL"), new Fortis.ColorMaterial(new Fortis.Color("#198191")));
            tuneNSText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 10, Fortis.Game.canvasCfg.size.y / 2);
            tuneNSCG = new Fortis.ColliderGroup();
            tuneNSCollider = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x * 13 / 20, Fortis.Game.canvasCfg.size.y / 8);
            tuneNSCG.add(tuneNSCollider);
            tuneNSCG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);

            tuneHSRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 13 / 20, Fortis.Game.canvasCfg.size.y / 8), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
            tuneHSRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 7 / 10);
            tuneHSRect.alpha = 0;
            tuneHSTFont = new Fortis.Font("Noto Serif", 28);
            tuneHSText = new Fortis.Entity(new Fortis.TextShape(tuneHSTFont, "HARD"), new Fortis.ColorMaterial(new Fortis.Color("#802b25")));
            tuneHSText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 10, Fortis.Game.canvasCfg.size.y * 7 / 10);
            tuneHSCG = new Fortis.ColliderGroup();
            tuneHSCollider = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x * 13 / 20, Fortis.Game.canvasCfg.size.y / 8);
            tuneHSCG.add(tuneHSCollider);
            tuneHSCG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 7 / 10);

            tuneSFont = new Fortis.Font("Martian Mono", 28);
            tuneNScore = new Fortis.Entity(new Fortis.TextShape(tuneSFont, "0000000"), new Fortis.ColorMaterial(new Fortis.Color("white")));
            tuneNScore.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 6 / 10, Fortis.Game.canvasCfg.size.y * 5 / 10);
            tuneHScore = new Fortis.Entity(new Fortis.TextShape(tuneSFont, "0000000"), new Fortis.ColorMaterial(new Fortis.Color("white")));
            tuneHScore.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 6 / 10, Fortis.Game.canvasCfg.size.y * 7 / 10);

            dSelectArrow = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.y / 25, Fortis.Game.canvasCfg.size.y / 25)), new Fortis.ImageMaterial("gRArrow"));
            dSelectArrow.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 2);

            //曲のデータを表示させる
            changeDisplayedTune(nowSTIndex);
        }

        //曲セレクトボタン
        {
            bTuneSB = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.y * 2 / 25, Fortis.Game.canvasCfg.size.y * 2 / 25)), new Fortis.ImageMaterial("bTuneSB"));
            bTuneSB.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 14, Fortis.Game.canvasCfg.size.y / 2);
            bTuneSBCG = new Fortis.ColliderGroup();
            bTuneSBCC = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.y / 25, Fortis.Game.canvasCfg.size.y / 25);
            bTuneSBCG.add(bTuneSBCC);
            bTuneSBCG.link(bTuneSB);

            nTuneSB = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.y * 2 / 25, Fortis.Game.canvasCfg.size.y * 2 / 25)), new Fortis.ImageMaterial("nTuneSB"));
            nTuneSB.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 13 / 14, Fortis.Game.canvasCfg.size.y / 2);
            nTuneSBCG = new Fortis.ColliderGroup();
            nTuneSBCC = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.y / 25, Fortis.Game.canvasCfg.size.y / 25);
            nTuneSBCG.add(nTuneSBCC);
            nTuneSBCG.link(nTuneSB);
        }

        mouseCG = new Fortis.ColliderGroup();
        //mouseCC = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.y / 500, Fortis.Game.canvasCfg.size.y / 500);
        mouseCR = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.y / 250, Fortis.Game.canvasCfg.size.y / 250);
        mouseCG.add(mouseCR);
        //mouseCG.add(mouseCC);

        mAndBBID = Fortis.CollisionManager.add(mouseCG, bTuneSBCG);
        mAndNBID = Fortis.CollisionManager.add(mouseCG, nTuneSBCG);

        mAndTN = Fortis.CollisionManager.add(mouseCG, tuneNSCG);
        mAndTH = Fortis.CollisionManager.add(mouseCG, tuneHSCG);

        sLoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        sLoRect.alpha = 0;
        let UILayer = sScene.getUI();
        UILayer.add(sLoRect);
        sLoID = Fortis.TransitionManager.add(sLoRect, "alpha", 1000, 1, 0, Fortis.util.easing.inPower, 2);
        Fortis.TransitionManager.start(sLoID);
        sLOSTime = performance.now();

        arrowLOrRFP = false;

        sBGLayer.addEntities([sTuneTBG, sTuneTText, sTuneBG, bTuneSB, nTuneSB, tuneNText, tuneCText, tuneBPMText, tuneTText, tuneNSRect, tuneNSText, tuneHSRect, tuneHSText, tuneNScore, tuneHScore, dSelectArrow]);
    }

    //選曲確認レイヤー
    {
        nowConfirming = true;

        cfmTuneLayer = sScene.getObj();

        tuneDRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2)), new Fortis.ColorMaterial(new Fortis.Color("black")));
        tuneDRect.alpha = 0.8;

        tuneDTFont = new Fortis.Font("Yusei Magic", 35);
        tuneDText = new Fortis.Entity(new Fortis.TextShape(tuneDTFont, "スタートしますか？"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        tuneDText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 3 / 10);

        tuneDBTFont = new Fortis.Font("Yusei Magic", 22);

        tuneDBRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 18), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        tuneDBRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 7 / 20, Fortis.Game.canvasCfg.size.y / 2);

        tuneDButtonText = new Fortis.Entity(new Fortis.TextShape(tuneDBTFont, "スタート"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        tuneDButtonText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 7 / 20, Fortis.Game.canvasCfg.size.y / 2);

        tuneDBCG = new Fortis.ColliderGroup();
        tuneDBCR = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 18);
        tuneDBCG.add(tuneDBCR);
        tuneDBCG.link(tuneDBRect);
        //tuneDBCG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 7 / 20, Fortis.Game.canvasCfg.size.y / 2);


        tuneDCRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 18), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        tuneDCRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 13 / 20, Fortis.Game.canvasCfg.size.y / 2);

        tuneDCancelText = new Fortis.Entity(new Fortis.TextShape(tuneDBTFont, "戻る"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        tuneDCancelText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 13 / 20, Fortis.Game.canvasCfg.size.y / 2);

        tuneDCCG = new Fortis.ColliderGroup();
        tuneDCCR = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 18);
        tuneDCCG.add(tuneDCCR);
        tuneDCCG.link(tuneDCRect);
        //tuneDCCG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 7 / 20, Fortis.Game.canvasCfg.size.y / 2);

        mAndTDB = Fortis.CollisionManager.add(mouseCG, tuneDBCG);
        mAndTCB = Fortis.CollisionManager.add(mouseCG, tuneDCCG);

        nowConfirming = false;
        tuneDRect.alpha = 0;
        tuneDText.alpha = 0;
        tuneDBRect.alpha = 0;
        tuneDButtonText.alpha = 0;
        tuneDCRect.alpha = 0;
        tuneDCancelText.alpha = 0;

        SpacePushing = false;

        cfmTuneLayer.addEntities([tuneDRect, tuneDText, tuneDBRect, tuneDButtonText, tuneDCRect, tuneDCancelText,]);
    }
}

function sUpdate(delta) {
    mouseCG.pos = Fortis.Game.mouse.pos.copy();

    if (performance.now() - sLOSTime >= 1000) {
        if (tuneSelected && sLoRect.alpha == 1) {
            nowScene = "play";
            ResetToPlay();
        }

        if (Fortis.InputKey["Space"]) {
            if (!SpacePushing) {
                if (nowConfirming && !tuneSelected) {
                    SelectedTune();
                } else {
                    confirmPlayTune();
                }
            }
            SpacePushing = true;
        } else {
            SpacePushing = false;
        }

        if (nowConfirming) {
            if (Fortis.CollisionManager.get(mAndTDB)["result"]) {//スタートにマウスカーソルが当たった
                if (Fortis.Game.mouse.fFrameatClick) {
                    SelectedTune();
                }
                tuneDBRect.scale = new Fortis.Vector2(1.2, 1.2);
                tuneDButtonText.scale = new Fortis.Vector2(1.2, 1.2);
            } else {
                tuneDBRect.scale = new Fortis.Vector2(1, 1);
                tuneDButtonText.scale = new Fortis.Vector2(1, 1);
            }

            if (Fortis.CollisionManager.get(mAndTCB)["result"]) {//戻るにマウスカーソルが当たった
                if (Fortis.Game.mouse.fFrameatClick) {
                    coloseConfirmPlayTune();
                }
                tuneDCRect.scale = new Fortis.Vector2(1.2, 1.2);
                tuneDCancelText.scale = new Fortis.Vector2(1.2, 1.2);
            } else {
                tuneDCRect.scale = new Fortis.Vector2(1, 1);
                tuneDCancelText.scale = new Fortis.Vector2(1, 1);
            }

            if (Fortis.InputKey["KeyQ"]) {
                coloseConfirmPlayTune();
            }
        } else {
            if (Fortis.CollisionManager.get(mAndBBID)["result"]) {//曲セレクトを一個前にもどす
                bTuneSB.scale = new Fortis.Vector2(1.2, 1.2);
                if (Fortis.Game.mouse.fFrameatClick) {
                    nowSTIndex--;
                    if (nowSTIndex < 0) {
                        nowSTIndex = tunesInfo.length - 1;
                    }
                    changeDisplayedTune(nowSTIndex);
                }
            } else {
                bTuneSB.scale = new Fortis.Vector2(1, 1);
            }

            if (Fortis.CollisionManager.get(mAndNBID)["result"]) {//曲セレクトを一個後にする
                nTuneSB.scale = new Fortis.Vector2(1.2, 1.2);
                if (Fortis.Game.mouse.fFrameatClick) {
                    nowSTIndex++;
                    if (nowSTIndex > tunesInfo.length - 1) {
                        nowSTIndex = 0;
                    }
                    changeDisplayedTune(nowSTIndex);
                }
            } else {
                nTuneSB.scale = new Fortis.Vector2(1, 1);
            }

            if (Fortis.CollisionManager.get(mAndTN)["result"] || Fortis.InputKey["ArrowUp"]) {//ノーマル側
                if (Fortis.CollisionManager.get(mAndTN)["result"] && Fortis.Game.mouse.fFrameatClick) {
                    confirmPlayTune();
                }
                nowSDifficulty = 0;
                dSelectArrow.pos.y = Fortis.Game.canvasCfg.size.y / 2;
                tuneNSRect.alpha = 1;
                tuneHSRect.alpha = 0;
            }

            if (Fortis.CollisionManager.get(mAndTH)["result"] || Fortis.InputKey["ArrowDown"]) {//ハード側
                if (Fortis.CollisionManager.get(mAndTH)["result"] && Fortis.Game.mouse.fFrameatClick) {
                    confirmPlayTune();
                }
                nowSDifficulty = 1;
                dSelectArrow.pos.y = Fortis.Game.canvasCfg.size.y * 7 / 10;
                tuneNSRect.alpha = 0;
                tuneHSRect.alpha = 1;
            }

            if (Fortis.InputKey["ArrowRight"] && !arrowLOrRFP) {//曲セレクトを一個前にもどす
                arrowLOrRFP = true;
                nowSTIndex--;
                if (nowSTIndex < 0) {
                    nowSTIndex = tunesInfo.length - 1;
                }
                changeDisplayedTune(nowSTIndex);
            }

            if (Fortis.InputKey["ArrowLeft"] && !arrowLOrRFP) {//曲セレクトを一個後にする
                arrowLOrRFP = true;
                nowSTIndex++;
                if (nowSTIndex > tunesInfo.length - 1) {
                    nowSTIndex = 0;
                }
                changeDisplayedTune(nowSTIndex);
            }

            if (!Fortis.InputKey["ArrowLeft"] && !Fortis.InputKey["ArrowRight"]) {
                arrowLOrRFP = false;
            }
        }
    }
}

function changeDisplayedTune(index) {
    tuneNText.shape.text = tunesInfo[index]["name"];
    tuneNTFont.family = tunesInfo[index]["font"];

    tuneCText.shape.text = tunesInfo[index]["credit"];

    tuneBPMText.shape.text = "BPM：" + tunesInfo[index]["BPM"];

    tuneTText.shape.text = "再生時間（秒）：" + tunesInfo[index]["time"] / 1000;

    tuneNScore.shape.text = highScoreData[tunesInfo[index]["data"]][0].toString().padStart(7, '0');//ノーマル
    tuneHScore.shape.text = highScoreData[tunesInfo[index]["data"]][1].toString().padStart(7, '0');//ハード

    sTuneTText.shape.text = "セレクト：" + (index + 1) + "/" + tunesInfo.length;
}

function confirmPlayTune() {
    nowConfirming = true;
    tuneDRect.alpha = 0.8;
    tuneDText.alpha = 1;
    tuneDBRect.alpha = 1;
    tuneDButtonText.alpha = 1;
    tuneDCRect.alpha = 1;
    tuneDCancelText.alpha = 1;
}

function coloseConfirmPlayTune() {
    nowConfirming = false;
    tuneDRect.alpha = 0;
    tuneDText.alpha = 0;
    tuneDBRect.alpha = 0;
    tuneDButtonText.alpha = 0;
    tuneDCRect.alpha = 0;
    tuneDCancelText.alpha = 0;
}

function SelectedTune() {//曲が選択され、ゲーム開始を押された
    sLoID = Fortis.TransitionManager.add(sLoRect, "alpha", 1000, 0, 1, Fortis.util.easing.inPower, 2);
    Fortis.TransitionManager.start(sLoID);
    tuneSelected = true;
    let colIDs = Fortis.CollisionManager.getID();
    for (let id of colIDs) {
        Fortis.CollisionManager.remove(id);
    }
}