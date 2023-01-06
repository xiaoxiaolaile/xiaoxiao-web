import React from 'react';

import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
// 引入定制的样式
import './chatui-theme.css';

const IM = () => {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function getChatMessage(str: string) {
    let reg = /\[CQ:image.*\]/ig
    let num = str.search(reg)
    if (num != -1) {
        var arr = str.match(reg);
        let d = str.replace(reg, "")
        return [arr, d]
    }

    return [null, str]

}

function sendImage(array: []) {
    if (array){
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let reg = /\[CQ:image,file=(.*)\]/
            var arr = element.match(reg)
            
            if (arr && arr.length > 1){
                console.log(arr[1])
                appendMsg( {
                  type: 'image',
                  content: {
                    picUrl: arr[1],
                  },
                })
            }else {
                // console.log(element)
                appendMsg({
                  type: 'text',
                  content: { text: element },
                })
            }
        }
    }

}

  const ws = new WebSocket('ws://localhost:8080/api/ws');

  ws.onopen = function (e) {
    // console.log('连接上 ws 服务端了');
  }
  ws.onmessage = function(msg) { 
      // console.log('接收服务端发过来的消息: %o', msg); 
      let str = msg.data

      //如果包含图片，需要提取图片做处理
      const [array, message] = getChatMessage(str)
      sendImage(array)
      // console.log(message)

      appendMsg({
        type: 'text',
        content: { text: message },
      })
      
  }
  ws.onclose = function (e) {
      // console.log('ws 连接关闭了');
  }


  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });
      ws.send(val)
      setTyping(true);

      // setTimeout(() => {
      //   appendMsg({
      //     type: 'text',
      //     content: { text: 'Bala bala' },
      //   });
      // }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: '小小助理' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
};

export default IM;
