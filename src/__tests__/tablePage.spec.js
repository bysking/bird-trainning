import { mount } from "@vue/test-utils";
import TablePage from "../table/TablePage";

describe("TablePage", () => {
  const getWrapperDm = () => {
    const wrapper = mount(TablePage, {
      propsData: {
        sort: true, // 是否排序
        defaultSort: "ASC", // 默认的排序 升序降序
        key: "name",
        title: "名字",
      },
    });
    return wrapper;
  };

  test("测试表格tablePage", () => {
    const wrapper = getWrapperDm();
    wrapper;
    //
  });
});
