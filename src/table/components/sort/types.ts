/* eslint-disable @typescript-eslint/member-delimiter-style */
import { SortType } from "../../types";

export interface TableSortProp {
  sortKey: string;
  defaultSort: {
    [propName: string]: SortType;
  };
}
