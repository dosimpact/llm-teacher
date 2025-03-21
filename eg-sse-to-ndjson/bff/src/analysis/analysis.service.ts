import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AnalysisRequestDto } from './dto/analysis-request.dto';
import { pipeDataStreamToResponse } from 'ai';

interface AnalysisMessage {
  message?: string;
  error?: string;
  code?: string;
  phase?: string;
  timestamp?: string;
}

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  async analyzeText(dto: AnalysisRequestDto, response: Response) {
    try {
      const backendResponse = await fetch('http://localhost:3002/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: dto.text }),
      });

      if (!backendResponse.ok) {
        throw new Error(`Backend server error: ${backendResponse.status}`);
      }

      const body = backendResponse.body;
      if (!body) {
        throw new Error('No response body');
      }

      let currentPhase = '준비';
      const reader = body.getReader();
      const decoder = new TextDecoder();
      const logger = this.logger;

      // const dataStream = createDataStream({
      //   execute: (dataStream) => {
      //     dataStream.write('data: hello');
      //   },
      // });

      // dataStream.pipeTo(response);

      // streamText().mergeIntoDataStream

      // const result = streamText({
      //   // model: OpenAIStream('gpt-4o'),
      //   // messages,
      //   onChunk() {
      //     // dataStream.writeMessageAnnotation({ chunk: '123' });
      //   },
      //   onFinish() {
      //     // message annotation:
      //     // dataStream.writeMessageAnnotation({
      //     //   id: generateId(), // e.g. id from saved DB record
      //     //   other: 'information',
      //     // });
      //     // call annotation:
      //     // dataStream.writeData('call completed');
      //   },
      // });

      // result.mergeIntoDataStream(dataStream);

      pipeDataStreamToResponse(response, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
        async execute(dataStream) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter((line) => line.trim());

              console.log('lines', lines);

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.slice(6)) as AnalysisMessage;
                    if (data.message) {
                      // Update current phase based on message content
                      if (data.message.includes('처리')) currentPhase = '처리';
                      else if (data.message.includes('분석'))
                        currentPhase = '분석';
                      else if (data.message.includes('완료'))
                        currentPhase = '완료';

                      dataStream.writeData({
                        ...data,
                        phase: currentPhase,
                        timestamp: new Date().toISOString(),
                      });
                    }

                    if (data.error) {
                      dataStream.writeData({
                        error: data.error,
                        code: data.code || 'UNKNOWN_ERROR',
                        phase: currentPhase,
                        timestamp: new Date().toISOString(),
                      });
                      break;
                    }
                  } catch (error) {
                    logger.error('Failed to parse SSE data:', error);
                    dataStream.writeData({
                      error: '메시지 파싱 중 오류가 발생했습니다.',
                      code: 'PARSE_ERROR',
                      phase: currentPhase,
                      timestamp: new Date().toISOString(),
                    });
                  }
                } else if (line.startsWith('event: done')) {
                  dataStream.writeData({
                    message: '분석이 완료되었습니다.',
                    phase: '완료',
                    timestamp: new Date().toISOString(),
                  });
                  break;
                } else if (line.startsWith('event: error')) {
                  try {
                    const errorLine = line.split('data: ')[1];
                    if (errorLine) {
                      const errorData = JSON.parse(
                        errorLine,
                      ) as AnalysisMessage;
                      dataStream.writeData({
                        error:
                          errorData.error || '알 수 없는 오류가 발생했습니다.',
                        code: errorData.code || 'UNKNOWN_ERROR',
                        phase: currentPhase,
                        timestamp: new Date().toISOString(),
                      });
                    }
                  } catch (error) {
                    logger.error('Failed to parse error data:', error);
                    dataStream.writeData({
                      error: '오류 데이터를 처리할 수 없습니다.',
                      code: 'ERROR_PARSE_FAILED',
                      phase: currentPhase,
                      timestamp: new Date().toISOString(),
                    });
                  }
                  break;
                }
              }
            }
          } catch (error) {
            logger.error('Stream processing error:', error);
            dataStream.writeData({
              error: '스트림 처리 중 오류가 발생했습니다.',
              code: 'STREAM_ERROR',
              phase: currentPhase,
              timestamp: new Date().toISOString(),
            });
          }
        },
        onError: (error) => {
          logger.error('Stream error:', error);
          return '분석 처리 중 오류가 발생했습니다.';
        },
      });
    } catch (error) {
      this.logger.error('Connection error:', error);
      if (!response.writableEnded) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(
          JSON.stringify({
            error: '분석 처리 중 오류가 발생했습니다.',
            code: 'CONNECTION_ERROR',
            timestamp: new Date().toISOString(),
          }),
        );
      }
    }
  }

  async analyzeTextOpenAi(dto: AnalysisRequestDto, response: Response) {
    try {
      const backendResponse = await fetch(
        'http://localhost:3002/analyze/openai',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: dto.text }),
        },
      );

      if (!backendResponse.ok) {
        throw new Error(`Backend server error: ${backendResponse.status}`);
      }

      const body = backendResponse.body;
      if (!body) {
        throw new Error('No response body');
      }

      const reader = body.getReader();
      const decoder = new TextDecoder();
      const logger = this.logger;

      pipeDataStreamToResponse(response, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
        async execute(dataStream) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter((line) => line.trim());

              console.log('lines', lines);

              // 이벤트 타입과 데이터를 추출
              let eventType = '';
              let eventData = '';

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.startsWith('event: ')) {
                  eventType = line.slice(7); // 'event: delta',
                } else if (line.startsWith('data: ') && eventType) {
                  eventData = line.slice(6);

                  // delta 이벤트만 처리
                  if (
                    eventType === 'delta' ||
                    eventType === 'message-endline' ||
                    eventType === 'ui-generation'
                  ) {
                    try {
                      const parsedData = JSON.parse(eventData) as {
                        v: string;
                        o: string;
                      };
                      let content = '';

                      // delta 이벤트의 다양한 형식 처리
                      if (parsedData.v) {
                        content = parsedData.v;
                      }

                      // 'append' 작업이 있는 경우
                      if (parsedData.o === 'append' && parsedData.v) {
                        content = parsedData.v;
                      }

                      // 커스텀 형식으로 데이터 전송
                      dataStream.writeData({
                        type: eventType,
                        content: content,
                        data: parsedData,
                      });
                    } catch (error) {
                      logger.error('Failed to parse delta data:', error);
                    }
                  } else if (eventType === 'done') {
                    // 완료 이벤트 처리
                    dataStream.writeData({
                      type: 'text-delta',
                      content: '',
                      done: true,
                    });
                    break;
                  }

                  // 이벤트 타입 초기화
                  eventType = '';
                }
              }
            }
          } catch (error) {
            logger.error('Stream processing error:', error);
            dataStream.writeData({
              type: 'text-delta',
              error: '스트림 처리 중 오류가 발생했습니다.',
              code: 'STREAM_ERROR',
              timestamp: new Date().toISOString(),
            });
          }
        },
        onError: (error) => {
          logger.error('Stream error:', error);
          return '분석 처리 중 오류가 발생했습니다.';
        },
      });
    } catch (error) {
      this.logger.error('Connection error:', error);
      if (!response.writableEnded) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(
          JSON.stringify({
            type: 'text-delta',
            error: '분석 처리 중 오류가 발생했습니다.',
            code: 'CONNECTION_ERROR',
            timestamp: new Date().toISOString(),
          }),
        );
      }
    }
  }
}
