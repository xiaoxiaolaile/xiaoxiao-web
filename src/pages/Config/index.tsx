import { PageContainer } from '@ant-design/pro-components';
import React , { useState } from 'react';
import { Select, Input } from 'antd';

const options = [
  {
    value: '1',
    label: 'Not Identified',
  },
  {
    value: '2',
    label: 'Closed',
  },
  {
    value: '3',
    label: 'Communicated',
  },
  {
    value: '4',
    label: 'Identified',
  },
  {
    value: '5',
    label: 'Resolved',
  },
  {
    value: '6',
    label: 'Cancelled',
  },
];


function onSelect(setMessage) {
  return (key, option)=>{
    console.log(option)
    setMessage(option.label)
  }
  
}

const Welcome: React.FC = () => {

  const [message, setMessage] = useState("ni hao");

  return (
    <PageContainer>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="选择数据存储"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        onSelect={
          onSelect(setMessage)
        }
        options={options}
      />
      <div>
        <Input placeholder="Basic usage" value={message} style={{ width: 200 }} />
      </div>

    </PageContainer>
  )
}

export default Welcome;

