import { TableProps } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";

/**
 * 查询参数
 */
export interface Query {
  current?: number;
  pageSize?: number;
  [key: string]: any;
}

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
  /**
   * 数据列表
   */
  dataSource: RecordType[];
  /**
   * 分页数据
   */
  pagination: PaginationProps;
}

export interface TablePageState {
  loading: boolean;
  dataSource: RecordType[];
  pagination: PaginationProps;
  error: { message: string } | null;
}

export interface TablePageProps<T> extends TableProps<T> {
  onEdit?: (record: RecordType) => void;
  onDelete?: (record: RecordType) => void;
}

export interface TablePageHandle {
  search(params: Query): void;
}

export type ReducerAction =
  | {
      type: "loading";
    }
  | {
      type: "reslove";
      payload: {
        dataSource: RecordType[];
        pagination: PaginationProps;
      };
    }
  | {
      type: "reject";
      payload: { message: string };
    }
  | {
      type: "finish";
    };
