import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/userInfo-slice";
import { cartActions } from "../Store/cartCounter-slice";
import { saveIsLoginState } from "../Store/userInfo-actions";
import { profileActions } from "../Store/profileInfo-slice";
import { IconBxsError } from "../Icons";

export default function LogoutModal({ isModalOpen, setIsModalOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    dispatch(userActions.setRole(""));
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    dispatch(userActions.setIsLogin(false));
    dispatch(saveIsLoginState(false));
    dispatch(profileActions.setProfileInfo(null));
    dispatch(cartActions.setCounter(0));

    toast.success(t("logout.success"));

    navigate("/");
  };

  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center font-roboto sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
            <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <IconBxsError
                    className="h-10 w-10 text-yellow-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <h3 className="text-xl font-medium text-secondary-800">
                      {t("logout.warning")}
                    </h3>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-base font-medium text-white shadow-sm transition duration-300 ease-in-out hover:bg-yellow-800 focus:scale-95 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:col-start-2 sm:text-sm"
                        onClick={logoutHandler}
                      >
                        {t("logout.confirm")}
                      </button>

                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition duration-300 ease-in-out hover:bg-gray-100 focus:scale-95 focus:outline-none sm:col-start-1 sm:mt-0 sm:text-sm"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("logout.cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
