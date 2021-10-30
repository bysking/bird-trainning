/**
 * Created by uedc on 2021/10/11.
 */

import {
  defineComponent,
  computed,
  ref,
  ComputedRef,
} from "@vue/composition-api";
import "./style.less";
import { TableSortProp, TableSortPropType } from "./types";
import { SortType } from "../../types";
import Logger from "js-logger";
Logger.useDefaults();

const SORT_KEY = {
  ASC: "ASC",
  DESC: "DESC",
};

const ACTIVE_CLASS = "sort__link sort__active";
const INACTIVE_CLASS = "sort__link";

export default defineComponent({
  name: "TableSort",
  props: TableSortProp,
  setup(props: TableSortPropType, { emit }) {
    const activeKey = ref("");

    const initSort = () => {
      let sort = getSort();

      if (props.defaultSort && !sort) {
        activeKey.value = ""; // 指定非当前列排序则清除当前列的排序
      }
    };

    const getSort: () => SortType = () => {
      let { sortKey = "", defaultSort = {} } = props;
      let sort = defaultSort[sortKey];
      return sort;
    };

    // 设置排序值
    const setSortKey = (key: string) => {
      if (activeKey.value === key) {
        activeKey.value = "";
      } else {
        activeKey.value = key;
      }
    };

    // 点击排序
    const clickSort = (key: string) => {
      setSortKey(key);
      emit("tableSort", props.sortKey, activeKey.value);
    };

    if (props.defaultSort) {
      let sort = getSort();
      sort && setSortKey(sort);
    }

    const getActiveByKey = (key: string) => {
      return key === activeKey.value;
    };

    // 升序激活类名
    const uhdClass: ComputedRef<string> = computed(() => {
      return getActiveByKey(SORT_KEY.ASC) ? ACTIVE_CLASS : INACTIVE_CLASS;
    });

    // 降序激活class
    const dhdClass: ComputedRef<string> = computed(() => {
      return getActiveByKey(SORT_KEY.DESC) ? ACTIVE_CLASS : INACTIVE_CLASS;
    });

    return {
      uhdClass,
      dhdClass,
      initSort,
      clickSort,
      getSort,
      setSortKey,
      activeKey,
    };
  },

  render() {
    let { uhdClass, dhdClass } = this;
    return (
      <div class="sort-wrap">
        <div
          class={uhdClass}
          id="upSort"
          onClick={this.clickSort.bind(this, SORT_KEY.ASC)}
        >
          ^
        </div>
        <div
          class={dhdClass}
          onClick={this.clickSort.bind(this, SORT_KEY.DESC)}
        >
          v
        </div>
      </div>
    );
  },
});
