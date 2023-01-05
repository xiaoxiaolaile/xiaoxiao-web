import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React from 'react';
import Editor from '@monaco-editor/react';
import moment from 'moment';
import { useParams } from 'umi';
import { Button } from 'antd';


const Welcome: React.FC = () => {

  const _defaultValue = `/**
  * @title 无名脚本
  * @create_at ${moment().format('YYYY-MM-DD HH:mm:ss')}
  * @description 🐒这个人很懒什么都没有留下。
  * @author 佚名
  * @version v1.0.0
  */`;

  console.log(useParams())

  return (
    <PageContainer>
      <div>
        <Button type="primary" style={{ float: "right", margin: 10 }} >保存</Button>
      </div>

      <Editor height="90vh" defaultLanguage="javascript" defaultValue={_defaultValue} />
    </PageContainer>
  );
};

export default Welcome;
