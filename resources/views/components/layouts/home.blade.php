<!DOCTYPE html>
<html
  data-wf-domain="www.{{ config('app.name') }}.com"
  data-wf-page="669139f0dbf243a16af0bce5"
  data-wf-site="669139f0dbf243a16af0bcd9"
>
  <head>
    <meta charset="utf-8" />
    <title>{{ isset($title) ? $title.' - '.config('app.name') : config('app.name') }} | Trade While You Sleep</title>
    <meta
      content="Automate Your Crypto Trading with Ease – No Experience Needed. Instantly deploy powerful plug-and-play trading algorithms and start trading like a pro. Simplify your crypto journey today!"
      name="description"
    />
    <meta content="{{ config('mail.APP_NAME') }} | Trade While You Sleep" property="og:title" />
    <meta
      content="Automate Your Crypto Trading with Ease – No Experience Needed. Instantly deploy powerful plug-and-play trading algorithms and start trading like a pro. Simplify your crypto journey today!"
      property="og:description"
    />
    <meta
    content="assets/img/utoronscreenshot.png"
    property="og:image" /> 
    <meta
      content="{{ config('mail.APP_NAME') }} | Trade While You Sleep"
      property="twitter:title"
    />
    <meta
      content="Automate Your Crypto Trading with Ease – No Experience Needed. Instantly deploy powerful plug-and-play trading algorithms and start trading like a pro. Simplify your crypto journey today!"
      property="twitter:description"
    />
    <meta
      content="assets/img/utoronscreenshot.png"
      property="twitter:image"
    />
    <meta property="og:type" content="website" />
    <meta content="summary_large_image" name="twitter:card" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link
      href="assets/css/utoron-dark.webflow.3b9e5d9a0.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link href="assets/css/custom.css" rel="stylesheet" type="text/css" />
    <style></style>
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link href="https://fonts.gstatic.com" rel="preconnect" />
    <script
      src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
      type="text/javascript"
    ></script>
    <script type="text/javascript">
      WebFont.load({
        google: { families: ["Poppins:200,300,regular,500,600,700,800,900"] },
      });
    </script>
    <script type="text/javascript">
      !(function (o, c) {
        var n = c.documentElement,
          t = " w-mod-";
        (n.className += t + "js"),
          ("ontouchstart" in o ||
            (o.DocumentTouch && c instanceof DocumentTouch)) &&
            (n.className += t + "touch");
      })(window, document);
    </script>
    <link
      href="assets/img/utoronfavicon.png"
      rel="shortcut icon"
      type="image/x-icon"
    />
    <link
      href="assets/img/utoronfavicon.png"
      rel="apple-touch-icon"
    />

    @vite(
        [
            'resources/css/app.css',
            'resources/css/custom.css',
            'resources/js/app.js'
        ])

    <style>
      
      .gt_switcher-popup span:nth-of-type(1) {
        display: none !important;
      }
      .gt_switcher-popup span:nth-of-type(2) {
        font-size:11px !important;
      }
      .gt_black_overlay{
        height: 100vh!important;
      }

      @media (min-width: 992px) {
        .gt_white_content {
          margin: 0 auto !important;
          left:20%!important;
          top:100%!important;
        }
      }
     
    </style>

    @livewireStyles
    <!-- Finsweet Cookie Consent -->
    <!-- Add my own cookie consent management -->
    <!-- <script async src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js"
    fs-cc-mode="informational"></script> -->
    <!-- [Attributes by Finsweet] Auto Video -->
    <!-- <script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js"></script> -->
    <!-- <meta name="ahrefs-site-verification" content="570726cb01998112ab8db38ee988a0d6a02ff62ec1eeb5c87f32cd507fd13ed0"> -->
   <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-GMCDWSVNLE"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-GMCDWSVNLE');
  </script>

  {{-- Microsoft Clarity --}}
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rg54jtftcm");
  </script> 
  </head>

  <body class="body body-home w-full">
    <livewire:home.layout.header />
    <!-- <p style="height: 200px; background-color: red; color:white;">hello</p> -->
    @if (request()->routeIs('home.index') || request()->routeIs('root'))
    <section class="hero-section !pb-10 !mb-0">
      <div class="w-layout-blockcontainer container w-container">
        <div class="hero-flex-box">
          <div class="hero-box-left">
            <div class="hero-content2 z-10">
              <div class="hero-sub-header">
                <h3 class="hero-heading-3">AI-Powered Trading</h3>
              </div>
              <h1 style="line-height: 4rem;" class="hero-heading-1 "> Even While You Sleep</h1>
              <p class="paragraph hero-paragraph">
                Dream Big, Earn Bigger: Automated AI Trading Works 24/7!
              </p>
              <div class="w-embed">
                <style>
                  .cta-gradient {
                    background: linear-gradient(
                      230deg,
                      #30d4ff,
                      #4cee98,
                      #ffda3b
                    );
                    background-size: 200% 200%;
                    animation: CTA-gradient 3s ease infinite;
                    /* , CTA-glow 5s ease infinite */
                  }

                  @keyframes CTA-gradient {
                    0% {
                      background-position: 0% 90%;
                    }

                    50% {
                      background-position: 100% 11%;
                    }

                    100% {
                      background-position: 0% 90%;
                    }
                  }

                  @keyframes CTA-glow {
                    0% {
                      box-shadow: 0 0 0px #30d4ff, 0 0 0px #4cee98,
                        0 0 0px #ffda3b;
                    }

                    50% {
                      box-shadow: 0 0 6px #30d4ff, 0 0 6px #4cee98,
                        0 0 6px #ffda3b;
                    }

                    100% {
                      box-shadow: 0 0 0px #30d4ff, 0 0 0px #4cee98,
                        0 0 0px #ffda3b;
                    }
                  }
                </style>
              </div>
              <a
                data-w-id="8ee164c2-fe02-48ef-c597-55856747312b"
                style="
                  -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
                    rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                  -moz-transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
                    rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                  -ms-transform: translate3d(0, 0, 0) scale3d(1, 1, 1)
                    rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                  transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
                    rotateY(0) rotateZ(0) skew(0, 0);
                "
                href="/user/auth/register"
                class="cta-button cta-gradient w-inline-block"
              >
                <div class="cta-inner">
                  <div class="cta-text">Get Started Today</div>
                  <img
                    src="assets/img/6694ee7fcf165d446804cac3_arrow-light.svg"
                    loading="lazy"
                    alt="Light arrow icon pointing right, used for accessing {{ config('mail.APP_NAME') }}&#x27;s auto trading tools."
                    class="hero-cta-arrow"
                  />
                </div>
              </a>
              <!-- <div class="trade-now-container !block">
                <div class="trade-now-text-3">Trade now</div>
                <div class="trade-now-icons">
                  <a
                    data-w-id="803758cf-1ef8-1a53-289e-1146d23dc599"
                    href="https://www.mexc.com/exchange/TTM_USDT"
                    target="_blank"
                    class="trade-now-icon w-inline-block"
                    ><img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6697800c615ef2b8f6931dbc_mexc-icon-color.svg"
                      alt="MEXC TTM/USDT link"
                      class="icon-tradeon icon-tradeon-mexc" /></a
                  ><a
                    data-w-id="803758cf-1ef8-1a53-289e-1146d23dc59b"
                    href="https://www.lbank.com/trade/ttm_usdt/"
                    target="_blank"
                    class="trade-now-icon w-inline-block"
                    ><img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6697800c615ef2b8f6931dd4_lbank-icon-color.svg"
                      alt="Lbank TTM/USDT link"
                      class="icon-tradeon icon-tradeon-lbank" /></a
                  ><a
                    data-w-id="803758cf-1ef8-1a53-289e-1146d23dc59d"
                    href="https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&amp;outputCurrency=0xE356cb3eFc9CB4320b945393A10Fd71c77dc24A0"
                    target="_blank"
                    class="trade-now-icon w-inline-block"
                    ><img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/669139f0dbf243a16af0bcd9/6697800c615ef2b8f6931dcf_pancakeswap-icon-color.svg"
                      alt="PancakeSwap TTM/USDT link"
                      class="icon-tradeon icon-tradeon-pankcakeswap"
                  /></a>
                </div>
              </div> -->
            </div>
          </div>
          <div class="hero-box-right">
            <img
              src="assets/img/66961da13ac63b79fbb72770_hero-ball1.svg"
              loading="lazy"
              alt="Decorative stylized spherical graphic for {{ config('mail.APP_NAME') }}&#x27;s website header."
              class="hero-ball2"
            /><img
              src="assets/img/66961da13ac63b79fbb72770_hero-ball1.svg"
              loading="lazy"
              alt="Decorative stylized spherical graphic for {{ config('mail.APP_NAME') }}&#x27;s website header."
              class="hero-ball1"
            />
            <div class="w-embed">
              <style>
                .hero-ball1 {
                  animation: float 4s ease-in-out infinite;
                }

                @keyframes float {
                  0% {
                    transform: translateY(0);
                  }

                  50% {
                    transform: translateY(-20px);
                  }

                  100% {
                    transform: translateY(0);
                  }
                }

                .hero-ball2 {
                  animation: float2 5s ease-in-out infinite;
                }

                @keyframes float2 {
                  0% {
                    transform: translateY(-20px);
                  }

                  50% {
                    transform: translateY(0px);
                  }

                  100% {
                    transform: translateY(-20px);
                  }
                }
              </style>
            </div>
            <div
              data-w-id="504233e0-7faa-b3e9-5ffb-914e89fe9538"
              style="opacity: 0"
              class="w-layout-grid hero-socials"
            >
              {{-- <a
                id="w-node-_504233e0-7faa-b3e9-5ffb-914e89fe953b-6af0bce5"
                href="#"
                target="_blank"
                class="hero-socials-item w-inline-block"
                ><img
                  id="w-node-_504233e0-7faa-b3e9-5ffb-914e89fe953c-6af0bce5"
                  loading="lazy"
                  alt="Telegram"
                  src="assets/img/66951f40c7cc98418e20a605_telegram.svg"
                  class="community-icon-hero" /></a
              ><a
                id="w-node-_504233e0-7faa-b3e9-5ffb-914e89fe9539-6af0bce5"
                href="#"
                target="_blank"
                class="hero-socials-item w-inline-block"
                ><img
                  id="w-node-_504233e0-7faa-b3e9-5ffb-914e89fe953a-6af0bce5"
                  loading="lazy"
                  alt="Twitter"
                  src="assets/img/66b325b4097bd17c8dc4ba5c_facebook.svg"
                  class="community-icon-hero community-icon-hero-x" /></a
              >
              
              <a
                id="w-node-_504233e0-7faa-b3e9-5ffb-914e89fe9543-6af0bce5"
                href="#"
                target="_blank"
                class="hero-socials-item hero-socials-item-youtube w-inline-block"
                >
                  <img
                      id="w-node-_504233e0-7faa-b3e9-5ffb-914e89fe9544-6af0bce5"
                      loading="lazy"
                      alt="Youtube"
                      src="assets/img/66b3208ed9bc988d2a8545e2_instagram.svg"
                      class="community-icon-hero community-icon-hero-youtube"
                  />
              </a> --}}
            </div>
            <div class="mascot-hero-container mascot-float !z-1">
              <img
                class="mascot-hero"
                src="assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4.png"
                alt="Faded image of the {{ config('mail.APP_NAME') }} mascot, representing automated crypto trading bots."
                style="opacity: 0"
                sizes="100vw"
                data-w-id="fa1de0c6-6511-c30b-acbb-d7c09eb94b7b"
                loading="eager"
                srcset="
                  assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-500.png   500w,
                  assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-800.png   800w,
                  assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-1080.png 1080w,
                  assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4-p-1600.png 1600w,
                  assets/img/6697951296f4ae1fb45d38f8_hero-mascot-fade4.png        1920w
                "
              />
              <div class="w-embed">
                <style>
                  .mascot-float {
                    animation: mascot-float 8s ease-in-out infinite;
                  }

                  @keyframes mascot-float {
                    0% {
                      transform: translateY(0);
                    }

                    50% {
                      transform: translateY(-16px);
                    }

                    100% {
                      transform: translateY(0);
                    }
                  }
                </style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    @endif
    <div class="page-wrapper">
      {{ $slot }}
    </div>
    <livewire:home.layout.footer />
    <script  data-navigate-track
      src="assets/js/jquery-3.5.1.min.dc5e7f18c8.js"
      type="text/javascript"
    ></script>
    
    <script
    data-navigate-track
      src="assets/js/webflow.e973c9150.js"
      type="text/javascript"
    ></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        // Hamburger menu functionality
        document
          .querySelectorAll(".hamburger-open")
          .forEach(function (element) {
            element.addEventListener("click", function () {
              document.body.classList.toggle("no-scroll");
            });
          });

        document
          .querySelectorAll(".hamburger-close")
          .forEach(function (element) {
            element.addEventListener("click", function () {
              document.body.classList.remove("no-scroll");
            });
          });
      });
    </script>

    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/681454f1fc50e9190eb82cec/1iq7mnl0s';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    </script>
    <script>window.gtranslateSettings = {"default_language":"en","detect_browser_language":true,"wrapper_selector":".gtranslate_wrapper","flag_size":24,"flag_style":"3d"}</script>
    <script src="https://cdn.gtranslate.net/widgets/latest/popup.js" defer></script>
  
    <!--End of Tawk.to Script-->
    @livewireScripts
    @stack('scripts')
  </body>
</html>