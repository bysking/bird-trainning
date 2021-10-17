/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent } from "@vue/composition-api";
import { tableProps } from "./types";
import TablePage from "./TablePage";

const tableConfig = {
  columns: [
    {
      title: "姓名",
      key: "name",
      sort: true,
      defaultSort: "ASC",
    },
    {
      title: "年龄",
      key: "age",
    },
    {
      title: "地址",
      key: "address",
    },
  ],
  data: [
    {
      name: "John Brown",
      age: 18,
      address: "New York No. 1 Lake Park",
      date: "2016-10-03",
    },
    {
      name: "Jim Green",
      age: 24,
      address: "London No. 1 Lake Park",
      date: "2016-10-01",
    },
    {
      name: "Joe Black",
      age: 30,
      address: "Sydney No. 1 Lake Park",
      date: "2016-10-02",
    },
    {
      name: "Jon Snow",
      age: 26,
      address: "Ottawa No. 2 Lake Park",
      date: "2016-10-04",
    },
  ],
};

export default defineComponent({
  name: "Table",
  props: tableProps,
  components: {
    TablePage,
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div>
          <TablePage props={{ tableConfig: tableConfig }}></TablePage>
        </div>
      );
    };
  },
});
