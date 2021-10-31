import { defineComponent } from "@vue/composition-api";
import { VNode } from "vue";
import { TableHeaderConfig, tableBodyConfigProp } from "../../types";
import Logger from "js-logger";
Logger.useDefaults();

export default defineComponent({
  name: "TableBody",
  props: tableBodyConfigProp,
  components: {},
  setup(props) {
    const renderBody = (
      rowList: (Record<string, any> | unknown | VNode)[],
      columns: TableHeaderConfig[]
    ) => {
      function renderTd(
        row: Record<string, any>,
        columns: TableHeaderConfig[]
      ) {
        Logger.info("渲染表格行，当前", row);
        let newTDS = columns.map((col) => {
          return <td>{row[col.key]}</td>;
        });

        return newTDS;
      }

      let newRowList = rowList.map((row: any) => {
        return <tr>{renderTd(row, columns)}</tr>;
      });

      return newRowList;
    };

    return {
      renderBody,
    };
  },

  render() {
    const { columns, rowList } = this as any;
    return <tbody>{this.renderBody(rowList, columns)}</tbody>;
  },
});
