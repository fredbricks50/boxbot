<?php

use Livewire\Volt\Component;

new class extends Component {
    //
}; ?>

<section class="navbar">
    <div data-animation="over-right" data-collapse="all" data-duration="400" data-easing="ease" data-easing2="ease"
        role="banner" class="navbar-mobile w-nav">
        <div class="container-2 w-container">
            <div class="header-div">
                <a href="/" aria-current="page" class="header-logo w-inline-block w--current"><img
                        src="assets/img/utoronlogo.png" loading="eager"
                        alt="{{ config('mail.APP_NAME') }} logo, the platform for crypto trading and automated bots."
                        class="image-31 !w-30" /></a>
            </div>
            <nav role="navigation" class="nav-menu w-nav-menu">
                <div class="mobile-scroll-wrap">
                    <div class="mobile-menu-button-container">
                        <div class="menu-button hamburger-close w-nav-button">
                            <img src="assets/img/66b374f097474618710f22e0_icon-close.svg" loading="lazy"
                                alt="Close icon, used to exit or dismiss pop-ups and modals."
                                class="mobile-menu-close-icon" />
                        </div>
                    </div>
                    <div class="nav-menu-group">
                        <h3 class="mobile-nav-main-header">Navigation</h3>
                        <div class="mobile-link-grid mobile-link-grid-two-columns">
                            <a href="/" aria-current="page"
                                class="mobile-menu-link hamburger-close w-inline-block w--current">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66b374a8ea06b5dbc0044533_icon-home.svg" loading="lazy"
                                        alt="Home Icon" class="menu-dropdown-item-icon menu-dropdown-item-icon-home" />
                                </div>
                                <h4 class="mobile-menu-link-text">Home</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            <a id="w-node-_183df612-0dd5-a40c-56e9-700bfcc67468-17d15ee7" href="#howto" role="button" tabindex="0" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="true"
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66b46ed3113e60de0452b5d2_icon-docs.svg" loading="lazy"
                                        alt="Docs icon for accessing {{ config('mail.APP_NAME') }}&#x27;s automated trading platform documentation."
                                        class="menu-dropdown-item-icon menu-dropdown-item-b2b" />
                                </div>
                                <h4 class="mobile-menu-link-text">How to</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            <a id="w-node-_183df612-0dd5-a40c-56e9-700bfcc67468-17d15ee7" href="#features" role="button" tabindex="0" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="true"
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66b1dce2df83d42a0a6f9d9a_menu-icon-algorithms.svg" loading="lazy"
                                        alt="Docs icon for accessing {{ config('mail.APP_NAME') }}&#x27;s automated trading platform documentation."
                                        class="menu-dropdown-item-icon menu-dropdown-item-b2b" />
                                </div>
                                <h4 class="mobile-menu-link-text">Features</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                        </div>
                    </div>
                    <div class="nav-menu-group">
                        <h3 class="mobile-nav-header">Community</h3>
                        <div class="mobile-link-grid mobile-link-grid-two-columns">
                            {{-- <a href="/#"  class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66951f40c7cc98418e20a605_telegram.svg" loading="lazy"
                                        alt="Telegram icon for joining {{ config('mail.APP_NAME') }}’s official channel with trading tips and announcements."
                                        class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Telegram Chat</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a> --}}
                            {{-- <a id="w-node-fa8212a1-61e0-3ef7-8d07-ddc3bff099cd-17d15ee7" href="/#" 
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66951f40c7cc98418e20a605_telegram.svg" loading="lazy"
                                        alt="Telegram icon for joining {{ config('mail.APP_NAME') }}’s official channel with trading tips and announcements."
                                        class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Join Channel</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a> --}}
                            <a href="https://x.com/utoronai"  class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66ab8e9a361b16ce4b4ad8b9_X_icon.svg" loading="lazy"
                                        alt="X (formerly Twitter) icon"
                                        class="menu-dropdown-item-icon menu-dropdown-item-icon-x" />
                                </div>
                                <h4 class="mobile-menu-link-text">X</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            {{-- <a href="/#"  class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66951f40c7cc98418e20a5e6_discord.svg" loading="lazy"
                                        alt="Discord icon for joining {{ config('mail.APP_NAME') }}’s community chat and crypto trading discussions."
                                        class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Discord</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a> --}}
                            <a href="https://medium.com/@utoronai"  class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66951f40c7cc98418e20a5cc_medium.svg" loading="lazy"
                                        alt="Medium icon for accessing {{ config('mail.APP_NAME') }}’s articles on crypto trading strategies and insights."
                                        class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Medium</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            <a id="w-node-cee5ef75-ff17-c2d3-3def-aa8fde9e637d-17d15ee7" href="https://www.linkedin.com/in/utoron-strategy-277b37ab/" 
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66951f40c7cc98418e20a5f4_linkedin.svg" loading="lazy"
                                        alt="LinkedIn icon linking to {{ config('mail.APP_NAME') }}’s professional profile for networking and updates."
                                        class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Linkedin</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            <a id="w-node-_4b120e8a-83ae-9904-d848-d9a8031751b5-17d15ee7" href="https://facebook.com/profile.php?id=100083532935969om/" 
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66b325b4097bd17c8dc4ba5c_facebook.svg" loading="lazy"
                                        alt="Facebook logo" class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Facebook</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            <a id="w-node-_20483ec9-647e-22b3-ecae-74179812f071-17d15ee7" href="https://instagram.com/utoronai_/" 
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/66b3208ed9bc988d2a8545e2_instagram.svg" loading="lazy"
                                        alt="Instagram logo" class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Instagram</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a>
                            {{-- <a id="w-node-_5e609637-9ed1-9b34-98b1-9418bdea7af3-17d15ee7" href="/#" 
                                class="mobile-menu-link hamburger-close w-inline-block">
                                <div class="mobile-menu-link-icon">
                                    <img src="assets/img/6694e8fd4220bd1e88be52f4_social_youtubev2.svg" loading="lazy"
                                        alt="YouTube icon linking to {{ config('mail.APP_NAME') }}’s video channel for trading insights and tutorials."
                                        class="menu-dropdown-item-icon" />
                                </div>
                                <h4 class="mobile-menu-link-text">Youtube</h4>
                                <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg" loading="lazy"
                                    alt="Arrow icon representing a link in the navigation bar."
                                    class="mobile-menu-link-arrow" />
                            </a> --}}

                        </div>
                    </div>
                </div>
            </nav>
            <div class="flex">
                <a href="/user/auth/register"
                    class="flex flex-row items-center justify-center border border-1 border-white rounded-full px-2 py-1 text-white">
                    <div>
                        <img class="w-6" src="assets/img/utoronfaviconwhite.png" loading="lazy" />
                    </div>
                    <div class="text-block-3">Get Started</div>
                </a>
            </div>
            <div class="flex ml-3">
                <div class="gtranslate_wrapper d-lg-none d-sm-block"></div>
            </div>
            <div class="menu-button hamburger-open w-nav-button">
                <div class="w-icon-nav-menu"></div>
            </div>
        </div>
    </div>
    <div class="navbar-desktop-wrapper">
        <div class="navbar-desktop">
            <a href="/" aria-current="page" class="navbar-logo w-inline-block w--current !w-30"><img
                    src="assets/img/utoronlogo.png" loading="lazy"
                    alt="{{ config('mail.APP_NAME') }} logo, the platform for crypto trading and automated bots." /></a>
            <div class="navbar-navigation">
                <div class="navbar-middle-section">
                    <div class="navbar-links">
                        <div class="navbar-link-container">
                            <a href="/" class="navbar-link w-inline-block">
                                <div class="navbar-link-text">Home</div>
                            </a>
                        </div>
                        <div class="navbar-link-container">
                            <a href="/#howto" class="navbar-link w-inline-block">
                                <div class="navbar-link-text">How To</div>
                            </a>
                        </div>
                        <div class="navbar-link-container">
                            <a href="/#features" class="navbar-link w-inline-block">
                                <div class="navbar-link-text">Features</div>
                            </a>
                        </div>

                        <div data-w-id="d1baa850-6e20-baf9-c0bd-2357436d4a50"
                            class="navbar-link-container navbar-dropdown-container">
                            <a href="#" class="navbar-link navbar-link-dropdown w-inline-block">
                                <div class="navbar-link-text">Community</div>
                                <img src="assets/img/6697a72e400cc440eb6861e8_icon-dropdown.svg" loading="lazy"
                                    alt="Icon indicating a dropdown menu for additional options."
                                    class="icon-dropdown" />
                            </a>
                            <div data-w-id="d1baa850-6e20-baf9-c0bd-2357436d4a55" class="navbar-dropdown">
                                <div class="w-layout-grid dropdown-grid dropdown-grid-community">
                                    {{-- <a data-w-id="db45fd63-a8c9-a458-220e-0b8a3206bc3f" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66951f40c7cc98418e20a605_telegram.svg" loading="lazy"
                                                alt="Telegram icon for joining {{ config('mail.APP_NAME') }}’s official channel with trading tips and announcements."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Join Channel</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a> --}}
                                    <a id="w-node-ba5b4146-f0fa-9704-1e07-0c19a8e13168-17d15ee7"
                                        data-w-id="ba5b4146-f0fa-9704-1e07-0c19a8e13168" href="https://x.com/utoronai" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66ab8e9a361b16ce4b4ad8b9_X_icon.svg" loading="lazy"
                                                alt="X (formerly Twitter) icon" class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">X</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    <a data-w-id="f1621a52-2ba4-74d8-6381-9e4f328bcffb" href="https://medium.com/@utoronai" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66951f40c7cc98418e20a5cc_medium.svg" loading="lazy"
                                                alt="Medium icon for accessing {{ config('mail.APP_NAME') }}’s articles on crypto trading strategies and insights."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Medium</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    {{-- <a id="w-node-d1baa850-6e20-baf9-c0bd-2357436d4a5d-17d15ee7"
                                        data-w-id="d1baa850-6e20-baf9-c0bd-2357436d4a5d" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66951f40c7cc98418e20a605_telegram.svg" loading="lazy"
                                                alt="Telegram icon for joining {{ config('mail.APP_NAME') }}’s official channel with trading tips and announcements."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Telegram Ann.</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a> --}}
                                    {{-- <a id="w-node-ba5b4146-f0fa-9704-1e07-0c19a8e13168-17d15ee7"
                                        data-w-id="ba5b4146-f0fa-9704-1e07-0c19a8e13168" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66ab8e9a361b16ce4b4ad8b9_X_icon.svg" loading="lazy"
                                                alt="X (formerly Twitter) icon" class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">X</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    <a id="w-node-_8fe3dee5-25b5-314a-78f4-7807867697a2-17d15ee7"
                                        data-w-id="8fe3dee5-25b5-314a-78f4-7807867697a2" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66951f40c7cc98418e20a5e6_discord.svg" loading="lazy"
                                                alt="Discord icon for joining {{ config('mail.APP_NAME') }}’s community chat and crypto trading discussions."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Discord</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    <a data-w-id="f1621a52-2ba4-74d8-6381-9e4f328bcffb" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66951f40c7cc98418e20a5cc_medium.svg" loading="lazy"
                                                alt="Medium icon for accessing {{ config('mail.APP_NAME') }}’s articles on crypto trading strategies and insights."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Medium</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    <a id="w-node-ad36fc2d-aed6-8e90-ace0-1d9e2d213701-17d15ee7"
                                        data-w-id="ad36fc2d-aed6-8e90-ace0-1d9e2d213701" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/6694e8fd4220bd1e88be52f4_social_youtubev2.svg"
                                                loading="lazy"
                                                alt="YouTube icon linking to {{ config('mail.APP_NAME') }}’s video channel for trading insights and tutorials."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Youtube</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a> --}}
                                    <a id="w-node-d896f1d8-67cd-60e5-b6ad-696db6df59f8-17d15ee7"
                                        data-w-id="d896f1d8-67cd-60e5-b6ad-696db6df59f8" href="https://instagram.com/utoronai_/" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66b3208ed9bc988d2a8545e2_instagram.svg" loading="lazy"
                                                alt="Instagram logo" class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Instagram</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    <a id="w-node-eb81847e-5326-8164-d9f4-a28b66a2ebea-17d15ee7"
                                        data-w-id="eb81847e-5326-8164-d9f4-a28b66a2ebea" href="https://www.linkedin.com/in/utoron-strategy-277b37ab/" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66951f40c7cc98418e20a5f4_linkedin.svg" loading="lazy"
                                                alt="LinkedIn icon linking to {{ config('mail.APP_NAME') }}’s professional profile for networking and updates."
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Linkedin</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a> 
                                    <a id="w-node-d2aa793a-eeb6-50ba-a212-408f4125759a-17d15ee7"
                                        data-w-id="d2aa793a-eeb6-50ba-a212-408f4125759a" href="https://facebook.com/profile.php?id=100083532935969om/" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66b325b4097bd17c8dc4ba5c_facebook.svg" loading="lazy"
                                                alt="Facebook logo" class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Facebook</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    {{-- <a id="w-node-_109feaad-f50c-4d5e-bde6-df2474f70ba4-17d15ee7"
                                        data-w-id="109feaad-f50c-4d5e-bde6-df2474f70ba4" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66b3208e7227a1e8f67341fb_reddit.svg" loading="lazy"
                                                alt="Reddit logo" class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">Reddit</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a>
                                    <a id="w-node-fbe08b54-6803-ce3f-88b7-b3cc2ac4c48a-17d15ee7"
                                        data-w-id="fbe08b54-6803-ce3f-88b7-b3cc2ac4c48a" href="#" 
                                        class="dropdown-item dropdown-item-community w-inline-block">
                                        <div class="dropdown-icon-box dropdown-icon-box-community">
                                            <img src="assets/img/66b3208eb666e920888bec99_coinmarketcap.svg"
                                                loading="lazy" alt="Coinmarketcap logo"
                                                class="menu-dropdown-item-icon" />
                                        </div>
                                        <h4 class="heading-dropdown-link">CoinMarketCap</h4>
                                        <img src="assets/img/6697a94c5e86952769d3d26e_icon-navbar-link.svg"
                                            loading="lazy" alt="Arrow icon representing a link in the navigation bar."
                                            class="dropdown-link-icon" />
                                    </a> --}}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="flex flex-row items-center ml-3">
                    <div class="gtranslate_wrapper d-lg-none d-sm-block"></div>
                </div>
                <a data-w-id="a6ab8b93-b2d6-e02a-f05f-423e17d15f7c" href="/user/auth" 
                    class="button-staking w-inline-block">
                    <div class="staking-button-image">
                        <img src="assets/img/utoronfavicon.png" loading="lazy"
                            alt="Dark {{ config('mail.APP_NAME') }} token TTM icon, representing a cryptocurrency token used to access premium trading tools on the platform"
                            class="token-icon-dark" />
                        <img src="assets/img/utoronfaviconwhite.png" loading="lazy"
                            alt="Light {{ config('mail.APP_NAME') }} token TTM icon, representing a cryptocurrency token used to access premium trading tools on the platform"
                            class="token-icon" />
                    </div>
                    <div class="text-block-3">Login</div>
                </a>
                <a data-w-id="a6ab8b93-b2d6-e02a-f05f-423e17d15f82" href="/user/auth/register" 
                    class="navbar-button-cta w-inline-block">
                    <div>Get Started</div>
                    <div class="cta-button-arrows">
                        <img src="assets/img/6696459b30a0dbf13ac37b38_arrow-short-light.svg" loading="lazy"
                            alt="Short, light arrow icon for compact directional use on the {{ config('mail.APP_NAME') }} automated crypto trading website "
                            class="cta-arrow-white" /><img
                            src="assets/img/669645750f4a33f0c4737988_arrow-short-dark.svg" loading="lazy"
                            alt="Short, dark arrow icon for compact directional use on the {{ config('mail.APP_NAME') }} automated crypto trading website "
                            class="cta-arrow-dark" />
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>