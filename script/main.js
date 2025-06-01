function Init() {
    Fortis.Game.config.debug = true;
    Fortis.Game.canvasCfg.aspect = new Fortis.Vector2(4, 3);
    Fortis.Game.canvasCfg.size = new Fortis.Vector2(800, 600);
    Fortis.Game.canvasCfg.BGColor = new Fortis.Color("#252525");
    Fortis.Game.canvasCfg.autoResize = false;

    Fortis.FontLoader.addFonts({
        "Anton": "https://fonts.googleapis.com/css2?family=Anton&display=swap",
        "Smooch Sans": "https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@450&display=swap",
        "Outfit": "https://fonts.googleapis.com/css2?family=Outfit:wght@450&display=swap",
        "Playwrite DK Loopet": "https://fonts.googleapis.com/css2?family=Playwrite+DK+Loopet&display=swap",
        "Inconsolata": "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
        "Kaisei Opti": "https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap",
        "Yusei Magic": "https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap",
        "DotGothic16": "https://fonts.googleapis.com/css2?family=DotGothic16&display=swap",
        "Yuji Mai": "https://fonts.googleapis.com/css2?family=Yuji+Mai&display=swap",
        "Shippori Antique": "https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap",//ひらがな、カタカナのみ
        "Yuji Boku": "https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap",
        "Reggae One": "https://fonts.googleapis.com/css2?family=Reggae+One&display=swap",
        "Yuji Syuku": "https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap",
        "Kaisei Decol": "https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap",
        "Rampart One": "https://fonts.googleapis.com/css2?family=Rampart+One&display=swap",
        "Noto Serif": "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap",
        "Martian Mono": "https://fonts.googleapis.com/css2?family=Martian+Mono&display=swap",
        "Mochiy Pop One":"https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap",
        "WDXL Lubrifont TC":"https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC&display=swap",
    });
    Fortis.ImageLoader.addImages({
        "bTuneSB": "./img/ui/bTuneSB.png",
        "nTuneSB": "./img/ui/nTuneSB.png",
        "gRArrow": "./img/ui/gRArrow.png",
        "cb":"./img/notes/cb.png",
        "cy":"./img/notes/cy.png",
        "cg":"./img/notes/cg.png",
        "sb":"./img/notes/sb.png",
        "sy":"./img/notes/sy.png",
        "sg":"./img/notes/sg.png",
    });

    Fortis.SoundLoader.addSimpleSounds({
        "sss":"./tune/sss.wav",
    });

    Fortis.SoundLoader.addNormalSounds({
    })
}

let nowScene;

function Ready() {
    //タイトル
    /*
    nowScene = "title";
    title();
    */

    //曲セレクト
    
    nowScene = "select";
    selectReset();
    

    //プレイ
    /*
    nowScene = "play";
    ResetToPlay();
    */
}

function Update(delta) {
    switch (nowScene) {
        case "title":
            tUpdate(delta);
            break;
        case "select":
            sUpdate(delta);
            break;
        case "play":
            pUpdate(delta);
            break;
    }
}

function EngineLoaded() { }