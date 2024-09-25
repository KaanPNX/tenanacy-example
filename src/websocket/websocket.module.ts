import { Module } from '@nestjs/common';
import { WebsocketServer } from './websocket.server';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    providers: [WebsocketServer,JwtService],
})
export class WebsocketModule {}