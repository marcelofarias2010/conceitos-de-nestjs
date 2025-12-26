import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('OutroMiddleware Olá');
    const autorization = req.headers?.authorization;

    if (autorization) {
      req['user'] = {
        nome: 'Luiz',
        sobrenome: 'Otávio',
      };
    }

    //res.setHeader('CABEÇALHO', 'Do Middleware');
    // Terminando a cadeia de chamadas
    //return res.status(404).send({
    //  message: 'Não encontrado',
    //});

    next();
  }
}
