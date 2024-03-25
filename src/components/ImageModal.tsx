import { XMarkIcon } from "@heroicons/react/16/solid";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import React from "react";
import { HitType } from "../types/ResponseType";

export default function ImageModal({
  showModal,
  setShowModal,
  image,
  handleLike,
  alreadyLiked,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: HitType;
  handleLike: (image: HitType) => void;
  alreadyLiked: (image: HitType) => boolean;
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{image.user}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <XMarkIcon className="h-10 w-10" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <img src={image.webformatURL} alt="" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className=" background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => {
                      handleLike(image);
                      setShowModal(false);
                    }}
                  >
                    <HeartIcon
                      className={`h-10 w-10  ${
                        alreadyLiked(image) ? "text-red-500" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
