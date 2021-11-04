/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { computed, ref } from "@vue/composition-api";
import type { Ref } from "@vue/composition-api";
import { cloneDeep } from "lodash";

import { SortType, TablePagePropTypeSetUp, TableHeaderConfig } from "./types";

export const useProps = (props: TablePagePropTypeSetUp) => {
  const columns = computed(() => props.tableConfig?.columns || []);
  const singleSortKey = ref("");

  const getSortObj: () => Record<string, SortType> = () => {
    const obj: Record<string, SortType> = {};

    columns.value.forEach((col: TableHeaderConfig) => {
      if (col.sort) {
        obj[col.key] = col.defaultSort as SortType;
        singleSortKey.value = col.key;
      }
    });

    return obj;
  };

  const curSort: Ref<Record<string, SortType | string>> = ref(getSortObj());

  const tableTotalList: Ref<(Record<string, unknown> | unknown)[] | undefined> =
    ref([]);

  tableTotalList.value = cloneDeep(props.list);

  return {
    getSortObj,
    singleSortKey,
    curSort,
    tableTotalList,
  };
};
