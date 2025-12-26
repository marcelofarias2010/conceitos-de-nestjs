import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware Olá');
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

    console.log('SimpleMiddleware: Tchau');

    res.on('finish', () => {
      console.log('SimpleMiddleware: Terminou');
    });
  }
}
