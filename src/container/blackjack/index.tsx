import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectRooms, addRoom, updateRoom, removeRoom } from "../../state/reducers/blackjackSlice";
import "./index.css";
import { connectToServer, setSocket, socket } from '../../websocket';
import { v4 as uuid } from 'uuid';

export default function BlackJack() {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [roomName, setRoomName] = useState('');

    const dispatch = useAppDispatch();
    const rooms = useAppSelector(selectRooms);

    const showRooms = (allRooms: any) => {
        allRooms.map((room1: any) => {
            if (rooms.filter((room: any) => room.id === room1.id).length === 0) {
                dispatch(addRoom({
                    id: room1.id,
                    name: room1.name,
                    connectedPlayers: room1.connectedPlayers,
                }))
            } else {
                dispatch(updateRoom({
                    id: room1.id,
                    name: room1.name,
                    connectedPlayers: room1.connectedPlayers,
                }))
            }
        })   
        rooms.map((room: any) => {
            if (allRooms.filter((room1: any) => room1.id  === room.id).length === 0) {
                console.log('remove:'+room.id);
                dispatch(removeRoom({
                    id: room.id
                }))
            }
        })
    }

    useEffect(() => {
        socket?.send(JSON.stringify({
            type: 'blackjack',
            instruction: 'fetch_room',
        }))
    }, [])

    useEffect(() => {
        socket.onmessage = (msg) => {
            let data = JSON.parse(msg.data);
            if (data.type === 'blackjack') {
                if (data.instruction === 'show_room') {
                    showRooms(data.rooms);
                } else if (data.instruction === 'create_room') {
                    startRoom(data.id);
                }
            }
        }
    })

    const handleRoomName = (e: any) => setRoomName(e.target.value);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOk = () => {
        socket?.send(JSON.stringify({
            type: 'blackjack',
            instruction: 'create_room',
            name: roomName,
        }));
        setShow(false);
    }

    const startRoom = (id: string) => {
        navigate('/blackjack/room/' + id);
    }

    const joinRoom = (id: string) => {
        let currentRoom = rooms.find((room) => room.id === id);
        if (currentRoom?.connectedPlayers.length === 2) return;
        socket?.send(JSON.stringify({
            type: 'blackjack',
            instruction: 'join_room',
            roomId: id,
            name: roomName,
        }))
        navigate('/blackjack/room/' + id);
    }

    return (
        <div className="blackjack">
            <div className="background-blur"></div>
            <h1 className="title">BlackJack</h1>
            <Container>
                <Row id="rooms" xs={2} md={2}>
                    <Col onClick={handleShow} key='col-green-table-plus'><img className="green-table" src="../../../assets/imgs/green_table_plus.png" key="green-table-plus" alt="green table"/></Col>
                    {rooms.map((room: any) => {
                        return <Col onClick={() => joinRoom(room.id)} key={room.id+'green-table'}><img className="green-table" src="../../../assets/imgs/green_table.png" key={room.id} alt="green table"/></Col>
                    })}
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create BlackJack</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Room Name" onChange={handleRoomName}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOk}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}