import React, { useState } from "react";
import {
  HiMiniTrash,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
  HiTrash,
} from "react-icons/hi2";
import { useSWRConfig } from "swr";

import { Link } from "react-router-dom";
import { bouncy } from "ldrs";
import toast from "react-hot-toast";
import ShowDateTime from "../../../components/ShowDateTime";
import { destroyProduct } from "../../../services/product";

bouncy.register();

const useProductRow = ({
  product: { id, product_name, price, created_at, updated_at },
}) => {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBtn = async () => {
    try {
      setIsDeleting(true);

      const res = await destroyProduct(id);
      const json = await res.json();

      if (res.ok) {
        toast.success(json.message);
        mutate(import.meta.env.VITE_API_URL + `/products`);
      } else  {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product.");
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDeleteBtn,
  }
};

export default useProductRow;
