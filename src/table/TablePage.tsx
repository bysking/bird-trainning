/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent, ref } from "@vue/composition-api";
import type { Ref } from "@vue/composition-api";
import TableSort from "./components/sort/TableSort";
import TablePagenation from "./components/pagination/TablePagenation";
import { cloneDeep, orderBy } from "lodash";
import "./style.less";
import { TablePagePropType, TableHeaderConfig, SortType } from "./types";

const SORT_FN = (list: any[], keyMap: string): any[] => {
  let key: any = Object.keys(keyMap)[0]; // 排序字段
  let keyVal: any = keyMap[key].toLowerCase(); // 排序方式
  return orderBy(list, [key], [keyVal]); // todo 可以支持多维度排序
};

export default defineComponent<TablePagePropType>({
  name: "TablePage",
  props: {
    singleSort: {
      type: Boolean, // 是否单个字段排序
      default: true,
    },
    tableConfig: {
      // 表格配置
      type: Object,
      default: function () {
        return {};
      },
    },
    isLocalPage: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    sortFn: {
      type: Function,
      default: null,
    },
  },
  components: {
    TableSort,
    TablePagenation,
  },
  setup(props) {
    const singleSortKey = ref("");
    const getSortObj: () => Record<string, SortType> = () => {
      let columns = props.tableConfig.columns || [];
      let obj: Record<string, SortType> = {};

      columns.forEach((col: TableHeaderConfig) => {
        if (col.sort) {
          obj[col.key] = col.defaultSort || "";
          singleSortKey.value = col.key;
        }
      });

      return obj;
    };
    let obj = getSortObj();
    const curSort: Ref<Record<string, SortType>> = ref(obj);
    const tableTotalList: Ref<Record<string, any>[]> = ref([]);

    tableTotalList.value = cloneDeep(props.list || []);

    if (props.singleSort) {
      curSort.value = {
        [singleSortKey.value]: "ASC",
      };
    }
    const tableSort = (sortKey: string, sort: SortType) => {
      if (props.singleSort) {
        curSort.value = {
          [sortKey]: sort,
        };
      } else {
        curSort.value[sortKey] = sort;
      }
      getRenderList(pageConfig.value.pageNo);
    };

    // 处理本地分页的页面配置计算
    const getPageConfig = () => {
      let defaultPageSize = 4; // 默认分页数量，可以抽成配置项
      let listLen = (tableTotalList.value || []).length;

      let isIntPage = listLen % defaultPageSize === 0;
      let tempPage = Math.floor(listLen / defaultPageSize);
      let pageTotal = isIntPage ? tempPage : tempPage + 1;

      return {
        pageSize: defaultPageSize, //一页的数据条数
        pageNo: 1, //当前页的索引
        total: listLen, //总的数据条数
        pageTotal, //总的页数
      };
    };

    const pageConfig = ref(getPageConfig());

    const renderRowList: Ref<Record<string, any>[]> = ref([]);

    const pageChange = (val: number) => {
      pageConfig.value.pageNo = val;
      getRenderList(val);
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

    const renderHead = (columns: TableHeaderConfig[]) => {
      let template = columns.map((column: TableHeaderConfig) => {
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

    const loadListByPageAjax: () => Record<string, any>[] = () => {
      return []; // cpx:todo 远程分页待做
    };

    const handleListSort = (list: Record<string, any>[]) => {
      let sortFn = props.sortFn || SORT_FN;
      return sortFn(list, curSort.value);
    };

    const handleListByPage = (list: Record<string, any>[]) => {
      let { pageSize, pageNo } = pageConfig.value;

      let start = (pageNo - 1) * pageSize;
      let end = pageNo * pageSize;

      return list.slice(start, end);
    };

    const getRenderList = (number = 1) => {
      if (props.isLocalPage) {
        let list = handleListByPage(tableTotalList.value); // 处理本地分页
        list = handleListSort(list); // 处理
        // 本地 分页
        renderRowList.value = list;
      } else {
        // 远程分页
        renderRowList.value = loadListByPageAjax();
      }
    };

    getRenderList();

    const renderBody = (
      rowList: Record<string, any>[],
      columns: TableHeaderConfig[]
    ) => {
      function renderTd(
        row: Record<string, any>,
        columns: TableHeaderConfig[]
      ) {
        let newTDS = columns.map((col) => {
          return <td>{row[col.key]}</td>;
        });

        return newTDS;
      }

      let newRowList = renderRowList.value.map((row: Record<string, any>) => {
        return <tr>{renderTd(row, columns)}</tr>;
      });

      return newRowList;
    };

    const renderFoot = () => {
      let columns = props.tableConfig.columns || [];

      return (
        <td colspan={columns.length}>
          <table-pagenation
            props={{ pageConfig: pageConfig.value }}
            on={{ pageChange: pageChange }}
          ></table-pagenation>
        </td>
      );
    };

    return () => {
      let columns = props.tableConfig.columns || [];
      return (
        <div>
          <table>
            <caption>测试表格</caption>
            <thead>
              <tr>{renderHead(columns)}</tr>
            </thead>
            {/* cpx:todo 空状态处理 */}
            <tbody>{renderBody(renderRowList.value, columns)}</tbody>
            <tfoot>
              <tr>{renderFoot()}</tr>
            </tfoot>
          </table>
        </div>
      );
    };
  },
});
