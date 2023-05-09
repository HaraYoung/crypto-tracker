import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";

const PriceBox = styled.div<{ width: string }>`
  margin: 1em 0.5em;
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.darkColor};
  border-radius: 15px;
  padding: 1em;
  box-shadow: ${(props) => props.theme.boxShadow};
  p {
    &:first-child {
      font-size: 14px;
      color: gainsboro;
    }
    &:last-child {
      padding: 0.5em 0;
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

const PriceChangePercentage = styled.p<{ textColor: string }>`
  color: ${(props) => (props.textColor === "true" ? "#03C988" : "#FC433A")};
  margin-top: 0.5em;
  span {
    &:first-child {
      display: inline-block;
      width: 100px;
      font-size: 40px;
      margin-right: 1em;
    }
    &:last-child {
      font-size: 20px;
    }
  }
`;

const PriceContainer = styled.div`
  display: flex;
`;

interface IPrice {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}
const Price = () => {
  const { priceData } = useOutletContext<{ priceData: IPrice }>();
  function percentVal(val: number): string {
    return val > 0.1 ? "true" : "false";
  }

  return (
    <div>
      <PriceBox width="98%">
        <p>
          {priceData.ath_date.slice(0, 16).replace("T", " ")} Highest price
          achieved
        </p>
        <p>{priceData.ath_price}</p>
      </PriceBox>
      <div>
        <PriceContainer>
          <PriceBox width="49%">
            <p>Than an hour ago</p>
            <PriceChangePercentage
              textColor={percentVal(priceData.percent_change_1h)}
            >
              <span>{priceData.percent_change_1h}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={
                      percentVal(priceData.percent_change_1h) === "true"
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                }
              </span>
            </PriceChangePercentage>
          </PriceBox>
          <PriceBox width="49%">
            <p>Than 6 hours ago</p>
            <PriceChangePercentage
              textColor={percentVal(priceData.percent_change_6h)}
            >
              <span>{priceData.percent_change_6h}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={
                      percentVal(priceData.percent_change_6h) === "true"
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                }
              </span>
            </PriceChangePercentage>
          </PriceBox>
        </PriceContainer>
        <PriceContainer>
          <PriceBox width="49%">
            <p>Than 12 hour ago</p>
            <PriceChangePercentage
              textColor={percentVal(priceData.percent_change_12h)}
            >
              <span>{priceData.percent_change_12h}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={
                      percentVal(priceData.percent_change_12h) === "true"
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                }
              </span>
            </PriceChangePercentage>
          </PriceBox>
          <PriceBox width="49%">
            <p>Than 24 hour ago</p>
            <PriceChangePercentage
              textColor={percentVal(priceData.percent_change_24h)}
            >
              <span>{priceData.percent_change_24h}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={
                      percentVal(priceData.percent_change_24h) === "true"
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                }
              </span>
            </PriceChangePercentage>
          </PriceBox>
        </PriceContainer>
        <PriceContainer>
          <PriceBox width="49%">
            <p>Than 7 days ago</p>
            <PriceChangePercentage
              textColor={percentVal(priceData.percent_change_7d)}
            >
              <span>{priceData.percent_change_7d}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={
                      percentVal(priceData.percent_change_7d) === "true"
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                }
              </span>
            </PriceChangePercentage>
          </PriceBox>
          <PriceBox width="49%">
            <p>Than 30 days ago</p>
            <PriceChangePercentage
              textColor={percentVal(priceData.percent_change_30d)}
            >
              <span>{priceData.percent_change_30d}</span>
              <span>
                {
                  <FontAwesomeIcon
                    icon={
                      percentVal(priceData.percent_change_30d) === "true"
                        ? faArrowTrendUp
                        : faArrowTrendDown
                    }
                  />
                }
              </span>
            </PriceChangePercentage>
          </PriceBox>
        </PriceContainer>
      </div>
    </div>
  );
};

export default Price;
