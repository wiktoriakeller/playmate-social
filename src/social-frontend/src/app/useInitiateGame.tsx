import { useAppDispatch, useAppSelector } from "./hooks";
import { selectUserIdentity } from "../slices/userIdentitySlice";
import { IFriend } from "../slices/friendsListSlice";
import { IGame } from "../api/games/responses/getGamesResponse";
import { useLazyInitiateGameQuery } from "../api/games/gameIntegrationApi";
import { addChatMessage } from "../slices/chatSlice";

export const useInitiateGame = () => {
  const user = useAppSelector(selectUserIdentity);
  const dispatch = useAppDispatch();
  const [initializeGame] = useLazyInitiateGameQuery();

  const startGame = (opponent: IFriend, game: IGame) => {
    initializeGame({
      gameUrl: game.serverUrl,
      payload: {
        receiverId: opponent.id,
        receiverName: opponent.username,
        senderId: user.id,
        senderName: user.username,
        resultsUrl: ""
      }
    })
      .unwrap()
      .then((urls) => {
        dispatch(
          addChatMessage({
            senderId: user.id,
            senderUsername: user.username,
            receiverId: opponent.id,
            isCurrentUserReceiver: false,
            content: `Play ${game.name}`,
            createdAt: new Date().toISOString(),
            joinGameUrl: urls.receiverGameUrl
          })
        );
        window.open(urls.senderGameUrl, "_blank");
      })
      .catch((rejected) => console.error(rejected));
  };

  return { startGame };
};
