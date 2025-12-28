import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
/** são inteceptadores que pode ser usado para entrar coisas antes do controle
 * ou depois do controle. pode tanto observar os dados para fazer login quanto
 * manipular os dados*/
@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const response = context.switchToHttp().getResponse();

    response.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    return next.handle();
  }
}
