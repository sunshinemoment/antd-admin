// import { useEffect } from "react";
import { Card, Table, Tag, Space } from "antd";
import { TableProps } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";
import { RecordType } from "../../types";

interface TablePageProps<T> extends TableProps<T> {
  onChange?: (pagination: PaginationProps) => void;
}

const TablePage = (props: TablePageProps<RecordType>) => {
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
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //   props.onChange?.(pagination);
  // }, [pagination]);

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
