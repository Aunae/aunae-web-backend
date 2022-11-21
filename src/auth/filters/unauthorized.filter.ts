import {
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpException.name);
  /**
   * @author yoonki1207
   * @description Unauthorized Exception 함수.
   *
   * @param exception 현재 처리 중인 예외 객체
   * @param host 핸들러에 전달되는 인수를 검색하는 메서드
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(`Http exception filter acted: ${request.url}`);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
