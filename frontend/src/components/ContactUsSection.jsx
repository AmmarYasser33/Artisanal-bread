import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  IconLocationOutline,
  IconPhone,
  IconBxTimeFive,
  IconMailOutline,
} from "../Icons";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

import "leaflet/dist/leaflet.css";

export default function ContactUsSection() {
  const { t } = useTranslation();
  const isArLang = localStorage.getItem("i18nextLng") === "ar";
  const arAddress = useSelector((state) => state.configs.arAddress);
  const enAddress = useSelector((state) => state.configs.enAddress);
  const arOpeningHours = useSelector((state) => state.configs.arOpeningHours);
  const enOpeningHours = useSelector((state) => state.configs.enOpeningHours);
  const phone = useSelector((state) => state.configs.phone);
  const mapX = useSelector((state) => state.configs.xCoordinate);
  const mapY = useSelector((state) => state.configs.yCoordinate);
  const email = useSelector((state) => state.configs.email);

  const position = [mapX, mapY];

  return (
    <div className="mx-auto my-24 max-w-7xl items-center justify-center px-4 sm:px-6 lg:mt-16 lg:px-8 rtl:font-roboto">
      <h1 className="mb-16 text-center text-3xl font-bold uppercase">
        {t("contacts.help")}
        <span className="ms-4 text-[var(--color-primary-500)]">
          {t("contacts.contactUs")}
        </span>
      </h1>

      {mapX && mapY && (
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={true}
          className="h-80 w-full shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Welcome to Artisanal bread! <br /> We are here.
            </Popup>
          </Marker>
        </MapContainer>
      )}

      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
        <div className="flex items-center space-x-4 rounded-md bg-[var(--color-primary-50)] p-4 shadow-lg rtl:space-x-reverse">
          <div className="rounded-full bg-[var(--color-primary-600)] p-3">
            <IconBxTimeFive className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">
              {t("contacts.opening")}
            </h2>
            <p className="font-roboto text-base text-secondary-900">
              {isArLang ? arOpeningHours : enOpeningHours}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-[var(--color-primary-50)] p-4 shadow-lg rtl:space-x-reverse">
          <div className="rounded-full bg-[var(--color-primary-600)] p-3">
            <IconLocationOutline className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">
              {t("contacts.address")}
            </h2>
            <p className="font-roboto text-base text-secondary-900">
              {isArLang ? arAddress : enAddress}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-[var(--color-primary-50)] p-4 shadow-lg rtl:space-x-reverse">
          <div className="rounded-full bg-[var(--color-primary-600)] p-3">
            <IconPhone className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">
              {t("contacts.callUs")}
            </h2>
            <p className="font-roboto text-base text-secondary-900">
              {!isArLang
                ? `+${phone.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4")}`
                : `${phone}+`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-[var(--color-primary-50)] p-4 shadow-lg rtl:space-x-reverse">
          <div className="rounded-full bg-[var(--color-primary-600)] p-3">
            <IconMailOutline className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">
              {t("contacts.emailUs")}
            </h2>
            <p className="font-roboto text-base text-secondary-900">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
