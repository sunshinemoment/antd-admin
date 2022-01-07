import { useState, useEffect } from "react";
import { PaginationProps } from "antd/lib/pagination";
import QueryForm from "./coms/query-form";
import TablePage from "./coms/table-page";
import { RecordType } from "./types";

interface Query {
  current?: number;
  pageSize?: number;
  fieldA?: string | undefined;
  fieldB?: string | undefined;
}

interface Result {
  dataSource: RecordType[];
  pagination: PaginationProps;
}

const mockData = (query: Query) => {
  return new Promise<Result>((r) => {
    setTimeout(() => {
      const pageSize = query.pageSize || 10;
      const current = query.pageSize || 1;
      r({
        dataSource: [...new Array(pageSize || 10)].map((_, i) => {
          const key = pageSize * (current - 1) + i + 1 + "";
          return {
            key,
            name: "abcdefg"[Math.floor(Math.random() * 7)],
            age: i + 1,
            address: "address" + key,
            tags: ["loser"],
          };
        }),
        pagination: {
          current: query.current,
          pageSize: query.pageSize,
          total: 100,
        },
      });
    }, 500);
  });
};

const TableList = () => {
  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  function fetchData(params: Query) {
    setLoading(true);
    mockData(params)
      .then((data) => {
        setDataSource(data.dataSource);
        setPagination(data.pagination);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function search(params: Query) {
    fetchData({
      ...params,
      current: 1,
    });
  }

  useEffect(() => {
    fetchData({
      current: 1,
      pageSize: 10,
    });
  }, []);

  return (
    <div>
      <QueryForm onSubmit={search} onReset={search}></QueryForm>
      <br />
      <TablePage
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        onChange={fetchData}
      ></TablePage>
    </div>
  );
};

export default TableList;
