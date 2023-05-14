import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, Observable } from 'rxjs';
import { CreateRoomDto, Room } from './rooms.types';
import { v4 } from 'uuid';

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private _rooms$;
  constructor(private eventEmitter: EventEmitter2) {
    this._rooms$ = fromEvent(this.eventEmitter, 'room.notification');
  }

  public get room$(): Observable<Room> {
    return this._rooms$;
  }

  public get allRooms(): Room[] {
    return this.rooms;
  }

  createRoom(newRoom: CreateRoomDto): Room {
    console.log(newRoom);
    const theRoom: Room = {
      id: v4(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      title: newRoom.title,
      creator: {
        id: v4(),
        name: newRoom.name,
      },
    };

    this.rooms.push(theRoom);
    this.eventEmitter.emit('rooms.notification', theRoom);
    return theRoom;
  }

  getRoom(id: string): Room {
    return this.rooms.find((room) => room.id === id);
  }
}
