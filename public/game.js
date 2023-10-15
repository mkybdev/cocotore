// カード作成
function makeCard() {
    const animalList = [
        ["バンビ", "このスキル発動時にHPが半分以下になっていた場合、次のターンから素早さが5上がる"],
        ["ゾウ", "HPが10回復する"],
        ["トラ", "このスキル発動時にHPが半分以下になっていた場合、次のターンから攻撃力が5上がる"],
        ["スズメ", "素早さが次のターンに2上昇する"],
        ["カメ", "HPが10回復する"],
        ["アライグマ", "サイコロを振って1〜3なら、そのターンの攻撃力が2倍になる"],
        ["クラゲ", "このスキル発動時にHPが半分以下になっていた場合、HPを15回復する"],
        ["ペンギン", "このスキル発動時にHPが半分以下になっていた場合、次のターンから防御力が5上がる"],
        ["ウサギ", "素早さが次のターンに2上昇する"],
        ["ハリネズミ", "このスキル発動時にHPが半分以下になっていた場合、次のターンから防御力が10上がる"]
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
                cell.innerHTML = `<img src="./images/animal.png"><p style="font-size: 1.2rem; margin: 0.5rem 0;">${animalList[idx][0]}</p>`;
                row.appendChild(cell);
            }
            tbody.appendChild(row); 
        }  
        table.appendChild(tbody);
    }
    const showImage = (idx) => {
        document.querySelector('.message').innerHTML = '下のようにカードを作ってください<br>※HP・こうげき・すばやさはまだ書かないでね!';
        document.querySelector('.content').innerHTML = '<div class="card"></div>';
        const card = document.querySelector('.card');
        card.innerHTML += '<div style="display: flex; width: 80%; justify-content: space-between;"><p>HP</p><p>こうげき</p><p>すばやさ</p></div>';
        card.innerHTML += '<div style="border: 1px solid black; width: 60%; height: 30%;"></div>';
        card.innerHTML += `<div style="width: 80%;"><p>スキル</p><p>${animalList[idx][1]}</p></div>`;
    }
    chooseAnimal();
}

// ゲーム進行
function game() {

}

// 上位ターン
function turn() {

}

// 下位ターン
function phase() {

}

makeCard();