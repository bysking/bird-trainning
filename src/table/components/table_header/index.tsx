import { defineComponent } from "@vue/composition-api";
import { TableHeaderConfig, tableHeaderConfigProp } from "../../types";
import TableSort from "../sort/TableSort";
import "./style.less";

export default defineComponent({
  name: "TableHeader",
  props: tableHeaderConfigProp,
  components: {
    TableSort,
  },
  setup(props, { emit }) {
    const sortFn = (key: string, type: string) => {
      // cpx:todo 补充类型
      emit("tableSort", key, type);
    };
    return {
      headerColumns: props.columns || [],
      sortFn,
    };
  },

  render() {
    const { headerColumns, sortFn } = this;
    return renderHead(headerColumns as any, sortFn);
  },
});

const renderSort = (column: TableHeaderConfig, sortFn: any) => {
  return (
    <TableSort
      on={{ tableSort: sortFn }}
      sortKey={column.key}
      defaultSort={column}
    />
  );
};

const renderHead = (columns: TableHeaderConfig[], sortFn: any) => {
  let template = columns.map((column: TableHeaderConfig) => {
    return (
      <th>
        <div class="table-hd-tr-th">
          <div class="hd__title">{column.title}</div>
          {column.sort ? renderSort(column, sortFn) : ""}
        </div>
      </th>
    );
  });

  return <thead>{template}</thead>;
};
