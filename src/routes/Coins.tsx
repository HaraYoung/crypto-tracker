import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";

import Spinner from "../component/Spinner";
import { theme } from "../Themes";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  padding: 3em 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: bolder;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.darkColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    border-radius: 15px;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      box-shadow: ${(props) => props.theme.hoverBoxShadow};
    }
  }
  span {
    color: white;
    font-size: 18px;
    font-weight: 800;
    margin-left: 0.2em;
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoins[]>(["allCoin"], fetchCoins);
  return (
    <Container>
      {isLoading ? (
        <Spinner
          visible={true}
          color={theme.accentColor}
          width={300}
          height={300}
        />
      ) : (
        <>
          <Header>
            <Title>Coin</Title>
          </Header>
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <span>{coin.name}</span>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        </>
      )}
    </Container>
  );
};

export default Coins;
