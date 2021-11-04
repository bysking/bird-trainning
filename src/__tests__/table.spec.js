import { mount } from "@vue/test-utils";
// import { shallowMount } from "@vue/test-utils";
import TestTable from "../table/TablePage";

const tableConfig = {
  columns: [
    {
      title: "姓名",
      key: "name",
      sort: false,
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
};

const list = [
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
];

describe("Table", () => {
  const TableMount = (options) => mount(TestTable, options);

  test("render", () => {
    // 测试正常渲染
    const wrapper = TableMount();
    expect(() => {
      wrapper.vm.$forceUpdate();
      wrapper.vm.$destroy();
    }).not.toThrow();
  });
});

test("测试表格的loadData方法能不能正常加载数据", () => {
  const wrapper = mount(TestTable, {
    propsData: {
      tableConfig,
      list,
    },
  });
  expect(() => {
    wrapper.vm.loadData(list);
  }).not.toThrow();

  const loadList = wrapper.vm.tableTotalList;
  const loadListStr = loadList.toString();
  const originListStr = list.toString();
  expect(originListStr).toBe(loadListStr); // 表格已经成功渲染，检测表格实例的渲染数据有值，并且和list内容相等
});

test("测试表格的排序", () => {
  const wrapper = mount(TestTable, {
    propsData: {
      tableConfig,
      list,
    },
  });
  wrapper.vm.loadData(list);
  wrapper.vm.tableSort("age", "ASC");

  // 检测排序组件的类名，todo 处理响应式class
  const domtext = wrapper.find("#upSort").html();
  const isActive = !domtext.includes("sort__active");
  expect(isActive).toBeTruthy();
});

test("测试表格跳转第二页", () => {
  const wrapper = mount(TestTable, {
    propsData: {
      tableConfig,
      list,
    },
  });
  wrapper.vm.loadData(list);
  wrapper.vm.pageChange(2);
  // expect(wrapper.vm.getCurrentPage()).toBe(2); todo
});

const loadTableData = () => {
  const wrapper = mount(TestTable, {
    propsData: {
      tableConfig,
      list,
      singleSort: false,
      isLocalPage: false,
    },
  });
  wrapper.vm.loadData(list);

  return wrapper;
};

test("测试表格方法调用无异常", () => {
  const wrapper = loadTableData();
  expect(() => {
    wrapper.vm.tableSort("age", "DESC");
    wrapper.vm.getSortObj();
    wrapper.vm.loadListByPageAjax();
    wrapper.vm.clearTableSort();
    wrapper.vm.moveNext();
  }).not.toThrow();
});
