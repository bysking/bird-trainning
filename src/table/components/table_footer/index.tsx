/**
 * Created by uedc on 2021/10/11.
 */

import {
  defineComponent,
  ref,
  computed,
  watch,
  ComputedRef,
} from "@vue/composition-api";
import type { Ref } from "@vue/composition-api";
import "./style.less";
import { TableFooterProps, TableFooterPropsType } from "./types";

export default defineComponent({
  name: "TableFooter",
  props: TableFooterProps,
  components: {},
  setup(props: TableFooterPropsType, { emit }) {
    const pageTotal: ComputedRef<number> = computed(() => {
      const config = props.pageConfig;
      if (config?.pageTotal) {
        return config.pageTotal;
      } else {
        console.log(config?.pageSize, config?.total);
        if (config?.pageSize && config.total) {
          return Math.ceil(config.total / config.pageSize);
        } else {
          return 0;
        }
      }
    });
    const curPage = ref(props.pageConfig?.pageNo || 0);

    watch(
      () => curPage.value,
      (val) => {
        emit("pageChange", val);
      }
    );

    const moveFront = () => {
      if (curPage.value > 1) {
        curPage.value = curPage.value - 1;
      }
    };
    const moveNext = () => {
      if (curPage.value < pageTotal.value) {
        curPage.value = curPage.value + 1;
      }
    };

    const moveToPage = (pageIndex: number) => {
      curPage.value = pageIndex;
    };

    const showList: Ref<number[]> = ref([]);

    const setShowList = () => {
      let showListTotal = Array(pageTotal.value)
        .fill(1)
        .map((item, index) => index + 1);

      let showLength = 6; // 分页展示的页面数量

      if (showListTotal.length && !showList.value.includes(curPage.value)) {
        if (curPage.value < showLength) {
          showList.value = showListTotal.slice(0, showLength);
        } else {
          showList.value = showListTotal.slice(
            curPage.value - 1,
            curPage.value + showLength
          );
        }
      }
    };

    const renderPage = () => {
      setShowList();
      return renderPageDomByList();
    };

    const renderPageDomByList = () => {
      let list = showList.value;
      return list.map((item: number) => {
        return (
          <span
            class={
              curPage.value === item ? "page-btn page-btn__active" : "page-btn"
            }
            onClick={moveToPage.bind(this, item)}
          >
            {item}
          </span>
        );
      });
    };

    return {
      curPage,
      pageTotal,
      moveFront,
      renderPage,
      moveNext,
      moveToPage,
    };
  },

  render() {
    return (
      <div class="pagenation-wrap">
        <div class="page-btn-cur">
          当前页码： {this.curPage}/{this.pageTotal}
        </div>
        <div class="page-btn-click" onClick={this.moveFront}>
          上一页
        </div>
        <div class="page-num-list">{this.renderPage()}</div>
        <div class="page-btn-click" onClick={this.moveNext}>
          下一页
        </div>
      </div>
    );
  },
});
