import type { PropType } from "vue-types/dist/types";
import { IxPublicPropTypes } from "../../types";

type pageConfigType = {
  pageSize: number; //一页的数据条数
  pageNo: number; //当前页的索引
  total: number; //总的数据条数
  pageTotal: number; //总的页数
};
/* eslint-disable @typescript-eslint/member-delimiter-style */
export const TableFooterProps = {
  pageConfig: {
    type: Object as PropType<pageConfigType>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => ({
      pageSize: 10, //一页的数据条数
      pageNo: 1, //当前页的索引
      total: 0, //总的数据条数
      pageTotal: 0, //总的页数
    }),
  },
};

export type TableFooterPropsType = IxPublicPropTypes<typeof TableFooterProps>;
