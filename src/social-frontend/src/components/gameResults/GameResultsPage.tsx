import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IGameResult, selectGameResults } from "../../slices/gameResultsSlice";
import { useAppSelector } from "../../app/hooks";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { Pie, PieChart, Cell } from "recharts";

export interface IGameResultsPageProps {
  open: boolean;
  game: IGame;
  handleClose: () => void;
}

const getMappedData = (data: IGameResult[], currentUserId: string) => {
  const mappedResults = data.map((x) => ({
    date: x.date,
    id: x.id,
    won: currentUserId === x.winnerId
  }));

  const winCount = mappedResults.filter((x) => x.won === true).length;
  const pieChartData = [
    { name: "won", value: winCount },
    { name: "lost", value: mappedResults.length - winCount }
  ];

  return pieChartData;
};

const renderLabel = (entry) => {
  return `${entry.name} - ${entry.value}`;
};

const COLORS = ["#4caf50", "#ef5350"];

const GameResultsPage = (props: IGameResultsPageProps) => {
  const results = useAppSelector(selectGameResults)[props.game.id];
  const currentUserId = useAppSelector(selectUserIdentity).id;
  const pieData = getMappedData(results, currentUserId);

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.game.name} - completed games</DialogTitle>
      <DialogContent>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            nameKey="name"
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={renderLabel}
            labelLine={false}
            paddingAngle={1}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </DialogContent>
    </Dialog>
  );
};

export default GameResultsPage;
