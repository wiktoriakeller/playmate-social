import CloseIcon from "@mui/icons-material/Close";
import { Box, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { IGame } from "../../api/games/responses/getGamesResponse";
import { getDesignTokens } from "../../app/providers/AppThemeProvider";
import { useAppSelector } from "../../app/storeHooks";
import { IGameResult, selectGameResults } from "../../slices/gameResultsSlice";
import { selectThemeMode } from "../../slices/themeSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { selectWindowSizeState } from "../../slices/windowSizeSlice";
import { StyledDialog } from "../../styled/components/common/StyledDialog";

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
    { name: "Wins", value: winCount },
    { name: "Loses", value: mappedResults.length - winCount }
  ];

  return pieChartData;
};

const chartColors = ["#4caf50", "#ef5350"];
const RADIAN = Math.PI / 180;

const GameResultsDialog = (props: IGameResultsPageProps) => {
  const themeMode = useAppSelector(selectThemeMode);
  const results = useAppSelector(selectGameResults)[props.game.id];
  const currentUserId = useAppSelector(selectUserIdentity).id;
  const [activeIndex, setActiveIndex] = useState(-1);
  const windowsSize = useAppSelector(selectWindowSizeState);

  const currentTheme = useMemo(() => getDesignTokens(themeMode), [themeMode]);

  const renderActiveShape = useCallback(
    (props) => {
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
            fill={currentTheme.palette.chartColors.primaryText}
          >{`${payload.name}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill={currentTheme.palette.chartColors.secondaryText}
          >
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    },
    [currentTheme]
  );

  const renderCustomizedLabel = useCallback(
    ({ cx, cy, midAngle, innerRadius, outerRadius, payload, value }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      let x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const textValue = windowsSize.matchesMediumWidth
        ? `${payload.name} - ${value}`
        : `${value}`;

      if (windowsSize.matchesMediumWidth) {
        x += payload.name === "Wins" ? 24 : -24;
      }

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fontSize={windowsSize.matchesMediumWidth ? 16 : 20}
        >
          {textValue}
        </text>
      );
    },
    [windowsSize.matchesMediumWidth]
  );

  const onPieEnter = useCallback((_, index: number) => {
    setActiveIndex(index);
  }, []);

  const pieData = useMemo(() => {
    if (!!results) {
      return getMappedData(results, currentUserId);
    }

    return [];
  }, [results, currentUserId]);

  const handleCloseDialog = () => {
    props.handleClose();
    setActiveIndex(-1);
  };

  const getCharMinWidth = () => {
    if (windowsSize.matchesSmallWidth) {
      return "250px";
    }

    if (windowsSize.matchesMediumWidth) {
      return "300px";
    }

    return "450px";
  };

  return (
    <StyledDialog
      open={props.open}
      onClose={handleCloseDialog}
      maxWidth={"md"}
      fullWidth={windowsSize.matchesSmallWidth ? true : false}
    >
      <DialogTitle sx={{ textAlign: "center", paddingBottom: "0px" }}>
        {`${props.game.name} statistics`}
        <IconButton
          aria-label="close"
          size={"small"}
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 10,
            top: 15,
            color: (theme) => theme.palette.grey[400]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: "0px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            minWidth: getCharMinWidth(),
            minHeight: windowsSize.matchesMediumWidth ? "300px" : "350px"
          }}
        >
          <PieChart
            width={windowsSize.matchesMediumWidth ? 250 : 400}
            height={windowsSize.matchesMediumWidth ? 200 : 300}
          >
            <Pie
              activeIndex={activeIndex}
              activeShape={
                windowsSize.matchesMediumWidth ? null : renderActiveShape
              }
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
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
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default GameResultsDialog;
