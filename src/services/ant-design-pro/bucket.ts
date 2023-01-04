// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取数据库列表 GET /api/bucket */
export async function bucketList(options?: {}) {
  return request<{
    data: API.Result;
  }>('/api/bucket', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 获取name数据库列表 GET /api/bucket/:name */
export async function bucketNameList(name: string, options?: {}) {
  return request<{
    data: API.Result;
  }>('/api/bucket/' + name, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增一条数据 POST /api/bucket/:name */
export async function addBucketName(name: string, body :{}, options?: {}) {
  return request<{
    data: API.Result;
  }>('/api/bucket/' + name, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


