import {
  useState,
  useReducer,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Card, Table, Tag, Space, Popconfirm } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import { RecordType, Query } from "../../types";
import { generateData } from "../../mock";
import { TablePageProps, TablePageHandle } from "./types";
import { initialState, reducer } from "./config";

const TablePage = forwardRef<TablePageHandle, TablePageProps<RecordType>>(
  (props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [query, setQuery] = useState({});

    useImperativeHandle(ref, () => ({
      search,
    }));

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => props.onEdit?.(record)}>Edit</a>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => props.onDelete?.(record)}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    function search(params: Query) {
      const { current, pageSize, ...query } = params;
      fetchData(params);
      setQuery(query);
    }

    function fetchData(params: Query) {
      generateData({
        current: state.pagination.current,
        pageSize: state.pagination.pageSize,
        ...query,
        ...params,
      })
        .then((payload) => {
          dispatch({
            type: "reslove",
            payload,
          });
        })
        .catch((payload) => {
          dispatch({
            type: "reject",
            payload,
          });
        })
        .finally(() => {
          dispatch({
            type: "finish",
          });
        });
    }

    useEffect(() => {
      fetchData({
        current: 1,
        pageSize: 10,
      });
    }, []);

    const onChange = ({ current, pageSize }: PaginationProps) => {
      fetchData({ current, pageSize });
    };
    return (
      <Card bordered={false}>
        <Table
          loading={state.loading}
          columns={columns}
          dataSource={state.dataSource}
          onChange={onChange}
          pagination={state.pagination}
        />
      </Card>
    );
  }
);

export default TablePage;
