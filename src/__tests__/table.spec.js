import { mount } from "@vue/test-utils";
// import { shallowMount } from '@vue/test-utils';
import { TestTable } from "../table";

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

  it("div exist", () => {
    const wrapper = mount(TestTable);
    expect(wrapper.contains("table-hd-tr-th")).toBe(false);
  });
});

test("测试表格的loadData方法能不能正常加载数据", () => {
  // const wrapper = shallowMount(TestTable);
  // let list = [{ name: '111', age: 12}, { name: '222', age: 222 }]
  // wrapper.vm.loadData(list);
  // 表格已经成功渲染，检测表格实例的渲染数据有值，并且和list内容相等
});

test("测试表格的排序", () => {
  // const wrapper = shallowMount(TestTable);
  // let list = [{ name: '111', age: 12}, { name: '222', age: 222 }]
  // wrapper.vm.loadData(list);
  // wrapper.vm.setTableSort({ name: 'ASC' })
  // wrapper.vm.排序属性对象为 { name: '' }
  // 表格已经成功排序，表格name对应的列表现为升序高亮，展示内容暗战升序排序
});

test("测试表格的清除排序", () => {
  // const wrapper = shallowMount(TestTable);
  // let list = [{ name: '111', age: 12}, { name: '222', age: 222 }]
  // wrapper.vm.loadData(list);
  // wrapper.vm.clearTableSort()
  // wrapper.vm.setTableSort({ name: 'ASC' })
  // wrapper.vm.clearTableSort()
  // wrapper.vm.排序属性对象为 { name: '' }
  // 表格已经清除排序，表格name对应的列表现为升序默认的顺序
});
