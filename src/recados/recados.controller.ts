import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from './recados.constant';
import type { RegexProtocol } from 'src/common/regex/regex-protocol';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { RoutePolicies } from 'src/auth/enum/route-policies.enum';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpaceRegex: RegexProtocol,
    @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    private readonly onlyLowercaseLetters: RegexProtocol,
  ) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    console.log(this.removeSpaceRegex.execute(this.serverName));
    console.log(this.onlyLowercaseLetters.execute(this.serverName));
    console.log(this.removeSpaceRegex.execute(this.serverName));
    const recados = await this.recadosService.findAll(paginationDto);

    return recados;
  }
  // Encontrar UM recado
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @SetRoutePolicy(RoutePolicies.createRecado)
  @UseGuards(AuthAndPolicyGuard)
  @Post()
  create(
    @Body() createRecadoDto: CreateRecadoDto,
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto,
  ) {
    return this.recadosService.create(createRecadoDto, tokenPayLoad);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto, tokenPayLoad);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayLoad: TokenPayloadDto,
  ) {
    return this.recadosService.remove(id, tokenPayLoad);
  }
}
