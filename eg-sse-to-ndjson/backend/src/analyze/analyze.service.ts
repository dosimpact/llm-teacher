import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AnalyzeRequestDto } from './dto/analyze-request.dto';

// 분석 결과를 시뮬레이션하는 예시 데이터
const sampleResponses = [
  '분석을 시작합니다...',
  '텍스트를 처리하는 중입니다...',
  '주요 키워드를 추출하고 있습니다...',
  '감성 분석을 수행하고 있습니다...',
  '최종 결과를 생성합니다...',
  '분석이 완료되었습니다.',
];

const openAiMessage = [
  {
    event: 'delta_encoding',
    data: 'v1',
  },
  {
    event: 'delta',
    data: {
      p: '',
      o: 'add',
      v: {
        message: {
          id: 'dummy-id-1',
          author: {
            role: 'system',
            name: null,
            metadata: {},
          },
          create_time: null,
          update_time: null,
          content: {
            content_type: 'text',
            parts: [''],
          },
          status: 'finished_successfully',
          end_turn: true,
          weight: 0.0,
          metadata: {
            is_visually_hidden_from_conversation: true,
          },
          recipient: 'all',
          channel: null,
        },
        conversation_id: 'dummy-conversation-id-1',
        error: null,
      },
      c: 0,
    },
  },
  // ... existing code ...
  {
    event: 'title_generation',
    data: {
      type: 'title_generation',
      title: '\uc0ac\uc6a9\uc790 \ud53c\ub4dc\ubc31 \uc218\uc9d1 \ubc29\ubc95',
      conversation_id: 'dummy-conversation-id-1',
    },
  },
  {
    event: 'conversation_detail_metadata',
    data: {
      type: 'conversation_detail_metadata',
      banner_info: null,
      blocked_features: [],
      model_limits: [],
      limits_progress: null,
      default_model_slug: 'auto',
      conversation_id: 'dummy-conversation-id-1',
    },
  },
  {
    event: 'delta',
    data: {
      v: {
        message: {
          id: '1b2585c4-9faa-4d89-8804-7dd9eab2fa65',
          author: { role: 'assistant', name: null, metadata: {} },
          create_time: 1741759239.847062,
          update_time: null,
          content: { content_type: 'text', parts: [''] },
          status: 'in_progress',
          end_turn: null,
          weight: 1.0,
          metadata: {
            citations: [],
            content_references: [],
            message_type: 'next',
            model_slug: 'gpt-4o',
            default_model_slug: 'auto',
            parent_id: '2e8e2cd9-70e7-4fb2-8789-45775ba61c45',
            model_switcher_deny: [],
          },
          recipient: 'all',
          channel: null,
        },
        conversation_id: 'dummy-conversation-id-1',
        error: null,
      },
      c: 3,
    },
  },
  {
    event: 'delta',
    data: { p: '/message/content/parts/0', o: 'append', v: '\uc0ac\uc6a9' },
  },
  {
    event: 'delta',
    data: { v: '\uc790 \ud53c\ub4dc\ubc31\uc744 \ud6a8\uacfc' },
  },
  {
    event: 'delta',
    data: { v: '\uc801\uc73c\ub85c \uc218' },
  },
  {
    event: 'delta',
    data: { v: '\uc9d1\ud558\ub824\uba74 **\uba85\ud655\ud55c' },
  },
  {
    event: 'delta',
    data: { v: ' \ubaa9\ud45c \uc124\uc815, \uc801' },
  },
  {
    event: 'delta',
    data: { v: '\uc808' },
  },
  {
    event: 'delta',
    data: { v: '\ud55c \uc218\uc9d1 \ubc29\ubc95 \uc120\ud0dd,' },
  },
  {
    event: 'delta',
    data: {
      v: ' \uc218\uc9d1\ub41c \ub370\uc774\ud130\uc758 \ubd84\uc11d \ubc0f \ud65c\uc6a9**',
    },
  },
  {
    event: 'delta',
    data: { v: '\uc774' },
  },
  {
    event: 'delta',
    data: {
      v: ' \uc911\uc694\ud574\uc694.  \n\n### **1. \ud53c\ub4dc\ubc31 \uc218\uc9d1',
    },
  },
  {
    event: 'delta',
    data: { v: ' \ubaa9\ud45c \uc124\uc815**  \n- **\uac1c\uc120' },
  },
  {
    event: 'delta',
    data: { v: '\uc774 \ud544\uc694\ud55c \ubd80\ubd84**:' },
  },
  {
    event: 'delta',
    data: { v: ' \uc81c\ud488, \uc11c\ube44\uc2a4' },
  },
  {
    event: 'ping',
    data: '2025-03-12 06:00:55.349556+00:00',
  },
  {
    event: 'delta',
    data: {
      p: '',
      o: 'patch',
      v: [
        { p: '/message/content/parts/0', o: 'append', v: '. \ud83d\ude80' },
        { p: '/message/status', o: 'replace', v: 'finished_successfully' },
        { p: '/message/end_turn', o: 'replace', v: true },
        {
          p: '/message/metadata',
          o: 'append',
          v: {
            finish_details: { type: 'stop', stop_tokens: [200002] },
            is_complete: true,
          },
        },
      ],
    },
  },
  {
    event: 'message-endline',
    data: { v: '' },
  },
  // 추가된 10개 요소
  {
    event: 'delta',
    data: {
      v: ' \ub610\ub294 \uc0ac\uc6a9\uc790 \uacbd\ud5d8\uc758 \ud2b9\uc815 \ubd80\ubd84',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\uc0ac\uc6a9\uc790 \uc138\uadf8\uba3c\ud2b8**: \ub2e4\uc591\ud55c \uc0ac\uc6a9\uc790 \uadf8\ub8f9\uc5d0\uc11c \ud53c\ub4dc\ubc31 \uc218\uc9d1',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\ud53c\ub4dc\ubc31 \uc218\uc9d1 \uc2dc\uae30**: \uc0ac\uc6a9 \uc911, \uc0ac\uc6a9 \ud6c4, \uc815\uae30\uc801 \uc124\ubb38',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n\n### **2. \ud53c\ub4dc\ubc31 \uc218\uc9d1 \ubc29\ubc95 \uc120\ud0dd**',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\uc124\ubb38\uc870\uc0ac**: \uad6c\uc870\ud654\ub41c \uc9c8\ubb38\uc73c\ub85c \ub370\uc774\ud130 \uc218\uc9d1',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\uc778\ud130\ubdf0**: \uc2ec\uce35\uc801\uc778 \ud53c\ub4dc\ubc31 \ud655\ubcf4',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\uc0ac\uc6a9\uc790 \ud14c\uc2a4\ud305**: \uc2e4\uc81c \uc0ac\uc6a9 \ud658\uacbd\uc5d0\uc11c \uad00\ucc30',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\uc571 \ub0b4 \ud53c\ub4dc\ubc31 \uae30\ub2a5**: \uc0ac\uc6a9 \uc911 \uc989\uc2dc \ud53c\ub4dc\ubc31 \uc218\uc9d1',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n\n### **3. \uc218\uc9d1\ub41c \ub370\uc774\ud130 \ubd84\uc11d**',
    },
  },
  {
    event: 'delta',
    data: {
      v: '\n- **\ud328\ud134 \ud30c\uc545**: \uacf5\ud1b5\uc801\uc778 \ubb38\uc81c\uc810\uacfc \uc694\uad6c\uc0ac\ud56d \ud30c\uc545',
    },
  },
  {
    event: 'message-endline',
    data: { v: '' },
  },
  {
    event: 'ui-generation',
    data: {
      type: 'ui-generation',
      uiType: 'feedback',
      uiArgs: {
        title: '피드백',
        description: '피드백을 입력해주세요.',
        placeholder: '피드백을 입력해주세요.',
      },
    },
  },
  {
    event: 'message_stream_complete',
    data: {
      type: 'message_stream_complete',
      conversation_id: 'dummy-conversation-id-1',
    },
  },
  // ... existing code ...
];

@Injectable()
export class AnalyzeService {
  private readonly logger = new Logger(AnalyzeService.name);
  private readonly errorRate: number;

  constructor() {
    // 환경 변수에서 에러 발생 확률을 가져오거나 기본값 10% 사용
    this.errorRate = Number(process.env.ERROR_RATE) || 0.001;
    this.logger.log(`Error simulation rate set to ${this.errorRate * 100}%`);
  }

  private simulateRandomError(): boolean {
    return Math.random() < this.errorRate;
  }

  private getRandomError(): { message: string; code: string } {
    const errors = [
      { message: '서버 과부하로 인한 처리 지연', code: 'SERVER_OVERLOAD' },
      { message: '텍스트 분석 모델 로딩 실패', code: 'MODEL_LOAD_FAILED' },
      { message: '메모리 부족으로 인한 처리 중단', code: 'OUT_OF_MEMORY' },
      { message: '네트워크 연결 불안정', code: 'NETWORK_UNSTABLE' },
      { message: '분석 모델 예외 발생', code: 'MODEL_EXCEPTION' },
    ];
    return errors[Math.floor(Math.random() * errors.length)];
  }

  async analyzeText(dto: AnalyzeRequestDto, response: Response) {
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    try {
      for (const message of sampleResponses) {
        // 각 단계마다 에러 발생 가능성 체크
        if (this.simulateRandomError()) {
          const error = this.getRandomError();
          this.logger.error(`Analysis error: ${error.message} (${error.code})`);

          response.write(`event: error\n`); // 이벤트 타입은 개행 문자 1개

          response.write(
            `event: error\ndata: ${JSON.stringify({
              error: error.message,
              code: error.code,
              timestamp: new Date().toISOString(),
            })}\n\n`,
          );
          response.end();
          return;
        }

        response.write(`event: delta\n`); // 이벤트 타입은 개행 문자 1개

        response.write(
          `data: ${JSON.stringify({
            message,
            timestamp: new Date().toISOString(),
          })}\n\n`,
        ); // 각 이벤트 블록이 두 개의 개행 문자(\n\n)로 끝나야 합니다.

        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 간격으로 메시지 전송
      }

      response.write('event: done\ndata: {}\n\n'); // 완료 이벤트 전송
    } catch (error) {
      this.logger.error('Unexpected error:', error);
      response.write(
        `event: error\ndata: ${JSON.stringify({
          error: '분석 중 예기치 않은 오류가 발생했습니다.',
          code: 'UNEXPECTED_ERROR',
          timestamp: new Date().toISOString(),
        })}\n\n`,
      );
    } finally {
      response.end();
    }
  }

  async analyzeTextOpenAi(dto: AnalyzeRequestDto, response: Response) {
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    try {
      for (const messageObj of openAiMessage) {
        // 각 단계마다 에러 발생 가능성 체크
        if (this.simulateRandomError()) {
          const error = this.getRandomError();
          this.logger.error(`Analysis error: ${error.message} (${error.code})`);

          response.write(`event: error\n`); // 이벤트 타입은 개행 문자 1개

          response.write(
            `event: error\ndata: ${JSON.stringify({
              error: error.message,
              code: error.code,
              timestamp: new Date().toISOString(),
            })}\n\n`,
          );
          response.end();
          return;
        }

        response.write(`event: ${messageObj.event}\n`); // 이벤트 타입은 개행 문자 1개

        response.write(`data: ${JSON.stringify(messageObj.data)}\n\n`); // 각 이벤트 블록이 두 개의 개행 문자(\n\n)로 끝나야 합니다.

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      response.write('event: done\ndata: {}\n\n'); // 완료 이벤트 전송
    } catch (error) {
      this.logger.error('Unexpected error:', error);
      response.write(
        `event: error\ndata: ${JSON.stringify({
          error: '분석 중 예기치 않은 오류가 발생했습니다.',
          code: 'UNEXPECTED_ERROR',
          timestamp: new Date().toISOString(),
        })}\n\n`,
      );
    } finally {
      response.end();
    }
  }
}
