<?php
use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title};

new 
#[Layout('components.layouts.home')]
#[Title('Privacy')]
class extends Component {
    //
}; ?>

<div>
    <section class="privacy-section">
        <div class="div-block">
          <h1 class="heading-3">Privacy Policy</h1>
          <div class="text-block-privacy">
            This privacy policy describes our commitment to preserving the
            security of your Personal Data, your privacy, and your rights to
            your Personal Data. At {{ config('app.name') }}, we believe that the less
            information we know about you, the better. After all, it is
            impossible to lose, misuse or abuse information we do not have.<br /><br />It
            is {{ config('app.name') }}&#x27;s policy to respect your privacy regarding any
            information we may collect from you across our website,
            https://{{ config('app.name') }}.com, and other sites we own and operate.<br /><br />We
            only ask for personal information when we truly need it to provide a
            service to you. We collect it by fair and lawful means, with your
            knowledge and consent. We also let you know why we’re collecting it
            and how it will be used.<br /><br />We only retain collected
            information for as long as necessary to provide you with your
            requested service. We understand and accept our responsibility to
            protect Service Data and Secure Data. We use strict access control
            mechanisms, network isolation, and encryption to ensure that Secure
            and Service Data is only available to authorized personnel.
            Additionally, Secure Data cannot be decrypted even by those who do
            have access to it.<br /><br />We don’t share any personally
            identifying information publicly or with third-parties, except when
            required to by law.<br /><br />Our website may link to external
            sites that are not operated by us. Please be aware that we have no
            control over the content and practices of these sites, and cannot
            accept responsibility or liability for their respective privacy
            policies.<br /><br />You are free to refuse our request for your
            personal information, with the understanding that we may be unable
            to provide you with some of your desired services.<br /><br />We may
            use your contact information to communicate with you about Service
            activity, provide support, and send you other information such as
            product updates and announcements. You may choose to stop receiving
            communications from us, except certain important notifications such
            as billing and account security alerts.<br /><br />Your continued
            use of our website will be regarded as acceptance of our practices
            around privacy and personal information. If you have any questions
            about how we handle user data and personal information, feel free to
            contact us at info@ {{ config('app.name') }}.com or write to us by mail at:<br /><br />Schiedamse
            Vest 154 Office 101, 3011BH Rotterdam, The Netherlands.<br /><br />This
            policy is effective as of 1 March 2021.
          </div>
          <h3 class="header-privacy">Cookie Policy</h3>
          <p class="text-block-privacy">
            This is the Cookie Policy for {{ config('app.name') }}, accessible from
            https://{{ config('app.name') }}.com/
          </p>
          <h4 class="header-privacy">What are cookies</h4>
          <p class="text-block-privacy">
            As is common practice with almost all professional websites this
            site uses cookies, which are tiny files that are downloaded to your
            computer, to improve your experience. This page describes what
            information they gather, how we use it and why we sometimes need to
            store these cookies. We will also share how you can prevent these
            cookies from being stored however this may downgrade or
            &#x27;break&#x27; certain elements of the sites functionality.
          </p>
          <h4 class="header-privacy">How we use cookies</h4>
          <p class="text-block-privacy">
            We use cookies for a variety of reasons detailed below.
            Unfortunately in most cases there are no industry standard options
            for disabling cookies without completely disabling the functionality
            and features they add to this site. It is recommended that you leave
            on all cookies if you are not sure whether you need them or not in
            case they are used to provide a service that you use.
          </p>
          <h4 class="header-privacy">Disabling cookies</h4>
          <p class="text-block-privacy">
            You can prevent the setting of cookies by adjusting the settings on
            your browser (see your browser Help for how to do this). Be aware
            that disabling cookies will affect the functionality of this and
            many other websites that you visit. Disabling cookies will usually
            result in also disabling certain functionality and features of the
            this site. Therefore it is recommended that you do not disable
            cookies.<br />
          </p>
          <h4 class="header-privacy">The cookies we set</h4>
          <ul role="list" class="list-6">
            <li class="list-item-22">
              <h6 class="h4-heading-privacy">Account related cookies</h6>
              <p class="text-block-privacy">
                If you create an account with us then we will use cookies for
                the management of the signup process and general administration.
                These cookies will usually be deleted when you log out however
                in some cases they may remain afterwards to remember your site
                preferences when logged out.<br />
              </p>
            </li>
            <li class="list-item-22">
              <h6 class="h4-heading-privacy">Login related cookies</h6>
              <p class="text-block-privacy">
                We use cookies when you are logged in so that we can remember
                this fact. This prevents you from having to log in every single
                time you visit a new page. These cookies are typically removed
                or cleared when you log out to ensure that you only access
                restricted features and areas when logged in.<br />
              </p>
            </li>
            <li class="list-item-22">
              <h6 class="h4-heading-privacy">
                Email newsletters related cookies
              </h6>
              <p class="text-block-privacy">
                This site offers newsletter or email subscription services and
                cookies may be used to remember if you are already registered
                and whether to show certain notifications which might only be
                valid to subscribed/unsubscribed users.<br />
              </p>
            </li>
            <li class="list-item-22">
              <h6 class="h4-heading-privacy">Survey related cookies</h6>
              <p class="text-block-privacy">
                From time to time we offer user surveys and questionnaires to
                provide you with interesting insights, helpful tools, or to
                understand our user base more accurately. These surveys may use
                cookies to remember who has already taken part in a survey or to
                provide you with accurate results after you change pages.<br />
              </p>
            </li>
            <li class="list-item-22">
              <h6 class="h4-heading-privacy">Form related cookies</h6>
              <p class="text-block-privacy">
                When you submit data to through a form such as those found on
                contact pages or comment forms cookies may be set to remember
                your user details for future correspondence.<br />
              </p>
            </li>
            <li class="list-item-22">
              <h6 class="h4-heading-privacy">Site preferences cookies</h6>
              <p class="text-block-privacy">
                In order to provide you with a great experience on this site we
                provide the functionality to set your preferences for how this
                site runs when you use it. In order to remember your preferences
                we need to set cookies so that this information can be called
                whenever you interact with a page is affected by your
                preferences.
              </p>
            </li>
          </ul>
          <h4 class="h4-heading-privacy">Third party cookies</h4>
          <p class="text-block-privacy">
            In some special cases we also use cookies provided by trusted third
            parties. The following section details which third party cookies you
            might encounter through this site.<br />
          </p>
          <ul role="list" class="list-6">
            <li class="list-item-22">
              <p class="text-block-privacy">
                This site uses Google Analytics which is one of the most
                widespread and trusted analytics solution on the web for helping
                us to understand how you use the site and ways that we can
                improve your experience. These cookies may track things such as
                how long you spend on the site and the pages that you visit so
                we can continue to produce engaging content.<br /><br />For more
                information on Google Analytics cookies, see the official Google
                Analytics page.<br />
              </p>
            </li>
            <li class="list-item-22">
              <p class="text-block-privacy">
                From time to time we test new features and make subtle changes
                to the way that the site is delivered. When we are still testing
                new features these cookies may be used to ensure that you
                receive a consistent experience whilst on the site whilst
                ensuring we understand which optimisations our users appreciate
                the most.<br />
              </p>
            </li>
            <li>
              <p class="text-block-privacy">
                As we sell products it&#x27;s important for us to understand
                statistics about how many of the visitors to our site actually
                make a purchase and as such this is the kind of data that these
                cookies will track. This is important to you as it means that we
                can accurately make business predictions that allow us to
                monitor our advertising and product costs to ensure the best
                possible price.<br />
              </p>
            </li>
            <li>
              <p class="text-block-privacy">
                The Google AdSense service we use to serve advertising uses a
                DoubleClick cookie to serve more relevant ads across the web and
                limit the number of times that a given ad is shown to you.<br /><br />For
                more information on Google AdSense see the official Google
                AdSense privacy FAQ.
              </p>
            </li>
            <li>
              <p class="text-block-privacy">
                We also use social media buttons and/or plugins on this site
                that allow you to connect with your social network in various
                ways. For these to work the following social media sites
                including; Facebook, Twitter, LinkedIn and Reddit, will set
                cookies through our site which may be used to enhance your
                profile on their site or contribute to the data they hold for
                various purposes outlined in their respective privacy
                policies.<br />
              </p>
            </li>
          </ul>
          <h4 class="h4-heading-privacy">More information</h4>
          <p class="text-block-privacy">
            Hopefully that has clarified things for you and as was previously
            mentioned if there is something that you aren&#x27;t sure whether
            you need or not it&#x27;s usually safer to leave cookies enabled in
            case it does interact with one of the features you use on our
            site.<br /><br />For any further questions don&#x27;t hesitate to
            contact us at: info{{ '@' }}{{ config('app.name') }}.com<br />
          </p>
          <h4 class="header-privacy">Disclaimer<br /></h4>
          <p class="text-block-privacy">
            We are not a registered broker-dealer or an investment advisor. You
            must trade and take sole responsibility to evaluate all information
            provided by this website and use it at your own risk.<br /><br />Investments
            in securities, commodities, currencies and other investment options
            are speculative and involve high degrees of risk. You could lose all
            or a substantial amount of your investment. You should carefully
            read all related information regarding any investment, and consult
            with your advisors, before investing.<br />
          </p>
        </div>
      </section>
</div>
