import { DynamicModule, Module } from '@nestjs/common';

export type MyDynamicModuleConfig = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';
@Module({})
export class MyDynamicModule {
  static register(myModuleConfigs: any): DynamicModule {
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useValue: myModuleConfigs,
        },
      ],
      controllers: [],
      exports: [MY_DYNAMIC_CONFIG],
    };
  }
}
