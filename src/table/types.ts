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
// Props 定义在这里
export const tableProps = {
  tableConfig: {
    type: Object,
    default: true,
  },
};
export type TablePublicProps = IxPublicPropTypes<typeof tableProps>;
export type SortType = "ASC" | "DESC" | ""; // 升序降序

export interface TableHeaderConfig {
  sort?: boolean; // 是否排序
  defaultSort?: SortType; // 默认的排序 升序降序
  [propName: string]: any;
}
// 表头类型
export const tableHeaderConfigProp = {
  columns: [],
};
export type IduxtableHeaderConfigProp = IxPublicPropTypes<
  typeof tableHeaderConfigProp
>;

interface sortMap {
  [propName: string]: SortType;
}
export type TablePagePropType = {
  singleSort?: boolean; // 单列排序 多列排序
  tableConfig: { columns: TableHeaderConfig[] };
  isLocalPage: boolean; // 本地分页
  list: Record<string, any>[]; // 表格数据
  sortFn: (
    list: Record<string, any>[], // 排序函数
    keyMap: sortMap
  ) => Record<string, any>[];
};

export const tableBodyConfigProp = {
  columns: [], // 表头配置
  rowList: [], // 表格数据
};
