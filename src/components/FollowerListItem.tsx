"use client";
import axios from "axios";
import { useState } from "react";
import { myFollowersType } from "@/type/type";

interface FollowerListItemProps {
  follower: string;
}

export const FollowerListItem: React.FC<FollowerListItemProps> = ({
  follower,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myFollowers, setMyFollowers] = useState<myFollowersType[]>([]);

  const getFollowerListByUser = async (useName: string) => {
    try {
      const res = await axios.get<myFollowersType[]>(
        `https://api.github.com/users/${useName}/following`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return [];
    }
  };

  const handleLoadFollower = async (userName: string) => {
    setIsLoading(true);
    const followers = await getFollowerListByUser(userName);
    setMyFollowers(followers);
    setIsLoading(false);
    setIsOpen(true);
  };

  return (
    <>
      <ul className="list-disc">
        <div className="flex gap-2 items-center mb-2">
          <li>
            {follower}
            {!isOpen && (
              <button
                className="bg-gray-400 text-white font-bold py-1 px-2 rounded ml-2"
                onClick={() => handleLoadFollower(follower)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load"}
              </button>
            )}
          </li>
        </div>
        {isOpen && (
          <ul className="pl-7">
            {myFollowers.map((item) => (
              <li key={item.id}>
                <FollowerListItem follower={item.login} />
              </li>
            ))}
          </ul>
        )}
      </ul>
    </>
  );
};
