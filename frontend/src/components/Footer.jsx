import {
  IconLocationDot,
  IconTelephoneFill,
  IconMail,
  IconFacebook,
  IconInstagram,
  IconYoutube,
  IconWhatsapp,
} from "../Icons";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

import "leaflet/dist/leaflet.css";

const position = [30.0113975, 31.1949437];

export default function Footer() {
  return (
    <div className="flex flex-col items-center space-y-10 bg-primary-900 p-7 text-center text-white md:flex-row md:space-y-0">
      <div className="mr-0 md:mr-16 lg:mr-52">
        <h1 className="mb-8 text-2xl font-bold">Get in Touch</h1>

        <a
          href="https://maps.app.goo.gl/ADaDXmUKtsyqkivq7"
          target="_blank"
          className="mb-2 flex items-center justify-center font-roboto"
        >
          <IconLocationDot className="mr-2 h-5 w-5" />
          <span>El-Maadi, Cairo, Egypt</span>
        </a>
        <a
          href="tel:+20123456789"
          className="mb-2 flex items-center justify-center font-roboto"
          target="_blank"
        >
          <IconTelephoneFill className="mr-2 h-5 w-5" />
          <span>+201069262663</span>
        </a>
        <a
          href="mailto:ammar.yassr.33@gmail.com"
          className="mb-6 flex items-center justify-center font-roboto"
          target="_blank"
        >
          <IconMail className="mr-2 h-5 w-5" />
          <span>ammar.yassr.33@gmail.com</span>
        </a>

        {/* Social */}
        <div className="flex justify-center space-x-2">
          <a
            href="https://facebook.com"
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconFacebook className="h-6 w-6" />
          </a>
          <a
            href="https://wa.me/+201069262663"
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconWhatsapp className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="rounded-full p-2 ring-1 ring-white duration-300 ease-in-out hover:bg-white hover:text-primary-900"
          >
            <IconYoutube className="h-6 w-6" />
          </a>
        </div>
      </div>

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
    </div>
  );
}
