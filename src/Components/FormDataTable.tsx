import DataTables, { Config } from "datatables.net-dt";
import { useEffect, useRef } from "react";
import { Paper, Table, TableContainer } from "@mui/material";
import "datatables.net-dt/css/jquery.dataTables.css";

export function FormDataTable({ ...props }: Config) {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const dt = new DataTables(tableRef.current!, {
      ...props,
    });
    return () => {
      dt.destroy();
    };
  }, [props]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "none",
        border: "none",
        padding: "0px",
        margin: "0px",
      }}
    >
      <Table ref={tableRef} />
    </TableContainer>
  );
}

export default FormDataTable;
