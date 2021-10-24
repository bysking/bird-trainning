/* eslint-disable @typescript-eslint/member-delimiter-style */
import type { PropType } from "vue-types/dist/types";
import { IxPublicPropTypes, SortType } from "../../types";

export const TableSortProp = {
  sortKey: {
    type: String,
    default: "",
  },
  defaultSort: {
    type: Object as PropType<{ [propName: string]: SortType }>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => ({}),
  },
};

export type TableSortPropType = IxPublicPropTypes<typeof TableSortProp>;
