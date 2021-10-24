/* eslint-disable @typescript-eslint/member-delimiter-style */
import { IxPublicPropTypes } from "../../types";

export const TableSortProp = {
  sortKey: {
    type: String,
    default: "",
    required: true,
  },
  defaultSort: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: () => ({}),
  },
};

export type TableSortPropType = IxPublicPropTypes<typeof TableSortProp>;
