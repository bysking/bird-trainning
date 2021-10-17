/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent, ref } from "@vue/composition-api";
import TableSort from "./components/sort/TableSort";
import TablePagenation from "./components/pagination/TablePagenation";
import "./style.less";

export default defineComponent({
  name: "TablePage",
  props: {
    singleSort: {
      type: Boolean, // 是否单个字段排序
      default: true,
    },
    tableConfig: {
      // 表格配置
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    TableSort,
    TablePagenation,
  },
  setup(props, {}) {
    const curSort: any = ref({
      a: "ASC",
      b: "DESC",
    });

    if (props.singleSort) {
      curSort.value = {
        a: "ASC",
      };
    }
    const tableSort = (sortKey: string, sort: string) => {
      if (props.singleSort) {
        curSort.value = {
          [sortKey]: sort,
        };
      } else {
        curSort.value[sortKey] = sort;
      }
      console.log(curSort.value);
    };

    const pageChange = (val: any) => {
      console.log("分页变化", val);
    };

    const renderSort = (column: any) => {
      if (!column.sort) {
        return "";
      }

      return (
        <table-sort
          on={{ tableSort: tableSort }}
          sortKey={column.key}
          props={{ defaultSort: curSort.value }}
          class="hd__sort"
        ></table-sort>
      );
    };

    const renderHead = (columns: any[]) => {
      let template = columns.map((column: any) => {
        return (
          <th>
            <div class="table-hd-tr-th">
              <div class="hd__title">{column.title}</div>
              {renderSort(column)}
            </div>
          </th>
        );
      });

      return template;
    };

    const renderBody = (rowList: any[], columns: any) => {
      function getColCfg(index: number) {
        return props.tableConfig.columns[index];
      }
      function renderTd(tds: any[], columns: any[]) {
        let newTDS = columns.map((col) => {
          return <td>{tds[col.key]}</td>;
        });

        return newTDS;
      }
      let newRowList = rowList.map((row, index) => {
        let headerCfg = getColCfg(index);

        if (!headerCfg) {
          return "";
        }
        return <tr>{renderTd(row, columns)}</tr>;
      });

      return newRowList;
    };

    const renderFoot = () => {
      let columns = props.tableConfig.columns || [];

      return (
        <td colspan={columns.length}>
          <table-pagenation on={{ pageChange: pageChange }}></table-pagenation>
        </td>
      );
    };

    return () => {
      let columns = props.tableConfig.columns || [];
      let rowList = props.tableConfig.data || [];
      return (
        <div>
          <table>
            <caption>测试表格</caption>
            <thead>
              <tr>{renderHead(columns)}</tr>
            </thead>
            <tbody>{renderBody(rowList, columns)}</tbody>
            <tfoot>
              <tr>{renderFoot()}</tr>
            </tfoot>
          </table>
        </div>
      );
    };
  },
});
