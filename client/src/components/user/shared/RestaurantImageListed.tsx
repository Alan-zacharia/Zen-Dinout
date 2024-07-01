import { useEffect, useState } from "react";
import axiosInstance from "axios";

const RestaurantImagesListed = ({
  restaurantId,
}: {
  restaurantId: string | undefined;
}) => {
  const [restuarantImages, setRestaurantImages] = useState<string[]>([""]);
  useEffect(() => {
    const fetchRestaurantImages = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3000/api/restaurant-photos/${restaurantId}`
        );
        setRestaurantImages(response.data.listedRestaurantImages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurantImages();
  }, []);

  return (
    <div className="max-h-auto mx-16 ">
      <div className="flex gap-4 flex-col ">
        <div className="flex gap-4 flex-wrap w-2/3 ">
          {restuarantImages &&
            restuarantImages.map((image) => {
              return (
                <>
                  <img
                    src={image}
                    alt="restuarntImages"
                    className="w-[250px] rounded-xl cursor-pointer transition duration-200 hover:scale-105 "
                  />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantImagesListed;
