import { ArrowsPointingOutIcon, HeartIcon } from "@heroicons/react/16/solid";
import { useContext, useState } from "react";
import { HitType } from "../types/ResponseType";
import ImageModal from "./ImageModal";
import { LikedContext } from "../context/LikedContext";

export const ImageGrid = ({
  results,
  loading,
}: {
  results: HitType[];
  loading: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<HitType>({} as HitType);

  const { likedImages, likeHandler, dislikeHandler } = useContext(LikedContext);

  const handleShowModal = (image: HitType) => {
    setShowModal(true);
    setPreview(image);
  };

  const handleLike = (image: HitType) => {
    likedImages.some((likedImage) => likedImage.id === image.id)
      ? dislikeHandler(image.id)
      : likeHandler(image);
  };

  const alreadyLiked = (image: HitType) => {
    return likedImages.some((likedImage) => likedImage.id === image.id);
  };

  if (results.length === 0) return <p>No results found</p>;
  if (loading) return <p>Loading</p>;

  return (
    <>
      <div className="columns-4 w-[1200 px] h-[640 px] mx-auto gap-3 space-y-3">
        {results.map((result: HitType, index: number) => (
          <div key={index} className="break-inside-avoid relative group">
            <img
              className="max-w-full rounded-lg"
              src={result.webformatURL}
              alt=""
              width={result.webformatWidth}
              height={result.webformatHeight}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-indigo-300 opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out" />

            <button
              className="hidden group-hover:block absolute top-1 right-1 transition duration-300 ease-in-out hover:opacity-100"
              onClick={() => handleShowModal(result)}
            >
              <ArrowsPointingOutIcon className="h-6 w-6 text-blue-500" />
            </button>

            <button
              className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 transition duration-300 ease-in-out hover:opacity-100"
              onClick={() => handleLike(result)}
            >
              <HeartIcon
                className={`h-10 w-10  ${
                  alreadyLiked(result) ? "text-red-500" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <ImageModal
        showModal={showModal}
        setShowModal={setShowModal}
        image={preview}
        handleLike={handleLike}
        alreadyLiked={alreadyLiked}
      />
    </>
  );
};
