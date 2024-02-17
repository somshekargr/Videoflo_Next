import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { requestLogCollection, RequestLogDocument } from '@botaiml-videoflo/entities';
import { Model } from 'mongoose';

@Injectable()
export class RequestLoggerService {
  constructor(
    @InjectModel(requestLogCollection)
    private readonly loggerModel: Model<RequestLogDocument>
  ) {}

  addLog(data: { request: any; response: any }) {
    this.loggerModel.updateOne(
      {},
      {
        request: data.request,
        response: data.response
      },
      {
        upsert: true
      }
    );
  }
}
