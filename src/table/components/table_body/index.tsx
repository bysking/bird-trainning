import { defineComponent } from "@vue/composition-api";
import { TableHeaderConfig, tableBodyConfigProp } from "../../types";

export default defineComponent({
  name: "TableBody",
  props: tableBodyConfigProp,
  components: {},
  setup(props) {
    return {
      headerColumns: props.columns || [],
      rows: props.rowList || [],
    };
  },

  render() {
    const { headerColumns, rows } = this as any;
    return renderBody(rows, headerColumns);
  },
});

const renderBody = (
  rowList: Record<string, any>[],
  columns: TableHeaderConfig[]
) => {
  function renderTd(row: Record<string, any>, columns: TableHeaderConfig[]) {
    let newTDS = columns.map((col) => {
      return <td>{row[col.key]}</td>;
    });

    return newTDS;
  }

  let newRowList = rowList.map((row: Record<string, any>) => {
    return <tr>{renderTd(row, columns)}</tr>;
  });

  return <tbody>{newRowList}</tbody>;
};
