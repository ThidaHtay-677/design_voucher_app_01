import React from "react";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";

import useSWR from "swr";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import Pagination from "../../../components/Pagination";
import { urlToParamObject } from "../../../utils/url";
import Sortable from "../../../components/Sortable";
import VoucherLoader from "./VoucherLoader";
import VoucherEmptyStage from "./VoucherEmptyStage";
import VoucherRow from "./VoucherRow";
import { fetchVouchers } from "../../../services/voucher";
import { LuMonitor } from "react-icons/lu";

const useVoucherTable = () => {
  const [params, setParams] = useSearchParams();

  const location = useLocation();

  const searchRef = useRef();

  useEffect(() => {
    if (params.get("q")) {
      searchRef.current.value = params.get("q");
    }
  }, []);

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/vouchers" + location.search
  );

  const { data, isLoading, error } = useSWR(fetchUrl, fetchVouchers);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        `${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`
      );
    } else {
      setParams({});
      setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers`);
    }
  }, 500);

  const clearSearchInput = () => {
    setCurrentSearchValue("");
  };

  const updateFetchUrl = (url) => {
    setFetchUrl(url);
    setParams(urlToParamObject(url));
    setFetchUrl(url);
  };

  const handleSort = (sortData) => {
    console.log(sortData);
    const sortParams = new URLSearchParams(sortData).toString();
    setParams(sortData);
    setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?${sortParams}`);
  };
  return {
    handleSearchInput,
    searchRef,
    handleSort,
    isLoading,
    data,
    updateFetchUrl,
    clearSearchInput,
   
  };
};

export default useVoucherTable;
