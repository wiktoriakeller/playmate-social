import { useAppSelector } from "./hooks";
import { selectUserIdentity } from "../slices/userIdentitySlice";
import { IFriend } from "../slices/friendsListSlice";
import { IGame } from "../api/games/responses/getGamesResponse";
import { useLazyInitiateGameQuery } from "../api/games/gameIntegrationApi";

export const useInitiateGame = () => {
  const user = useAppSelector(selectUserIdentity);
  const [initializeGame] = useLazyInitiateGameQuery();

  const StartGame = (opponent: IFriend, game: IGame) => {
    initializeGame({
      gameUrl: game.serverUrl,
      payload: {
        receiverId: opponent.id,
        receiverName: opponent.username,
        senderId: user.id,
        senderName: user.username
      }
    })
      .unwrap()
      .then((urls) => {
        console.log(urls);
        window.open(urls.senderGameUrl, "_blank");
      })
      .catch((rejected) => console.error(rejected));
  };

  return { StartGame };
};
