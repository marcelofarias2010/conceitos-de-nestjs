import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
/** Pode basicamente fazer tudo que as outras coisas fazem e ele tem acesso ao
 * request e response do servidor*/
export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
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
