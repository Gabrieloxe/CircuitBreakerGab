// your age in days

function ageInDays() {
    var thisYear = new Date().getFullYear();
    var birthYear = prompt('What year are you born in pal?');
    var days = Math.round((thisYear - birthYear) * 365.25);
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + days + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    // grab the flexbox and append
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset() {
    document.getElementById("ageInDays").remove();
}

// part 3: scissors paper stone

function rpsGame(yourChoice) {
    var humanChoice;
    var botChoice;
    humanChoice = yourChoice.id;
    console.log(humanChoice);
    computerChoice = numberToChoice(gameRandomChoice());
    console.log(computerChoice);
    results = decideWinner(humanChoice, computerChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(humanChoice, computerChoice, message);
}

function gameRandomChoice() {
    return Math.floor(Math.random() * Math.floor(3));
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {
            'scissors': 1,
            'rock': 0.5,
            'paper': 0
        },
        'paper': {
            'rock': 1,
            'paper': 0.5,
            'scissors': 0
        },
        'scissors': {
            'paper': 1,
            'scissors': 0.5,
            'rock': 0
        }
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { message: "you lost!", colour: "red" };
    } else if (yourScore === 0.5) {
        return { message: "you tied!", colour: "yellow" };
    } else {
        return { message: "you won!", colour: "Green" };
    }

}

function rpsFrontEnd(humanImageChoice, computerImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // remove all images 
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var computerDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37, 50, 223, 1)'>";
    messageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['colour'] + "; font-size: 60px; padding: 30px '>" + finalMessage['message'] + "</h1>";
    computerDiv.innerHTML = "<img src='" + imagesDatabase[computerImageChoice] + "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(computerDiv);




}