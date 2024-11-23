import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { cartActions } from "../Store/cartCounter-slice";
import { deleteCartItem, updateCartItem } from "../util/Http";
import { IconTrashDelete, IconMathMinus, IconPlusLg } from "../Icons";

export default function CartIem({
  id,
  name,
  image,
  price,
  category,
  quantity,
}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: (quantity) => updateCartItem(token, id, quantity),
    onSuccess: (data) => {
      if (data?.status === "success") {
        notifySuccess("Quantity updated successfully");
        queryClient.invalidateQueries(["cart", token]);
      } else {
        notifyError("Failed to update item! Try again.");
      }
    },
    onError: () => {
      notifyError("Failed to update item");
    },
  });

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCartItem(token, id),
    onSuccess: (data) => {
      if (data?.status === "success") {
        notifySuccess("Item deleted successfully");
        queryClient.invalidateQueries(["cart", token]);
        dispatch(cartActions.decreaseCounter());
      } else {
        notifyError("Failed to delete item! Try again.");
      }
    },
    onError: () => {
      notifyError("Failed to delete item");
    },
  });

  return (
    <div className="flex flex-col gap-5 border-b border-gray-200 py-6 min-[500px]:flex-row min-[500px]:items-center">
      <div className="w-full px-16 min-[500px]:px-0 md:max-w-32">
        <img
          src={`http://localhost:3001/${image}`}
          alt={`${name} product image`}
          className="mx-auto rounded-xl md:rounded-md"
        />
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-3 max-[500px]:items-center">
            <h6 className="text-base font-semibold leading-7 text-black">
              {name}
            </h6>
            <h6 className="text-base font-normal leading-7 text-gray-500">
              {category}
            </h6>
            <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300">
              <span className="mr-1">{price}</span>
              L.E
            </h6>
          </div>
        </div>

        <div className="flex h-full items-center max-md:mt-3 max-[500px]:justify-center">
          <div className="flex h-full items-center">
            <button
              onClick={() => {
                if (quantity > 1) {
                  updateItem(quantity - 1);
                }
              }}
              disabled={isUpdating}
              className="group flex items-center justify-center rounded-l-xl border border-gray-200 px-3 py-[14px] shadow-sm shadow-transparent transition-all duration-500 focus-within:outline-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:px-5 md:py-[18px]"
            >
              <IconMathMinus className="h-5 w-5 text-black transition-all duration-200" />
            </button>
            <input
              type="text"
              className="max-w-[73px] border-y border-gray-200 bg-transparent py-[12px] text-center text-base font-semibold text-gray-900 outline-none placeholder:text-gray-900 md:w-full md:min-w-[60px] md:py-[14px] md:text-lg"
              value={quantity}
              // readOnly
              disabled
            />
            <button
              onClick={() => {
                updateItem(quantity + 1);
              }}
              disabled={isUpdating}
              className="group flex items-center justify-center rounded-r-xl border border-gray-200 px-3 py-[14px] shadow-sm shadow-transparent transition-all duration-500 focus-within:outline-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-300 disabled:cursor-not-allowed disabled:opacity-50 md:px-5 md:py-[18px]"
            >
              <IconPlusLg className="h-5 w-5 text-black transition-all duration-200" />
            </button>
          </div>
        </div>

        <div className="flex h-full flex-col items-start gap-3 max-md:mt-3 max-[500px]:items-center max-[500px]:justify-center md:items-end md:justify-end">
          <p className="text-center text-lg font-bold leading-8 text-gray-600 transition-all duration-300">
            {price * quantity} L.E
          </p>

          <button
            onClick={() => {
              deleteItem();
            }}
            disabled={isDeleting}
            className="group flex items-center justify-center rounded-full focus-within:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 transition-all duration-200 group-hover:bg-red-400">
              <span className="sr-only">Delete</span>
              <IconTrashDelete className="h-6 w-6 text-red-500 group-hover:text-white md:h-5 md:w-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
