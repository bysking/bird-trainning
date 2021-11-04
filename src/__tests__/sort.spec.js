import { mount } from "@vue/test-utils";
import TableSort from "../table/components/sort/TableSort";

describe("TableSort", () => {
  const TableMount = (options) => mount(TableSort, options);

  test("测试正常渲染,无失败", () => {
    // 测试正常渲染
    const wrapper = TableMount();
    expect(() => {
      wrapper.vm.$forceUpdate();
      wrapper.vm.$destroy();
    }).not.toThrow();
  });

  it("sortKey test", () => {
    const wrapper = mount(TableSort, {
      propsData: {
        sortKey: "name",
        defaultSort: {
          name: "ASC",
        },
      },
    });
    expect(wrapper.vm.sortKey).toBe("name");
    wrapper.vm.clickSort("DESC");
    expect(wrapper.vm.activeKey).toBe("DESC");
  });

  it("测试设置排序字段值正确", () => {
    const wrapper = mount(TableSort, {
      propsData: {
        sortKey: "name",
        defaultSort: {
          test: "ASC",
        },
      },
    });

    wrapper.vm.getSort({
      sortKey: "name",
      defaultSort: {
        test: "ASC",
      },
    });
    wrapper.vm.setSortKey("DESC");
    expect(wrapper.vm.activeKey).toBe("DESC");
  });

  test("测试prop参数正确赋值", () => {
    // 测试正常渲染
    const wrapper = TableMount({
      propsData: {
        sortKey: "name",
        defaultSort: {
          name: "ASC",
        },
      },
    });

    const rr = wrapper.vm.getSort();
    expect(rr).toBe("ASC");
  });
});
