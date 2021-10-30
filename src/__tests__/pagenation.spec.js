import { mount } from "@vue/test-utils";
import TablePagenation from "../table/components/table_footer/index";

describe("TablePagenation", () => {
  const TableMount = (options) => mount(TablePagenation, options);

  test("render", () => {
    // 测试正常渲染
    const wrapper = TableMount({
      propData: {
        pageSize: 3,
        pageNo: 2,
        total: 10,
        pageTotal: 10,
      },
    });

    expect(() => {
      wrapper.vm.$forceUpdate();
      wrapper.vm.$destroy();
    }).not.toThrow();
  });

  test("测试分页", () => {
    // 测试正常渲染
    const wrapper = TableMount({
      propData: {
        pageSize: 3,
        pageNo: 2,
        total: 10,
        pageTotal: 10,
      },
    });

    expect(() => {
      wrapper.vm.moveFront();
      wrapper.vm.moveNext();
      wrapper.vm.moveToPage(1);
    }).not.toThrow();
  });

  test("测试超出分页限制", () => {
    // 测试正常渲染
    const wrapper = TableMount({
      propData: {
        pageSize: 20,
        pageNo: 9,
        total: 1000,
        pageTotal: 9,
      },
    });

    expect(() => {
      wrapper.vm.moveToPage(10);
      wrapper.vm.defaultSort = "DESC";
    }).not.toThrow();
  });
});
