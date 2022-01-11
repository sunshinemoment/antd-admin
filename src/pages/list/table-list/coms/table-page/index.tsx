import { useReducer } from "react";
import { Card, Table, Tag, Space, Popconfirm } from "antd";
import { TableProps } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";
import { RecordType, Query } from "../../types";
import { generateData } from "../../mock";

// interface TablePageState {
//   loading: boolean;
//   dataSource: RecordType[];
//   pagination: PaginationProps;
// }

interface TablePageProps<T> extends TableProps<T> {
  onChange?: (pagination: PaginationProps) => void;
  onEdit?: (record: RecordType) => void;
  onDelete?: (record: RecordType) => void;
}

// type ReducerAction =
//   | {
//       type: "loading";
//     }
//   | {
//       type: "reslove";
//     }
//   | {
//       type: "reject";
//     };

// const initialState: TablePageState = {
//   loading: false,
//   dataSource: [],
//   pagination: {
//     current: 1,
//     pageSize: 10,
//     total: 0,
//   },
// };

// function reducer(state: TablePageState, action: ReducerAction): TablePageState {
//   switch (action.type) {
//     case "loading":
//       return {
//         ...state,
//         loading: true,
//       };
//     case "reslove":
//       return {
//         ...state,
//         dataSource: state.dataSource,
//         pagination: state.pagination,
//       };
//     case "reject":
//       return {
//         ...state,
//         ...initialState,
//       };
//     default:
//       return initialState;
//   }
// }

const TablePage = (props: TablePageProps<RecordType>) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

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

  // function fetchData(params: Query) {
  //   generateData({
  //     current: params.current,
  //     pageSize: pagination.pageSize,
  //     ...params,
  //   })
  //     .then((data) => {
  //       setDataSource(data.dataSource);
  //       setPagination(data.pagination);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  const onChange = (pagination) => {
    props.onChange?.(pagination);
  };
  return (
    <Card bordered={false}>
      <Table
        loading={props.loading}
        columns={columns}
        dataSource={props.dataSource}
        onChange={onChange}
        pagination={props.pagination}
      />
    </Card>
  );
};

export default TablePage;
