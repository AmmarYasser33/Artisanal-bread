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

const position = [30.0113975, 31.1949437];

export default function ContactUsSection() {
  return (
    <div className="mx-auto my-24 max-w-7xl items-center justify-center px-4 sm:px-6 lg:mt-16 lg:px-8">
      <h1 className="mb-16 text-center text-3xl font-bold uppercase">
        Need help?
        <span className="ml-4 text-primary-500">Contact us</span>
      </h1>

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

      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
        <div className="flex items-center space-x-4 rounded-md bg-primary-50 p-4 shadow-lg">
          <div className="rounded-full bg-primary-600 p-3">
            <IconBxTimeFive className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">Opening Hours</h2>
            <p className="font-roboto text-base text-secondary-900">
              Monday - Friday: 9AM - 7PM
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-primary-50 p-4 shadow-lg">
          <div className="rounded-full bg-primary-600 p-3">
            <IconLocationOutline className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">Address</h2>
            <p className="font-roboto text-base text-secondary-900">
              1234 Street Name, City Name, Egypt
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-primary-50 p-4 shadow-lg">
          <div className="rounded-full bg-primary-600 p-3">
            <IconPhone className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">Call Us</h2>
            <p className="font-roboto text-base text-secondary-900">
              +20 123 456 789
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md bg-primary-50 p-4 shadow-lg">
          <div className="rounded-full bg-primary-600 p-3">
            <IconMailOutline className="h-7 w-7 text-white" />
          </div>
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-bold text-gray-600">Email Us</h2>
            <p className="font-roboto text-base text-secondary-900">
              info@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
