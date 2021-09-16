import './style.css'

export default function RoomIcon({ room, onClick }) {

    return (
        <div className={`room-icon ${room.available ? 'available' : ''}`} onClick={() => onClick(room.id)}>
            {room.name}
        </div>
    )
}

