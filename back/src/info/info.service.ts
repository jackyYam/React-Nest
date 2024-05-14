import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  UpdateInfoRequest as UpdateInfoRequestInterface,
  CompleteInfoRequest as CompleteInfoRequestInterface,
} from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';
import { z } from 'zod';
import { HttpException, HttpStatus } from '@nestjs/common';

const InfoSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(50, { message: 'Name is too long' }),
    age: z.coerce
      .number()
      .int()
      .min(1, { message: 'Age is required' })
      .max(150, { message: 'Age is too high' }),
    married: z.string().optional(),
    birthDate: z.string({
      required_error: 'You need to provide your birthday.',
    }),
  })
  .refine((data) => !(data.age >= 18 && data.married === undefined), {
    message: 'You must provide marital status if you are 18 or older',
    path: ['married'],
  })
  .refine(
    (data) => {
      const birthDate = new Date(data.birthDate);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      if (now.getMonth() < birthDate.getMonth()) {
        age--;
      } else if (
        now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate()
      ) {
        age--;
      }
      return age === data.age;
    },
    { message: 'Age and birthdate do not match', path: ['birthDate'] },
  );
@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }

  async completeInfoValidate(
    rawData: CompleteInfoRequestInterface,
  ): Promise<BaseResponse> {
    try {
      const data = InfoSchema.parse(rawData);
      return {
        success: true,
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          errors: error.errors, // error.errors contains the validation errors
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
