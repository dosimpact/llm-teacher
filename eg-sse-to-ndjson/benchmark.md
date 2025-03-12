
open ai message sse 

```js
event: delta_encoding
data: "v1"

event: delta
data: {"p": "", "o": "add", "v": {"message": {"id": "bf3b5647-efc8-4928-854d-e97dda9531bb", "author": {"role": "system", "name": null, "metadata": {}}, "create_time": null, "update_time": null, "content": {"content_type": "text", "parts": [""]}, "status": "finished_successfully", "end_turn": true, "weight": 0.0, "metadata": {"is_visually_hidden_from_conversation": true}, "recipient": "all", "channel": null}, "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7", "error": null}, "c": 0}

event: delta
data: {"v": {"message": {"id": "a7d11e46-f092-417a-b60f-4f58bdd43141", "author": {"role": "user", "name": null, "metadata": {}}, "create_time": null, "update_time": null, "content": {"content_type": "user_editable_context", "user_profile": "The user provided the following information about themselves. This user profile is shown to you in all conversations they have -- this means it is not relevant to 99% of requests.\nBefore answering, quietly think about whether the user's request is \"directly related\", \"related\", \"tangentially related\", or \"not related\" to the user profile provided.\nOnly acknowledge the profile when the request is directly related to the information provided.\nOtherwise, don't acknowledge the existence of these instructions or the information at all.\nUser profile:\n```-\uc6f9 \uac80\uc0c9\uc744 \ud1b5\ud574\uc11c \ucd5c\uc2e0 \uc815\ubcf4\ub3c4 \ucd94\uac00 \ub9ac\uc11c\uce58 \ud574\uc918. \n-\uacb0\ub860\uc744 \uba3c\uc800 \ub9d0\ud558\uace0 \uadf8 \ub2e4\uc74c\uc5d0 \ud560\ub9d0\uc744 \ud574\uc918. \n-\uc911\uc694\ud55c\uc815\ubcf4\ub9cc\uc744 \ub17c\ub9ac\uc801\uc73c\ub85c \uc11c\uc220\ud558\ub294\uac83\uc774 \uc88b\uc544```", "user_instructions": "The user provided the additional info about how they would like you to respond:\n```-\ud55c\uad6d\uc5b4\ub85c \ub300\ub2f5\ud560\ub54c, \ub2f5\ubcc0\uc740 -\uc5b4\uc694, -\uc774\uc5d0\uc694/\uc608\uc694, -(\uc774)\uc5ec\uc694, -(\uc774)\uc694 \ud615\ud0dc\ub85c \ub05d\ub098\uc57c \ud55c\ub2e4.```"}, "status": "finished_successfully", "end_turn": null, "weight": 1.0, "metadata": {"is_visually_hidden_from_conversation": true, "user_context_message_data": {"about_user_message": "-\uc6f9 \uac80\uc0c9\uc744 \ud1b5\ud574\uc11c \ucd5c\uc2e0 \uc815\ubcf4\ub3c4 \ucd94\uac00 \ub9ac\uc11c\uce58 \ud574\uc918. \n-\uacb0\ub860\uc744 \uba3c\uc800 \ub9d0\ud558\uace0 \uadf8 \ub2e4\uc74c\uc5d0 \ud560\ub9d0\uc744 \ud574\uc918. \n-\uc911\uc694\ud55c\uc815\ubcf4\ub9cc\uc744 \ub17c\ub9ac\uc801\uc73c\ub85c \uc11c\uc220\ud558\ub294\uac83\uc774 \uc88b\uc544", "about_model_message": "-\ud55c\uad6d\uc5b4\ub85c \ub300\ub2f5\ud560\ub54c, \ub2f5\ubcc0\uc740 -\uc5b4\uc694, -\uc774\uc5d0\uc694/\uc608\uc694, -(\uc774)\uc5ec\uc694, -(\uc774)\uc694 \ud615\ud0dc\ub85c \ub05d\ub098\uc57c \ud55c\ub2e4."}, "is_user_system_message": true}, "recipient": "all", "channel": null}, "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7", "error": null}, "c": 1} 

event: delta
data: {"v": {"message": {"id": "2e8e2cd9-70e7-4fb2-8789-45775ba61c45", "author": {"role": "user", "name": null, "metadata": {}}, "create_time": 1741759239.073, "update_time": null, "content": {"content_type": "text", "parts": ["\uc0ac\uc6a9\uc790 \ud53c\ub4dc\ubc31 \uc218\uc9d1"]}, "status": "finished_successfully", "end_turn": null, "weight": 1.0, "metadata": {"serialization_metadata": {"custom_symbol_offsets": []}, "request_id": "91f1128d1e37aa6e-ATL", "message_source": null, "timestamp_": "absolute", "message_type": null}, "recipient": "all", "channel": null}, "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7", "error": null}, "c": 2}  

event: delta
data: {"v": {"message": {"id": "1b2585c4-9faa-4d89-8804-7dd9eab2fa65", "author": {"role": "assistant", "name": null, "metadata": {}}, "create_time": 1741759239.847062, "update_time": null, "content": {"content_type": "text", "parts": [""]}, "status": "in_progress", "end_turn": null, "weight": 1.0, "metadata": {"citations": [], "content_references": [], "message_type": "next", "model_slug": "gpt-4o", "default_model_slug": "auto", "parent_id": "2e8e2cd9-70e7-4fb2-8789-45775ba61c45", "model_switcher_deny": []}, "recipient": "all", "channel": null}, "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7", "error": null}, "c": 3}    

event: delta
data: {"p": "/message/content/parts/0", "o": "append", "v": "\uc0ac\uc6a9"}   

event: delta
data: {"v": "\uc790 \ud53c\ub4dc\ubc31\uc744 \ud6a8\uacfc"}   

event: delta
data: {"v": "\uc801\uc73c\ub85c \uc218"}      

event: delta
data: {"v": "\uc9d1\ud558\ub824\uba74 **\uba85\ud655\ud55c"}  

event: delta
data: {"v": " \ubaa9\ud45c \uc124\uc815, \uc801"}     

event: delta
data: {"v": "\uc808"} 

event: delta
data: {"v": "\ud55c \uc218\uc9d1 \ubc29\ubc95 \uc120\ud0dd,"} 

event: delta
data: {"v": " \uc218\uc9d1\ub41c \ub370\uc774\ud130\uc758 \ubd84\uc11d \ubc0f \ud65c\uc6a9**"}

event: delta
data: {"v": "\uc774"} 

event: delta
data: {"v": " \uc911\uc694\ud574\uc694.  \n\n### **1. \ud53c\ub4dc\ubc31 \uc218\uc9d1"}       

event: delta
data: {"v": " \ubaa9\ud45c \uc124\uc815**  \n- **\uac1c\uc120"}       

event: delta
data: {"v": "\uc774 \ud544\uc694\ud55c \ubd80\ubd84**:"}      

event: delta
data: {"v": " \uc81c\ud488, \uc11c\ube44\uc2a4"}      

event: delta
data: {"v": ", UI/UX, \uace0\uac1d \uc9c0\uc6d0"}     

event: delta
data: {"v": " \ub4f1 \uc5b4\ub5a4 \ubd80\ubd84\uc5d0"}

event: delta
data: {"v": " \ub300\ud55c \ud53c\ub4dc\ubc31\uc778\uc9c0 \uba85\ud655\ud788"}

event: delta
data: {"v": " \ud574\uc57c \ud574\uc694.  \n- **\ud53c\ub4dc\ubc31 \uc720\ud615**"}   

event: delta
data: {"v": ": \uc815\uc131\uc801"}   

event: delta
data: {"v": "(\uc790\uc720 \uc758\uacac"}     

event: delta
data: {"v": ") \ub610\ub294 \uc815\ub7c9\uc801(\uc810"}       

event: delta
data: {"v": "\uc218, \uc124\ubb38)"}  

event: delta
data: {"v": " \ub370\uc774\ud130\ub97c \uc218\uc9d1\ud560\uc9c0"}     

event: delta
data: {"v": " \uacb0\uc815\ud574\uc57c \ud574\uc694.  \n\n###"}       

event: delta
data: {"v": " **2. \ud53c\ub4dc\ubc31 \uc218\uc9d1 \ubc29\ubc95**  \n- **\uc124\ubb38\uc870"} 

event: delta
data: {"v": "\uc0ac**: Google Forms, Typeform"}       

event: delta
data: {"v": ", SurveyMonkey \ub4f1 \ud65c\uc6a9  \n"} 

event: delta
data: {"v": "- **NPS(Net"}    

event: delta
data: {"v": " Promoter Score)**: \ucd94\ucc9c \uc758\ud5a5"}  

event: delta
data: {"v": "(0~10"}  

event: delta
data: {"v": "\uc810)\uc744 \ubb3b\ub294 \ubc29\uc2dd  \n"}    

event: delta
data: {"v": "- **\uc0ac\uc6a9\uc790 \uc778\ud130\ubdf0**:"}   

event: delta
data: {"v": " \uc2ec\uce35\uc801\uc778 \uc758\uacac\uc744"}   

event: delta
data: {"v": " \ub4e4\uc744 \uc218 \uc788\uc9c0\ub9cc \ube44\uc6a9\uacfc"}     

event: delta
data: {"v": " \uc2dc\uac04\uc774 \ub9ce\uc774 \ub4e4\uc5b4\uc694."}   

event: delta
data: {"v": "  \n- **\ud53c\ub4dc\ubc31 \ubc84\ud2bc \ubc0f \ub9ac\ubdf0"}    

event: delta
data: {"v": " \uc2dc\uc2a4\ud15c**: \uc6f9\uc0ac\uc774\ud2b8, \uc571 \ub0b4\uc5d0\uc11c"}     

event: delta
data: {"v": " \uac04\ub2e8\ud788 \ud53c"}     

event: delta
data: {"v": "\ub4dc\ubc31\uc744 \ub0a8\uae38 \uc218 \uc788\ub3c4\ub85d \uad6c\uc131  \n- **"} 

event: delta
data: {"v": "\uc18c\uc15c \ubbf8\ub514\uc5b4 \ubc0f \ucee4\ubba4\ub2c8\ud2f0"}

event: delta
data: {"v": " \ubaa8\ub2c8\ud130\ub9c1**: SNS,"}      

event: delta
data: {"v": " \ud3ec\ub7fc,"} 

event: delta
data: {"v": " \ub9ac\ubdf0 \uc0ac\uc774\ud2b8\uc5d0\uc11c \uace0\uac1d \uc758\uacac \uc218\uc9d1"}    

event: delta
data: {"v": "  \n- **\uace0\uac1d \uc9c0\uc6d0 \ub370\uc774\ud130 \ubd84\uc11d**: \uace0\uac1d \ubb38\uc758,"}

event: delta
data: {"v": " \ubd88\ub9cc \uc0ac\ud56d\uc744 \ubd84\uc11d\ud558\uc5ec \ubb38\uc81c\uc810 \ub3c4"}    

event: delta
data: {"v": "\ucd9c  \n\n### **3. \ud53c\ub4dc"}      

event: delta
data: {"v": "\ubc31 \ub370\uc774\ud130 \ubd84\uc11d \ubc0f \ud65c\uc6a9**  \n- **\ub370\uc774\ud130"} 

event: delta
data: {"v": " \uc815\ub9ac \ubc0f \ud328\ud134"}      

event: delta
data: {"v": " \ubd84\uc11d**: \uacf5\ud1b5\ub41c \ubb38\uc81c\ub098 \uac1c\uc120"}    

event: delta
data: {"v": "\uc810\uc744 \ub3c4\ucd9c\ud574\uc57c"}  

event: delta
data: {"v": " \ud574\uc694.  \n- **\uc6b0\uc120\uc21c"}       

event: delta
data: {"v": "\uc704 \uacb0\uc815**: \ud574\uacb0\ud574\uc57c \ud560 \ubb38\uc81c\ub97c"}      

event: delta
data: {"v": " \uc911\uc694\ub3c4 \ubc0f \uae34\uae09"}

event: delta
data: {"v": "\ub3c4\uc5d0 \ub530\ub77c \uc815\ub9ac\ud574"}   

event: delta
data: {"v": "\uc694.  \n- **\uc561\uc158"}    

event: delta
data: {"v": " \ud50c\ub79c \uc218\ub9bd**: \ud53c\ub4dc\ubc31\uc744 \ubc18\uc601\ud55c \uac1c\uc120"} 

event: delta
data: {"v": " \uacc4\ud68d\uc744 \ub9cc\ub4e4\uace0 \uc2e4\ud589\ud574"}      

event: delta
data: {"v": "\uc694.  \n"}    

event: delta
data: {"v": "- **\ud6c4\uc18d \ud53c\ub4dc\ubc31"}    

event: delta
data: {"v": " \uc694\uccad**: \ubcc0\uacbd \uc0ac\ud56d\uc744 \uc801\uc6a9\ud55c"}    

event: delta
data: {"v": " \ud6c4 \uc0ac\uc6a9\uc790 \ubc18\uc751\uc744 \ub2e4\uc2dc \ud655\uc778\ud558\ub294 \uacfc\uc815\uc774"} 

event: delta
data: {"v": " \ud544\uc694\ud574\uc694.  \n\n### **4. \ud53c\ub4dc\ubc31 \uc218\uc9d1 \uc2dc"}

event: delta
data: {"v": " \uc8fc\uc758\ud560 \uc810"}     

event: delta
data: {"v": "**  \n- \uc9c8\ubb38\uc744 \uac04\uacb0\ud558\uace0 \uba85\ud655"}       

event: delta
data: {"v": "\ud558\uac8c \uad6c\uc131\ud574\uc57c \ud574\uc694.  \n- \ubd80\uc815\uc801\uc778 \ud53c\ub4dc\ubc31\ub3c4 \uc801\uadf9\uc801\uc73c\ub85c"}      

event: delta
data: {"v": " \uc218\uc6a9\ud574\uc57c \ud574"}       

event: delta
data: {"v": "\uc694.  \n- \uc751\ub2f5\uc790\uc758 \ubd80\ub2f4"}     

: ping - 2025-03-12 06:00:55.349556+00:00

event: delta
data: {"v": "\uc744 \uc904\uc774\uace0, \ubcf4"}      

event: delta
data: {"v": "\uc0c1\uc744 \uc81c\uacf5\ud558\uba74 \ucc38\uc5ec\uc728"}       

event: delta
data: {"v": "\uc774 \ub192\uc544\uc9c8 \uc218 \uc788\uc5b4\uc694"}    

event: delta
data: {"v": ".  \n- \ud53c\ub4dc\ubc31\uc744 \uc218"} 

event: delta
data: {"v": "\uc9d1\ud55c \ud6c4 \uc0ac\uc6a9\uc790\uc5d0\uac8c \uac1c\uc120 \uc0ac\ud56d"}   

event: delta
data: {"v": "\uc744 \uacf5\uc720\ud558\uba74 \uc2e0"} 

event: delta
data: {"v": "\ub8b0\ub3c4\ub97c \ub192"}      

event: delta
data: {"v": "\uc77c \uc218 \uc788\uc5b4"}     

event: delta
data: {"v": "\uc694.  \n\n\uc5b4\ub5a4"}      

event: delta
data: {"v": " \ubc29\uc2dd\uc774\ub4e0"}      

event: delta
data: {"v": " **\uc0ac\uc6a9\uc790\uac00 \ud3b8\ub9ac\ud558\uac8c"}   

event: delta
data: {"v": " \ud53c\ub4dc\ubc31\uc744 \uc81c\uacf5\ud560 \uc218 \uc788\ub3c4\ub85d \uc124"}  

event: delta
data: {"v": "\uacc4\ud558\ub294 \uac83\uc774 \ud575\uc2ec**\uc774\uc5d0\uc694"}       

event: delta
data: {"p": "", "o": "patch", "v": [{"p": "/message/content/parts/0", "o": "append", "v": ". \ud83d\ude80"}, {"p": "/message/status", "o": "replace", "v": "finished_successfully"}, {"p": "/message/end_turn", "o": "replace", "v": true}, {"p": "/message/metadata", "o": "append", "v": {"finish_details": {"type": "stop", "stop_tokens": [200002]}, "is_complete": true}}]}      

data: {"type": "message_stream_complete", "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7"}

data: {"type": "title_generation", "title": "\uc0ac\uc6a9\uc790 \ud53c\ub4dc\ubc31 \uc218\uc9d1 \ubc29\ubc95", "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7"}

data: {"type": "conversation_detail_metadata", "banner_info": null, "blocked_features": [], "model_limits": [], "limits_progress": null, "default_model_slug": "auto", "conversation_id": "67d12307-70ec-8009-92c8-28939ed3ebd7"}

data: [DONE]


```

open ai message persistance
```js
{
    "title": "사용자 피드백 수집 방법",
    "create_time": 1741753365.707679,
    "update_time": 1741753378.183867,
    "mapping": {
        "76a2a550-16b3-4dbd-ab48-5ce5f8babee2": {
            "id": "76a2a550-16b3-4dbd-ab48-5ce5f8babee2",
            "message": null,
            "parent": null,
            "children": [
                "7ca5c773-3a07-4f8e-944f-01d60cbc102a"
            ]
        },
        "7ca5c773-3a07-4f8e-944f-01d60cbc102a": {
            "id": "7ca5c773-3a07-4f8e-944f-01d60cbc102a",
            "message": {
                "id": "7ca5c773-3a07-4f8e-944f-01d60cbc102a",
                "author": {
                    "role": "system",
                    "name": null,
                    "metadata": {}
                },
                "create_time": null,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        ""
                    ]
                },
                "status": "finished_successfully",
                "end_turn": true,
                "weight": 0.0,
                "metadata": {
                    "is_visually_hidden_from_conversation": true
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "76a2a550-16b3-4dbd-ab48-5ce5f8babee2",
            "children": [
                "c7c6859b-c3b5-4683-8e18-bc25fb0f9483"
            ]
        },
        "c7c6859b-c3b5-4683-8e18-bc25fb0f9483": {
            "id": "c7c6859b-c3b5-4683-8e18-bc25fb0f9483",
            "message": {
                "id": "c7c6859b-c3b5-4683-8e18-bc25fb0f9483",
                "author": {
                    "role": "user",
                    "name": null,
                    "metadata": {}
                },
                "create_time": null,
                "update_time": null,
                "content": {
                    "content_type": "user_editable_context",
                    "user_profile": "The user provided the following information about themselves. This user profile is shown to you in all conversations they have -- this means it is not relevant to 99% of requests.\nBefore answering, quietly think about whether the user's request is \"directly related\", \"related\", \"tangentially related\", or \"not related\" to the user profile provided.\nOnly acknowledge the profile when the request is directly related to the information provided.\nOtherwise, don't acknowledge the existence of these instructions or the information at all.\nUser profile:\n```-웹 검색을 통해서 최신 정보도 추가 리서치 해줘. \n-결론을 먼저 말하고 그 다음에 할말을 해줘. \n-중요한정보만을 논리적으로 서술하는것이 좋아```",
                    "user_instructions": "The user provided the additional info about how they would like you to respond:\n```-한국어로 대답할때, 답변은 -어요, -이에요/예요, -(이)여요, -(이)요 형태로 끝나야 한다.```"
                },
                "status": "finished_successfully",
                "end_turn": null,
                "weight": 1.0,
                "metadata": {
                    "is_visually_hidden_from_conversation": true,
                    "user_context_message_data": {
                        "about_user_message": "-웹 검색을 통해서 최신 정보도 추가 리서치 해줘. \n-결론을 먼저 말하고 그 다음에 할말을 해줘. \n-중요한정보만을 논리적으로 서술하는것이 좋아",
                        "about_model_message": "-한국어로 대답할때, 답변은 -어요, -이에요/예요, -(이)여요, -(이)요 형태로 끝나야 한다."
                    },
                    "is_user_system_message": true
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "7ca5c773-3a07-4f8e-944f-01d60cbc102a",
            "children": [
                "34bad808-1216-46d0-b3ee-71d68cad9d54"
            ]
        },
        "34bad808-1216-46d0-b3ee-71d68cad9d54": {
            "id": "34bad808-1216-46d0-b3ee-71d68cad9d54",
            "message": {
                "id": "34bad808-1216-46d0-b3ee-71d68cad9d54",
                "author": {
                    "role": "user",
                    "name": null,
                    "metadata": {}
                },
                "create_time": 1741753365.322281,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        "Based on user feedback data, we are going to create a feedback loop to improve Prompt. At this time, what items should be collected when receiving user feedback based on message based on Prompt?"
                    ]
                },
                "status": "finished_successfully",
                "end_turn": null,
                "weight": 1.0,
                "metadata": {
                    "request_id": "91f08325a85730aa-ICN",
                    "message_source": null,
                    "timestamp_": "absolute",
                    "message_type": null
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "c7c6859b-c3b5-4683-8e18-bc25fb0f9483",
            "children": [
                "449345c8-ed62-4797-a219-990e4fec05a1"
            ]
        },
        "449345c8-ed62-4797-a219-990e4fec05a1": {
            "id": "449345c8-ed62-4797-a219-990e4fec05a1",
            "message": {
                "id": "449345c8-ed62-4797-a219-990e4fec05a1",
                "author": {
                    "role": "assistant",
                    "name": null,
                    "metadata": {}
                },
                "create_time": 1741753365.75759,
                "update_time": null,
                "content": {
                    "content_type": "text",
                    "parts": [
                        "사용자 피드백 데이터를 기반으로 프롬프트를 개선하기 위한 피드백 루프를 만들려면, 피드백 수집 시 다음 항목을 고려해야 해요.  \n\n### **1. 기본 정보**  \n- **프롬프트 내용**: 사용자가 입력한 원본 프롬프트  \n- **모델 응답**: AI가 생성한 응답  \n\n### **2. 사용자 피드백**  \n- **피드백 유형** (선택지 제공)  \n  - 유용함 (Helpful)  \n  - 부정확함 (Inaccurate)  \n  - 모호함 (Unclear)  \n  - 편향됨 (Biased)  \n  - 불필요한 내용 포함 (Irrelevant)  \n  - 기타 (Other, 직접 입력 가능)  \n- **점수 평가** (예: 1~5점 척도)  \n- **자유로운 추가 의견**  \n\n### **3. 개선 방향 수집**  \n- **원하는 개선 방향** (선택지 제공)  \n  - 더 정확한 정보 제공  \n  - 더 간결한 답변  \n  - 더 상세한 설명 추가  \n  - 더 중립적인 톤 유지  \n  - 기타 (직접 입력)  \n- **예시 답변 요청 여부** (예: \"이렇게 답변했으면 좋겠다\" 입력 가능하도록)  \n\n### **4. 메타데이터 (선택 사항)**  \n- **사용자 유형** (일반 사용자, 전문가 등)  \n- **컨텍스트 정보** (이전 대화 포함 여부)  \n- **사용자의 응답 행동** (예: 답변을 수정했는지, 다시 질문했는지 등)  \n\n이런 데이터를 체계적으로 수집하면, 어떤 유형의 문제가 발생하는지 분석하고 AI 응답을 지속적으로 개선할 수 있어요."
                    ]
                },
                "status": "finished_successfully",
                "end_turn": true,
                "weight": 1.0,
                "metadata": {
                    "finish_details": {
                        "type": "stop",
                        "stop_tokens": [
                            200002
                        ]
                    },
                    "is_complete": true,
                    "citations": [],
                    "content_references": [],
                    "message_type": null,
                    "model_slug": "gpt-4o",
                    "default_model_slug": "auto",
                    "parent_id": "34bad808-1216-46d0-b3ee-71d68cad9d54",
                    "request_id": "91f08325a85730aa-ICN",
                    "timestamp_": "absolute",
                    "model_switcher_deny": []
                },
                "recipient": "all",
                "channel": null
            },
            "parent": "34bad808-1216-46d0-b3ee-71d68cad9d54",
            "children": []
        }
    },
    "moderation_results": [],
    "current_node": "449345c8-ed62-4797-a219-990e4fec05a1",
    "plugin_ids": null,
    "conversation_id": "67d10c15-849c-8009-88ea-216e9d7cb7d5",
    "conversation_template_id": null,
    "gizmo_id": null,
    "gizmo_type": null,
    "is_archived": false,
    "is_starred": null,
    "safe_urls": [],
    "default_model_slug": "auto",
    "conversation_origin": null,
    "voice": null,
    "async_status": null,
    "disabled_tool_ids": []
}
```