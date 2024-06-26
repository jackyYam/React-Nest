import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest, CompleteInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }

  @Post('/complete-info-validate')
  completeInfoValidate(
    @Body() bodyRequest: CompleteInfoRequest,
  ): Promise<BaseResponse> {
    return this.infoService.completeInfoValidate(bodyRequest);
  }
}
