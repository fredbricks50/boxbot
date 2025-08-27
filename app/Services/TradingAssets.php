<?php

namespace App\Services;
use Livewire\Wireable;

class TradingAssets implements Wireable
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public string $name,
        public string $percentage,
        public string $image,
        public string $assetType,
        public string $symbol,
    )
    {
        //
    }

    public static function all(): array
    {
        return [
            new self("BTC/USDT", "91%", "btc.png", "coin", "BTCUSDT"),
            new self("ETH/USDT", "95%", "eth.png", "coin", "ETHUSDT"),
            new self("LTC/USDT", "95%", "ltc.png", "coin", "LTCUSDT"),
            new self("SOL/USDT", "98%", "sol.png", "coin", "SOLUSDT"),
            new self("XRP/USDT", "93%", "xrp.png", "coin", "XRPUSDT"),
            new self("DOGE/USDT", "83%", "doge.png", "coin", "DOGEUSDT"),
            new self("BCH/USDT", "89%", "bch.png", "coin", "BCHUSDT"),
            new self("DAI/USDT", "97%", "dai.png", "coin", "DAIUSDT"),
            new self("BNB/USDT", "87%", "bnb.png", "coin", "BNBUSDT"),
            new self("ADA/USDT", "93%", "ada.png", "coin", "ADAUSDT"),
            new self("AVAX/USDT", "99%", "avax.png", "coin", "AVAXUSDT"),
            new self("TRX/USDT", "90%", "trx.png", "coin", "TRXUSDT"),
            new self("MATIC/USDT", "91%", "matic.png", "coin", "MATICUSDT"),
            new self("ATOM/USDT", "96%", "atom.png", "coin", "ATOMUSDT"),
            new self("LINK/USDT", "87%", "link.png", "coin", "LINKUSDT"),
            new self("DASH/USDT", "87%", "dash.png", "coin", "DASHUSDT"),
            new self("XLM/USDT", "93%", "xlm.png", "coin", "XLMUSDT"),
            new self("NEO/USDT", "93%", "neo.png", "coin", "NEOUSDT"),
            new self("Basic Altcoin Index", "88%", "ALTCOIN.svg", "coin", "XAI"),
            new self("BAT/USDT", "83%", "bat.png", "coin", "BATUSDT"),
            new self("ETC/USDT", "86%", "etc.png", "coin", "ETCUSDT"),
            new self("ZEC/USDT", "94%", "zec.png", "coin", "ZECUSDT"),
            new self("ONT/USDT", "96%", "ont.png", "coin", "ONTUSDT"),
            new self("STX/USDT", "96%", "stx.png", "coin", "STXUSDT"),
            new self("MKR/USDT", "95%", "mkr.png", "coin", "MKRUSDT"),
            new self("AAVE/USDT", "90%", "aave.png", "coin", "AAVEUSDT"),
            new self("XMR/USDT", "99%", "xmr.png", "coin", "XMRUSDT"),
            new self("YFI/USDT", "95%", "yfi.png", "coin", "YFIUSDT"),
            new self("Gold", "89%", "XAUUSD.svg", "currency", "XAUUSD"),
            new self("EUR/USD", "99%", "EURUSD_OTC.svg", "currency", "EURUSD"),
            new self("AUD/CAD", "96%", "AUDCAD.svg", "currency", "AUDCAD"),
            new self("GBP/USD", "85%", "GBPUSD_OTC.svg", "currency", "GBPUSD"),
            new self("GBP/NZD", "89%", "GBPNZD.svg", "currency", "GBPNZD"),
            new self("USD/JPY", "97%", "USDJPY_OTC.svg", "currency", "USDJPY"),
            new self("EUR/GBP", "95%", "EURGBP.svg", "currency", "EURGBP"),
            new self("GBP/CHF", "90%", "GBPCHF.svg", "currency", "GBPCHF"),
            new self("GBP/CAD", "88%", "GBPCAD.svg", "currency", "GBPCAD"),
            new self("NASDAQ", "92%", "NQ.svg", "currency", "NQ"),
            new self("CAC 40", "94%", "FCE.svg", "currency", "CAC40"),
            new self("Copper", "86%", "HG.svg", "currency", "XCUUSD"),
            new self("FTSE 100", "96%", "Z.svg", "currency", "FTSE"),
            new self("AUD/JPY", "93%", "AUDJPY.svg", "currency", "AUDJPY"),
            new self("CAD/CHF", "77%", "CADCHF.svg", "currency", "CADCHF"),
            new self("CAD/JPY", "85%", "CADJPY.svg", "currency", "CADJPY"),
            new self("EUR/AUD", "97%", "EURAUD.svg", "currency", "EURAUD"),
            new self("EUR/JPY", "91%", "EURJPY.svg", "currency", "EURJPY"),
            new self("EUR/CAD", "99%", "EURCAD.svg", "currency", "EURCAD"),
            new self("GPB/JPY", "83%", "GBPJPY.svg", "currency", "GBPJPY"),
            new self("NZD/CAD", "90%", "NZDCAD.svg", "currency", "NZDCAD"),
            new self("NZD/CHF", "98%", "NZDCHF.svg", "currency", "NZDCHF"),
            new self("NZD/JPY", "95%", "NZDJPY.svg", "currency", "NZDJPY"),
            new self("USD/MXN", "95%", "USDMXN.svg", "currency", "USDMXN"),
            new self("USD/SGD", "98%", "USDSGD.svg", "currency", "USDSGD"),
            new self("NZD/USD", "96%", "NZDUSD_OTC.svg", "currency", "NZDUSD"),
            new self("USD/CHF", "91%", "USDCHF_OTC.svg", "currency", "USDCHF"),
            new self("AUD/CHF", "96%", "AUDCHF.svg", "currency", "AUDCHF"),
            new self("CHF/JPY", "99%", "CHFJPY.svg", "currency", "CHFJPY"),
            // Add more as needed
        ];
    }

    public function toLivewire()
    {
        return [
            'name' => $this->name,
            'percentage' => $this->percentage,
            'image' => $this->image,
            'assetType' => $this->assetType,
            'symbol' => $this->symbol,
        ];
    }

    public static function fromLivewire($value)
    {
        return new self(
            $value['name'],
            $value['percentage'],
            $value['image'],
            $value['assetType'],
            $value['symbol'],
        );
    }


    
}
