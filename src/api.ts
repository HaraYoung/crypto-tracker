const BASIC_URL = "https://api.coinpaprika.com/v1";

//코인 정보들을 불러오는 fetcher()
export async function fetchCoins() {
  return fetch(`${BASIC_URL}/coins`).then((res) => res.json());
}

//각 코인의 기본 정보 fetcher()
export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASIC_URL}/coins/${coinId}`).then((res) => res.json());
}
//각 코인의 가격 정보 fetcher()
export async function fetchCoinPrice(coinId: string) {
  return fetch(`${BASIC_URL}/tickers/${coinId}`).then((res) => res.json());
}

//chart를 위한 코인 가격 정보 fetcher()
export async function fetchChartPrice(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((res) => res.json());
}
