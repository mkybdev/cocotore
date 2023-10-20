// カード作成
function makeCard() {
    const animalList = [
        ["バンビ", "このスキル発動時にHPが半分以下になっていた場合、次のターンから素早さが5上がる", "deer"],
        ["ゾウ", "HPが10回復する", "elephant"],
        ["トラ", "このスキル発動時にHPが半分以下になっていた場合、次のターンから攻撃力が5上がる", "tiger"],
        ["スズメ", "素早さが次のターンに2上昇する", "sparrow"],
        ["カメ", "HPが10回復する", "turtle"],
        ["アライグマ", "サイコロを振って1〜3なら、そのターンの攻撃力が2倍になる", "raccoon"],
        ["クラゲ", "このスキル発動時にHPが半分以下になっていた場合、HPを15回復する", "jellyfish"],
        ["ペンギン", "このスキル発動時にHPが半分以下になっていた場合、次のターンから防御力が5上がる", "penguin"],
        ["ウサギ", "素早さが次のターンに2上昇する", "rabbit"],
        ["ハリネズミ", "このスキル発動時にHPが半分以下になっていた場合、次のターンから防御力が10上がる", "hedgehog"]
    ];
    let n = 1;
    const chooseAnimal = () => {
        if (n == 3)
            prepare(0);
        else {
            document.querySelector('.message').innerHTML = `${n}人目のカードを作ります。<br>まず、あなたがよく感じるネガティブな気持ちを思いうかべてください。<br>次に、そのイメージにいちばん合う動物を選んでください。`;
            document.querySelector('.content').innerHTML = '<table class="animals"></table>';
            const table = document.querySelector('.animals');
            const tbody = document.createElement('tbody');
            for (let i = 0; i < 2; i++) {
                const row = document.createElement("tr");
                for (let j = 0; j < 5; j++) {
                    const idx = 5*i + j;
                    const cell = document.createElement("td");
                    cell.addEventListener('click', () => {
                        showImage(idx);
                    });
                    cell.innerHTML = `<img src="./images/animals/${animalList[idx][2]}.png" style="width: 80%;"><p style="font-size: 1.2rem; margin: 0.5rem 0;">${animalList[idx][0]}</p>`;
                    row.appendChild(cell);
                }
                tbody.appendChild(row); 
            }  
            table.appendChild(tbody);
        }
    }
    window.chooseAnimal = chooseAnimal;
    const showImage = (idx) => {
        document.querySelector('.message').innerHTML = 'えらんだ動物のなまえとせいかくを決めて<br>下のようにカードを作ってください（例: イライラトラ）<br>※HP・こうげき・すばやさはまだ書かないでね!スキルは下にあるものを写してね!';
        document.querySelector('.content').innerHTML = '<div class="card"></div>';
        const card = document.querySelector('.card');
        card.innerHTML += '<div style="display: flex; width: 80%; justify-content: space-between; margin: 2rem 0 0.5rem 0;"><p style="margin: 0;">HP</p><p style="margin: 0;">こうげき</p><p style="margin: 0;">すばやさ</p></div>';
        card.innerHTML += `<div style="width: 60%; height: 30%; margin: 5%;"><img src="./images/animals/${animalList[idx][2]}.png" style="height: 100%;"></div>`;
        card.innerHTML += `<div style="width: 80%;"><p style="margin: 0;">スキル</p><p>${animalList[idx][1]}</p></div>`;
        card.innerHTML += `<div style="width: 80%;"><p style="margin: 0;">せいかく</p><div style="height: 10dvh;"></div>`;
        document.querySelector('.content').innerHTML += '<input type="button" class="btn" onclick="setParams();" value="次へ">';
    }
    const attrList = ["火", "水", "木", "光", "闇"];
    const setParams = () => {
        let hp = -1, atk = -1, spd = -1;
        while (hp*atk*spd <= 0) {
            hp = Math.floor(Math.random() * (50 - 20) + 20);
            atk = Math.floor(Math.random() * ((50-hp) - 0) + 0);
            spd = 50 - hp - atk;
        }
        const attr = Math.floor(Math.random() * 5);
        document.querySelector('.message').innerHTML = 'HP・こうげき・すばやさと属性は次のように決まりました!';
        document.querySelector('.content').innerHTML = `<div style="font-size: 1.5rem; text-align: center;"><p>HP : ${hp}</p><p>こうげき : ${atk}</p><p>すばやさ : ${spd}</p><p>属性 : ${attrList[attr]}</p></div>`;
        n++;
        document.querySelector('.content').innerHTML += '<input type="button" class="btn" onclick="chooseAnimal();" value="次へ">';
    };
    window.setParams = setParams;
    const prepare = () => {
        if (n == 0) {
            document.querySelector('.message').innerHTML = 'プレイヤー全員がカードを作りましたか？';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="prepare(1);" value="はい">';
        } else if (n == 1) {
            document.querySelector('.message').innerHTML = '作成したカードをいっしょに遊ぶプレイヤーと交換してください';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="prepare(2);" value="次へ">';
        } else if (n == 2) {
            document.querySelector('.message').innerHTML = 'カードを3枚山札から引いてください';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="prepare(3);" value="次へ">';
        } else {
            document.querySelector('.message').innerHTML = '手札から戦闘に参加させるカードを選んで、ボードに置いてください<br>「ゲームスタート」をクリックするとゲームをスタートします!';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="game(true);" value="ゲームスタート">';
        }
    };
    window.prepare = prepare;
    chooseAnimal();
}

// ゲーム進行
function game(flag) {
    if (flag)
        turn(0);
    else {
        document.querySelector('.message').innerHTML = 'ゲーム終了!';
        document.querySelector('.content').innerHTML = `<input type="button" class="btn" onclick="location.href='./index.html'" value="トップに戻る">`;
    }
}
window.game = game;

// ラウンド
function turn(t) {
    if (t == 3)
        game(false);
    else {
        document.querySelector('.message').innerHTML = 'すばやさが同じカードがある？';
        document.querySelector('.content').innerHTML = `<input type="button" class="btn" id="dice" value="はい">`;
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="phase(${t}, 0);" value="いいえ">`;
        document.getElementById('dice').addEventListener('click', () => {
            document.querySelector('.message').innerHTML = 'サイコロを振ってください';
            document.querySelector('.content').innerHTML = '素早さが同じカードが2体のとき: 出た目が1〜3の場合は、サイコロを振った人のカードのターンから始める。<br>4〜6の場合はもう一方のカードのターンから始める。<br>素早さが同じカードが3体のとき: 1〜2でサイコロを振った人、3〜4で振っていない人、<br>5〜6で敵のラウンドから始める。<br>次のターンでもう一回サイコロを振って残りの2人の順番を決める。<br>終わったら「次へ」を押してください<br>';
            document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="phase(${t}, 0);" value="次へ">`;
        });
    }
}

// ターン
function phase(t, p) {
    if (p == 3)
        turn(t+1);
    else {
        document.querySelector('.message').innerHTML = '次はどちらのターン？';
        document.querySelector('.content').innerHTML = `<input type="button" class="btn" onclick="enemy(${t}, ${p})" value="敵のターン">`;
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="player(${t}, ${p})" value="プレイヤーのターン">`;
    }
}
window.phase = phase;

// 敵のターン
function enemy(t, p) {
    document.querySelector('.message').innerHTML = '敵のターン';
    document.querySelector('.content').innerHTML = '敵行動カードをプレイヤーのどちらかが引いてください<br>カードにある行動を敵がやってきます!<br>';
    document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="phase(${t}, ${p+1})" value="敵のターン終了">`;
}
window.enemy = enemy;

// プレイヤーのターン
function player(t, p) {
    document.querySelector('.message').innerHTML = 'プレイヤーのターン';
    const drawCard = () => {
        document.querySelector('.content').innerHTML = '山札から1枚カードを引いてください<br>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="charachange()" value="次へ">`;
    }
    const charachange = () => {
        document.querySelector('.content').innerHTML = '新しいカードを戦闘に参加させたい場合は今のカードを手札に戻し、新しいカードをフィールドに召喚してください<br>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="equip()" value="次へ">`;
    }
    window.charachange = charachange;
    const equip = () => {
        document.querySelector('.content').innerHTML = '武器を自分のキャラクターに付与してください<br>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="equipq()" value="次へ">`;
    }
    window.equip = equip;
    const equipq = () => {
        document.querySelector('.content').innerHTML = '味方プレイヤーに武器について質問をしてください<br>相手のプレイヤーは答えても答えなくてもよいですが、もし答えてもらえたら<br>感謝を伝えたり相手の話を引き出す質問をしてみましょう!<br>※例: それを共有してくれて、ありがとう。 / あなたの気持ちや考えを理解しようと思います。 / そうなんですね。<br>どうしてそう感じましたか？ / その後、どうなりましたか？<br>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="skill()" value="次へ">`;
    }
    window.equipq = equipq;
    const skill = () => {
        document.querySelector('.content').innerHTML = '武器の効果とキャラクターのスキルを発動してください<br>※使った武器は山札に戻してください<br>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="attack()" value="次へ">`;
    }
    window.skill = skill;
    const attack = () => {
        document.querySelector('.content').innerHTML = '敵に攻撃してください<br>※素早さが敵の2倍以上の場合、2回攻撃できます<br><img src="./images/attr.png" style="width: 40dvw;"><br>ダメージ計算方法:<br>キャラクターの攻撃力×スキルの効果(前ターンの効果が継続している場合はそれも含む)<br>×武器の効果×属性の相性(相性が良いと2倍、悪いと0.5倍)<br>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="phase(${t}, ${p+1})" value="プレイヤーのターン終了">`;
    }
    window.attack = attack;
    drawCard();
}
window.player = player;

makeCard();