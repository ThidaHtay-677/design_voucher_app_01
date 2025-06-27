import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSaleProductStore from "../../../stores/useSaleProductStore";
import toast from "react-hot-toast";
import { storeVoucher } from "../../../services/voucher";

const useSaleInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);

  const { records, resetRecord } = useSaleProductStore();

  const onSubmit = async (data) => {
    setIsSending(true);

    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;

    const currentVoucher = { ...data, records, total, tax, net_total };

    const res = await storeVoucher(currentVoucher);

    const json = await res.json();

    // console.log(json)

    if (res.status === 201) {
      toast.success("Voucher created successfully");

      resetRecord();

      reset();

      setIsSending(false);

      if (data.redirect_to_detail) {
        navigate(`/dashboard/voucher-detail/${json?.data?.id}`);
        //json?.data?.id => be careful to get data 
      }
    } else {
      toast.error(json.message);
    }
  };

  // Utility function to generate a unique invoice number
  function generateInvoiceNumber() {
    // Get the current date
    const date = new Date();

    // Format the date as YYYYMMDD
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Combine the formatted date and the random number
    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  }

  return {
handleSubmit,onSubmit,errors,generateInvoiceNumber,register,isSending

  }
};

export default useSaleInformation;
