import { create } from "zustand";

const useSaleProductStore = create((set) => ({
  records: [],
  addRecord: (record) => {
    set((state) => ({ records: [...state.records, record] }));
  },
  removeRecord: (id) => {
    set((state) => ({
      records: state.records.filter((record) => record.id !== id),
    }));
  },
  changeQuantity: (id, quantity) => {
    set((state) => ({
      records: state.records.map((record) => {
        if (record.product_id === id) {
          const newQuantity = parseInt(record.quantity) + parseInt(quantity);
          const newCost = record.product.price * newQuantity;
          return { ...record, quantity: newQuantity, cost: newCost };
        }
        return record;
      }),
    }));
  },

  resetRecord: () => set({ records: [] }),
}));

export default useSaleProductStore;


      // addRecord({
      //   product: currentProduct,
      //   product_id: currentProduct.id,
      //   quantity: data.quantity,
      //   cost: currentProduct.price * data.quantity,
      //   created_at: new Date().toISOString(),
      // });
