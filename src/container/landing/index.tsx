import React, {useEffect} from 'react';
import { Link } from "react-router-dom";

export default function Landing() {

    useEffect(() => {
        
    })
    return (
        <div className="content">
            <div className="background-blur"></div>
            <h1 className="title">Paal Casino</h1>
            <ul className="casino-games">
                <Link to="/blackjack"><li id="blackjack"><p>Blackjack</p></li></Link>
                <Link to="/baccarat"><li id="baccarat"><p>Baccarat</p></li></Link>
                <Link to="/craps"><li id="craps"><p>Craps</p></li></Link>
                <Link to="/roulette"><li id="roulette"><p>Roulette</p></li></Link>
                <Link to="/pai-gow-poker"><li id="pai-gow-poker"><p>Pai Gow Poker</p></li></Link>
                <Link to="/let-it-ride-poker"><li id="let-it-ride-poker"><p>Let It Ride Poker</p></li></Link>
                <Link to="/three-card-poker"><li id="three-card-poker"><p>Three Card Poker</p></li></Link>
                <Link to="/ultimate-texas-holdem"><li id="ultimate-texas-holdem"><p>Ultimate Texas Hold’em</p></li></Link>
            </ul>
        </div>
    )
}