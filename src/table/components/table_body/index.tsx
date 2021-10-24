import { defineComponent } from "@vue/composition-api";
import { TableHeaderConfig, tableBodyConfigProp } from "../../types";

export default defineComponent({
  name: "TableBody",
  props: tableBodyConfigProp,
  components: {},
  setup(props) {
    return {
      headerColumns: props.columns || [],
    };
  },

  render() {
    const { columns, rowList } = this as any;
    return <tbody>{renderBody(rowList, columns)}</tbody>;
  },
});

const renderBody = (
  rowList: (Record<string, any> | unknown)[],
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

  return newRowList;
};
