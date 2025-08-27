<!doctype html>
<html lang="eng">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<style>
.btn:hover {
    background-color: #212135 !important
}
</style>
<table style="width: 100%; background-color: #EFF3FF">
    <tbody>
        <tr>
            <td style="padding: 80px 0;">
                <table style="width: 60%; max-width: 550px; min-width: 420px; margin: 0 auto">
                    <tbody>
                        <tr>
                            <td style="font-family:'Neue Montreal',sans-serif; font-size: 17px; font-weight: 400; line-height: 1.5">
                                <p style="text-align:center; margin: 24px 0">
                                    <a href="{{ config('mail.APP_URL') }}" target="_blank" style="padding: 8px">
                                        <img aria-hidden="true" src="{{ config('mail.APP_MAIL_FAVICON') }}" height="50" alt="{{config('mail.APP_NAME')}}">
                                    </a>
                                </p>
                                <div class="body-card" style="background-color: #fff; padding: 30px; border-radius: 16px">
                                    <div style="color: rgb(34, 34, 34);">
                                        <p>
                                            <strong>Hello {{ $mailData['username'] }},</strong>
                                        </p>
                                        @yield('content')
                                    </div>
                                </div>
                                <div style="padding: 20px 40px 0 40px;text-align: center">
                                    <div style="font-size: 12px; color: #7A7D84">
                                        <span> For more information, contact us at <a style="color: #212121;" href="mailTo:{{ config('mail.ADMIN_SUPPORT_EMAIL') }}">{{ config('mail.ADMIN_SUPPORT_EMAIL') }}</a></span>
                                        <span> or visit our website <a style="color: #212121;" href="{{ config('mail.APP_URL') }}" target="_blank">{{ config('mail.APP_NAME') }}</a>.</span>
                                        <br>
                                        <p>
                                            <div>© 2025 {{ config('mail.APP_NAME') }}. All Rights Reserved.</div>
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
</body>
</html>
