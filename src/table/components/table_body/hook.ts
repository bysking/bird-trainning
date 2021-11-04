/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { computed } from "@vue/composition-api";
import { IduxtableBodyConfigProp } from "../../types";

export const useColumns = (props: IduxtableBodyConfigProp) => {
  return computed(() => props.columns);
};
