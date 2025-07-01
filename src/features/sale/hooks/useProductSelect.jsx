import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSaleProductStore from "../../../stores/useSaleProductStore";
import { fetchProducts } from "../../../services/product";
import ButtonSpinner from "../../../components/ButtonSpinner";

const useProductSelect = () => {
  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + "/products?limit=100",
    fetchProducts
  );

  const { register, handleSubmit, reset } = useForm();


  const { addRecord, changeQuantity, records } = useSaleProductStore();

  const onSubmit = (data) => {
    const currentProduct = JSON.parse(data.product);

    const currentProductId = currentProduct.id;//id from form
    const isExited = records.find(
      ({ product: { id } }) => currentProductId === id
    );

    if (isExited) {
      changeQuantity(isExited.product_id, data.quantity);
      // data.quantity => come from form submit
    } else {
      addRecord({
        product: currentProduct,
        product_id: currentProduct.id,
        quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        created_at: new Date().toISOString(),
      });
    }

    reset();
  };

  if (isLoading) return <ButtonSpinner />;

  return {
    onSubmit,
    data,
    isLoading,
    handleSubmit,
    register,
}
};

export default useProductSelect;
