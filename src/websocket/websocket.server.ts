import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({port: 3001,
  cors: {
    origin: '*',
  },  
  namespace: 'websocket',
  transports: ['websocket'],
  allowRequest: (request, callback) => {
    const token = request.headers.authorization;
    if (!token) {
      return callback("Token is required", false);
    }else{
      return callback(null, true);
    }
}})
export class WebsocketServer {
  constructor(private readonly jwtService: JwtService) {
    
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('checkToken')
  handleCheckToken(@MessageBody() token: string, @ConnectedSocket() client: Socket): void {
    try {
      const decoded = this.jwtService.verify(token);
      client.emit('tokenStatus', { valid: true, exp: decoded.exp });
    } catch (error) {
      client.emit('tokenStatus', { valid: false, error: error.message });
    }
    
  }

}