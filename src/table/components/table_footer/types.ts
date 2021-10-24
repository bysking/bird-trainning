import { IxPublicPropTypes } from "../../types";

/* eslint-disable @typescript-eslint/member-delimiter-style */
export const TableFooterProps = {
  pageConfig: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => ({
      pageSize: 10, //一页的数据条数
      pageNo: 1, //当前页的索引
      total: 300, //总的数据条数
      pageTotal: 30, //总的页数
    }),
  },
};

export type TableFooterPropsType = IxPublicPropTypes<typeof TableFooterProps>;
