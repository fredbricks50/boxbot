<?php

use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title};

new 
#[Layout('components.layouts.home')]
#[Title('Home')]
class extends Component {
    //
}; ?>

<div>
    <section class="stats-section">
        <div class="w-layout-grid stats-grid">
            <div id="w-node-fda5b75b-5f1e-d0a4-b299-d5495d25befc-6af0bce5"
                data-w-id="fda5b75b-5f1e-d0a4-b299-d5495d25befc" class="stats-div">
                <h6 class="stats-title">Traders</h6>
                <div class="counter-div">
                    <h3 class="stats-header counter-traders">12000</h3>
                    <h3 class="stats-header">+</h3>
                </div>
            </div>
            <div data-w-id="fda5b75b-5f1e-d0a4-b299-d5495d25bf01" class="stats-div">
                <h6 class="stats-title">Algorithms created</h6>
                <div class="counter-div">
                    <h3 class="stats-header counter-algos">13,500</h3>
                    <h3 class="stats-header">+</h3>
                </div>
            </div>
            <div id="w-node-fda5b75b-5f1e-d0a4-b299-d5495d25bf06-6af0bce5"
                data-w-id="fda5b75b-5f1e-d0a4-b299-d5495d25bf06" class="stats-div">
                <h6 class="stats-title">Monthly volume generated</h6>
                <div class="counter-div">
                    <h3 class="stats-header">$</h3>
                    <h3 class="stats-header counter-volume">16</h3>
                    <h3 class="stats-header">M</h3>
                    <h3 class="stats-header">+</h3>
                </div>
            </div>
        </div>
    </section>
    <div class="w-embed w-script">
        <script>
            document.addEventListener("DOMContentLoaded", function () {
            function animateValue(element, start, end, duration) {
              let startTimestamp = null;
              const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min(
                  (timestamp - startTimestamp) / duration,
                  1
                );
                const current = Math.floor(progress * (end - start) + start);
                element.innerText =
                  current >= 10000 ? current.toLocaleString() : current;
                if (progress < 1) {
                  window.requestAnimationFrame(step);
                }
              };
              window.requestAnimationFrame(step);
            }

            function setupCounter(selector, endValue, duration) {
              const target = document.querySelector(selector);
              const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    animateValue(target, 0, endValue, duration);
                    observer.unobserve(target); // Ensures the animation only runs once
                  }
                });
              });
              observer.observe(target);
            }

            setupCounter(".counter-traders", 12000, 1000); // For the first counter
            setupCounter(".counter-algos", 13500, 1000); // For the second counter
            setupCounter(".counter-volume", 16, 1000); // For the third counter
          });
        </script>
    </div>
    <section class="app-section-2">
        <div class="section-heading-block">
            <h3 class="section-heading">Unlock</h3>
            <h2 class="section-heading-bold">Legendary Trading Success</h2>
        </div>
        <div class="app-section-wrapper">
            <div class="app-section-text-block">
                <h4 class="sub-section-heading">
                    Your Portfolio<br /><span class="text-span">On Autopilot</span>
                </h4>
                <p class="section-paragraph">
                    Leverages Predictive AI to trade in the financial markets.
                </p>
                <ul role="list" class="section-list">
                    <li class="section-list-item">
                        <strong>Plug and Play</strong>:Get started in just minutes — choose from a library of algorithms
                        crafted by our expert team and trained by the most advanced AI trading models powered by OpenAI
                        and Gemini.
                    </li>
                    <li class="section-list-item">
                        <strong>Trading made Easy for you</strong>: Quick setup for new and experienced traders — start
                        the robot easily with $10,000 in a demo account. Stop anytime; your capital is returned after
                        every trade.
                    </li>
                    <li class="section-list-item">
                        <strong>Trades Fully Powered by Ai </strong>AI-driven algorithms to minimize risk and maximize
                        profits. No skills needed — the AI opens and closes trades in milliseconds, fully automated to
                        let your money work for you.
                    </li>
                </ul>
                <a data-w-id="af6dedcc-5dd8-f60f-cdbf-86da156e0b85" href="/user/auth/register"
                    class="section-button section-button-trading w-inline-block">
                    <div class="section-button-text">Start Trading</div>
                    <div class="div-block-89">
                        <img src="assets/img/669629e2dec253ed06aa52ac_arrow-dark.svg" loading="lazy"
                            alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                            class="section-button-arrow-dark" /><img
                            src="assets/img/6694ee7fcf165d446804cac3_arrow-light.svg" loading="lazy"
                            alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                            class="section-button-arrow" />
                    </div>
                </a>
            </div>
            <div class="app-section-video">
                <div class="app-video">
                    <div
                      data-poster-url="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9%2F66b089abd2c7c88a838df40c_landing-page-video-poster-00001.jpg"
                      data-video-urls="/videos/loginvideo.mp4"
                      data-autoplay="true"
                      data-loop="true"
                      data-wf-ignore="true"
                      data-w-id="cdb39a81-4b2e-0f06-15f8-edc598c6ef10"
                      class="background-video w-background-video w-background-video-atom"
                    >
                      <video
                        id="cdb39a81-4b2e-0f06-15f8-edc598c6ef10-video"
                        autoplay=""
                        loop=""
                        style="
                          background-image: url(https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9%2F66b089abd2c7c88a838df40c_landing-page-video-poster-00001.jpg);
                        "
                        muted=""
                        playsinline=""
                        data-wf-ignore="true"
                        data-object-fit="cover"
                      >
                        <source
                          src="/videos/loginvideo.mp4"
                          data-wf-ignore="true"
                        />
                        <source
                          src="/videos/loginvideo.mp4"
                          data-wf-ignore="true"
                        />
                      </video>
                    </div> 
                    {{-- <img class="mascot-hero" src="assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4.png"
                        alt="Faded image of the {{ config('app.name') }} mascot, representing automated crypto trading bots."
                        style="opacity: 0" sizes="100vw" data-w-id="fa1de0c6-6511-c30b-acbb-d7c09eb94b7b"
                        loading="eager" srcset="
                      assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-500.png   500w,
                      assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-800.png   800w,
                      assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-1080.png 1080w,
                      assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-1600.png 1600w,
                      assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4.png        1920w
                    " /> --}}
                </div>
            </div>
        </div>
    </section>
    <!-- <section class="app-section-video-3">
        <div class="section-heading-block">
          <h3 class="section-heading">Step Into the</h3>
          <h2 class="section-heading-bold">World of {{ config('app.name') }}</h2>
        </div>
        <div class="app-section-wrapper">
          <div
            style="padding-top: 56.17021276595745%"
            class="w-embed-youtubevideo"
          >
            <iframe
              src="https://www.youtube.com/embed/rQcGdZSAeWU?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=1&amp;start=0"
              frameborder="0"
              style="
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                pointer-events: auto;
              "
              allow="autoplay; encrypted-media"
              allowfullscreen=""
              title="Connecting Bybit to {{ config('app.name') }}"
            ></iframe>
          </div>
        </div>
      </section> -->

    <section class="get-started-section">
        <div class="section-heading-block">
            <h3 class="section-heading">It’s Easy</h3>
            <h2 class="section-heading-bold">To Get Started</h2>
        </div>
        <div class="section-wrapper section-wrapper-get-started">
            <div class="get-started-container">
                <div class="w-layout-grid grid">
                    <div id="w-node-_80e98dd7-96de-f7f8-f1b9-80d70b4bae4e-6af0bce5"
                        data-w-id="80e98dd7-96de-f7f8-f1b9-80d70b4bae4e" class="started-grid-item">
                        <img src="assets/img/669503d3af683a33eef5c453_icon-signup.svg" loading="lazy" alt="Sign up icon"
                            class="icon-started" />
                        <h3 class="started-header">
                            <span class="text-span-2">Sign up</span>
                        </h3>
                        <p class="started-text">Create your personal account in less than 2min</p>
                    </div>
                    <div id="w-node-a961220b-7994-1047-36ac-769cba7f8c9d-6af0bce5"
                        data-w-id="a961220b-7994-1047-36ac-769cba7f8c9d" class="started-grid-item">
                        <img src="assets/img/669504014220bd1e88d00151_icon-connect.svg" loading="lazy"
                            alt="Connect crypto exchanges icon" class="icon-started" />
                        <h3 class="started-header">
                            <span class="text-span-3">Try Demo</span>
                        </h3>
                        <p class="started-text">Backtest strategies with Demo funds</p>
                    </div>
                    <div id="w-node-_5232234d-42d8-d60d-f930-4ec04e9ac84b-6af0bce5"
                        data-w-id="5232234d-42d8-d60d-f930-4ec04e9ac84b" class="started-grid-item">
                        <img src="assets/img/669504097adf73f5cae2b4a1_icon-automate.svg" loading="lazy"
                            alt="Automate crypto trading icon" class="icon-started" />
                        <h3 class="started-header">
                            <span class="text-span-4">Deposit</span>
                        </h3>
                        <p class="started-text">
                            Deposit real funds and start making real money
                        </p>
                    </div>
                </div>
                <img src="assets/img/66965cfc338ad8b577e5d14f_mascot-front.png" loading="lazy"
                    data-w-id="10147117-99fa-5c8f-698e-4449e611716c"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 74vw, (max-width: 1279px) 70vw, (max-width: 1919px) 71vw, 1040px"
                    alt="Front-facing image of the {{ config('app.name') }} mascot, representing automated crypto trading bots."
                    srcset="
                assets/img/66965cfc338ad8b577e5d14f_mascot-front-p-500.png   500w,
                assets/img/66965cfc338ad8b577e5d14f_mascot-front-p-800.png   800w,
                assets/img/66965cfc338ad8b577e5d14f_mascot-front-p-1080.png 1080w,
                assets/img/66965cfc338ad8b577e5d14f_mascot-front.png        1200w
              " class="mascot-front" />
            </div>
        </div>
    </section>
    <!-- <section class="exchanged-section">
        <div class="section-heading-block">
          <h3 class="section-heading">Run Algorithms On</h3>
          <h2 class="section-heading-bold">Top Exchanges</h2>
        </div>
        <div class="section-wrapper section-wrapper-exchanges">
          <div
            data-current="Supported"
            data-easing="ease"
            data-duration-in="300"
            data-duration-out="100"
            class="tabs w-tabs"
          >
            <div class="tabs-menu w-tab-menu">
              <a
                data-w-tab="Supported"
                class="tab-link-supported w-inline-block w-tab-link w--current"
              >
                <div class="text-block">Supported</div> </a
              ><a
                data-w-tab="Upcoming"
                class="tab-link-upcoming w-inline-block w-tab-link"
              >
                <div class="text-block-2">Upcoming</div>
              </a>
            </div>
            <div class="w-tab-content">
              <div data-w-tab="Supported" class="w-tab-pane w--tab-active">
                <div class="w-layout-grid exchanges-grid">
                  <div
                    id="w-node-_98af733a-f0aa-8049-ccb0-204f7488bfc0-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950a855309749d5150f2b4_exchange-img-bybit.svg"
                      alt="Bybit logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_98af733a-f0aa-8049-ccb0-204f7488bfba-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669509372516d055fea2e8b7_exchange-img-binance.svg"
                      alt="Binance logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_98af733a-f0aa-8049-ccb0-204f7488bfbc-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669509a284c4b26d96b1a730_icon-exchange-kraken.svg"
                      alt="Kraken logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_98af733a-f0aa-8049-ccb0-204f7488bfbe-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669509b1605416076816a177_exchange-img-kucoin.svg"
                      alt="KuCoin logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_98af733a-f0aa-8049-ccb0-204f7488bfc2-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950a8f575d58e2a928a895_exchange-img-bitget.svg"
                      alt="Bitget logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_98af733a-f0aa-8049-ccb0-204f7488bfc4-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950a99cf165d446815ac80_exchange-img-mexc.svg"
                      alt="MEXC logo"
                      class="exchange-image"
                    />
                  </div>
                </div>
              </div>
              <div data-w-tab="Upcoming" class="w-tab-pane">
                <div class="w-layout-grid exchanges-grid">
                  <div
                    id="w-node-_407033d8-cd1a-c85a-d2d8-025a0a1b9b08-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950bac2516d055fea454c6_exchange-img-okx.svg"
                      alt="OkX logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-a84bc75e-9388-cb9e-dfb1-f7c6a2cfed78-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66c32efa13e833866184de1d_Coinbase_Wordmark_White.svg"
                      alt="Coinbase exchange logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-c4d507bf-bc4d-5b26-d659-40cdda792a92-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66c32f0fd7db732dc0f33dd0_HTX.svg"
                      alt="HTX exchange logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_8cec451d-6ded-ecb8-f842-c1331d22c172-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950b7c2569514105b625e7_exchange-img-gate.svg"
                      alt="Gate.io logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-baa6ba3a-37d0-ba61-a7e2-487b88d3cac0-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66c32fb3f36437902e606da7_bitvavo.svg"
                      alt="Bitvavo exchange logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-c96d9144-bd8a-20b9-0edf-7f6d552dd159-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950ba4790c651b001ad675_exchange-img-bitfinex.svg"
                      alt="Bitfinex logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_23d69564-bd2a-d5cf-f5ab-b681d067c45d-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950bc0c7cc98418e1423dc_exchange-img-pancakeswap.svg"
                      alt="PancakeSwap logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_0d24cae4-28b2-a54e-ee0c-d6a417f00d37-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66950bc88fb35834c3acae51_exchange-img-uniswap.svg"
                      alt="Uniswap logo"
                      class="exchange-image"
                    />
                  </div>
                  <div
                    id="w-node-_5350a454-f7ad-40a3-4df0-235b1258c233-6af0bce5"
                    class="exchange-div"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66c337c11d34db42bc356f36_AND%20MORE!%20(new).svg"
                      alt="and more upcoming exchanges"
                      class="exchange-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
    <section class="features-section" id="features">
        <div class="section-heading-block">
            <h3 class="section-heading">Your Ultimate Crypto & Forex</h3>
            <h2 class="section-heading-bold">Trading Toolbox Awaits</h2>
        </div>
        <div class="awesome-container">
            <div data-w-id="7dc61096-2dfd-240c-60ae-7daaec8986e7" class="w-layout-grid awesome-grid">
                <div id="w-node-_23d0918c-e67b-33da-207e-480dde2c0375-6af0bce5" class="awesome-grid-item">
                    <div class="awesome-grid-item-inner">
                        <div class="awesome-image-container">
                            <img src="assets/img/6695159806f861444de52ab6_awesome-marketplace.svg" loading="lazy"
                                alt="{{ config('app.name') }} algorithm marketplace" class="awesome-grid-image" />
                        </div>
                        <h5 class="awesome-heading">Assured Profits</h5>
                    </div>
                </div>
                <div id="w-node-_78ee0618-c9ac-22a2-3f82-ab0c9f8b50f5-6af0bce5" class="awesome-grid-item">
                    <div class="awesome-grid-item-inner">
                        <div class="awesome-image-container">
                            <img src="assets/img/669515b0c893f020b835a4f5_awesome-ai.svg" loading="lazy"
                                alt="AI &amp; Machine Learning trading tools" class="awesome-grid-image" />
                        </div>
                        <h5 class="awesome-heading">AI Powered Trading</h5>
                    </div>
                </div>
                <div id="w-node-ae2bdcae-9f1e-c1ae-3711-9e453e0ab656-6af0bce5" class="awesome-grid-item">
                    <div class="awesome-grid-item-inner">
                        <div class="awesome-image-container">
                            <img src="assets/img/669515e8d38b3820f1664dbc_awesome-backtest.svg" loading="lazy"
                                alt="Crypto trading backtesting" class="awesome-grid-image awesome-image-backtesting" />
                        </div>
                        <h5 class="awesome-heading">Backtesting</h5>
                    </div>
                </div>
                <div id="w-node-b2c57321-9f7d-f79c-91e2-54f965d2117e-6af0bce5" class="awesome-grid-item">
                    <div class="awesome-grid-item-inner">
                        <div class="awesome-image-container">
                            <img src="assets/img/669516452516d055feac7f0b_awesome-terminal.svg" loading="lazy"
                                alt="Crypto trading terminal" class="awesome-grid-image" />
                        </div>
                        <h5 class="awesome-heading">Trading Terminal</h5>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Will be used for profirm in the future -->
    <!-- <section class="tier-section">
        <div class="section-heading-block">
          <h3 class="section-heading">Platform</h3>
          <h2 class="section-heading-bold">Tiers</h2>
        </div>
        <div class="section-wrapper">
          <div class="w-layout-grid tier-grid">
            <div
              id="w-node-_1b4c65cf-d85f-e366-3513-8f205fc8406f-6af0bce5"
              data-w-id="1b4c65cf-d85f-e366-3513-8f205fc8406f"
              style="
                -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
                  rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                -moz-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
                -ms-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
                transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
              "
              class="tier-block tier-block-apprentice"
            >
              <div class="tier-image-container">
                <img
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669520d2d857ec504aa40e2e_tier-apprentice.svg"
                  loading="lazy"
                  alt="{{ config('app.name') }} Novice Tier icon representing tiered access to free automated &amp; paper trading features."
                  class="tier-image"
                />
                <h3 class="tier-title">
                  <span class="text-span-14">Apprentice</span>
                </h3>
              </div>
              <div class="staking-block">
                <h2 class="tier-staking-header">FREE</h2>
              </div>
              <div class="tier-list-box">
                <ul role="list" class="list-2">
                  <li class="tier-list-item">Paper Trading</li>
                  <li class="tier-list-item">Customizable dashboard</li>
                  <li class="tier-list-item">Spot trading module</li>
                  <li class="tier-list-item">1 active module</li>
                  <li class="tier-list-item">Limited indicators and tools</li>
                  <li class="tier-list-item">Marketplace access</li>
                </ul>
              </div>
              <a
                data-w-id="840802bd-0e14-d6b1-0a43-cea3768f244c"
                href="#"
                class="section-button tier-button w-inline-block"
              >
                <div class="section-button-text">Stake TTM</div>
                <div class="div-block-89">
                  <img
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                    loading="lazy"
                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                    class="section-button-arrow-dark"
                  /><img
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                    loading="lazy"
                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                    class="section-button-arrow"
                  />
                </div>
              </a>
            </div>
            <div
              id="w-node-e14043e9-7b09-02e2-4e4a-fd78259c3b5e-6af0bce5"
              data-w-id="e14043e9-7b09-02e2-4e4a-fd78259c3b5e"
              style="
                -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
                  rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                -moz-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
                -ms-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
                transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
              "
              class="tier-block tier-block-champion"
            >
              <div class="popular-tag">
                <div class="populair-tag-text">Most Popular</div>
              </div>
              <div class="tier-image-container">
                <img
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669525ca7816764a1f40a379_tier-champion.svg"
                  loading="lazy"
                  alt="{{ config('app.name') }} Champion tier icon representing tiered access to premium automated trading &amp; backtesting features."
                  class="tier-image"
                />
                <h3 class="tier-title">
                  <span class="text-span-13">Champion</span>
                </h3>
              </div>
              <div class="staking-block">
                <div class="tier-text">Stake</div>
                <h2 class="tier-staking-header">20K TTM</h2>
              </div>
              <div class="tier-list-box">
                <ul role="list" class="list-3">
                  <li class="tier-list-item">Paper Trading</li>
                  <li class="tier-list-item">Live trading</li>
                  <li class="tier-list-item">Customizable dashboard</li>
                  <li class="tier-list-item">Standard modules</li>
                  <li class="tier-list-item">Up to 5 active modules</li>
                  <li class="tier-list-item">Standard indicators and tools</li>
                  <li class="tier-list-item">Backtesting</li>
                  <li class="tier-list-item">Marketplace access</li>
                </ul>
              </div>
              <a
                data-w-id="29a7c0c5-d8eb-5e74-57fe-fe961f60cfad"
                href="#"
                class="section-button tier-button w-inline-block"
              >
                <div class="section-button-text">Stake TTM</div>
                <div class="div-block-89">
                  <img
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                    loading="lazy"
                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                    class="section-button-arrow-dark"
                  /><img
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                    loading="lazy"
                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                    class="section-button-arrow"
                  />
                </div>
              </a>
            </div>
            <div
              id="w-node-e11009f7-af69-b3a6-601c-4096078e9c12-6af0bce5"
              data-w-id="e11009f7-af69-b3a6-601c-4096078e9c12"
              style="
                -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
                  rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                -moz-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
                -ms-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
                transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                  rotateY(0) rotateZ(0) skew(0, 0);
              "
              class="tier-block tier-block-legend"
            >
              <div class="tier-image-container">
                <img
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669525d68fb35834c3bd03a1_tier-legend.svg"
                  loading="lazy"
                  alt="{{ config('app.name') }} Legend Tier icon representing tiered access to premium automated trading &amp; backtesting features."
                  class="tier-image"
                />
                <h3 class="tier-title">
                  <span class="text-span-12">Legend</span>
                </h3>
              </div>
              <div class="staking-block">
                <div class="tier-text">Stake</div>
                <h2 class="tier-staking-header">100K TTM</h2>
              </div>
              <div class="tier-list-box">
                <ul role="list" class="list">
                  <li class="tier-list-item">Paper Trading</li>
                  <li class="tier-list-item">Live trading</li>
                  <li class="tier-list-item">Customizable dashboard</li>
                  <li class="tier-list-item">
                    Advanced modules <br />‍<span class="text-span-15"
                      >(incl. AI modules)</span
                    >
                  </li>
                  <li class="tier-list-item">Up to 10 active modules</li>
                  <li class="tier-list-item">Advanced indicators and tools</li>
                  <li class="tier-list-item">Backtesting</li>
                  <li class="tier-list-item">Marketplace access</li>
                  <li class="tier-list-item">Early feature access</li>
                </ul>
              </div>
              <a
                data-w-id="566287fc-f06c-66d4-8906-06a90489ecb6"
                href="#"
                class="section-button tier-button w-inline-block"
              >
                <div class="section-button-text">Stake TTM</div>
                <div class="div-block-89">
                  <img
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                    loading="lazy"
                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                    class="section-button-arrow-dark"
                  /><img
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                    loading="lazy"
                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                    class="section-button-arrow"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="section-wrapper">
          <div
            data-current="Champion"
            data-easing="ease"
            data-duration-in="300"
            data-duration-out="100"
            class="desktop-tier-tabs w-tabs"
          >
            <div class="tabs-content w-tab-content">
              <div data-w-tab="Novice" class="w-tab-pane">
                <div
                  id="w-node-_492a97cf-fc65-d0c0-9a67-fe3870a0f7c7-6af0bce5"
                  class="tier-block"
                >
                  <div class="tier-image-container">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1a251626f7af4f76abb_tier-novice-icon.svg"
                      alt="{{ config('app.name') }} Novice Tier icon representing tiered access to free automated &amp; paper trading features."
                      class="tier-image"
                    />
                    <div class="tier-card-header">
                      <h3 class="tier-title">
                        <span class="text-span-novice">Novice</span>
                      </h3>
                      <h3 class="staking-header">FREE</h3>
                    </div>
                  </div>
                  <div class="tier-list-box">
                    <div class="tier-items-left">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">Paper trading</li>
                        <li class="tier-list-item">Customizable dashboard</li>
                        <li class="tier-list-item">Spot trading</li>
                      </ul>
                    </div>
                    <div class="tier-items-right">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">1 active algorithm</li>
                        <li class="tier-list-item">
                          Limited indicators and tools
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a
                    data-w-id="492a97cf-fc65-d0c0-9a67-fe3870a0f7de"
                    href="https://app.{{ config('app.name') }}.com/"
                    target="_blank"
                    class="section-button tier-button novice w-inline-block"
                  >
                    <div class="section-button-text">Start Now</div>
                    <div class="div-block-89">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                        alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                        class="section-button-arrow-dark"
                      /><img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                        alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                        class="section-button-arrow"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div data-w-tab="Apprentice" class="w-tab-pane">
                <div
                  id="w-node-_402b9070-3dd2-be23-fd0e-82f6b32402c4-6af0bce5"
                  class="tier-block"
                >
                  <div class="tier-image-container">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba21b5d9df0108cc2fc3d_tier-apprentice-detailed.svg"
                      alt="{{ config('app.name') }} Apprentice Tier icon representing tiered access to premium live trading features."
                      class="tier-image"
                    />
                    <div class="tier-card-header">
                      <h3 class="tier-title text-span-apprentice">
                        Apprentice
                      </h3>
                      <h3 class="staking-header">2K TTM</h3>
                    </div>
                  </div>
                  <div class="tier-list-box">
                    <div class="tier-items-left">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">Paper trading</li>
                        <li
                          id="w-node-_30b06d14-fd52-76d6-6386-8d2c57ad0620-6af0bce5"
                          class="tier-list-item"
                        >
                          2 exchange connections
                        </li>
                        <li class="tier-list-item">Customizable dashboard</li>
                        <li class="tier-list-item">Spot trading algorithm</li>
                        <li
                          id="w-node-e9c606d3-bf71-9d6c-45f1-152976e2f6f8-6af0bce5"
                          class="tier-list-item"
                        >
                          Up to 2 active algorithms
                        </li>
                      </ul>
                    </div>
                    <div class="tier-items-right">
                      <ul role="list" class="list-2">
                        <li
                          id="w-node-_55e3e8a7-687f-b816-eb95-0ccd6e2b4731-6af0bce5"
                          class="tier-list-item"
                        >
                          Limited indicators and tools
                        </li>
                        <li
                          id="w-node-_4d8127a5-1e63-4668-ef47-1d4e30378c58-6af0bce5"
                          class="tier-list-item"
                        >
                          Backtesting
                        </li>
                        <li class="tier-list-item">Marketplace content</li>
                      </ul>
                    </div>
                  </div>
                  <a
                    data-w-id="402b9070-3dd2-be23-fd0e-82f6b32402db"
                    href="https://staking.{{ config('app.name') }}.com/"
                    target="_blank"
                    class="section-button tier-button w-inline-block"
                  >
                    <div class="section-button-text">Stake TTM</div>
                    <div class="div-block-89">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                        alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                        class="section-button-arrow-dark"
                      /><img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                        alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                        class="section-button-arrow"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div data-w-tab="Champion" class="w-tab-pane w--tab-active">
                <div
                  id="w-node-a74c3ec8-1427-73ff-1beb-7c87fdcc1600-6af0bce5"
                  class="tier-block"
                >
                  <div class="popular-tag">
                    <div class="populair-tag-text">Most Popular</div>
                  </div>
                  <div class="tier-image-container">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba2069ca8644120bfab3f_tier-champion-detailed.svg"
                      alt="{{ config('app.name') }} Champion tier icon representing tiered access to premium automated trading &amp; backtesting features."
                      class="tier-image"
                    />
                    <div class="tier-card-header">
                      <h3 class="tier-title">
                        <span class="text-span-13">Champion</span>
                      </h3>
                      <h3 class="staking-header">20K TTM</h3>
                    </div>
                  </div>
                  <div class="tier-list-box">
                    <div class="tier-items-left">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">Paper trading</li>
                        <li class="tier-list-item">5 exchange connections</li>
                        <li class="tier-list-item">Customizable dashboard</li>
                        <li class="tier-list-item">Standard algorithms</li>
                      </ul>
                    </div>
                    <div class="tier-items-right">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">5 active algorithms</li>
                        <li class="tier-list-item">
                          Standard indicators and tools
                        </li>
                        <li class="tier-list-item">Backtesting</li>
                        <li class="tier-list-item">Marketplace content</li>
                      </ul>
                    </div>
                  </div>
                  <a
                    data-w-id="c438cad4-9cd3-35ec-9751-4f23fc404be2"
                    href="https://staking.{{ config('app.name') }}.com/"
                    target="_blank"
                    class="section-button tier-button w-inline-block"
                  >
                    <div class="section-button-text">Stake TTM</div>
                    <div class="div-block-89">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                        alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                        class="section-button-arrow-dark"
                      /><img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                        alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                        class="section-button-arrow"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div data-w-tab="Legend" class="w-tab-pane">
                <div
                  id="w-node-_687701e0-c7a1-9e24-7195-cc33e44f5236-6af0bce5"
                  class="tier-block"
                >
                  <div class="tier-image-container">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1f1f2ab9bcb545c120e_tier-legend-detailed.svg"
                      alt="{{ config('app.name') }} Legend Tier icon representing tiered access to premium automated trading &amp; backtesting features."
                      class="tier-image"
                    />
                    <div class="tier-card-header">
                      <h3 class="tier-title text-span-legend">Legend</h3>
                      <h3 class="staking-header">100K TTM</h3>
                    </div>
                  </div>
                  <div class="tier-list-box">
                    <div class="tier-items-left">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">Paper trading</li>
                        <li class="tier-list-item">10 exchange connections</li>
                        <li class="tier-list-item">Customizable dashboard</li>
                        <li class="tier-list-item">
                          Advanced algorithms<br />‍<span class="text-span-15"
                            >(incl. AI modules)</span
                          >
                        </li>
                        <li class="tier-list-item">Up to 10 active modules</li>
                      </ul>
                    </div>
                    <div class="tier-items-right">
                      <ul role="list" class="list-2">
                        <li class="tier-list-item">
                          Advanced indicators and tools
                        </li>
                        <li class="tier-list-item">Backtesting</li>
                        <li class="tier-list-item">Marketplace content</li>
                        <li class="tier-list-item">Early feature access</li>
                      </ul>
                    </div>
                  </div>
                  <a
                    data-w-id="687701e0-c7a1-9e24-7195-cc33e44f5259"
                    href="https://staking.{{ config('app.name') }}.com/"
                    target="_blank"
                    class="section-button tier-button w-inline-block"
                  >
                    <div class="section-button-text">Stake TTM</div>
                    <div class="div-block-89">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                        alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                        class="section-button-arrow-dark"
                      /><img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                        alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                        class="section-button-arrow"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="tabs-menu-2 w-tab-menu">
              <a data-w-tab="Novice" class="tier-tab w-inline-block w-tab-link">
                <div class="tier-tab-title">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba22fd4c0c8758a2ab402_tier-novice-detailed.svg"
                    alt="{{ config('app.name') }} Novice Tier icon representing tiered access to free automated &amp; paper trading features."
                    class="tier-tab-icon"
                  />
                  <div class="tier-tab-title">
                    <span class="tier-tab-title-novice">Novice</span>
                  </div>
                </div>
                <div class="tier-tab-pricing">
                  <h1 class="heading">Free</h1>
                </div> </a
              ><a
                data-w-tab="Apprentice"
                class="tier-tab w-inline-block w-tab-link"
              >
                <div class="tier-tab-title">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1bfe3332b3ea97d450d_tier-apprentice-icon.svg"
                    alt="{{ config('app.name') }} Apprentice Tier icon representing tiered access to premium live trading features."
                    class="tier-tab-icon"
                  />
                  <div class="tier-tab-title">
                    <span class="tier-tab-title-apprentice">Apprentice</span>
                  </div>
                </div>
                <div class="tier-tab-pricing">
                  <h1 class="tier-tab-header-stake">Stake</h1>
                  <h1 class="heading">2k TTM</h1>
                </div> </a
              ><a
                data-w-tab="Champion"
                class="tier-tab w-inline-block w-tab-link w--current"
              >
                <div class="tier-tab-title">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1cf6b2905fead483abb_tier-champion-icon.svg"
                    alt="{{ config('app.name') }} Champion tier icon representing tiered access to premium automated trading &amp; backtesting features."
                    class="tier-tab-icon"
                  />
                  <div class="tier-tab-title">
                    <span class="tier-tab-title-champion">Champion</span>
                  </div>
                </div>
                <div class="tier-tab-pricing">
                  <h1 class="tier-tab-header-stake">Stake</h1>
                  <h3 class="heading">20k TTM</h3>
                </div> </a
              ><a
                data-w-tab="Legend"
                class="tier-tab w-inline-block w-tab-link"
              >
                <div class="tier-tab-title">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1e30b182749b0453fe8_tier-legend-icon.svg"
                    alt="{{ config('app.name') }} Legend Tier icon representing tiered access to premium automated trading &amp; backtesting features."
                    class="tier-tab-icon"
                  />
                  <div class="tier-tab-title">
                    <span class="tier-tab-title-legend">Legend</span>
                  </div>
                </div>
                <div class="tier-tab-pricing">
                  <h1 class="tier-tab-header-stake">Stake</h1>
                  <h1 class="heading">100k TTM</h1>
                </div>
              </a>
            </div>
          </div>
          <div class="mobile-tiers-container">
            <div
              id="w-node-_54bdc8da-a6cf-ff53-329b-80320105e1ed-6af0bce5"
              data-w-id="54bdc8da-a6cf-ff53-329b-80320105e1ed"
              style="opacity: 0"
              class="tier-block tier-block-mobile"
            >
              <div class="tier-image-container">
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1a251626f7af4f76abb_tier-novice-icon.svg"
                  alt="{{ config('app.name') }} Novice Tier icon representing tiered access to free automated &amp; paper trading features."
                  class="tier-image"
                />
                <div class="tier-card-header">
                  <h3 class="tier-title">
                    <span class="text-span-novice">Novice</span>
                  </h3>
                  <h3 class="staking-header">FREE</h3>
                </div>
              </div>
              <div class="tier-list-box">
                <div class="tier-items-left">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">Paper Trading</li>
                    <li class="tier-list-item">Customizable dashboard</li>
                    <li class="tier-list-item">Spot trading module</li>
                  </ul>
                </div>
                <div class="tier-items-right">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">1 active module</li>
                    <li class="tier-list-item">Limited indicators and tools</li>
                  </ul>
                </div>
              </div>
              <a
                data-w-id="54bdc8da-a6cf-ff53-329b-80320105e205"
                href="https://app.{{ config('app.name') }}.com/login"
                target="_blank"
                class="section-button tier-button novice-link w-inline-block"
              >
                <div class="section-button-text">Start Now</div>
                <div class="div-block-89">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                    class="section-button-arrow-dark"
                  /><img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                    class="section-button-arrow"
                  />
                </div>
              </a>
            </div>
            <div
              id="w-node-_04949784-2de4-4b48-dcdc-54ffef491616-6af0bce5"
              data-w-id="04949784-2de4-4b48-dcdc-54ffef491616"
              style="opacity: 0"
              class="tier-block tier-block-mobile"
            >
              <div class="tier-image-container">
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba21b5d9df0108cc2fc3d_tier-apprentice-detailed.svg"
                  alt="{{ config('app.name') }} Apprentice Tier icon representing tiered access to premium live trading features."
                  class="tier-image"
                />
                <div class="tier-card-header">
                  <h3 class="tier-title text-span-apprentice">Apprentice</h3>
                  <h3 class="staking-header">2K TTM</h3>
                </div>
              </div>
              <div class="tier-list-box">
                <div class="tier-items-left">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">Paper Trading</li>
                    <li class="tier-list-item">Customizable dashboard</li>
                    <li class="tier-list-item">Spot trading module</li>
                    <li
                      id="w-node-_04949784-2de4-4b48-dcdc-54ffef491627-6af0bce5"
                      class="tier-list-item"
                    >
                      Up to 2 active modules
                    </li>
                  </ul>
                </div>
                <div class="tier-items-right">
                  <ul role="list" class="list-2">
                    <li
                      id="w-node-_04949784-2de4-4b48-dcdc-54ffef49162b-6af0bce5"
                      class="tier-list-item"
                    >
                      Limited indicators and tools
                    </li>
                    <li
                      id="w-node-_04949784-2de4-4b48-dcdc-54ffef49162d-6af0bce5"
                      class="tier-list-item"
                    >
                      Backtesting
                    </li>
                    <li class="tier-list-item">Marketplace content</li>
                  </ul>
                </div>
              </div>
              <a
                data-w-id="04949784-2de4-4b48-dcdc-54ffef491631"
                href="https://staking.{{ config('app.name') }}.com/"
                target="_blank"
                class="section-button tier-button w-inline-block"
              >
                <div class="section-button-text">Stake TTM</div>
                <div class="div-block-89">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                    class="section-button-arrow-dark"
                  /><img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                    class="section-button-arrow"
                  />
                </div>
              </a>
            </div>
            <div
              id="w-node-c233cfe8-3ac8-7ee0-a0d4-410abe1a6ef1-6af0bce5"
              data-w-id="c233cfe8-3ac8-7ee0-a0d4-410abe1a6ef1"
              style="opacity: 0"
              class="tier-block tier-block-mobile"
            >
              <div class="popular-tag">
                <div class="populair-tag-text">Most Popular</div>
              </div>
              <div class="tier-image-container">
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba2069ca8644120bfab3f_tier-champion-detailed.svg"
                  alt="{{ config('app.name') }} Champion tier icon representing tiered access to premium automated trading &amp; backtesting features."
                  class="tier-image"
                />
                <div class="tier-card-header">
                  <h3 class="tier-title">
                    <span class="text-span-13">Champion</span>
                  </h3>
                  <h3 class="staking-header">20K TTM</h3>
                </div>
              </div>
              <div class="tier-list-box">
                <div class="tier-items-left">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">Paper Trading</li>
                    <li class="tier-list-item">Live trading</li>
                    <li class="tier-list-item">Customizable dashboard</li>
                    <li class="tier-list-item">Standard modules</li>
                  </ul>
                </div>
                <div class="tier-items-right">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">Up to 5 active modules</li>
                    <li class="tier-list-item">
                      Standard indicators and tools
                    </li>
                    <li class="tier-list-item">Backtesting</li>
                    <li class="tier-list-item">Marketplace content</li>
                  </ul>
                </div>
              </div>
              <div class="tier-item-button-block">
                <a
                  data-w-id="c233cfe8-3ac8-7ee0-a0d4-410abe1a6f13"
                  href="https://staking.{{ config('app.name') }}.com/"
                  target="_blank"
                  class="section-button tier-button w-inline-block"
                >
                  <div class="section-button-text">Stake TTM</div>
                  <div class="div-block-89">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                      alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                      class="section-button-arrow-dark"
                    /><img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                      alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                      class="section-button-arrow"
                    />
                  </div>
                </a>
              </div>
            </div>
            <div
              id="w-node-_3ebba572-d08b-d2c1-feb3-15a8240be98e-6af0bce5"
              data-w-id="3ebba572-d08b-d2c1-feb3-15a8240be98e"
              style="opacity: 0"
              class="tier-block tier-block-mobile"
            >
              <div class="tier-image-container">
                <img
                  loading="lazy"
                  src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/66aba1f1f2ab9bcb545c120e_tier-legend-detailed.svg"
                  alt="{{ config('app.name') }} Legend Tier icon representing tiered access to premium automated trading &amp; backtesting features."
                  class="tier-image"
                />
                <div class="tier-card-header">
                  <h3 class="tier-title text-span-legend">Legend</h3>
                  <h3 class="staking-header">100K TTM</h3>
                </div>
              </div>
              <div class="tier-list-box">
                <div class="tier-items-left">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">Paper Trading</li>
                    <li class="tier-list-item">Live trading</li>
                    <li class="tier-list-item">Customizable dashboard</li>
                    <li class="tier-list-item">
                      Advanced modules <br />‍<span class="text-span-15"
                        >(incl. AI modules)</span
                      >
                    </li>
                    <li class="tier-list-item">Up to 10 active modules</li>
                  </ul>
                </div>
                <div class="tier-items-right">
                  <ul role="list" class="list-2">
                    <li class="tier-list-item">
                      Advanced indicators and tools
                    </li>
                    <li class="tier-list-item">Backtesting</li>
                    <li class="tier-list-item">Marketplace content</li>
                    <li class="tier-list-item">Early feature access</li>
                  </ul>
                </div>
              </div>
              <a
                data-w-id="3ebba572-d08b-d2c1-feb3-15a8240be9b1"
                href="https://staking.{{ config('app.name') }}.com/"
                target="_blank"
                class="section-button tier-button w-inline-block"
              >
                <div class="section-button-text">Stake TTM</div>
                <div class="div-block-89">
                  <img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/669629e2dec253ed06aa52ac_arrow-dark.svg"
                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                    class="section-button-arrow-dark"
                  /><img
                    loading="lazy"
                    src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6694ee7fcf165d446804cac3_arrow-light.svg"
                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                    class="section-button-arrow"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="section-wrapper"></div>
      </section> -->
    <section class="ttm-section" id="howto">
        <div class="section-heading-block">
            <h3 class="section-heading">Demo</h3>
            <h2 class="section-heading-bold">Getting Started Steps</h2>
        </div>
        <div class="section-wrapper section-wrapper-ttm !gap-y-0">
            <div class="section-wrapper-left section-wrapper-relative !h-auto !bg-none flex flex-col items-center">
               
              <div class="w-full lg:w-[80%]">
                <div class="carousel w-full" x-data="{ currentSlide: 1, totalSlides: 3 }">
                  <template x-for="i in totalSlides" :key="i">
                      <div x-show="currentSlide === i" class="carousel-item relative w-full h-auto">
                          <img :src="`{{ asset('images/slide${i}.gif') }}`" class="w-full" />
                          <p class="absolute bottom-0 w-full text-white z-10 bg-gradient-to-r from-purple-800 via-pink-500 to-red-500 px-4 py-2 rounded-t-xl shadow-lg transform hover:scale-105 transition-transform duration-300 text-center"
                            x-text="i === 1 ? 'Deposit Steps' : i === 2 ? 'Active Robot Steps' : 'Withdraw Steps'">
                          </p>
                          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <button @click="currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1" class="btn btn-circle">❮</button>
                              <button @click="currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1" class="btn btn-circle">❯</button>
                          </div>
                      </div>
                  </template>
                </div>
              </div>
                
            </div>
            <div class="section-wrapper-right section-wrapper-ttm">
                <div class="ttm-content">
                    <h4 class="sub-section-heading">
                        <span class="text-span">{{ config('app.name') }} Easy Steps</span>
                    </h4>
                    <p class="section-paragraph">
                        Utoron ai is your key to accessing our entire suite of trading tools
                        and exclusive ecosystem benefits.
                    </p>
                    <ul role="list" class="section-list">
                        <li class="section-list-item">
                            <strong class="upcoming-tag">Capital:</strong> Your capital is always returned after each trade.
                        </li>
                        <li class="section-list-item">
                            <span class="text-span-5"><strong class="upcoming-tag">Bot Strategy</strong>:</span>
                            The robot generates profits every 5 minutes.<span class="upcoming-tag">You can stop the robot at any time.</span>.
                        </li>
                        <li class="section-list-item">
                            <span class="text-span-5 upcoming-tag">Earn Profits:</span> After starting the robot, you don’t need to do anything else. It will automatically trade and accumulate profits for you until it reaches the profit limit.
                        </li>
                        <li class="section-list-item">
                            <span class="text-span-5 upcoming-tag">Live and Demo mode:</span> There are both Live and Demo accounts available. To make real profits, deposit funds into your Live account and start using the robot.
                        </li>
                    </ul>
                    <div>
                        <a data-w-id="147c2703-042d-9902-d443-38147b2d2911" href="/user/auth/register"
                            class="section-button section-button-ttm w-inline-block">
                            <div class="section-button-text">Start</div>
                            <div class="div-block-89">
                                <img src="assets/img/669629e2dec253ed06aa52ac_arrow-dark.svg" loading="lazy"
                                    alt="Dark arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools"
                                    class="section-button-arrow-dark" /><img
                                    src="assets/img/6694ee7fcf165d446804cac3_arrow-light.svg" loading="lazy"
                                    alt="Light arrow icon pointing right, used for accessing {{ config('app.name') }}&#x27;s auto trading tools."
                                    class="section-button-arrow" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="join-section">
        <div class="section-heading-block">
            <h3 class="section-heading">Join</h3>
            <h2 class="section-heading-bold">Our Community</h2>
        </div>
        <div class="section-wrapper section-community-block">
            <div class="social-profile-container social-container-large social-large-medium">
                
                <a
                  href="https://x.com/utoronai"
                  target="_blank"
                  class="social-profile-wrapper social-profile-wrapper-large w-inline-block"
                  ><img
                    style="opacity: 0"
                    data-w-id="d8c0ce8f-4414-2941-e097-7d578354509d"
                    alt="X (formerly Twitter) icon"
                    src="assets/img/66ab8e9a361b16ce4b4ad8b9_X_icon.svg"
                    loading="lazy"
                    class="social-profiles social-profiles-large social-large-x" />
                </a>
                <a
                  href="https://medium.com/@utoronai"
                  target="_blank"
                  class="social-profile-wrapper social-profile-wrapper-large w-inline-block"
                  ><img
                    style="opacity: 0"
                    data-w-id="d8c0ce8f-4414-2941-e097-7d57835450a3"
                    alt="Medium icon for accessing {{ config('app.name') }}’s articles on crypto trading strategies and insights."
                    src="assets/img/6694e8fc4220bd1e88be52a6_medium.svg"
                    loading="lazy"
                    class="social-profiles social-profiles-large social-large-medium" />
                </a>
                <a
                  href="https://www.linkedin.com/in/utoron-strategy-277b37ab/"
                  target="_blank"
                  class="social-profile-wrapper linkedin-social social-profile-wrapper-large w-inline-block"
                  ><img
                    style="opacity: 0"
                    data-w-id="d8c0ce8f-4414-2941-e097-7d57835450a5"
                    alt="LinkedIn icon linking to {{ config('app.name') }}’s professional profile for networking and updates."
                    src="assets/img/6694e8fc4220bd1e88be52b1_linkedin.svg"
                    loading="lazy"
                    class="social-profiles social-profiles-large social-large-linkedin" />
                </a>
                <a href="https://facebook.com/profile.php?id=100083532935969om/"
                    target="_blank" class="social-profile-wrapper social-profile-wrapper-large w-inline-block"><img
                        style="opacity: 0" data-w-id="d8c0ce8f-4414-2941-e097-7d578354509d"
                        alt="Facebook icon" src="assets/img/66b325b4097bd17c8dc4ba5c_facebook.svg"
                        loading="lazy" class="social-profiles social-profiles-large social-large-x" />
                </a>
                <a href="https://instagram.com/utoronai_/"
                    target="_blank" class="social-profile-wrapper social-profile-wrapper-large w-inline-block"><img
                        width="28" height="28"
                        alt="Instagram for joining {{ config('app.name') }}’s community chat and crypto trading discussions."
                        src="assets/img/66b3208ed9bc988d2a8545e2_instagram.svg" loading="lazy"
                        data-w-id="d8c0ce8f-4414-2941-e097-7d57835450a1" style="opacity: 0"
                        class="social-profiles size-md social-profiles-large social-large-discord" />
                </a>
                
            </div>
            <p class="community-text">
                Dive into our journey, follow our updates, and become a part of the
                {{ config('app.name') }} family.
            </p>
        </div>
    </section>
    <section class="join-section !pt-0 !pb-10">
      <div class="section-heading-block">
          {{-- <h3 class="section-heading">Join the</h3> --}}
          <h2 class="section-heading-bold">FAQ's</h2>
      </div>
      <div class="section-wrapper section-community-block">
        <div x-data="{ open: null }" class="w-full max-w-2xl mx-auto space-y-1 mt-10">
          <!-- Accordion Item 1 -->
          <div class="rounded-lg shadow border-2 border-[#363737] bg-[#0c0c0c]">
            <button @click="open === 1 ? open = null : open = 1"
                    class="w-full px-4 py-4 text-left !text-xl font-medium bg-[#0c0c0c] focus:outline-none rounded-lg flex items-center justify-between">
              How does {{ config('app.name') }} work?
              <svg x-show="open === 1" class="inline-block w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <svg x-show="open !== 1" class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 1" x-collapse class="px-4 py-2 text-gray-200 bg-none">
              {{ config('app.name') }} is an AI-powered trading platform that makes it easy to trade the foreign exchange and cryptocurrency markets. Our algorithm uses a proven scalping strategy to trade the market, opening and closing trades in seconds, with the goal of accumulating profits over time. To get started, simply create an account, try out a demo trade to see how it works, and then fund your account to start earning real profits.
            </div>
          </div>
        
          <!-- Accordion Item 2 -->
          <div class="rounded-lg shadow border-2 border-[#363737] bg-[#0c0c0c]">
            <button @click="open === 2 ? open = null : open = 2"
                    class="w-full px-4 py-4 text-left !text-xl font-medium bg-[#0c0c0c] focus:outline-none rounded-lg flex items-center justify-between">
                    Do I need trading skills to earn?
              <svg x-show="open === 2" class="inline-block w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <svg x-show="open !== 2" class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 2" x-collapse class="px-4 py-2 text-gray-200 bg-none">
              No, you don't need any trading skills to profit from this, you can earn from {{ config('app.name') }} with zero knowledge in trading. The Ai bot handles all the trades for you and make profits, all you need to do is start the robot.
            </div>
          </div>
        
          <!-- Accordion Item 3 -->
          <div class="rounded-lg shadow border-2 border-[#363737] bg-[#0c0c0c]">
            <button @click="open === 3 ? open = null : open = 3"
                    class="w-full px-4 py-4 text-left !text-xl font-medium bg-[#0c0c0c] focus:outline-none rounded-lg flex items-center justify-between">
                 Are there any fees?
              <svg x-show="open === 3" class="inline-block w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <svg x-show="open !== 3" class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 3" x-collapse class="px-4 py-2 text-gray-200 bg-none">
              Yes, there's a 1% fee charged from profits made by the bot. For example, when you trade and the AI makes $100 in profits, the company charges you 1% of the $100 profits made by the bot, not from your capital but only from the profits made.
            </div>
          </div>

          <!-- Accordion Item 4 -->
          <div class="rounded-lg shadow border-2 border-[#363737] bg-[#0c0c0c]">
            <button @click="open === 4 ? open = null : open = 4"
                    class="w-full px-4 py-4 text-left !text-xl font-medium bg-[#0c0c0c] focus:outline-none rounded-lg flex items-center justify-between">
                    Is my funds safe?
              <svg x-show="open === 4" class="inline-block w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <svg x-show="open !== 4" class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 4" x-collapse class="px-4 py-2 text-gray-200 bg-none">
              Yes! Your funds and capital is 100% safe and secured on the system, you don't have to be scared of loosing out, your capital is returned after every trade. You can choose to withdraw both your capital and profits anytime.100% guarantee on withdrawals.
            </div>
          </div>

          <!-- Accordion Item 5 -->
          <div class="rounded-lg shadow border-2 border-[#363737] bg-[#0c0c0c]">
            <button @click="open === 5 ? open = null : open = 5"
                    class="w-full px-4 py-4 text-left !text-xl font-medium bg-[#0c0c0c] focus:outline-none rounded-lg flex items-center justify-between">
                    How fast is Deposit and withdrawal?
              <svg x-show="open === 5" class="inline-block w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <svg x-show="open !== 5" class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 5" x-collapse class="px-4 py-2 text-gray-200 bg-none">
              Deposits and Withdrawals are instantly processed and should arrive within 30 minutes maximum. There are no fees on deposits and withdrawals. Deposits and withdrawals are processed through crypto.
            </div>
          </div> 
          
          <div class="rounded-lg shadow border-2 border-[#363737] bg-[#0c0c0c]">
            <button @click="open === 6 ? open = null : open = 6"
                    class="w-full px-4 py-4 text-left !text-xl font-medium bg-[#0c0c0c] focus:outline-none rounded-lg flex items-center justify-between">
                    What is the minimum deposit and withdrawal?
              <svg x-show="open === 6" class="inline-block w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              <svg x-show="open !== 6" class="inline-block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div x-show="open === 6" x-collapse class="px-4 py-2 text-gray-200 bg-none">
              The minimum deposit is $100, the minimum withdrawal is $50. There are no limits on deposits and withdrawals, you can choose to deposit and withdraw any amounts as the forex and crypto market is unlimited. Deposits and withdrawals are processed through cryptocurrency.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="flex flex-col items-center justify-center gap-y-4">
      <div class="slider flex flex-row items-center justify-center gap-x-3">
          <div class="slides flex-none w-[25px]">
            <img class="payment-image w-full" alt="apple" loading="lazy" src="/images/coins/btc.png">
          </div>
          <div class="slides flex-none w-[25px]">
            <img class="payment-image w-full" alt="bullet" loading="lazy" src="/images/coins/eth.png">
          </div>
          <div class="slides flex-none w-[25px]">
            <img class="payment-image w-full" alt="ltc" loading="lazy" src="/images/coins/ltc.png">
          </div>
          <div class="slides flex-none w-[25px]">
            <img class="payment-image w-full" alt="bnb" loading="lazy" src="/images/coins/bnb.png">
          </div>
          <div class="slides flex-none w-[25px]">
            <img class="payment-image w-full" alt="usdt" loading="lazy" src="/images/coins/usdt.png">
          </div>
          <div class="slides flex-none w-[25px]">
            <img class="payment-image w-full" alt="usdc" loading="lazy" src="/images/coins/sol.png">
          </div>
      </div>
    </section>
    
    
</div>