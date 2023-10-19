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
    const chooseAnimal = () => {
        document.querySelector('.message').innerHTML = '動物を選んでください';
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
                cell.innerHTML = `<img src="./images/animals/${animalList[idx][2]}.png" style="width: 100%;"><p style="font-size: 1.2rem; margin: 0.5rem 0;">${animalList[idx][0]}</p>`;
                row.appendChild(cell);
            }
            tbody.appendChild(row); 
        }  
        table.appendChild(tbody);
    }
    const showImage = (idx) => {
        document.querySelector('.message').innerHTML = 'なまえとせいかくを決めて、下のようにカードを作ってください<br>※HP・こうげき・すばやさはまだ書かないでね!';
        document.querySelector('.content').innerHTML = '<div class="card"></div>';
        const card = document.querySelector('.card');
        card.innerHTML += '<div style="display: flex; width: 80%; justify-content: space-between; margin: 2rem 0 0.5rem 0;"><p style="margin: 0;">HP</p><p style="margin: 0;">こうげき</p><p style="margin: 0;">すばやさ</p></div>';
        card.innerHTML += `<div style="width: 60%; height: 30%; margin: 5%;"><img src="./images/animals/${animalList[idx][2]}.png" style="height: 100%;"></div>`;
        card.innerHTML += `<div style="width: 80%;"><p style="margin: 0;">スキル</p><p>${animalList[idx][1]}</p></div>`;
        card.innerHTML += `<div style="width: 80%;"><p style="margin: 0;">せいかく</p><div style="height: 10dvh;"></div>`;
        document.querySelector('.content').innerHTML += '<input type="button" class="btn" onclick="setParams();" value="次へ">';
    }
    const setParams = () => {
        document.querySelector('.message').innerHTML = 'パラメータと属性は次のように決まりました！';
        document.querySelector('.content').innerHTML = '<div style="font-size: 1.5rem; text-align: center;"><p>HP : 25</p><p>こうげき : 10</p><p>すばやさ : 15</p><p>属性 : 闇</p></div>';
        document.querySelector('.content').innerHTML += '<input type="button" class="btn" onclick="prepare(0);" value="次へ">';
    };
    window.setParams = setParams;
    const prepare = (n) => {
        if (n == 0) {
            document.querySelector('.message').innerHTML = 'お互いにカードを作りましたか？';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="prepare(1);" value="はい">';
        } else if (n == 1) {
            document.querySelector('.message').innerHTML = '作成したカードを交換してください';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="prepare(2);" value="次へ">';
        } else if (n == 2) {
            document.querySelector('.message').innerHTML = 'カードを3枚山札から引いてください';
            document.querySelector('.content').innerHTML = '<input type="button" class="btn" onclick="prepare(3);" value="次へ">';
        } else {
            document.querySelector('.message').innerHTML = '手札から戦闘に参加させるカードを選んでください<br>「ゲームスタート」をクリックするとゲームをスタートします!';
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
        document.querySelector('.message').innerHTML = 'ゲーム終了！';
        document.querySelector('.content').innerHTML = '<div style="font-size: 1.5rem; text-align: center;"><p>結果 : 勝利</p><p>スコア : 120</p></div>';
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="location.href='./index.html'" value="トップに戻る">`;
    }
}
window.game = game;

// 上位ターン
function turn(t) {
    if (t == 3)
        game(false);
    else {
        document.querySelector('.message').innerHTML = 'すばやさが同じカードがある？';
        document.querySelector('.content').innerHTML = `<input type="button" class="btn" id="dice" value="はい">`;
        document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="phase(${t}, 0);" value="いいえ">`;
        document.getElementById('dice').addEventListener('click', () => {
            document.querySelector('.message').innerHTML = 'サイコロを振ってください';
            document.querySelector('.content').innerHTML = '1〜3の場合は、サイコロを振った人のターン、4〜6の場合は振っていない人あるいは敵のターンから始める。<br>3体とも同じ素早さだった場合、1〜2でサイコロを振った人、3〜4で振っていない人、5〜6で敵のターンから始める。<br>そのターンを終えたらもう一回サイコロを振って残りの2人の順番を決める。<br>終わったら「次へ」を押してください';
            document.querySelector('.content').innerHTML += `<input type="button" class="btn" onclick="phase(${t}, 0);" value="次へ">`;
        });
    }
}

// 下位ターン
function phase(t, p) {
    document.querySelector('.message').innerHTML = '下位ターン';
    document.querySelector('.content').innerHTML = '';
    document.querySelector('.content').innerHTML += '<input type="button" class="btn" id="phaseBtn" value="下位ターン終了">';
    document.getElementById('phaseBtn').addEventListener('click', () => {
        if (p == 2)
            turn(t+1);
        else
            phase(t, p+1);
    });
}

makeCard();