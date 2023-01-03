import { EditableProTable, PageContainer } from '@ant-design/pro-components';
import { bucketList } from '@/services/ant-design-pro/bucket';
import React, { useState } from 'react';
import { Select, Input } from 'antd';


type DataSourceType = {
  id: React.Key;
  name: string;
  key?: string;
  value?: string;

};


function onSelect(setName) {
  return (key, option) => {
    console.log(option)
    setName(option.label.replace("[桶]",""))
  }

}

const Welcome: React.FC = () => {

  const [options, setOptions] = useState([]);
  const [name, setName] = useState("");
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');

  bucketList().then((data) => {
    console.log(data)
    let array = data.data
    let list = []
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      list.push({ value: index, name: element, label: `[桶]${element}` })
    }
    if (options.length === 0) {
      setOptions(list)
    }

  })

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '存储桶',
      dataIndex: 'name',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '15%',
    },
    {
      title: '键名',
      width: '15%',
      dataIndex: 'key',
    },
    {
      title: '值',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

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
          onSelect(setName)
        }
        options={options}
      />

      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0), name: name }),
              }
            : false
        }
        loading={false}

        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </PageContainer>
  )
}

export default Welcome;

