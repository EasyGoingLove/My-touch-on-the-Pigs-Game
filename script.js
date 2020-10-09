var score , roundScore , activePlayer , activeGame = true , previousDice = 0 , winscore , change=0;
 init();

 
document.querySelector('.btn-roll').addEventListener('click' , function () {
    if(activeGame){
          if ( activePlayer === 0 ) {
             var dice = Math.floor(Math.random() * 6 + 1);
             var diceDOM = document.querySelector('.dice');
             diceDOM.style.display = 'block';
             diceDOM.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/243004/dice-' + dice + '.png';
             // The rule if u roll 6 two times in a row 
             if (dice !== 1) {
                if (dice===6) { previousDice +=1; }
                else if (previousDice===2) {
                    score[activePlayer] = 0 ;
                    document.querySelector('#score-0').textContent = '0';
                    reset();
                }
                else{
                    previousDice = 0;
                }
                 // The rule if u roll 6 two times in a row 
               roundScore +=dice;
               document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
            else {
              reset();
            }
      }

    else {
            var dice2 = Math.floor(Math.random() * 6 + 1);
            var diceDOM2 = document.querySelector('.dice2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/243004/dice-' + dice2 + '.png';
             if (dice2 !== 1) {

                 // The rule if u roll 6 two times in a row 
                if (dice2===6) { previousDice +=1; }
                else if (previousDice===2) {
                    score[activePlayer] = 0 ;
                    document.querySelector('#score-1').textContent = '0';
                    reset();
                }
                else{
                    previousDice = 0;
                }
                   // The rule if u roll 6 two times in a row 

             roundScore +=dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
             }
             else {
               reset();
             }
       } 
}
});

document.querySelector('.btn-hold').addEventListener('click' , function () {
    if(activeGame){
    score[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

    if(score[activePlayer]>=winscore){
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-'+ activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer+'-panel').classList.remove('active');
        var loser= 0;
        activePlayer ===0 ? loser = 1 : loser= 0;
        document.getElementById('name-' + loser).textContent = 'Loser!';
        activeGame = false;
    }
    else{
        reset();
    }
}
});

 
document.querySelector('.btn-new').addEventListener('click' , init);

//Enter the new winning condition
document.querySelector('.btn-change').addEventListener('click' , function () {
    change +=1;
    if (change < 2) {
        winscore = document.querySelector(".winscore").value;
    }
});
//Enter the new winning condition




function reset() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousDice = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
    change=0
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    winscore = 100;
    
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    activeGame = true
}
