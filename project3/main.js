let turns_example1 = ["rock", "paper", "scissors", "lizard", "spock"];
let turns_example2 = ["1","2","3","4","5"];
const readline = require("readline")
const Promise = require('bluebird')
const cryptoJS = require("crypto-js")
const randomNumber = require("random-number-csprng");
let isGameOver = false
class Table{
    turns
    constructor(turns) {
        this.turns = turns
    }
    createTable(){
        let number = 1
        this.turns.forEach(
            turn =>{
                console.log(number++ + ": " + turn)
            }
        )
        console.log("0: exit")
        console.log("?: help")
    }
    getTurn(rules, computerTurn) {
        return new Promise((resolve) => {
            resolve("result")
        }).then(() => {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
                rl.question("Option: ", function (answer) {
                    if(Number.parseInt(answer) <= turns.length && Number.parseInt(answer)>0){
                        computerTurn = turns[Number.parseInt(computerTurn)-1]
                        let playerTurn = turns[Number.parseInt(answer)-1]
                        rules.game(computerTurn, playerTurn)
                    }else if(answer === "0"){
                        isGameOver = true;
                    }else if(answer === "?"){
                        rules.showHelp()
                        main.table.createTable()
                        main.table.getTurn(rules, computerTurn)
                    }else{
                        main.table.createTable()
                        main.table.getTurn(rules, computerTurn)
                    }
                    rl.close()
            })
        })
    }
}
class HmacGenerator{
    hmac
    key
    message
    constructor(message) {
        this.message = message
    }
    generateKey(max){
        const Promise = require("bluebird")
        Promise.noConflict().try(function () {
            return randomNumber(1,max)
        }).then(function (number) {
            return number
        }
        ).then(number =>{
            this.key = number.toString(2)
        })
            .catch(function (err) {
            console.log(err.toString())
        })
    }
    generateHmac(){
        const p = new Promise((resolve)=>{
            resolve("result")
        })
        p.then(() =>{
            this.hmac = cryptoJS.HmacSHA3(this.message, this.key, {outputLength:256})
            console.log("HMAC: " + this.hmac.toString())
            return this.hmac.toString()
        })
    }
    setMessage(message){
        this.message = message
    }
}

class Rules{

    showMoves(computerMove, playerMove) {
        console.log("Computer move:" + computerMove)
        console.log("Players move:" + playerMove)
    }
    showHelp(){
        let moves = ""
        let pads = 3;
        let maxPad = 8;
        turns.forEach(n => {
           moves = moves.concat( "".padStart(pads) + n.padEnd(n.length + pads))
        })
        console.log("\t" +moves)
        turns.forEach(n=>{
            moves = ""
            turns.forEach(v =>{
                let result = this.gameResult(n,v)
                moves = moves.concat("".padStart(pads) + result.padEnd(result.length + pads) + "|")
            })
            console.log(n.padEnd(maxPad)+ "|" + moves)
        })
    }
    showResults(playerTurn, computerTurn){
        return "You " + this.gameResult(playerTurn, computerTurn) + "!"
    }
    gameResult(playerMove, computerMove){
        let result
        switch(playerMove) {
            case "rock": {
                if (computerMove === "paper" || computerMove === "spock") {
                    result = "Lose"
                } else if (computerMove === "scissors" || computerMove === "lizard") {
                    result = "Win"
                } else {
                    result = "Draw"
                }
                break
            }
            case "paper": {
                if (computerMove === "lizard" || computerMove === "scissors") {
                    result = "Lose"
                } else if (computerMove === "rock" || computerMove === "spock") {
                    result = "Win"
                } else {
                    result = "Draw"
                }
                break
            }
            case "scissors": {
                if (computerMove === "rock" || computerMove === "spock") {
                    result = "Lose"
                } else if (computerMove === "paper" || computerMove === "lizard") {
                    result = "Win"
                } else {
                    result = "Draw"
                }
                break
            }
            case "lizard": {
                if (computerMove === "scissors" || computerMove === "rock") {
                    result = "Lose"
                } else if (computerMove === "paper" || computerMove === "spock") {
                    result = "Win"
                } else {
                    result = "Draw"
                }
                break
            }
            case "spock": {
                if (computerMove === "paper" || computerMove === "lizard") {
                    result = "Lose"
                } else if (computerMove === "rock" || computerMove === "scissors") {
                    result = "Win"
                } else {
                    result = "Draw"
                }
                break
            }
        }
        return result;
    }
    game(computerMove, playerMove){
        if(playerMove ==="0"){
            isGameOver = true
            console.log("Exiting")
        }else{
            this.showMoves(computerMove, playerMove)
            console.log(this.showResults(playerMove, computerMove))
            console.log("HMAC key : " + main.generator.key)
        }
        if(!isGameOver){
            console.log("New game!\n")
            main.start().finally()
        }
    }
}
class Main{
    turns
    computerTurn
    table
    generator
    rules

    async start() {
        try {
            if (this.#setTurns()) {
                this.generator = new HmacGenerator()
                await this.generator.generateKey(256);
                await this.#computerMove();
                await this.table.getTurn(this.rules, this.computerTurn);
            }
        } catch (e) {
            console.log(e)
            throw e
        }

    }
    #setTurns(){
        let isTurnsExist = false;
        if(turns.length %2 === 1 && turns.length > 1 ){
            let check_result = this.#isTurnsCorrect(turns);
            if(check_result === true){
                this.turns = turns
                this.table = new Table(turns)
                this.rules = new Rules()
                isTurnsExist = true
            }else{
                console.log("Invalid input")
            }
        }else{
            console.log("Cannot proceed with this amount of turns. Turns amount: " + turns.length)
            isTurnsExist = false
        }
        return isTurnsExist
    }
    #isTurnsCorrect(turns){
        let copy = turns.slice()
        turns = turns.filter(function(item, pos, self){
            return self.indexOf(item) === pos;
        })
        if(copy.length !== turns.length){
            return false
        }
        let match1 = 0
        let match2 = 0
        turns.forEach(n=>
            {
                match1 = (turns_example1.includes(n))?++match1:0
                match2 = (turns_example2.includes(n))?++match2:0
            }
        )
        return Main.isMatchValid(match1, match2)
    }
    static isMatchValid(match1, match2){
        let isValid = false;
        if((match1 === turns_example1.length || match1 === turns_example1.length-2) && match2 === 0){
            isValid = true
        }else if((match2 === turns_example1.length || match2 === turns_example2.length-2) && match1 ===0){
            for(let i = 0; i<turns.length; i++){
                turns[i] = turns_example1[Number.parseInt(turns[i])-1]
            }
            isValid = true;
        }
        return isValid
    }
    #computerMove(){
        return new Promise((resolve)=>{
            resolve("result")
        }).then(() =>{
            return randomNumber(1, this.turns.length)
        }).then(result =>{
            this.generator.setMessage(this.turns[result])
            this.generator.generateHmac()
            this.computerTurn = result
        }).finally(()=>{
            this.#playerMove()
        })
    }
    #playerMove(){
        return new Promise((resolve) =>{
          resolve("result")
        }).then(() =>{
            this.table.createTable()
        })
    }
}
let main = new Main()
let turns = process.argv;
turns = turns.splice(2)
main.start().finally()
