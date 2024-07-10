import { FormikHelpers } from "formik";

export type SearchValue = { keyword: string };
export type HandleSubmitFoo = (
  values: SearchValue,
  actions: FormikHelpers<SearchValue>
) => void;

type HandleSearchFoo = (keyword: string) => void;

export type SearchBarProps = {
  handleSearch: HandleSearchFoo;
};
