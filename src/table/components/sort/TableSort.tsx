/**
 * Created by uedc on 2021/10/11.
 */

import { defineComponent, computed, ref, watch } from "@vue/composition-api";
import "./style.less";

const SORT_KEY = {
  ASC: "ASC",
  DESC: "DESC",
};

export default defineComponent({
  name: "TableSort",
  props: {
    sortKey: {
      type: String,
      default: "",
    },
    defaultSort: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const activeKey = ref("");

    watch(
      () => props.defaultSort,
      () => {
        let sort = props.defaultSort[props.sortKey];
        if (props.defaultSort && !sort) {
          activeKey.value = "";
        }
      }
    );

    const setSortKey = (key: string) => {
      if (activeKey.value === key) {
        activeKey.value = "";
      } else {
        activeKey.value = key;
      }
    };

    const clickSort = (key: string) => {
      setSortKey(key);
      emit("tableSort", props.sortKey, activeKey.value);
    };

    if (props.defaultSort) {
      let sort = props.defaultSort[props.sortKey];

      sort && setSortKey(sort);
    }

    const getActiveByKey = (key: string) => {
      return key === activeKey.value;
    };

    const uhdClass = computed(() => {
      return getActiveByKey(SORT_KEY.ASC)
        ? "sort__link sort__active"
        : "sort__link";
    });
    const dhdClass = computed(() => {
      return getActiveByKey(SORT_KEY.DESC)
        ? "sort__link sort__active"
        : "sort__link";
    });

    return () => {
      return (
        <div class="sort-wrap">
          <div
            class={uhdClass.value}
            onClick={clickSort.bind(this, SORT_KEY.ASC)}
          >
            u
          </div>
          <div
            class={dhdClass.value}
            onClick={clickSort.bind(this, SORT_KEY.DESC)}
          >
            d
          </div>
        </div>
      );
    };
  },
});
