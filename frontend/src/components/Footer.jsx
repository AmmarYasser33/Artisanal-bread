import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  IconLocationDot,
  IconTelephoneFill,
  IconMail,
  IconFacebook,
  IconInstagram,
  IconTiktok,
  IconWhatsapp,
} from "../Icons";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

import "leaflet/dist/leaflet.css";

export default function Footer() {
  const { t } = useTranslation();
  const address = useSelector((state) => state.configs.address);
  const phone = useSelector((state) => state.configs.phone);
  const mapX = useSelector((state) => state.configs.xCoordinate);
  const mapY = useSelector((state) => state.configs.yCoordinate);
  const locationLink = useSelector((state) => state.configs.locationLink);
  const email = useSelector((state) => state.configs.email);
  const facebook = useSelector((state) => state.configs.facebook);
  const whatsapp = useSelector((state) => state.configs.whatsapp);
  const instagram = useSelector((state) => state.configs.instagram);
  const tiktok = useSelector((state) => state.configs.tiktok);

  const position = [mapX, mapY];

  return (
    <div className="flex flex-col items-center space-y-10 bg-primary-900 p-7 text-center text-white md:flex-row md:space-y-0 rtl:font-roboto">
      <div className="mr-0 ltr:md:ml-16 ltr:lg:mr-52 rtl:md:mr-16 rtl:lg:ml-52">
        <h1 className="mb-8 text-2xl font-bold">{t("footer.heading")}</h1>

        <a
          href={locationLink}
          target="_blank"
          className="mb-2 flex items-center justify-center font-roboto"
        >
          <IconLocationDot className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
          <span>{address}</span>
        </a>
        <a
          href={`tel:+${phone}`}
          className="mb-2 flex items-center justify-center font-roboto"
          target="_blank"
        >
          <IconTelephoneFill className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
          <span>+{phone}</span>
        </a>
        <a
          href={`mailto:${email}`}
          className="mb-6 flex items-center justify-center font-roboto"
          target="_blank"
        >
          <IconMail className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
          <span>{email}</span>
        </a>

        {/* Social */}
        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
          <a
            href={facebook}
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconFacebook className="h-6 w-6" />
          </a>
          <a
            href={`https://wa.me/+${whatsapp}`}
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconWhatsapp className="h-6 w-6" />
          </a>
          <a
            href={instagram}
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconInstagram className="h-6 w-6" />
          </a>
          <a
            href={tiktok}
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconTiktok className="h-6 w-6" />
          </a>
        </div>
      </div>

      {mapX && mapY && (
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={true}
          className="h-80 w-full shadow-2xl"
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
    </div>
  );
}
