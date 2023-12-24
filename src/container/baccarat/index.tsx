import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baccaratConfig } from "../../gameConfigs";
import BaccaratScene from "../../scenes/BaccaratScene";
import { socket } from "../../websocket";

export default function Baccarat () {
    const [game, setGame] = useState<Phaser.Game>();

    useEffect(() => {
        let blackjackGame = new Phaser.Game(baccaratConfig);
        
        socket.send(JSON.stringify({
            type: 'baccarat',
            instruction: 'start_game',
        }));
        blackjackGame.events.on('ready', () => {
            setGame(blackjackGame);
        })
    }, []);

    useEffect(() => {
        if (game?.scene.scenes[0]) {
            const baccarat:BaccaratScene = game?.scene.getScene('baccarat') as BaccaratScene;

            if (socket) {
                console.log(socket);
                socket.onmessage = (msg) => {
                    let data = JSON.parse(msg.data);
                    console.log(data);
                    if (data.type === 'baccarat') {
                        if (data.instruction === "start_game") {
                            baccarat.playerId = data.playerId;
                            baccarat.start();
                        }
                    }
                }
            }
        }
    }, [game]);

    return (
        <div className="baccarat-game"></div>
    );
}