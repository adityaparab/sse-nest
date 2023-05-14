import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, Room } from './rooms.types';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('notif')
  notification(): Observable<MessageEvent> {
    console.log('SSE Triggered');
    return fromEvent(this.eventEmitter, 'rooms.notification').pipe(
      map((room: Room) => {
        return { data: room };
      }),
    );
  }

  @Post()
  createRoom(@Body() createRoomDto: CreateRoomDto): Room {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  findAllRooms(): Room[] {
    console.log('YaY! GET');
    return this.roomsService.allRooms;
  }

  //   @Get(':id')
  //   findRoom(@Param('id') id: string): Room {
  //     const theRoom = this.roomsService.getRoom(id);
  //     if (!theRoom) {
  //       throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
  //     }
  //     return theRoom;
  //   }
}
