/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent, ref } from "@vue/composition-api";
import type { Ref } from "@vue/composition-api";
import TableHeader from "./components/table_header/index";
import TableSort from "./components/sort/TableSort";
import TableFooter from "./components/table_footer/index";
import TableBody from "./components/table_body/index";
import { cloneDeep, orderBy } from "lodash";
import "./style.less";
import {
  TablePagePropType,
  TableHeaderConfig,
  SortType,
  TablePagePropTypeSetUp,
} from "./types";
import { useProps } from "./hooks";

const SORT_FN = (list: any[], keyMap: string): any[] => {
  let key: any = Object.keys(keyMap)[0]; // 排序字段
  let keyVal: any = keyMap[key].toLowerCase(); // 排序方式
  return orderBy(list, [key], [keyVal]); // todo 可以支持多维度排序
};

export default defineComponent({
  name: "TablePage",
  props: TablePagePropType,
  components: {
    TableSort,
    TableFooter,
    TableHeader,
    TableBody,
  },
  setup(props: TablePagePropTypeSetUp) {
    let { singleSortKey, getSortObj, curSort, tableTotalList } =
      useProps(props);
    const refTableFooter = ref(null);
    const refTableHeader = ref(null);

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
      let listLen = tableTotalList.value?.length;

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

    const handleListSort = (list: Record<string, any>[]) => {
      let sortFn = props.sortFn || SORT_FN;
      return sortFn(list, curSort.value);
    };

    const handleListByPage = (list: (Record<string, any> | unknow)[]) => {
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
      }
    };

    getRenderList();

    const loadData = (list: any[]) => {
      tableTotalList.value = list;
      getRenderList();
      pageConfig.value = getPageConfig();
    };

    const clearTableSort = () => {
      //
      loadData([]);
    };

    return {
      loadData,
      pageChange,
      tableSort,
      getSortObj,
      clearTableSort,
      refTableFooter,
      refTableHeader,
      renderRowList,
      pageConfig,
      tableTotalList,
    };
  },

  render() {
    let {
      renderRowList,
      pageConfig,
      pageChange,
      curSort,
      tableSort,
      tableConfig,
    } = this;

    let { columns } = tableConfig as any;

    return (
      <table>
        <TableHeader
          ref="refTableHeader"
          columns={columns}
          defaultSort={curSort}
          on={{ tableSort: tableSort }}
        />
        <TableBody columns={columns} rowList={renderRowList} />
        <td colspan={columns.length}>
          <TableFooter
            ref="refTableFooter"
            pageConfig={pageConfig}
            on={{ pageChange: pageChange }}
          />
        </td>
      </table>
    );
  },
});
