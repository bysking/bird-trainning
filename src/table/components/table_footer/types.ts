/* eslint-disable @typescript-eslint/member-delimiter-style */
export interface PagenationProp {
  pageConfig: {
    pageSize: number; //一页的数据条数
    pageNo: number; //当前页的索引
    total: number; //总的数据条数
    pageTotal: number; //总的页数
  };
}
