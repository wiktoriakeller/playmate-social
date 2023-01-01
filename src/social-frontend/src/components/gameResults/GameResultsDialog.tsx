import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { useAppSelector } from "../../app/storeHooks";
import { IGameResult, selectGameResults } from "../../slices/gameResultsSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";

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
    { name: "Won Games", value: winCount },
    { name: "Lost Games", value: mappedResults.length - winCount }
  ];

  return pieChartData;
};

const chartColors = ["#4caf50", "#ef5350"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${value}`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const GameResultsDialog = (props: IGameResultsPageProps) => {
  const results = useAppSelector(selectGameResults)[props.game.id];
  const currentUserId = useAppSelector(selectUserIdentity).id;
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = useCallback(
    (_, index: number) => {
      console.log(index);
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const handleCloseDialog = () => {
    props.handleClose();
    setActiveIndex(-1);
  };

  const pieData = useMemo(() => {
    if (!!results) {
      return getMappedData(results, currentUserId);
    }

    return [];
  }, [results, currentUserId]);

  return (
    <Dialog open={props.open} onClose={handleCloseDialog}>
      <DialogTitle>{props.game.name} - completed games</DialogTitle>
      <DialogContent>
        {pieData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              onMouseEnter={onPieEnter}
              label={renderCustomizedLabel}
              labelLine={false}
              onAnimationEnd={() => setActiveIndex(0)}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        ) : (
          <Typography>Not enough data to display chart!</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GameResultsDialog;
