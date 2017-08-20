let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let atInc = 0;

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '') {
        setHiddenFields();
    }
    var inf = validateInput(input.value);
    if (inf == false) {
        return false;
    } else {
        atInc += 1;
        attempt.value = atInc;
    }
    var gameComp = getResult(input.value);
    if (gameComp) {
        setMessage('You Win! :P')
        showAnswer(gameComp);
        showReplay();
    }
    if (!gameComp && attempt.value == 10) {
        setMessage('You Loose! :(')
        showAnswer(gameComp);
        showReplay();
    }
    if (!gameComp && attempt.value < 10) {
        setMessage('Incorrect guess. try again.')
    }
}
function setHiddenFields() {
    var gen = Math.floor(Math.random() * 9999);
    var genString = gen.toString();
    if (genString.length < 4) {
        while (genString.length < 4) {
            genString = "0" + genString;
        }
    }
    answer.value = genString;
    attempt.value = 0;
}
//implement new functions here
function setMessage(msg) {
    let message = document.getElementById('message');
    message.innerHTML = msg;
}
function validateInput(inp) {
    if (inp.length == 4) {
        return true;
    } else {
        setMessage("Your input must be exactly four(4) characters long.");
        return false;
    }
}
var getResult = function (guessed) {
    var result = document.getElementById('results');
    var tempRes = '<div class="row"><span class="col-md-6" style="font-size:1.8em;">' + guessed +
        '</span><div class="col-md-6">';
    var spGes = guessed.toString().split('');
    var spAns = answer.value.toString().split('');
    var count = 0;
    for (i = 0; i<4; i++){
        if (spGes[i] == spAns[i]) {
            tempRes += '<span class="glyphicon glyphicon-ok"></span>';
            count += 1;
        } else if (spGes[i] == spAns[0] || spGes[i] == spAns[1] || spGes[i] == spAns[2] || spGes[i] == spAns[3]) {
            tempRes += '<span class="glyphicon glyphicon-transfer"></span>';
        }else {
            tempRes += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    tempRes += '</div></div>';
    result.innerHTML = tempRes;
    if(count == 4){
        return true;
    } else {
        return false;
    }
}
function showAnswer(inp) {
    var code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (inp){
        code.classList.add('success');
    } else {
        code.classList.add('failure');
    }
}
function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}