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
  wrapper.vm.sortFn("age", "DESC");

  // 判断样式是否渲染： 获取dom 的样式， 判断存在， exect进行值断言
  const classExist = !wrapper.classes("sort-wrap");
  expect(classExist).toBeTruthy();
});
