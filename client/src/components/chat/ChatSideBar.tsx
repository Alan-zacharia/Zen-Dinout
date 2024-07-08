import React from "react";

const ChatSideBar = () => {
  return (
    <>
      <div className="  h-screen  overflow-scroll">
        <hr />

        {[1, 2, 3, 4, 5 , 6 ,7 ,8].map((index: number) => {
          return (
            <div className="mx-10 mt-10">
              <div>
                <div className="flex items-center py-8 border-b border-b-gray-300">
                  <div className="cursor-pointer flex items-center">
                    <div>
                      <img
                        src={
                          "https://static.vecteezy.com/system/resources/previews/000/574/512/large_2x/vector-sign-of-user-icon.jpg"
                        }
                        className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        Recipient Full Name
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        recipient@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatSideBar;
