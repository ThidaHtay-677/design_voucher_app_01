import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useLocation, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { fetchProducts } from "../../../services/product";
import { urlToParamObject } from "../../../utils/url";

const useProduct = () => {
  const [params, setParams] = useSearchParams();//to read and update query parameters in the URL, like ?q=shirt&page=2.
  const location = useLocation();//to read the full URL (especially location.search)
  const searchRef = useRef();//to access and manipulate input field
  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/products" + location.search
  );//to track the current API endpoint to fetch from
  // whenever the URL changes (due to search or sort)

  useEffect(() => {
    if (params.get("q")) {
      searchRef.current.value = params.get("q");
    }
  }, [params]);//To keep the search input box in sync with the URL query parameter (?q=...)
//So if the page is loaded or the URL changes, the input field updates to reflect it.

  const { data, isLoading, error } = useSWR(fetchUrl, fetchProducts);

  const handleSearchInput = debounce((e) => {
    if (e.target.value) {
      setParams({ q: e.target.value });
      setFetchUrl(
        `${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`
      );
    } else {
      setParams({});
      setFetchUrl(`${import.meta.env.VITE_API_URL}/products`);
    }
  }, 500);

  const clearSearchInput = () => {
    searchRef.current.value = "";
    setParams({});
    setFetchUrl(`${import.meta.env.VITE_API_URL}/products`);
  };

  const updateFetchUrl = (url) => {
    setFetchUrl(url);
    setParams(urlToParamObject(url));
  };

  const handleSort = (sortData) => {
    const sortParams = new URLSearchParams(sortData).toString();
    setParams(sortData);
    setFetchUrl(`${import.meta.env.VITE_API_URL}/products?${sortParams}`);
  };

  return {
    searchRef,
    data,
    isLoading,
    error,
    handleSearchInput,
    clearSearchInput,
    updateFetchUrl,
    handleSort,
  };
};

export default useProduct;
