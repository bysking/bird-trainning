<template>
  <div>
    <button class="test-btn" @click="testLoad">加载数据</button>
    <button class="test-btn" @click="testClearSort">清除数据</button>
    <button class="test-btn" @click="testJumpNext">跳转下一页</button>
    <test-page ref="refTable" :tableConfig="tableConfig" :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import type { Ref } from "@vue/composition-api";
import TestPage from "../src/table/TablePage";

export default defineComponent({
  name: "App",
  components: {
    TestPage,
  },
  setup() {
    const refTable: Ref<typeof TestPage | null> = ref(null);
    const tableConfig = ref({
      columns: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "年龄",
          key: "age",
          sort: true,
          defaultSort: "ASC",
        },
        {
          title: "地址",
          key: "address",
        },
      ],
    });

    const list = ref([
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
      {
        name: "Jon Snow1",
        age: 27,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04",
      },
      {
        name: "Jon Snow2",
        age: 28,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04",
      },
      {
        name: "Jon Snow3",
        age: 29,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04",
      },
      {
        name: "Jon Snow4",
        age: 76,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04",
      },
      {
        name: "Jon Snow5",
        age: 86,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04",
      },
    ]);

    const testLoad = () => {
      const list = Array(40)
        .fill(1)
        .map((item) => {
          return {
            name: `${Math.random()}Jon Snow5`,
            age: 86,
            address: `${item},Ottawa No. 2 Lake Park`,
            date: "2016-10-04",
          };
        });
      refTable.value?.loadData(list);
    };

    const testSort = () => {
      refTable.value?.setTableSort([]);
    };

    const testClearSort = () => {
      refTable.value?.clearTableSort();
    };

    const testJumpNext = () => {
      refTable.value?.moveNext();
    };

    return {
      refTable,
      testLoad,
      testSort,
      tableConfig,
      list,
      testClearSort,
      testJumpNext,
    };
  },
});
</script>
<style lang="less" scoped>
.test-btn {
  background: #00e;
  margin: 8px;
  padding: 2px 4px;
  border-radius: 10%;
  color: #fff;

  & + & {
    margin-left: 8px;
  }
}
</style>
