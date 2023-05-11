import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";

import { fetchChartPrice } from "../api";
import { darkTheme } from "../Themes";
import { darkThemeState } from "../atom";

import ErrorView from "../component/ErrorView";
import Spinner from "../component/Spinner";

interface ICoinChart {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<{
    coinId: string;
  }>();

  const { isLoading, data, isError, error } = useQuery<ICoinChart[]>(
    ["chartData"],
    () => fetchChartPrice(`${coinId}`)
  );
  const isDark = useRecoilValue(darkThemeState);

  return (
    <div>
      {isLoading ? (
        <Spinner
          visible={true}
          color={darkTheme.accentColor}
          width={300}
          height={300}
          layerHeight="25em"
        />
      ) : isError ? (
        <ErrorView errorMsg={(error as Error).message} />
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["#00FFCA", "#05BFDB"],
                  stops: [50, 100],
                },
              },
              colors: ["#0A4D68"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map((v) => ({
                    x: new Date(v.time_close),
                    y: [
                      Number(v.open),
                      Number(v.high),
                      Number(v.low),
                      Number(v.close),
                    ],
                  })) ?? [],
              },
            ]}
            options={{
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
                type: "candlestick",
              },
              annotations: {
                xaxis: [
                  {
                    x: "Oct 06 14:00",
                    borderColor: "#00E396",
                    label: {
                      borderColor: "#00E396",
                      style: {
                        fontSize: "12px",
                        color: "#fff",
                        background: "#00E396",
                      },
                      orientation: "horizontal",
                      offsetY: 7,
                      text: "Annotation Test",
                    },
                  },
                ],
              },
              tooltip: {
                enabled: true,
              },
              yaxis: {
                show: false,
              },
              grid: { show: false },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map(
                  (price) => new Date(price.time_close * 1000)
                ),
              },
              theme: {
                mode:  isDark ? "dark" : "light",
              },
              plotOptions: {
                candlestick: {
                  wick: {
                    useFillColor: true,
                  },
                  colors: {
                    upward: "#03C988",
                    downward: "#FC433A",
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chart;
