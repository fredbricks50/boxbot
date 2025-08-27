<?php

use Livewire\Volt\Component;
use Livewire\Attributes\{Layout, Title};

new 
#[Layout('components.layouts.home')]
#[Title('Terms and Conditions')]
class extends Component {
    //
}; ?>

<div>
    <div class="privacy-container w-container">
        <h1 class="heading-2 text-center">Terms of Use</h1>
        <div class="div-block-2">
          <div class="text-block-privacy-2">
            <strong>Introduction and applicability<br />‍</strong>This agreement
            and the (general) terms of use contained therein (hereinafter: these
            “<strong>Terms</strong>”) apply to the Services (as defined
            hereinafter) provided to you by BAAS B.V., a limited liability
            company incorporated under the laws of the Netherlands (<em
              >besloten vennootschap met beperkte aansprakelijkheid</em
            >), having its registered offices at Schiedamse Vest 154, (3011 BH)
            Rotterdam, the Netherlands, registered with the Dutch Chamber of
            Commerce under registration number 72662069 (hereinafter:
            “<strong>we</strong>” or “<strong>{{ config('app.name') }}</strong>”).<br /><br />Upon
            acceptance of these Terms by you, either by acknowledgment and/or
            receipt of any Services, a legally binding agreement is formed
            between you and {{ config('app.name') }} (hereinafter jointly: the
            “<strong>Parties</strong>”), of which this agreement these Terms
            form an integral part. No other agreement(s) or general terms and
            conditions other than these Terms are applicable to the legal
            relationship that exists between the Parties and that is governed by
            these Terms. The applicability of any such other agreement(s) or
            general terms and conditions is hereby explicitly excluded and
            waived.
          </div>
          <h4 class="h4-heading-privacy-2">Disclaimer</h4>
          <div class="text-block-privacy-2">
            <strong>‍</strong>{{ config('app.name') }} DOES NOT PROVIDE THE SERVICES UNDER
            THE SUPERVISION OF THE NETHERLANDS AUTHORITY FOR THE FINANCIAL
            MARKETS OR DUTCH CENTRAL BANK OR ANY OTHER SUPERVISORY AUTHORITY.
            {{ config('app.name') }} IS NOT A REGISTERED BROKER-DEALER OR AN INVESTMENT
            ADVISOR. YOU MUST TAKE SOLE RESPONSIBILITY TO EVALUATE ALL
            INFORMATION MADE AVAILABLE BY US AND USE IT AT YOUR OWN RISK.
            INVESTMENTS IN (CRYPTO) CURRENCIES AND OTHER INVESTMENT OPTIONS ARE
            SPECULATIVE AND INVOLVE HIGH DEGREES OF RISK. THE MAJORITY OF
            INVESTORS IN THESE MARKETS ARE NOT PROFITABLE. YOU COULD LOSE ALL OR
            A SUBSTANTIAL AMOUNT OF YOUR INVESTMENT. YOU SHOULD CAREFULLY READ
            ALL RELATED INFORMATION REGARDING ANY INVESTMENT AND ALWAYS CONSULT
            WITH YOUR ADVISORS, BEFORE INVESTING.<br /><br />ALPHA NOTICE: THE
            SERVICES AND RELATED PLATFORM ARE CURRENTLY IN THE ALPHA STAGE OF
            DEVELOPMENT. THIS MEANS THAT THE AVAILABILITY OF OUR SERVICES IS NOT
            GUARANTEED AND YOU MAY ENCOUNTER BUGS, ERRORS AND/OR TROUBLE
            ACCESSING OUR SERVICES WITHOUT WARNING. FEATURES INCLUDED IN THE
            SERVICES AND ON THE PLATFORM MAY NOT FUNCTION AS INTENDED, WHICH MAY
            CAUSE LOSSES TO YOUR (CRYPTO) ASSETS.
          </div>
          <div class="text-block-privacy-2">
            <strong>1. Definitions</strong><br /><span class="text-span-17"
              >Parties:</span
            >
            you and {{ config('app.name') }} jointly.<br />‍<span class="text-span-18"
              >Services:</span
            >
            the platform, interface and associated services that {{ config('app.name') }}
            develops/has developed enabling you and other Users to create and
            customize their own trading algorithms (trading bots) in order to
            execute orders (trade) on supported (cryptocurrency) exchanges by
            means of API connections and/or smart contracts. The Services can
            only be accessed through the Website.<br /><span
              class="text-span-19"
              >Terms:</span
            >
            this agreement and the (general) terms of use contained therein.<br /><span
              class="text-span-21"
              >User(s):</span
            >
            you, and individual private persons and/or a legal entities like
            you, making use of the Services.<br /><span class="text-span-20"
              >Website:</span
            >
            {{ config('app.url') }} including all subdomains and extensions to
            said URL.<br /><br />Definitions which are defined in these Terms
            apply in the singular form as well as in the plural form of these
            definitions.<br />‍<strong
              ><br />2. Registration and personal account<br />‍</strong
            >The Services may exclusively be accessed and used via the Website,
            any other access or use is strictly forbidden. Therefore, in order
            to use the Services, you will need to register by email or by
            connecting your BSC wallet to create a personal account on the
            Website. You are only allowed to have 1 (one) personal account. This
            personal account is strictly personal and may only be used by you -
            not (also) on behalf of anybody else.<br /><br />{{ config('app.name') }} may
            implement a KYC (<em>know your customer</em>) and/or AML (<em
              >anti money laundering</em
            >) procedure and accompanying checks applied by {{ config('app.name') }} and/or a
            third party designated thereto by {{ config('app.name') }} in the future. You
            hereby agree in advance to the applicability of any such procedure
            and accompanying checks. This will result in {{ config('app.name') }} formally
            requesting you to complete said KYC and/or AML procedure(s) in order
            to be allowed to create a personal account and use the Services.
            {{ config('app.name') }} will inform you thereof in due time and grant you the
            opportunity to complete said procedure(s). However, should you, upon
            the creation of your personal account or at any other point in time
            fail to successfully complete said procedure(s) - which is to be
            determined at the sole discretion of {{ config('app.name') }} and/or a third
            party designated by {{ config('app.name') }} - {{ config('app.name') }} is legally entitled to
            close down your personal account permanently and (thus) exclude you
            from using the Services.<br /><br />It is your responsibility to
            keep your personal account secure and protect your login details and
            password. For this reason, we highly encourage the use of two-factor
            authentication (2FA) for improved account security. Two factor
            authentication sees the User adding an additional authentication
            method (such as Google authenticator). We assume that all actions
            taken from your personal account are done by you or under your
            supervision.<br /><br />You agree to provide up-to-date, complete
            and accurate information on your personal account. You agree to
            promptly update your personal account when necessary, so that we can
            contact you if needed.<br /><br /><strong
              >3. The Services<br /></strong
            >{{ config('app.name') }} provides Users with access to the Services and the
            adjacent platform. Access is based on account tiers which depends on
            the amount of TTM tokens staked by users. The “Apprentice” tier
            provides access to certain free features. The “Champion” and
            “Legend” tier provides access to exclusive features that are not
            available to the “Apprentice” Users.<br /><br />{{ config('app.name') }} reserves
            the right to modify the Services as well as the access of
            “Apprentice”, “Champion” and “Legend” users at any time,
            unilaterally. {{ config('app.name') }} may exercise the right to modify
            accessibility to the Services and in addition change the access
            tiers of “Apprentice”, “Champion” and “Legend” Users at any time,
            unilaterally and without notice.<br /><br />{{ config('app.name') }} envisages
            that the Services will, amongst other things (but not limited
            thereto), (in the end) include the following functionalities:<br /><span
              class="text-span-16"
              >      <strong>-</strong> algorithms and modules that allow the
              User to execute automated (trading) actions across their connected
              (exchange) accounts (the ‘Live Trading’ functionality), and
              simulated (paper trading) accounts (the ‘Paper Trading’
              functionality);</span
            ><br /><span
              >      <strong>-</strong> a dashboard that allows the User to
              monitor their modules, exchange accounts, simulated (paper
              trading) accounts, and other relevant information including, but
              not limited to news, live asset prices, and on-chain data;</span
            ><br /><span
              >      <strong>- </strong>a portfolio tracker that allows the User
              to view the asset balances across their          exchange accounts
              and simulated (paper trading) accounts;</span
            ><br /><span
              >      <strong>-</strong> backtesting features that allow the User
              to test and simulate module performance using historical market
              data; and/or</span
            ><br /><span
              >      <strong>-</strong> a marketplace where the User can access
              content including (but not limited to) templates, preconfigured
              algorithms, modules, tools, and dashboard components.</span
            ><strong><br />‍</strong><br />The User can choose to use the
            Services in a simulated setting or to connect to their account on a
            live exchange; the ‘Live Trading’ functionality. To connect to a
            live exchange account, the User is required to provide {{ config('app.name') }}
            with an API key and secret key. By providing the API key and secret
            key, the User provides {{ config('app.name') }} with a power of attorney to:<br />        1.
             access User account balances for the sole purposes of:<br />               a.
            providing Users with dashboard statistics and portfolio insights;<br />               b.
            allowing User modules to make decisions based on your balances;
            and<br />        2.  place, cancel and execute orders through User
            API connection for the sole              purpose of:<br />               a.
            allowing User algorithms and modules to function according to their
                           conditions.<br /><br /><strong>API Warning:</strong>
            Please be reminded that the use of API keys carries a high degree of
            risk, and should be handled with care. Never reuse (old) API keys,
            never use the same API keys across different services, and never
            share your API keys with anyone. Always make sure to use our
            whitelist IPs to restrict access. You can delete your Live Trading
            connection at any time by navigating to your “Connections” in the
            user menu.<br /><br />{{ config('app.name') }} does not and cannot, not via the
            Services nor via any other action or means, related to (the
            execution of) these Terms or otherwise, provide any crypto
            (exchange) services which can or may result in the exchange of fiat
            currency for a cryptocurrency or (other) cryptographic token or vice
            versa. {{ config('app.name') }} is therefore not and will never be a party to any
            (exchange) transactions or agreements that may be entered into or
            ensue from Users using the Services. Any and all such agreement(s)
            will at all times be concluded and entered into between the relevant
            User(s) and the exchange(s) via which an (exchange) transaction will
            take place. {{ config('app.name') }} does not and will never take custody or make
            decisions on behalf of the User that will influence Users’
            cryptocurrencies and/or cryptographic tokens at any stage.<br /><br />{{ config('app.name') }}
            may upload general tutorials and academy videos on the Website and
            relevant communication channels, about the functioning of the
            Website and the Services. All tutorials, videos and templates
            uploaded by {{ config('app.name') }} are of a general nature and contain in no
            way personal and/or financial advice. Any use of these tutorials
            and/or videos is at the sole risk and expense of the User.<br /><br />You
            realise that using the Services via the Website does not give you
            any rights and/or does not obligate {{ config('app.name') }} to (do) anything,
            except for the actions expressed in these Terms. More specifically
            and for the avoidance of doubt: using the Services does not give you
            the right and/or does not obligate {{ config('app.name') }} to enter into any
            further agreement whatsoever and/or to obtain any (ownership) rights
            with respect to {{ config('app.name') }} in any form whatsoever.<br />‍<br /><strong
              >4. Use of the Services</strong
            ><br />You hereby agree, confirm and warrant to {{ config('app.name') }} that you
            will use and interact with the Services via the Website:<br />      i.  only
            if you are over 18 (eighteen) years old; <br />     ii.  at your own
            risk and expense;<br />    iii.  exclusively for yourself and not
            (also) for and/or on behalf of anybody else;<br />    iv.  exclusively
            via your personal account on the Website. You are only allowed to
                      have 1 (one) personal account, the contents of which are
            strictly personal and (therefore) not to be shared and/or used by
            anyone else;<br />     v.  in an orderly manner and according to the
            standards of reasonableness and           fairness as well as in a
            legal and non-fraudulent manner. More specifically: you will only
            use and/or interact with the Services via your personal account on
            the Website. You will not circumvent your personal account and/or
            the Website and also not use the Services via screen-scraping and/or
            via any other irregular and/or fraudulent way;<br />    vi.  whilst
            realising and understanding that blockchain (technology),
            cryptocurrencies, cryptographic tokens and interactions and/or
            services related thereto are a relatively new and largely
            unregulated form of technology and interaction. This technology has
            not been proven to be without error and is definitely not hack-free,
            whilst being subjected to many different scams and/or fraudulent
            schemes. As a result of this, the use of and interaction with
            blockchain (technology), cryptocurrencies, cryptographic tokens and
            services related thereto is, inherently, (very) risky;<br />   vii.   only
            if you are legally permitted thereto under the laws and regulations
            applicable to you and applicable to these Terms to do so;<br />  viii.   in
            a manner that is not in breach of any third party’s rights and/or
            other           obligations, however named, does not conflict with
            the applicable standards of reasonableness and fairness, nor in a
            way that is contrary to public order or morality; and<br />    ix.
              only if you are not a citizen of, not residing in, not established
            in and/or do not have your (registered) address in Afghanistan,
            Albania, Barbados, Belarus, Burkina Faso, Cambodia, Canada, China,
            Democratic People’s Republic of Korea (DPRK, North-Korea),
            Democratic Republic of Congo, Haiti, Iran, Jamaica, Jordan, Mali,
            Mozambique, Myanmar, Nicaragua, Nigeria, Pakistan, Panama, the
            Philippines, Russia, Senegal, South Africa, Syria, Tanzania,
            Trinidad and Tobago, Uganda, United States of America (USA),
            Vanuatu, Yemen and/or Zimbabwe.<br /><br />In addition to the
            foregoing confirmations and warranties, the User is aware of the
            risks of trading and/or investing in blockchain related projects,
            cryptocurrencies and/or cryptographic tokens and takes full and sole
            responsibility for these risks. The User takes sole responsibility
            to evaluate all information provided and use it at his/her own risk.
            Investments in blockchain related projects, cryptocurrencies and/or
            cryptographic tokens, as well as related ventures, are speculative
            and involve high degrees of risk. The majority of investments in
            these markets are not profitable. The User is aware that it is
            possible to lose all or a substantial amount of his/her investment.
            There is a risk involved if you hold assets on a cryptocurrency
            exchange.<br /><br />In the event that you breach any of the
            aforementioned confirmations and/or warranties, and/or any other
            clause stipulated in these Terms, {{ config('app.name') }} is legally entitled,
            without giving you prior notice thereof, to close down your personal
            account permanently and (thus) exclude you from using the
            Services.<br />‍<br />‍<strong
              >5. Availability of the Services</strong
            ><br />{{ config('app.name') }} will use reasonable and commercially feasible
            best efforts to make and keep the Services available and limit
            downtime. {{ config('app.name') }} does not guarantee that the Services will be
            available at any given time or that they will not be subject to
            (unexpected) outages or downtime. The User acknowledges that the
            Services are provided over the internet, mobile networks and in
            connection with external blockchain networks and therefore the
            quality and availability of the Services may be affected by factors
            outside of {{ config('app.name') }}’s reasonable control.<br /><br />The Services
            and the Website are made available by {{ config('app.name') }} to you on an “as
            is” and “as available” basis without the provision of any warranty
            or guarantee of any kind. {{ config('app.name') }} does not accept any
            responsibility whatsoever for the (un)availability of the Services
            and/or the Website, or any difficulty or inability to download or
            access content thereon, or any other communication system failure
            which may result in the Services and/or the Website being
            unavailable.<br /><br /><strong>6. Privacy</strong><br />{{ config('app.name') }}
            respects your privacy and anticipates the EU General Data Protection
            Regulation (GDPR). When you make use of the Services and the
            Website, we will collect certain personal data from you. What data,
            how we collect this data, and for what purpose has been outlined in
            our privacy policy. You can find our privacy policy on the
            Website.<br /><br /><strong>7.  Intellectual property rights</strong
            ><br />Unless otherwise indicated, {{ config('app.name') }} is the exclusive
            owner of all rights related to and/or derived from (your use of) the
            Services and the Website, including copyrights and other
            intellectual property rights. Nothing in (the execution of) these
            Terms shall be construed as granting any rights under any patent,
            copyright and/or other intellectual property right of
            {{ config('app.name') }}.<br /><br /><strong
              >8. Exclusion of liability and indemnification<br />‍</strong
            >{{ config('app.name') }}, its directors, employees and/or any other (third)
            party involved with (the provision of) the Services, (the creation
            of) the Website as well as with the execution of these Terms, are
            not and cannot be held liable by you for any damage, however named,
            explicitly including (but not limited to) indirect and consequential
            damages, resulting from (the use of) the Services and/or the
            Website. {{ config('app.name') }}, its directors, employees and/or any other
            (third) party involved with (the provision of) the Services, (the
            creation of) the Website as well as with the execution of these
            Terms, are also not liable for any for any damage, however named,
            resulting from hacks, soft- and/or hardware malfunctioning,
            (hardware) system down times, blockchain down times and/or any other
            soft- and/or hardware related malfunctioning that affects (the
            functioning of) the Services and/or the Website.<br /><br />{{ config('app.name') }},
            its directors, employees and/or any other (third) party involved
            with (the provision of) the Services, (the creation of) the Website
            as well as with the execution of these Terms, are not and cannot be
            held liable by you for any damage, however named, explicitly
            including (but not limited to) indirect and consequential damages,
            resulting from the non-existence or loss of the value of the
            cryptocurrencies, tokens and/or any other value derived from or
            relating to the Services, due to, amongst other things (but not
            limited thereto); the loss or theft of (access to) your personal
            account or wallet (login-)credentials, exchange rate changes,
            (changed) market conditions, (amended) legislation, and/or (changed)
            points of view on the part of the regulators.<br /><br />You hereby
            acknowledge and agree that you will indemnify {{ config('app.name') }}, its
            directors, its employees and/or any third party involved with (the
            provision of) the Services, (the creation of) the Website as well as
            with the execution of these Terms against (any) third-party
            claim(s), including (but not limited to) claims which arise from you
            breaching (any provision under) these Terms, specifically including
            (but not limited to) the breach of your warranties as stipulated in
            clause 4 of these Terms.<br /><br /><strong>9. Force Majeure</strong
            ><br />With due observance of the provisions included in these
            Terms, {{ config('app.name') }}’s provision of the Services and/or any other
            performance under these Terms shall be excused in the event of
            interruption and/or delay due to, or resulting from, causes beyond
            our reasonable control, including but not limited to acts of God,
            acts of any government, war or other hostility, civil disorder, the
            elements, fire, flood, snowstorm, earthquake, explosion, embargo,
            acts of terrorism, power failure, equipment failure, industrial or
            labor disputes or controversies, acts of any third party data
            provider(s) or other third-party information provider(s),
            third-party platform, or communication method interruptions.<br /><br /><strong
              >10. Miscellaneous<br />‍</strong
            >These Terms include all the arrangements between you and
            {{ config('app.name') }} relating to (the execution of) the Services and any
            other subject or matter governed by these Terms and replace all the
            previously written and oral agreements made between you and
            {{ config('app.name') }}. No further (general) terms, conditions and/or statutory
            regimes are applicable to the legal relationship and/or (other)
            arrangements made between you and {{ config('app.name') }} in relation to the
            Services and/or and any other subject or matter governed by these
            Terms.<br /><br />{{ config('app.name') }} is legally entitled to unilaterally
            change these Terms. When we change these Terms in a significant way,
            we will notify the Users and post the updated Terms on our Website.
            By continuing to use the Services and/or the Website, you agree to
            the changes made in the Terms and the applicability thereof.<br /><br />If
            we do not enforce (parts of) these Terms, this cannot be construed
            as a consent or waiver of the right to enforce them at a later
            moment in time or against another User.<br /><br />You hereby give
            {{ config('app.name') }} permission in advance for the transfer of its rights and
            obligations in relation to (the provision of) the Services, under
            these Terms and all related (legal) acts to third parties, either by
            contract transfer (section 6:159 DCC), or separately (section 6:155
            DCC). If {{ config('app.name') }} executes such a transfer, it will remain
            responsible to you for the fulfilment of its obligations in relation
            to (the provision of) the Services and under these Terms until
            {{ config('app.name') }} has notified you of the transfer and the (legal) person
            to whom {{ config('app.name') }} has transferred its rights and obligations.<br /><br />Any
            claims that may ensue to you from (the use of) the Services, the
            Website and/or these Terms cannot be transferred by you without
            prior written consent given thereto to you by {{ config('app.name') }}, this with
            effect under property law (<em>met goederenrechtelijke werking</em>)
            as defined in section 3:83(2) DCC.<br /><br />The invalidity or
            unenforceability of any provision of these Terms shall not affect
            the validity or enforceability of any other provision of these
            Terms. Any such invalid or unenforceable provision shall be replaced
            or be deemed to be replaced by a provision that is considered to be
            valid and enforceable and which interpretation shall be as close as
            possible to the intent of the invalid provision.<br /><br /><strong
              >11. Applicable law and jurisdiction</strong
            ><br />The Services and these Terms, as well as the execution
            thereof, and any non-contractual obligations arising out of or in
            connection therewith, are exclusively governed by and shall be
            construed in accordance with the laws of the Netherlands.<br /><br />Any
            disputes arising out of or in connection with the Services or these
            Terms, including regarding the existence or validity of these Terms,
            the execution of the Services, and any non-contractual obligations
            arising out of or in connection with the Services or these Terms,
            are subject to the exclusive jurisdiction of the competent court in
            Rotterdam, the Netherlands (<em>Rechtbank Rotterdam</em
            >).<br /><br /><strong>12. Complaints and suggestions<br /></strong
            >{{ config('app.name') }} reserves the right to change these Terms. When we
            change these Terms in a significant way, we will notify the Users
            (if the User has provided us with his e-mail address to this end)
            and post the updated Terms on our Website. By continuing to use the
            Website and Platform, you acknowledge the most recent version of
            these Terms.<br /><br />{{ config('app.name') }} (BAAS B.V.) <br />Schiedamse
            Vest 154<br />3011 BH Rotterdam<br />The Netherlands<br />info@ {{ config('app.name') }}.com<br />Chamber
            of Commerce number: 72662069<br />
          </div>
          <div class="text-block-privacy-2 version">
            {{ config('app.name') }} terms of use, v3, November 2024
          </div>
        </div>
      </div>
</div>
