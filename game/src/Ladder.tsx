import React, { useEffect, useState } from 'react'
import "./Styles/New.css"

const Ladder:React.FC = () => {
    const [username, setUsername] = useState<string>("");

    const [p1Position,setP1Position]=useState<number>(0)
    const [p2Position,setP2Position]=useState<number>(0)
    const [dice,setDice]=useState<number>(0)
    const [player,setPlayer]=useState<number>(1)
    const[scorepl1,setScorepl1]=useState<number>(0)
    const[scorepl2,setScorepl2]=useState<number>(0)

    const createBoard =():any=>{
        const board:any =[]
        for(let i=100;i>=1;i-=10){
            let n:number=i/10
            if(n%2!=0){
                for(let j=i-9;j<=i;j++){
                    board.push(
                        <div className='grid' key={j}>
                           {p1Position ===j &&  <p id='player1'>1</p>} 
                           {p2Position ===j &&  <p id='player2'>2</p>} 
                           {j}
                        </div>
                    )
                }
            }
            else{
                for(let j=i;j>=i-9;j--){
                    board.push(
                        <div className='grid' key={j}>
                            {p1Position ===j &&  <p id='player1'>1</p>} 
                            {p2Position ===j &&  <p id='player2'>2</p>}
                            {j} 
                        </div>
                    )
                }
            } 
        }
        return board
}
    const rollDice=()=>{
        const dice= Math.floor(Math.random()* 6)+1

        setDice(dice)
        let newPosition:number =0
        //player1
        if(player===1){
            newPosition=p1Position+dice
            if(newPosition>100){
                newPosition=p1Position
            }
            if(newPosition===11){
             newPosition=52
            }
            if(newPosition===27){
              newPosition=14
            }
            if(newPosition===39){
              newPosition=14
            }
            if(newPosition===37){
              newPosition=85
            }
            if(newPosition===40){
              newPosition=59
            }
            if(newPosition===54){
              newPosition=36
            }
            if(newPosition===90){
              newPosition=33
            }
            if(newPosition===99){
              newPosition=18
            }
            
          setP1Position(newPosition)
        }
        //player2
        else{
            newPosition=p2Position+dice
            if(newPosition>100){
                newPosition=p2Position
            }
            if(newPosition===11){
              newPosition=52
             }
             if(newPosition===27){
               newPosition=14
             }
             if(newPosition===39){
               newPosition=14
             }
             if(newPosition===37){
               newPosition=85
             }
             if(newPosition===40){
               newPosition=59
             }
             if(newPosition===54){
               newPosition=36
             }
             if(newPosition===90){
               newPosition=33
             }
             if(newPosition===99){
               newPosition=18
             }
          setP2Position(newPosition)
        }
        if(newPosition===100){
            if(player===1){
                alert("Player 1 won")
                setScorepl1(scorepl1+1)
                resetAll()
            }
            else{
                alert("Player 2 won")
                setScorepl2(scorepl2+1)
                resetAll()
            }
        }
        setPlayer(player===1?2:1)
        
    }

    const resetAll=()=>{
        setDice(0)
        setP1Position(0)
        setP2Position(0)
        setPlayer(1)
    }
    useEffect(() => {
      const storedUsername = localStorage.getItem("username"); 
      if (storedUsername) {
          setUsername(storedUsername);
      }
  }, []);
  const end= async()=>{
    try{
      const response = await fetch('http://localhost:5000/score',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        username,
        scorepl1,
        scorepl2
      }),
      })
      if(response.ok){
        const result = await response.json();
        console.log("game data",result)
      }
      else {
        console.log('Failed to save game data');
    }
    }
    catch(err){
      console.log('Error saving game data:', err);
    }

  }
  return (
    <>
    
    <div className="container">
        {createBoard()}
    </div>
    <h2>Hey {username}</h2>
    <p>Current Player:{player}</p>
    <p>You got:{dice}</p>
    <p>Player1 score:{scorepl1} <br /> Player2 score:{scorepl2}</p>
    <button className='btn'
    onClick={rollDice}>Roll</button>
    <button onClick={end}>End Game</button>
    
    </>
  )
}

export default Ladder;