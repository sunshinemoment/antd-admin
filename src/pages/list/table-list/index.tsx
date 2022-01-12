import { useRef } from "react";
import QueryForm from "./coms/query-form";
import TablePage from "./coms/table-page";
import { TablePageHandle } from "./coms/table-page/types";
import EditForm, { EditFormHandle } from "./coms/edit-form";
import { RecordType, Query } from "./types";

const TableList = () => {
  const dialogRef = useRef<EditFormHandle | null>(null);
  const tablePageRef = useRef<TablePageHandle | null>(null);

  function search(params: Query) {
    tablePageRef.current?.search({
      ...params,
      current: 1,
    });
  }

  function edit(record: RecordType) {
    dialogRef.current?.open();
  }

  return (
    <div>
      <QueryForm onSubmit={search} onReset={search}></QueryForm>
      <br />
      <TablePage ref={tablePageRef} onEdit={edit}></TablePage>
      <EditForm ref={dialogRef}></EditForm>
    </div>
  );
};

export default TableList;
