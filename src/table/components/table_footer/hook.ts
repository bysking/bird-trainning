/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ref } from "@vue/composition-api";
import { TableFooterPropsType } from "./types";

export const useProps = (props: TableFooterPropsType) => {
  const curPage = ref(Number(props.pageConfig?.pageNo));

  return {
    curPage,
  };
};
