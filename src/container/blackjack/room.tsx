import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import phaserGame from '../../PhaserGame';
import GameScene from '../../scenes/GameScene';
import { blackjackConfig } from "../../gameConfigs";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectRooms, addRoom, updateRoom } from "../../state/reducers/blackjackSlice";
import { socket } from "../../websocket";
import BlackJackScene from "../../scenes/BlackJackScene";

export default function Room() {
    const { id } = useParams();
    const [game, setGame] = useState<Phaser.Game>();

    useEffect(() => {
        let blackjackGame = new Phaser.Game(blackjackConfig);
        
        blackjackGame.events.on('ready', () => {
            setGame(blackjackGame);
        })
    }, []);

    useEffect(() => {
        if (game?.scene.scenes[0]) {
            const blackjack:BlackJackScene = game?.scene.getScene('blackjack') as BlackJackScene;

            if (socket) {
                socket.onmessage = (msg) => {
                    let data = JSON.parse(msg.data);
                    console.log(data);
                    if (data.type === 'blackjack') {
                        switch(data.instruction) {
                            case 'start_room':
                                if (data.roomId === id) {
                                    blackjack.playerType = data.player.playerType;
                                    blackjack.roomId = data.roomId;
                                    blackjack.playerId = data.player.id;
                                    blackjack.start();
                                }
                                break;
                        }
                    }
                }
            }
        }
    }, [game]);

    return (
        <div className="blackjack-game">
        </div>
    )
}