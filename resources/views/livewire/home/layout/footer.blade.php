<?php

use Livewire\Volt\Component;

new class extends Component {
    //
}; ?>

<section class="footer">
    <div id="New" class="footer-box">
        <div class="footer-top">
            <a href="#" class="footer-brand-link-block w-inline-block"><img loading="lazy"
                    src="assets/img/utoronlogowhite.png"
                    alt="Monochrome {{ config('app.name') }} logo, the platform for crypto trading and automated bots."
                    class="footer-brand !w-30" /></a>
        </div>
        <div class="footer-bottom">
            <div class="footer-upper-container">
                <div id="newsletter" class="footer-upper-left">
                    <div data-w-id="8745e6f6-e7ce-d12c-5cda-dd37be8abe38" class="footer-title">
                        Newsletter
                    </div>
                    <div class="footer-text">
                        Get insights into {{ config('app.name') }}, trading tips, and latest crypto
                        news straight to your mailbox!
                    </div>
                    <div data-w-id="8745e6f6-e7ce-d12c-5cda-dd37be8abe3c" class="newsletter-form-block w-form">
                        <form id="email-form" name="email-form" data-name="Email Form" method="get"
                            class="newsletter-form" data-wf-page-id="669139f0dbf243a16af0bce5"
                            data-wf-element-id="8745e6f6-e7ce-d12c-5cda-dd37be8abe3d">
                            <div class="newsletter-form-sub-wrapper">
                                <input class="newsletter-text-field w-input" maxlength="256" name="Newsletter-2"
                                    data-name="Newsletter 2" placeholder="Your email" type="email" id="Newsletter-2"
                                    required="" /><input type="submit" data-wait="Please wait..."
                                    class="newsletter-submit-button newsletter-submit-button-ttm-copy-menu w-button"
                                    value="Subscribe" />
                            </div>
                            <div class="subscribe-any-time-text">
                                *You can unsubscribe at any time
                            </div>
                        </form>
                        <div class="newsletter-success-message-new w-form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div class="newsletter-error-message w-form-fail">
                            <div>
                                Oops! Something went wrong while submitting the form. Please
                                try again.
                            </div>
                        </div>
                    </div>
                    <h5 style="font-size: 13px;">Get the app</h5>
                    <div class="flex flex-row gap-3 justify-content-start py-1">
                        <a class="btn btn-outline-light bg-black btn-lg text-white fw-bold d-flex flex-column justify-content-center"
                            href="/nxcai.apk">
                            <img src="/assets/img/google.svg" width="100%" alt="">
                        </a>
                        <a class="btn btn-outline-light bg-black btn-lg text-white fw-bold d-flex flex-column justify-content-center"
                            href="#">
                            <img src="/assets/img/apple.svg" width="100%" alt="">
                        </a>
                    </div>
                    <div class="div-block-88">
                        <div class="copyright-text">
                            © {{ config('app.name') }} 2025. All rights reserved
                        </div>
                    </div>
                </div>
                <div class="footer-upper-right">
                    <div class="w-layout-grid footer-grid">
                        <div class="footer-link-container">
                            <div class="footer-title">Company</div>
                            <div class="w-layout-grid footer-link-grid">
                                <a id="w-node-_8d5c2a85-4203-0600-1508-a62daa9ce654-be8abe30" href="/" 
                                    class="footer-link">Home</a><a
                                    id="w-node-_8745e6f6-e7ce-d12c-5cda-dd37be8abe52-be8abe30" href="/#howto" 
                                    class="footer-link">How To</a>
                                    <a href="/terms" id="w-node-_8745e6f6-e7ce-d12c-5cda-dd37be8abe54-be8abe30"
                                    class="footer-link">Tos</a>
                                    <a href="/privacy" id="w-node-_8745e6f6-e7ce-d12c-5cda-dd37be8abe54-be8abe30"
                                    class="footer-link">Privacy</a>
                            </div>
                        </div>
                        <div class="footer-link-container">
                            <div class="footer-title">Get In Touch</div>
                            <div>
                                <div class="footer-link-wrapper">
                                    <img loading="lazy" src="assets/img/6694e8fc4220bd1e88be5290_Email-Icon.svg"
                                        alt="Email icon to contact {{ config('app.name') }}’s support for automated trading &amp; partnership inquiries"
                                        class="footer-link-email-icon" /><a
                                        id="w-node-_8745e6f6-e7ce-d12c-5cda-dd37be8abe62-be8abe30"
                                        href="mailto:support{{'@'}}{{ config('app.name') }}.com"
                                        class="footer-contact-link">support{{'@'}}{{ config('app.name') }}.com</a>
                                </div>
                                <div class="footer-link-wrapper">
                                    <img loading="lazy" src="assets/img/6694e8fc4220bd1e88be5255_Web-Icon.svg"
                                        alt="Web icon linking to {{ config('app.name') }}’s automated trading platform."
                                        class="footer-link-email-icon" /><a
                                        id="w-node-_8745e6f6-e7ce-d12c-5cda-dd37be8abe66-be8abe30" href="#"
                                        class="footer-contact-link">{{ config('app.name') }}.com</a>
                                </div>
                            </div>
                            <a href="#" target="_blank" class="link-block-2 w-inline-block"><img width="150"
                                    height="Auto" alt="Hacken Logo "
                                    src="assets/img/6694e8fd4220bd1e88be52fa_hacken.svg" loading="lazy"
                                    class="image-29" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-banner">
                <div class="div-block-86">
                    <div class="copyright-text-mobile">
                        © {{ config('app.name') }} 2025. All rights reserved
                    </div>
                </div>
                <div class="div-block-hacken">
                    <a href="#" target="_blank" class="link-block-hacken w-inline-block"><img width="150" height="Auto"
                            alt="Hacken Logo " src="assets/img/6694e8fd4220bd1e88be52fa_hacken.svg" loading="lazy"
                            class="image-29" /></a>
                </div>
            </div>
        </div>
    </div>
</section>