import { PageContainer } from '@ant-design/pro-components';
import { bucketList } from '@/services/ant-design-pro/bucket';
import React , { useState } from 'react';
import { Select, Input } from 'antd';



function onSelect(setMessage) {
  return (key, option)=>{
    console.log(option)
    setMessage(option.label)
  }
  
}

const Welcome: React.FC = () => {

  const [message, setMessage] = useState("ni hao");
  const [options, setOptions] = useState([]);
  
  bucketList().then((data)=>{
    console.log(data)
    let array = data.data
    let list = []
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      list.push({value:index, label: `[桶]${element}`})
    }
    setOptions(list)
  })

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

