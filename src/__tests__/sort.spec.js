import { mount } from "@vue/test-utils";
import TableSort from "../table/components/sort/TableSort";

describe("TableSort", () => {
  const TableMount = (options) => mount(TableSort, options);

  test("render", () => {
    // 测试正常渲染
    const wrapper = TableMount();
    expect(() => {
      wrapper.vm.$forceUpdate();
      wrapper.vm.$destroy();
    }).not.toThrow();
  });

  it("sortKey test", () => {
    const wrapper = mount(TableSort);

    expect(wrapper.vm.sortKey).toBe("");
  });

  it("test sort not throw err", () => {
    const wrapper = mount(TableSort, {
      propsData: {
        sortKey: "name",
        defaultSort: {
          test: "ASC",
        },
      },
    });

    expect(() => {
      wrapper.vm.initSort();
      wrapper.vm.getSort();
      wrapper.vm.setSortKey();
      wrapper.vm.clickSort();
    }).not.toThrow();
  });
});
