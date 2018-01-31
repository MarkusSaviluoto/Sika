var app = angular.module("sikaApp", []);

app.constant("sikaConstants", {
    "WINNING_POINTS": 100,
    "PLAYER_WON": 0,
    "COMPUTER_WON": 1,
    "GAME_CONTINUES": 2
});

app.controller("sikaCtrl", function($scope, sikaConstants){
    
    $scope.WIN_POINTS = sikaConstants.WINNING_POINTS;
    $scope.PLAYER_WON = sikaConstants.PLAYER_WON;
    $scope.COMPUTER_WON = sikaConstants.COMPUTER_WON;
    $scope.GAME_CONTINUES = sikaConstants.GAME_CONTINUES;
    
    intializeGameAfterPageLoad();
    intializeNewGame();
    
    function intializeGameAfterPageLoad(){
        $scope.computerWins = 0;
        $scope.playerWins = 0;
        $scope.statusImage = "Sika";
        $scope.statusText = "Heitä noppaa tai anna koneen heittää...";
    };
    
    function intializeNewGame(){
        $scope.computerPoints = 0;
        $scope.computerCurrentTurnPoins = 0;

        $scope.playerPoints = 0;
        $scope.playerCurrentTurnPoins = 0;
        $scope.playerPointList = [];
        
        $scope.statusImage = "Sika";
        $scope.statusText = "";
        $scope.status = $scope.GAME_CONTINUES;
    };
    
    $scope.throwDicePlayer = function(){
        if ($scope.status !== $scope.GAME_CONTINUES){
            intializeNewGame();
        }
        var randomDiceNum = Math.floor((Math.random() * 6) + 1);
        handeDiceThrow(randomDiceNum);
    };
    
    function handeDiceThrow(randDiceNumber){
        $scope.statusImage = randDiceNumber;
        imageEffect(randDiceNumber);
        if (randDiceNumber === 1){
            $scope.playerCurrentTurnPoins = 0;
            handeGameStatusAfterPlayerTurn();
        }else{
            $scope.playerCurrentTurnPoins += randDiceNumber;
        }
        $scope.playerPointList.push(randDiceNumber);
        $scope.statusText = $scope.playerPointList.toString();

        document.getElementById("computer").disabled = false;
    };
    
    $scope.throwDiceComputer = function(){
        if ($scope.status !== $scope.GAME_CONTINUES){
            intializeNewGame();
        }
        handeGameStatusAfterPlayerTurn();

        var numOfThrows = 0;
        var maxPoints = Math.floor((Math.random() * 8) + 13);
        var maxThrows = Math.floor((Math.random() * 4) + 2);
        
        while ($scope.computerCurrentTurnPoins < maxPoints || numOfThrows < maxThrows){
            var randomDiceNum = Math.floor((Math.random() * 6) + 1);
            if (randomDiceNum === 1){
                $scope.computerCurrentTurnPoins = 0;
                break;
            }
            $scope.computerCurrentTurnPoins += randomDiceNum;
            numOfThrows++;
        }
        handeGameStatusAfterComputerTurn();
    };
    
    function handeGameStatusAfterComputerTurn(){
        $scope.computerPoints += $scope.computerCurrentTurnPoins;
        $scope.statusText = "Tietokone heitti " + $scope.computerCurrentTurnPoins;
        $scope.computerCurrentTurnPoins = 0;
        document.getElementById("computer").disabled = true;
        document.getElementById("player").disabled = false;
        
        if ($scope.computerPoints >= $scope.WIN_POINTS && $scope.computerPoints > $scope.playerPoints){
            $scope.computerWins++;
            $scope.status = $scope.COMPUTER_WON;
            $scope.statusImage = "Sad-smiley";
            $scope.statusText = "Tietokone voitti! Aloita uusi peli heittämällä noppaa tai antamalla vuoron koneelle...";
            document.getElementById("player").disabled = false;
            document.getElementById("computer").disabled = false;
            
        }else if($scope.playerPoints >= $scope.WIN_POINTS){
            $scope.playerWins++;
            $scope.status = $scope.PLAYER_WON;
            $scope.statusImage = "Smiley";
            $scope.statusText = "Voitit! Aloita uusi peli heittämällä noppaa tai antamalla vuoron koneelle...";
            document.getElementById("player").disabled = false;
            document.getElementById("computer").disabled = false;
        }
    };
    
    function handeGameStatusAfterPlayerTurn(){
        $scope.playerPoints += $scope.playerCurrentTurnPoins;
        $scope.playerCurrentTurnPoins = 0;
        $scope.playerPointList = [];
        document.getElementById("player").disabled = true;
        document.getElementById("computer").disabled = false;
    };
    
    function imageEffect(diceNum){
        var image = document.getElementById("image");
        image.style.width = 150 + diceNum * 10 + "px";
    };
});