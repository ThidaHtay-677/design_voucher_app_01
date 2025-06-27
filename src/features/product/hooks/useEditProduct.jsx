import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { tailspin } from "ldrs";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { fetchProducts, updateProduct } from "../../../services/product";
import ButtonSpinner from "../../../components/ButtonSpinner";

tailspin.register();

const useEditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/products/${id}`,
    fetchProducts
  );

  //mutate => do the url in SWR  

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateProduct = async (data) => {
    try {
      setIsSending(true);
      await updateProduct(id, data.product_name, data.price);
      mutate(import.meta.env.VITE_API_URL + `/products/${id}`);
      toast.success("Product update successfully");
    } catch (error) {
      toast.error("An error occurred while updating the product.");
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      if (data.back_to_product_list) {
        navigate("/dashboard/products");
      }
    }//always runs => whether success or error
  };

  return {
    register,
    handleSubmit,
    handleUpdateProduct,
    errors,
    isSubmitting,
    isSending,
    isLoading,
    data,
  };
};

export default useEditProduct;
