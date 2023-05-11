import {
  useLocation,
  useParams,
  Link,
  Outlet,
  useMatch,
} from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { darkTheme } from "../Themes";
import { Helmet } from "react-helmet";

import Spinner from "../component/Spinner";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import ErrorView from "../component/ErrorView";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  padding: 5em 0 2em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: ${(props) => props.theme.accentColor};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div<{ width: string }>`
  margin: 1em 0;
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  box-shadow: ${(props) => props.theme.boxShadow};

  div {
    padding: 0.8em 1em;
    display: flex;
    align-items: center;
    span {
      padding-left: 0.5em;
      color: ${(props) => props.theme.textColor};
      &:nth-child(odd) {
        width: 65px;
        font-size: small;
      }
      &:nth-child(even) {
        padding: 0 1em;
        font-weight: 600;
      }
    }
  }
  p {
    &:first-child {
      padding: 1em 1em 0em;
      font-weight: 800;
    }
    &:last-child {
      padding: 1em;
      word-break: keep-all;
      font-size: 15px;
      line-height: 1.5;
    }
  }
`;
const TabBtn = styled(Link)<{ isactive: string }>`
  background-color: ${(props) =>
    props.isactive === "true" ? props.theme.accentColor : props.theme.boxColor};
  padding: 1em 4.9em;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 800;
  border-radius: 15px;
  &:hover {
    color: ${(props) =>
      props.isactive === "true"
        ? props.theme.textColor
        : props.theme.accentColor};
    box-shadow: ${(props) => props.theme.accentColor} 0px 2px 10px 0px inset;
  }
`;
interface RouterParams {
  coinId?: string;
}

interface RouterState {
  state: {
    name: string;
  };
}
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams() as RouterParams;
  const { state } = useLocation() as RouterState;

  const {
    isLoading: infoLoading,
    data: info,
    isError: isErrorInfo,
    error: errorInfo,
  } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(`${coinId}`));
  const {
    isLoading: priceLoading,
    data: price,
    isError: isErrorPrice,
    error: errorPrice,
  } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinPrice(`${coinId}`),
    { refetchInterval: 5000 }
  );

  const loading = infoLoading || priceLoading;
  const errorData = isErrorInfo || isErrorPrice;
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");

  return (
    <Container>
      <>
        <Helmet>
          <title>{state?.name || info?.name}</title>
        </Helmet>
        <Header>
          <Link to="/">
            <FontAwesomeIcon icon={faCircleChevronLeft} size="3x" />
          </Link>
          <Title>{state?.name || info?.name}</Title>
        </Header>
        <>
          {loading ? (
            <Spinner
              visible={true}
              color={darkTheme.accentColor}
              width={300}
              height={300}
              layerHeight="100%"
            />
          ) : errorData ? (
            <ErrorView
              errorMsg={
                (errorInfo as Error)?.message || (errorPrice as Error)?.message
              }
            />
          ) : (
            <>
              <InfoContainer>
                <InfoBox width={"48%"}>
                  <div>
                    <span>RAKE</span>
                    <span>{info?.rank}</span>
                  </div>
                  <div>
                    <span>SYMBOL</span>
                    <span>{info?.symbol}</span>
                  </div>
                  <div>
                    <span>PRICE</span>
                    <span>{price?.quotes.USD.price.toFixed(3)}</span>
                  </div>
                </InfoBox>
                <InfoBox width={"48%"}>
                  <div style={{ marginTop: "0.5em" }}>
                    <span>TOTAL SUPLY</span>
                    <span>{price?.total_supply.toString().slice(0, 8)}</span>
                  </div>
                  <div>
                    <span>MAX SUPLY</span>
                    <span>{price?.max_supply}</span>
                  </div>
                </InfoBox>
              </InfoContainer>
              <InfoBox width={"100%"}>
                <p>Description</p>
                <p>{info?.description}</p>
              </InfoBox>
              <div style={{ margin: "2.5em 0" }}>
                <TabBtn
                  to={`/${coinId}/chart`}
                  isactive={chartMatch !== null ? "true" : "false"}
                >
                  Chart
                </TabBtn>
                <TabBtn
                  to={`/${coinId}/price`}
                  isactive={priceMatch !== null ? "true" : "false"}
                >
                  Price
                </TabBtn>
              </div>
              <div>
                <Outlet
                  context={{ coinId: coinId, priceData: price?.quotes.USD }}
                />
              </div>
            </>
          )}
        </>
      </>
    </Container>
  );
};

export default Coin;
