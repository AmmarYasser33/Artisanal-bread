import { useTranslation } from "react-i18next";
import {
  IconTruckDeliveryOutline,
  IconCheck2,
  IconClose,
  IconBxTimeFive,
} from "../Icons";

export default function OrderStatus({ status }) {
  const { t } = useTranslation();

  const iconClass = "me-1 h-3 w-3";

  const statusIcon = {
    delivered: <IconCheck2 className={iconClass} />,
    cancelled: <IconClose className={iconClass} />,
    processing: <IconTruckDeliveryOutline className={iconClass} />,
    pending: <IconBxTimeFive className={iconClass} />,
  };

  const statusColor = {
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    processing: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <dd
      className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${statusColor[status]}`}
    >
      {statusIcon[status]}
      {t(`order.status.${status}`)}
    </dd>
  );
}
