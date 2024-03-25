import { useContext } from "react";
import { ImageGrid } from "../components/ImageGrid";
import { LikedContext } from "../context/LikedContext";

export const LikedImages = () => {
  const { likedImages, loading } = useContext(LikedContext);

  return (
    <div className="flex items-center justify-between p-6 lg:px-8 flex-col gap-12">
      <ImageGrid results={likedImages} loading={loading} />
    </div>
  );
};
