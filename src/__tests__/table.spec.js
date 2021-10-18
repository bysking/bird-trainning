import { mount } from "@vue/test-utils";
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
