import { createContext, useState } from "react";
import { HitType } from "../types/ResponseType";

export const LikedContext = createContext({
  likedImages: [] as HitType[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  likeHandler: (image: HitType) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dislikeHandler: (id: number) => {},
  loading: false,
});

// Defining a simple HOC component
const LikedContextProvider = (props: { children: React.ReactNode }) => {
  const [likedImages, setLikedImages] = useState<HitType[]>(
    JSON.parse(localStorage.getItem("likedImages") || "[]")
  );
  const [loading, setIsLoading] = useState(false);

  const likeHandler = (image: HitType) => {
    setIsLoading(true);

    setLikedImages((prev) => {
      const newArray = [...prev, image];
      localStorage.setItem("likedImages", JSON.stringify(newArray));
      return newArray;
    });

    setIsLoading(false);
  };

  const dislikeHandler = (id: number) => {
    setIsLoading(true);

    setLikedImages((prev) => {
      const filteredArray = prev.filter((image) => image.id !== id);
      localStorage.setItem("likedImages", JSON.stringify(filteredArray));
      return filteredArray;
    });

    setIsLoading(false);
  };

  return (
    <LikedContext.Provider
      value={{
        likedImages: likedImages,
        likeHandler: likeHandler,
        dislikeHandler: dislikeHandler,
        loading: loading,
      }}
    >
      {props.children}
    </LikedContext.Provider>
  );
};

export default LikedContextProvider;
