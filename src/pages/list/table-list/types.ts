import { PaginationProps } from "antd/lib/pagination";

/**
 * 列表项
 */
export interface RecordType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

/**
 * 异步获取列表结果
 */
export interface Result {
  dataSource: RecordType[];
  pagination: PaginationProps;
}

/**
 * 查询参数
 */
export interface Query {
  current?: number;
  pageSize?: number;
  fieldA?: string | undefined;
  fieldB?: string | undefined;
}
