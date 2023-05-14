import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './modules/rooms/rooms.controller';
import { RoomsService } from './modules/rooms/rooms.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController, RoomsController],
  providers: [AppService, RoomsService],
})
export class AppModule {}
