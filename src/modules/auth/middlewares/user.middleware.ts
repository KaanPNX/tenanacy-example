import { Injectable, NestMiddleware, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const user : any = req.user;
    if(user.id == req.params.id){
        throw new UnauthorizedException();
    }   

    next();
  }
}