/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent, ref } from "@vue/composition-api";
import TableSort from "./components/sort/TableSort";
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

    const getValue = () => {
      return curSort.value.a + curSort.value.b;
    };

    return () => {
      return (
        <div>
          <table>
            <caption>{getValue()}</caption>
            <thead>
              <tr>
                <th>
                  <div class="table-hd-tr-th">
                    <div class="hd__title">第一列</div>
                    <table-sort
                      on={{ tableSort: tableSort }}
                      sortKey="a"
                      props={{ defaultSort: curSort.value }}
                      class="hd__sort"
                    ></table-sort>
                  </div>
                </th>
                <th>
                  <div class="table-hd-tr-th">
                    <div class="hd__title">第一列</div>
                    <table-sort
                      on={{ tableSort: tableSort }}
                      props={{ defaultSort: curSort.value }}
                      sortKey="b"
                      class="hd__sort"
                    ></table-sort>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>第一列</td>
                <td>第一列</td>
                <td>第一列</td>
              </tr>
              <tr>
                <td>第一列</td>
                <td>第一列</td>
                <td>第一列</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>表格尾部</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    };
  },
});
