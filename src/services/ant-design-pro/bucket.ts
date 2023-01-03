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


