export interface ICoinDetails {
    symbol: string;
    name: string;
    priceUsd: string;
}

export const getCoinPrice = async (coin: string): Promise<ICoinDetails | string> => {
    let url = `https://api.coincap.io/v2/assets?search=${coin}&limit=1`;
    if (!coin || coin === '') return '';
    return await fetch(url).then(res => res.json()).then(data => {
        if (data.data.length === 0) {
            return 'not found';
        } else {
            return {
                symbol: data.data[0].symbol,
                name: data.data[0].name,
                priceUsd: data.data[0].priceUsd
            };
        }
    });
};