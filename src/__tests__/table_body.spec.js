import { mount } from "@vue/test-utils";
import TableBody from "../table/components/table_body/index";
const columns = [
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
];

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
];
const getWrapperDm = () => {
  const wrapper = mount(TableBody, {
    propsData: {
      columns: columns,
      rowList: list,
    },
  });

  return wrapper;
};

describe("TableBody", () => {
  test("测试表格", () => {
    const wrapper = getWrapperDm();
    expect(() => {
      wrapper.vm.renderBody(columns, list);
    }).not.toThrow();
  });

  test("测试渲染正常", () => {
    expect(() => {
      const wrapper = getWrapperDm();
      wrapper.vm.$forceUpdate();
      wrapper.vm.$destroy();
    }).not.toThrow();
  });
});
