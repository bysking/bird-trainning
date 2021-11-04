/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropOptions, PropType } from "vue-types/dist/types";
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
type PublicRequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}[keyof T];

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>;
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
  ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : T extends ObjectConstructor | { type: ObjectConstructor }
  ? Record<string, any>
  : T extends BooleanConstructor | { type: BooleanConstructor }
  ? boolean
  : T extends Prop<infer V, infer D>
  ? unknown extends V
    ? D
    : V
  : T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
  ? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & {
      [K in PublicOptionalKeys<O>]?: InferPropType<O[K]>;
    }
  : { [K in string]: any };

export type SortType = "ASC" | "DESC" | ""; // 升序降序

// 表头列类型
export interface TableHeaderConfig {
  sort?: boolean; // 是否排序
  defaultSort?: SortType; // 默认的排序 升序降序
  [propName: string]: any;
}

// 表头列表类型
export const tableHeaderConfigProp = {
  columns: {
    type: Array as PropType<TableHeaderConfig[]>,
    default: () => [],
  },
};

export type IduxtableHeaderConfigProp = IxPublicPropTypes<
  typeof tableHeaderConfigProp
>;

export interface sortMapType {
  [propName: string]: SortType;
}

// 排序函数类型
type sortFnType<T extends { [key: string]: any }> = (
  list: T[],
  keyMap: sortMapType
) => T[];

// 表格组件的prop类型
export const TablePagePropType = {
  singleSort: {
    // 单列排序 多列排序
    type: Boolean,
    default: true,
  },
  tableConfig: {
    // 表格头配置
    type: Object as PropType<{ columns: TableHeaderConfig[] }>,
    default: () => {
      return { columns: [] };
    },
  },
  isLocalPage: {
    // 本地分页
    type: Boolean,
    default: true,
  },
  list: {
    // 表格数据
    type: Array as PropType<Record<string, any>[]>,
    default: () => {
      return [];
    },
  },
  sortFn: {
    // 排序函数
    type: Function as PropType<null | sortFnType<Record<string, any>>>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default: null,
  },
};

export type TablePagePropTypeSetUp = IxPublicPropTypes<
  typeof TablePagePropType
>;

export const tableBodyConfigProp = {
  columns: {
    type: Array as PropType<TableHeaderConfig[]>,
    default: () => [],
  },
  rowList: {
    // 表格数据
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
};

export type IduxtableBodyConfigProp = IxPublicPropTypes<
  typeof tableBodyConfigProp
>;
