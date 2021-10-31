import { mount } from "@vue/test-utils";
import TestHeader from "../table/components/table_header/index";

const getWrapperDm = () => {
  const wrapper = mount(TestHeader, {
    propsData: {
      sort: true, // 是否排序
      defaultSort: "ASC", // 默认的排序 升序降序
      key: "name",
      title: "名字",
    },
  });

  return wrapper;
};

test("测试表格", () => {
  const wrapper = getWrapperDm();
  expect(() => {
    wrapper.vm.sortFn("name", "DESC");
  }).not.toThrow();
});
