//공통 URL
const BASIC_URL = "https://api.coinpaprika.com/v1";

//공통 에러상태 코드 처리
function errorBranches(res: { ok: boolean; status: number }) {
  if (!res.ok) {
    if (res.status === 400) {
      throw new Error("400 Bad request");
    } else if (res.status === 401) {
      throw new Error("401 Unauthorized");
    } else {
      throw new Error("An error occurred");
    }
  }
}

//코인 정보들을 불러오는 fetcher()
export async function fetchCoins() {
  const res = await fetch(`${BASIC_URL}/coins`);
  errorBranches(res);
  const data = await res.json();
  return data;
}

//각 코인의 기본 정보 fetcher()
export async function fetchCoinInfo(coinId: string) {
  const res = await fetch(`${BASIC_URL}/coins/${coinId}`);
  errorBranches(res);
  const data = await res.json();
  return data;
}
//각 코인의 가격 정보 fetcher()
export async function fetchCoinPrice(coinId: string) {
  const res = await fetch(`${BASIC_URL}/tickers/${coinId}`);
  errorBranches(res);
  const data = await res.json();
  return data;
}

//chart를 위한 코인 가격 정보 fetcher()
export async function fetchChartPrice(coinId: string) {
  const res = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  errorBranches(res);
  const data = await res.json();
  return data;
}