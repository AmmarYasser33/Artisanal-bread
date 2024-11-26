import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../util/Http";

const statuses = ["pending", "processing", "cancelled", "delivered"];

export default function ChangeOrderStatus({ currentStatus, orderId }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { mutate, isPending } = useMutation({
    mutationFn: (status) => updateOrderStatus(token, orderId, status),
    onSuccess: (data) => {
      if (data.status === "success") {
        notifySuccess("Order status updated!");
        queryClient.invalidateQueries("order");
      } else {
        notifyError(
          data?.response?.data?.message || "Failed to update order status!",
        );
      }
    },
    onError: () => {
      notifyError("Failed to update order status!");
    },
  });

  return (
    <div className="relative z-0 inline-flex overflow-hidden rounded-md shadow-md">
      {statuses.map((status, i) => (
        <button
          key={status}
          type="button"
          onClick={() => mutate(status)}
          disabled={isPending}
          className={`relative inline-flex items-center border border-primary-300 bg-primary-200 px-4 py-2 text-sm font-medium hover:bg-primary-500 hover:text-black focus:z-10 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-50 ${
            currentStatus === status
              ? "bg-primary-500 text-black"
              : "text-gray-700"
          } ${i !== 0 || i !== statuses.length - 1 ? "-ml-px" : ""}`}
        >
          {capitalizeFirstLetter(status)}
        </button>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
