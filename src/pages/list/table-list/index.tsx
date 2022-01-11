import { useState, useEffect, useRef } from "react";
import { PaginationProps } from "antd/lib/pagination";
import QueryForm from "./coms/query-form";
import TablePage from "./coms/table-page";
import EditForm, { EditFormHandle } from "./coms/edit-form";
import { RecordType, Query } from "./types";
import { generateData } from "./mock";

const TableList = () => {
  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dialogRef = useRef<EditFormHandle | null>(null);

  function fetchData(params: Query) {
    setLoading(true);
    generateData({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...params,
    })
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

  function edit(record: RecordType) {
    dialogRef.current?.open();
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
        onEdit={edit}
      ></TablePage>
      <EditForm ref={dialogRef}></EditForm>
    </div>
  );
};

export default TableList;
